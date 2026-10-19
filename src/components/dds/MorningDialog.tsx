import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DayRow, ddsRequest, fmtDate } from "./api";

interface Props {
  day: DayRow | null;
  isStart: boolean;
  onClose: () => void;
  onChanged: () => void;
  onError: (e: unknown) => void;
}

export default function MorningDialog({ day, isStart, onClose, onChanged, onError }: Props) {
  const [check, setCheck] = useState("");
  const [cash, setCash] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (day) {
      setCheck(String(day.morning_check));
      setCash(String(day.morning_cash));
    }
  }, [day]);

  if (!day) return null;

  const submit = async (reset = false) => {
    setSaving(true);
    try {
      await ddsRequest("POST", { action: "morning" }, { op_date: day.date, cash_check: check, cash, reset });
      toast.success(reset ? "Остаток снова считается автоматически" : "Остаток на утро сохранён");
      onChanged();
      onClose();
    } catch (e) {
      onError(e);
    } finally {
      setSaving(false);
    }
  };

  const clean = (v: string) => v.replace(/[^\d.,-]/g, "");

  return (
    <Dialog open={!!day} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Остаток на утро · {fmtDate(day.date)}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-slate-500">
          {isStart
            ? "Начальный остаток кассы на старт учёта."
            : "Обычно переносится с вечера прошлого дня. Ручное значение нужно только для выравнивания кассы."}
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Нал с чеком, ₽</Label>
            <Input inputMode="decimal" value={check} onChange={(e) => setCheck(clean(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label>Нал, ₽</Label>
            <Input inputMode="decimal" value={cash} onChange={(e) => setCash(clean(e.target.value))} />
          </div>
          <Button className="w-full" onClick={() => submit(false)} disabled={saving}>
            Сохранить
          </Button>
          {day.morning_manual && !isStart && (
            <Button className="w-full" variant="outline" onClick={() => submit(true)} disabled={saving}>
              Вернуть перенос с вечера
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
