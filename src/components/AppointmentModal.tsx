import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface Props {
  open: boolean;
  onClose: () => void;
  service?: string;
}

export default function AppointmentModal({ open, onClose, service }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", comment: service || "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", phone: "", comment: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-clinic-text">
            Запись на приём
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-clinic-teal-light flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-clinic-teal" />
            </div>
            <h3 className="font-display text-xl mb-2 text-clinic-text">Заявка отправлена!</h3>
            <p className="text-sm text-clinic-text-muted">
              Мы перезвоним вам в течение 30 минут для подтверждения записи.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 bg-clinic-teal text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium text-clinic-text mb-1.5 block">Ваше имя *</label>
              <Input
                required
                placeholder="Иван Иванович"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-clinic-text mb-1.5 block">Телефон *</label>
              <Input
                required
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-clinic-text mb-1.5 block">Комментарий</label>
              <Textarea
                placeholder="Опишите вашу ситуацию или укажите желаемого врача..."
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={3}
              />
            </div>
            <p className="text-xs text-clinic-text-muted">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
            <button
              type="submit"
              className="w-full bg-clinic-teal text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Icon name="CalendarDays" size={16} />
              Записаться на приём
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
