import Icon from "@/components/ui/icon";

interface PhoneModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PhoneModal({ open, onClose }: PhoneModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-clinic-teal-light flex items-center justify-center mx-auto mb-4">
          <Icon name="Phone" size={26} className="text-clinic-teal" />
        </div>
        <p className="text-xs text-clinic-text-muted uppercase tracking-widest mb-1">
          Клиника «Ваш Ортопед»
        </p>
        <a
          href="tel:+79994649194"
          className="block font-display text-2xl text-clinic-teal mb-1 hover:opacity-80 transition-opacity"
        >
          +7 999 464 91 94
        </a>
        <p className="text-sm text-clinic-text-muted mb-6">
          Мы рады Вас проконсультировать!
        </p>
        <button
          onClick={onClose}
          className="w-full border border-border text-clinic-text-muted py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}
