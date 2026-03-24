import Icon from "@/components/ui/icon";

export function Toast({ message, type }: { message: string; type: "ok" | "err" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${type === "ok" ? "bg-clinic-teal text-white" : "bg-red-500 text-white"}`}>
      <Icon name={type === "ok" ? "CheckCircle" : "AlertCircle"} size={16} />
      {message}
    </div>
  );
}

export function SectionHeader({ title, icon, action }: { title: string; icon: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <Icon name={icon} size={22} className="text-clinic-teal" />
        <h2 className="font-display text-3xl text-clinic-text">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function SaveBtn({ saving, saved, onClick }: { saving: boolean; saved: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 bg-clinic-teal text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-all disabled:opacity-60"
    >
      <Icon name={saved ? "CheckCircle" : "Save"} size={15} />
      {saving ? "Сохраняем..." : saved ? "Сохранено!" : "Сохранить"}
    </button>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-clinic-text mb-1.5 block">{children}</label>;
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-20 text-clinic-text-muted text-sm gap-3">
      <svg className="animate-spin h-5 w-5 text-clinic-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      Загрузка...
    </div>
  );
}
