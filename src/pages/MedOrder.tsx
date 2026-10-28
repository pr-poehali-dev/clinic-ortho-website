import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import DdsLogin from "@/components/dds/DdsLogin";
import DdsHeader from "@/components/dds/DdsHeader";
import useDdsSession from "@/components/dds/useDdsSession";
import { AuthError, medEdit, medView } from "@/components/dds/api";
import NumCell from "@/components/med/NumCell";
import ItemDialog, { ItemForm } from "@/components/med/ItemDialog";
import { MedItem, createItem, getItems, packsToOrder, rub, updateItem } from "@/components/med/medApi";

export default function MedOrder() {
  const { session, login, logout, expire, minutesLeft } = useDdsSession();
  const [items, setItems] = useState<MedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);

  const handleErr = useCallback(
    (e: unknown) => {
      if (e instanceof AuthError) expire();
      toast.error(e instanceof Error ? e.message : "Ошибка");
    },
    [expire],
  );

  const load = useCallback(
    async (silent = false) => {
      if (!silent) setLoading(true);
      try {
        setItems(await getItems());
      } catch (e) {
        handleErr(e);
      } finally {
        setLoading(false);
      }
    },
    [handleErr],
  );

  useEffect(() => {
    if (session && medView(session)) load();
  }, [session, load]);

  const active = useMemo(() => items.filter((i) => i.is_active), [items]);

  const order = useMemo(
    () =>
      active
        .filter((i) => !i.exclude_control && i.min_stock > 0 && i.stock < i.min_stock)
        .map((i) => {
          const need = i.min_stock - i.stock;
          const packs = packsToOrder(need, i.pack_qty);
          return { ...i, need, packs, cost: packs * Number(i.pack_price) };
        })
        .sort((a, b) => b.need - a.need),
    [active],
  );

  const catalog = useMemo(() => {
    const q = search.trim().toLowerCase();
    return active
      .filter((i) => !q || i.name.toLowerCase().includes(q))
      .sort((a, b) => Number(a.exclude_control) - Number(b.exclude_control));
  }, [active, search]);

  if (!session) return <DdsLogin title="Заказ медрасходки" onLogin={login} />;
  if (!medView(session)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-slate-700">У вас нет доступа к медрасходке. Обратитесь к владельцу.</p>
        <Button asChild><Link to="/dds">Вернуться в ДДС</Link></Button>
      </div>
    );
  }

  const editable = medEdit(session);
  const orderTotal = order.reduce((s, i) => s + i.cost, 0);
  const noPrice = order.some((i) => !Number(i.pack_price));

  const patch = async (id: number, data: Record<string, unknown>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)));
    try {
      await updateItem(id, data);
      load(true);
    } catch (e) {
      handleErr(e);
      load(true);
    }
  };

  const copyOrder = async () => {
    const text = order.map((i, n) => `${n + 1}. ${i.name} — ${i.packs} уп. (${i.need} шт)`).join("\n");
    await navigator.clipboard.writeText(`Заказ медрасходки:\n${text}`);
    toast.success("Список скопирован — можно вставить в мессенджер");
  };

  const onAdd = async (f: ItemForm) => {
    try {
      await createItem({ name: f.name, pack_price: f.pack_price, pack_qty: f.pack_qty, min_stock: f.min_stock, start_stock: f.start_stock });
      toast.success("Препарат добавлен");
      load(true);
    } catch (e) {
      handleErr(e);
      throw e;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50">
      <DdsHeader session={session} minutesLeft={minutesLeft} onLogout={logout} current="med_order" />

      <main className="max-w-5xl mx-auto p-3 sm:p-6 space-y-5">
        <section className="bg-white rounded-2xl border overflow-hidden">
          <div className="px-4 sm:px-6 py-4 flex items-center gap-3 flex-wrap border-b bg-gradient-to-r from-clinic-teal/10 to-transparent">
            <div className="w-10 h-10 rounded-xl bg-clinic-teal text-white flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} />
            </div>
            <div className="mr-auto">
              <h2 className="text-lg font-semibold text-slate-900">Нужно заказать</h2>
              <p className="text-xs text-slate-500">Препараты, у которых остаток ниже нормы. Сверху — где не хватает больше всего.</p>
            </div>
            {loading && <Icon name="Loader2" size={16} className="animate-spin text-slate-400" />}
            {order.length > 0 && (
              <Button size="sm" variant="outline" onClick={copyOrder}>
                <Icon name="Copy" size={15} className="mr-1.5" />
                Скопировать список
              </Button>
            )}
          </div>

          {order.length === 0 && !loading ? (
            <div className="px-6 py-10 text-center text-slate-500">
              <Icon name="CircleCheck" size={36} className="mx-auto mb-2 text-emerald-500" />
              Всё в норме — заказывать ничего не нужно.
              {active.every((i) => !i.min_stock) && (
                <p className="text-xs mt-2">Задайте норму остатка в справочнике ниже, чтобы список заказа собирался сам.</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs">
                  <tr>
                    <th className="text-left font-medium px-4 sm:px-6 py-2.5">Препарат</th>
                    <th className="font-medium px-2 py-2.5">Остаток</th>
                    <th className="font-medium px-2 py-2.5">Норма</th>
                    <th className="font-medium px-2 py-2.5">Не хватает</th>
                    <th className="font-medium px-2 py-2.5">В уп.</th>
                    <th className="font-medium px-2 py-2.5 text-clinic-teal">Заказать</th>
                    <th className="font-medium px-4 sm:px-6 py-2.5 text-right">Сумма</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.map((i) => (
                    <tr key={i.id} className="hover:bg-slate-50">
                      <td className="px-4 sm:px-6 py-3 font-medium text-slate-900">{i.name}</td>
                      <td className={`px-2 py-3 text-center tabular-nums ${i.stock < 0 ? "text-rose-600 font-semibold" : ""}`}>{i.stock}</td>
                      <td className="px-2 py-3 text-center tabular-nums text-slate-500">{i.min_stock}</td>
                      <td className="px-2 py-3 text-center tabular-nums text-orange-600 font-medium">{i.need} шт</td>
                      <td className="px-2 py-3 text-center tabular-nums text-slate-500">{i.pack_qty}</td>
                      <td className="px-2 py-3 text-center">
                        <span className="inline-block rounded-lg bg-clinic-teal text-white font-semibold px-3 py-1 tabular-nums whitespace-nowrap">{i.packs} уп.</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 text-right tabular-nums whitespace-nowrap">{Number(i.pack_price) ? rub(i.cost) : <span className="text-slate-400">нет цены</span>}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-semibold">
                    <td className="px-4 sm:px-6 py-3" colSpan={5}>Итого к заказу: {order.length} поз.</td>
                    <td className="px-2 py-3 text-center tabular-nums">{order.reduce((s, i) => s + i.packs, 0)} уп.</td>
                    <td className="px-4 sm:px-6 py-3 text-right tabular-nums whitespace-nowrap">
                      {rub(orderTotal)}
                      {noPrice && <div className="text-[11px] font-normal text-slate-400">без позиций без цены</div>}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl border overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full px-4 sm:px-6 py-4 flex items-center gap-3 text-left hover:bg-slate-50 transition"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${open ? "bg-clinic-teal text-white" : "bg-clinic-teal/10 text-clinic-teal"}`}>
              <Icon name={open ? "Minus" : "Plus"} size={18} />
            </div>
            <div className="mr-auto">
              <h2 className="font-semibold text-slate-900">Справочник препаратов</h2>
              <p className="text-xs text-slate-500">{active.length} позиций · норма остатка и контроль</p>
            </div>
            <Icon name="ChevronDown" size={18} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="border-t">
              <div className="px-4 sm:px-6 py-3 flex gap-2 flex-wrap items-center">
                <div className="relative">
                  <Icon name="Search" size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск" className="h-9 pl-8 w-52" />
                </div>
                {editable && (
                  <Button size="sm" className="ml-auto" onClick={() => setAdding(true)}>
                    <Icon name="Plus" size={16} className="mr-1" />
                    Новый препарат
                  </Button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500 text-xs">
                    <tr>
                      <th className="text-left font-medium px-4 sm:px-6 py-2.5">Препарат</th>
                      <th className="font-medium px-2 py-2.5">Остаток</th>
                      <th className="font-medium px-2 py-2.5 w-28">Держать на остатке, шт</th>
                      <th className="font-medium px-2 py-2.5">До критического</th>
                      <th className="font-medium px-4 sm:px-6 py-2.5">Исключить из контроля</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {catalog.map((i) => {
                      const left = i.stock - i.min_stock;
                      const controlled = !i.exclude_control && i.min_stock > 0;
                      return (
                        <tr key={i.id} className={i.exclude_control ? "bg-slate-50/70 text-slate-400" : ""}>
                          <td className="px-4 sm:px-6 py-2">{i.name}</td>
                          <td className={`px-2 py-2 text-center tabular-nums ${i.stock < 0 ? "text-rose-600 font-semibold" : ""}`}>{i.stock}</td>
                          <td className="px-2 py-1 text-center tabular-nums">
                            <div className="mx-auto w-20 rounded-md border bg-white">
                              <NumCell value={i.min_stock} editable={editable} placeholder="—" onSave={(v) => patch(i.id, { min_stock: v })} />
                            </div>
                          </td>
                          <td className="px-2 py-2 text-center">
                            {!controlled ? (
                              <span className="text-slate-300">—</span>
                            ) : (
                              <span
                                className={`inline-block min-w-[56px] rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums ${
                                  left < 0 ? "bg-rose-100 text-rose-700" : left <= Math.max(2, i.min_stock * 0.2) ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"
                                }`}
                              >
                                {left < 0 ? `ниже на ${-left}` : `${left} шт`}
                              </span>
                            )}
                          </td>
                          <td className="px-4 sm:px-6 py-2 text-center">
                            <Checkbox checked={i.exclude_control} disabled={!editable} onCheckedChange={(v) => patch(i.id, { exclude_control: !!v })} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>

      <ItemDialog open={adding} onClose={() => setAdding(false)} onSave={onAdd} />
    </div>
  );
}
