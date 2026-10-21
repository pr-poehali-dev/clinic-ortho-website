import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { rub } from "./medApi";

export interface ItemForm {
  id?: number;
  name: string;
  pack_price: string;
  pack_qty: string;
  min_stock: string;
  start_stock: string;
}

const EMPTY: ItemForm = { name: "", pack_price: "", pack_qty: "1", min_stock: "", start_stock: "" };

interface Props {
  open: boolean;
  initial?: Partial<ItemForm> | null;
  onClose: () => void;
  onSave: (f: ItemForm) => Promise<void>;
}

export default function ItemDialog({ open, initial, onClose, onSave }: Props) {
  const [f, setF] = useState<ItemForm>(EMPTY);
  const [saving, setSaving] = useState(false);
  const isNew = !initial?.id;

  useEffect(() => {
    if (open) setF({ ...EMPTY, ...(initial || {}) });
  }, [open, initial]);

  const price = Number(f.pack_price.replace(",", ".")) || 0;
  const qty = Math.max(Number(f.pack_qty) || 1, 1);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(f);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isNew ? "Новый препарат" : "Карточка препарата"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1.5">
            <Label>Название</Label>
            <Input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Лидокаин 20мг/2мл" autoFocus />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Цена за упаковку, ₽</Label>
              <Input inputMode="decimal" value={f.pack_price} onChange={(e) => setF({ ...f, pack_price: e.target.value })} placeholder="0" />
            </div>
            <div className="space-y-1.5">
              <Label>Ампул в упаковке</Label>
              <Input inputMode="numeric" value={f.pack_qty} onChange={(e) => setF({ ...f, pack_qty: e.target.value })} />
            </div>
          </div>
          <div className="rounded-lg bg-clinic-teal/10 px-3 py-2 text-sm text-slate-700">
            Цена 1 ампулы: <b className="text-clinic-teal">{rub(price / qty)}</b>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Держать на остатке, шт</Label>
              <Input inputMode="numeric" value={f.min_stock} onChange={(e) => setF({ ...f, min_stock: e.target.value })} placeholder="0" />
            </div>
            {isNew && (
              <div className="space-y-1.5">
                <Label>Остаток сейчас, шт</Label>
                <Input inputMode="numeric" value={f.start_stock} onChange={(e) => setF({ ...f, start_stock: e.target.value })} placeholder="0" />
              </div>
            )}
          </div>
          {isNew && <p className="text-xs text-slate-500">Дальше приход и расход вносятся в таблице по дням — остаток пересчитается сам.</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Отмена</Button>
            <Button type="submit" disabled={saving || !f.name.trim()}>{saving ? "Сохраняю..." : "Сохранить"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
