import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function PromoPopup() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className="bg-clinic-teal px-6 pt-6 pb-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
            <Icon name="Tag" size={28} className="text-white" />
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">Специальное предложение</div>
          <div className="text-5xl font-bold font-display leading-none mb-1">20%</div>
          <div className="text-lg font-medium">скидка на первичный приём</div>
        </div>

        <div className="px-6 py-5 text-center">
          <p className="text-clinic-text text-sm leading-relaxed mb-5">
            При предъявлении <span className="font-semibold text-clinic-teal">пенсионного удостоверения</span> вы получаете скидку 20% на первичную консультацию врача травматолога-ортопеда.
          </p>
          <a
            href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block w-full bg-clinic-teal text-white py-3 rounded-xl font-medium text-sm mb-3"
          >
            Записаться со скидкой
          </a>
          <button
            onClick={() => setOpen(false)}
            className="text-xs text-clinic-text-muted hover:text-clinic-text transition-colors"
          >
            Закрыть
          </button>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
}
