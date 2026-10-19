import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import {
  Category,
  DuplicateError,
  ENTRY_LABEL,
  Entry,
  EntryType,
  ddsRequest,
  fmtDate,
  money,
} from "./api";

const TYPES: EntryType[] = ["in_check", "in_cash", "in_transfer", "in_bank", "topup", "expense", "collection", "bank_deposit"];
const NEW_CAT = "__new__";

interface Props {
  open: boolean;
  onClose: () => void;
  date: string;
  type: EntryType | null;
  entries: Entry[];
  categories: Category[];
  canEditDate: (d: string) => boolean;
  canPickDate: boolean;
  minDate: string;
  maxDate?: string;
  onChanged: () => void;
  onCategoriesChanged: () => void;
  onError: (e: unknown) => void;
}

interface FormState {
  id: number | null;
  op_date: string;
  entry_type: EntryType;
  amount: string;
  category_id: string;
  newCategory: string;
  comment: string;
}

export default function EntryDialog(props: Props) {
  const { open, onClose, date, type, entries, categories, canEditDate, canPickDate, minDate, maxDate, onChanged, onCategoriesChanged, onError } = props;

  const blank = (): FormState => ({
    id: null,
    op_date: date,
    entry_type: type || "in_check",
    amount: "",
    category_id: "",
    newCategory: "",
    comment: "",
  });

  const [form, setForm] = useState<FormState>(blank);
  const [saving, setSaving] = useState(false);
  const [dupWarning, setDupWarning] = useState("");
  const [history, setHistory] = useState<{ id: number; items: { action: string; snapshot: string; changed_by: string; changed_at: string }[] } | null>(null);

  useEffect(() => {
    if (open) {
      setForm(blank());
      setDupWarning("");
      setHistory(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, date, type]);

  const list = useMemo(
    () => entries.filter((e) => e.op_date.slice(0, 10) === date && (!type || e.entry_type === type)),
    [entries, date, type],
  );

  const activeCats = categories.filter((c) => c.is_active);
  const writable = canEditDate(form.op_date);
  const isExpense = form.entry_type === "expense";

  const save = async (force = false) => {
    setSaving(true);
    try {
      let categoryId = form.category_id;
      if (isExpense && categoryId === NEW_CAT) {
        if (!form.newCategory.trim()) throw new Error("Введите название новой статьи");
        const r = await ddsRequest<{ id: number }>("POST", { action: "categories" }, { name: form.newCategory.trim() });
        categoryId = String(r.id);
        onCategoriesChanged();
      }
      const payload = {
        id: form.id,
        op_date: form.op_date,
        entry_type: form.entry_type,
        amount: form.amount,
        category_id: isExpense ? categoryId : null,
        comment: form.comment,
        force,
      };
      await ddsRequest(form.id ? "PUT" : "POST", { action: "entry" }, payload);
      toast.success(form.id ? "Изменено" : "Добавлено");
      setDupWarning("");
      setForm({ ...blank(), op_date: form.op_date, entry_type: form.entry_type });
      onChanged();
    } catch (e) {
      if (e instanceof DuplicateError) setDupWarning(e.message);
      else onError(e);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить операцию? Она останется в истории изменений.")) return;
    try {
      await ddsRequest("DELETE", { action: "entry" }, { id });
      toast.success("Удалено");
      if (form.id === id) setForm(blank());
      onChanged();
    } catch (e) {
      onError(e);
    }
  };

  const showHistory = async (id: number) => {
    if (history?.id === id) return setHistory(null);
    try {
      const items = await ddsRequest<{ action: string; snapshot: string; changed_by: string; changed_at: string }[]>("GET", { action: "entry", id });
      setHistory({ id, items });
    } catch (e) {
      onError(e);
    }
  };

  const edit = (e: Entry) => {
    setDupWarning("");
    setForm({
      id: e.id,
      op_date: e.op_date.slice(0, 10),
      entry_type: e.entry_type,
      amount: String(e.amount),
      category_id: e.category_id ? String(e.category_id) : "",
      newCategory: "",
      comment: e.comment,
    });
  };

  const actionLabel: Record<string, string> = { create: "создано", update: "изменено", delete: "удалено" };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type ? ENTRY_LABEL[type] : "Новая операция"} · {fmtDate(date)}
          </DialogTitle>
        </DialogHeader>

        {list.length > 0 && (
          <div className="border rounded-lg divide-y text-sm">
            {list.map((e) => (
              <div key={e.id} className={`p-2.5 ${form.id === e.id ? "bg-amber-50" : ""}`}>
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold tabular-nums">{money(e.amount)} ₽</div>
                    <div className="text-xs text-slate-500">
                      {!type && <span>{ENTRY_LABEL[e.entry_type]} · </span>}
                      {e.category_name && <span>{e.category_name} · </span>}
                      {e.created_by}
                    </div>
                    {e.comment && <div className="text-xs text-slate-700 mt-0.5 break-words">{e.comment}</div>}
                  </div>
                  <button className="p-1 text-slate-400 hover:text-slate-700" title="История" onClick={() => showHistory(e.id)}>
                    <Icon name="History" size={16} />
                  </button>
                  {canEditDate(e.op_date.slice(0, 10)) && (
                    <>
                      <button className="p-1 text-slate-400 hover:text-slate-700" title="Изменить" onClick={() => edit(e)}>
                        <Icon name="Pencil" size={16} />
                      </button>
                      <button className="p-1 text-slate-400 hover:text-red-600" title="Удалить" onClick={() => remove(e.id)}>
                        <Icon name="Trash2" size={16} />
                      </button>
                    </>
                  )}
                </div>
                {history?.id === e.id && (
                  <div className="mt-2 space-y-1 text-xs bg-slate-50 rounded p-2">
                    {history.items.map((h, i) => {
                      let snap: { amount?: number; comment?: string } = {};
                      try {
                        snap = JSON.parse(h.snapshot);
                      } catch {
                        /* empty */
                      }
                      return (
                        <div key={i} className="text-slate-600">
                          {new Date(h.changed_at + "Z").toLocaleString("ru-RU")} · {h.changed_by} · {actionLabel[h.action] || h.action}
                          {snap.amount !== undefined && <> · {money(snap.amount)} ₽</>}
                          {snap.comment && <> · «{snap.comment}»</>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="p-2.5 flex justify-between text-sm font-medium bg-slate-50">
              <span>Итого</span>
              <span className="tabular-nums">{money(list.reduce((s, e) => s + Number(e.amount), 0))} ₽</span>
            </div>
          </div>
        )}

        {writable || form.id ? (
          <div className="space-y-3 pt-1">
            {form.id && (
              <div className="flex items-center justify-between text-sm text-amber-700">
                <span>Редактирование операции</span>
                <button className="underline" onClick={() => setForm(blank())}>
                  Отмена
                </button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Дата</Label>
                <Input
                  type="date"
                  value={form.op_date}
                  min={minDate}
                  max={maxDate}
                  disabled={!canPickDate}
                  onChange={(e) => setForm({ ...form, op_date: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Сумма, ₽</Label>
                <Input
                  inputMode="decimal"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value.replace(/[^\d.,]/g, "") })}
                  placeholder="0"
                  autoFocus
                />
              </div>
            </div>
            {!type && (
              <div className="space-y-1.5">
                <Label>Тип операции</Label>
                <Select value={form.entry_type} onValueChange={(v) => setForm({ ...form, entry_type: v as EntryType })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {ENTRY_LABEL[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {isExpense && (
              <div className="space-y-1.5">
                <Label>Статья расхода</Label>
                <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите статью" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeCats.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                      </SelectItem>
                    ))}
                    <SelectItem value={NEW_CAT}>+ Новая статья</SelectItem>
                  </SelectContent>
                </Select>
                {form.category_id === NEW_CAT && (
                  <Input
                    placeholder="Название новой статьи"
                    value={form.newCategory}
                    onChange={(e) => setForm({ ...form, newCategory: e.target.value })}
                  />
                )}
              </div>
            )}
            <div className="space-y-1.5">
              <Label>Комментарий</Label>
              <Textarea rows={2} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
            </div>
            {dupWarning && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 space-y-2">
                <div className="flex gap-2">
                  <Icon name="TriangleAlert" size={16} className="shrink-0 mt-0.5" />
                  <span>{dupWarning}. Это не дубль?</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => save(true)} disabled={saving}>
                    Всё равно сохранить
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setDupWarning("")}>
                    Отмена
                  </Button>
                </div>
              </div>
            )}
            {!dupWarning && (
              <Button
                className="w-full"
                onClick={() => save(false)}
                disabled={saving || !form.amount || (isExpense && !form.category_id) || !canEditDate(form.op_date)}
              >
                {saving ? "Сохранение..." : form.id ? "Сохранить изменения" : "Добавить"}
              </Button>
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Этот день закрыт для изменений.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
