import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promo_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    sessionStorage.setItem("promo_dismissed", "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
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
            onClick={close}
            className="block w-full bg-clinic-teal text-white py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-dark transition-all mb-3"
          >
            Записаться со скидкой
          </a>
          <button
            onClick={close}
            className="text-xs text-clinic-text-muted hover:text-clinic-text transition-colors"
          >
            Закрыть
          </button>
        </div>

        <button
          onClick={close}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
}
