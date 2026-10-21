import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import DdsLogin from "@/components/dds/DdsLogin";
import DdsHeader from "@/components/dds/DdsHeader";
import useDdsSession from "@/components/dds/useDdsSession";
import { AuthError, MONTH_NAMES, ddsRequest, medEdit, medView, pad } from "@/components/dds/api";
import MedTable from "@/components/med/MedTable";
import ItemDialog, { ItemForm } from "@/components/med/ItemDialog";
import { exportMed } from "@/components/med/exportMed";
import { MED_END, MED_START, MedRow, createItem, getMonth, rub, saveCell, shiftMonth, updateItem } from "@/components/med/medApi";

export default function Med() {
  const { session, login, logout, expire, minutesLeft } = useDdsSession();
  const [today, setToday] = useState("");
  const [month, setMonth] = useState("");
  const [days, setDays] = useState(31);
  const [items, setItems] = useState<MedRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"out" | "in">("out");
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<Partial<ItemForm> | null>(null);

  const handleErr = useCallback(
    (e: unknown) => {
      if (e instanceof AuthError) expire();
      toast.error(e instanceof Error ? e.message : "Ошибка");
    },
    [expire],
  );

  const load = useCallback(
    async (ym: string, silent = false) => {
      if (!silent) setLoading(true);
      try {
        const d = await getMonth(ym);
        setDays(d.days);
        setItems(d.items);
      } catch (e) {
        handleErr(e);
      } finally {
        setLoading(false);
      }
    },
    [handleErr],
  );

  useEffect(() => {
    if (!session) return;
    ddsRequest<{ today: string }>("GET", { action: "me" })
      .then((r) => {
        setToday(r.today);
        const cur = r.today.slice(0, 7);
        setMonth((p) => p || (cur < MED_START ? MED_START : cur > MED_END ? MED_END : cur));
      })
      .catch(handleErr);
  }, [session, handleErr]);

  useEffect(() => {
    if (session && month && medView(session)) load(month);
  }, [session, month, load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? items.filter((i) => i.name.toLowerCase().includes(q)) : items;
  }, [items, search]);

  if (!session) return <DdsLogin title="Медрасходка" onLogin={login} />;
  if (!medView(session)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-slate-700">У вас нет доступа к медрасходке. Обратитесь к владельцу.</p>
        <Button asChild><Link to="/dds">Вернуться в ДДС</Link></Button>
      </div>
    );
  }

  const editable = medEdit(session);
  const [y, m] = month ? month.split("-").map(Number) : [0, 0];
  const spent = items.reduce((s, r) => s + Number(r.spent_sum), 0);
  const lowCount = items.filter((r) => !r.exclude_control && r.min_stock > 0 && r.end < r.min_stock).length;

  const onCell = async (row: MedRow, day: number, qty: number) => {
    try {
      await saveCell(row.id, `${y}-${pad(m)}-${pad(day)}`, mode, qty);
      load(month, true);
    } catch (e) {
      handleErr(e);
    }
  };

  const onPrice = async (row: MedRow, field: "pack_price" | "pack_qty", v: number) => {
    try {
      await updateItem(row.id, { [field]: v });
      load(month, true);
    } catch (e) {
      handleErr(e);
    }
  };

  const onSaveItem = async (f: ItemForm) => {
    try {
      const data = { name: f.name, pack_price: f.pack_price, pack_qty: f.pack_qty, min_stock: f.min_stock };
      if (f.id) await updateItem(f.id, data);
      else await createItem({ ...data, start_stock: f.start_stock });
      toast.success(f.id ? "Сохранено" : "Препарат добавлен");
      load(month, true);
    } catch (e) {
      handleErr(e);
      throw e;
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50">
      <DdsHeader session={session} minutesLeft={minutesLeft} onLogout={logout} current="med" />

      <div className="px-3 sm:px-5 py-2.5 flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Button size="icon" variant="outline" className="h-9 w-9" disabled={!month || month <= MED_START} onClick={() => setMonth(shiftMonth(month, -1))}>
            <Icon name="ChevronLeft" size={18} />
          </Button>
          <div className="min-w-[130px] text-center font-semibold text-slate-900">{month && `${MONTH_NAMES[m - 1]} ${y}`}</div>
          <Button size="icon" variant="outline" className="h-9 w-9" disabled={!month || month >= MED_END} onClick={() => setMonth(shiftMonth(month, 1))}>
            <Icon name="ChevronRight" size={18} />
          </Button>
        </div>

        <div className="inline-flex rounded-lg border bg-white p-0.5">
          <button
            type="button"
            onClick={() => setMode("out")}
            className={`px-3 py-1.5 text-sm rounded-md transition ${mode === "out" ? "bg-clinic-teal text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            Расход
          </button>
          <button
            type="button"
            onClick={() => setMode("in")}
            className={`px-3 py-1.5 text-sm rounded-md transition ${mode === "in" ? "bg-emerald-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
          >
            Приход
          </button>
        </div>

        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск препарата" className="h-9 pl-8 w-44 sm:w-56" />
        </div>
        {loading && <Icon name="Loader2" size={16} className="animate-spin text-slate-400" />}

        <div className="ml-auto flex gap-2 flex-wrap items-center">
          <div className="hidden md:flex items-center gap-3 text-sm mr-2">
            <span className="text-slate-500">Потрачено за месяц: <b className="text-slate-900">{rub(spent)}</b></span>
            {lowCount > 0 && (
              <Link to="/dds/med-order" className="inline-flex items-center gap-1 text-orange-600 hover:underline">
                <Icon name="TriangleAlert" size={14} /> К заказу: {lowCount}
              </Link>
            )}
          </div>
          {editable && (
            <Button size="sm" onClick={() => setDialog({})}>
              <Icon name="Plus" size={16} className="mr-1" />
              Препарат
            </Button>
          )}
          <Button size="sm" variant="outline" disabled={!items.length} onClick={() => exportMed(month, days, items)}>
            <Icon name="FileSpreadsheet" size={16} className="sm:mr-1" />
            <span className="hidden sm:inline">Excel</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 px-2 sm:px-5 pb-2">
        {month && (
          <MedTable
            month={month}
            days={days}
            items={filtered}
            mode={mode}
            today={today}
            editable={editable}
            onCell={onCell}
            onPrice={onPrice}
            onOpenItem={(r) =>
              editable &&
              setDialog({ id: r.id, name: r.name, pack_price: String(r.pack_price || ""), pack_qty: String(r.pack_qty), min_stock: String(r.min_stock || "") })
            }
          />
        )}
      </div>

      <div className="px-3 sm:px-5 pb-2 text-[11px] text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
        <span>
          Сейчас в ячейки дней вносится <b className={mode === "out" ? "text-clinic-teal" : "text-emerald-700"}>{mode === "out" ? "расход" : "приход"}</b>
          {editable ? " — нажмите на ячейку и введите число" : ""}
        </span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-orange-200" />— ниже нормы остатка</span>
        <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-rose-200" />— минус, проверьте приход</span>
      </div>

      <ItemDialog open={!!dialog} initial={dialog} onClose={() => setDialog(null)} onSave={onSaveItem} />
    </div>
  );
}
