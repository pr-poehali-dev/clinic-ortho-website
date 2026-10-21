import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { ROLE_LABEL, Session, medView } from "./api";

type Tab = "table" | "access" | "med" | "med_order";

interface Props {
  session: Session;
  minutesLeft: number;
  onLogout: () => void;
  current: Tab;
}

export default function DdsHeader({ session, minutesLeft, onLogout, current }: Props) {
  const h = Math.floor(minutesLeft / 60);
  const m = minutesLeft % 60;
  const owner = session.role === "owner";
  const tabs: { key: Tab; to: string; label: string; icon: string; show: boolean }[] = [
    { key: "table", to: "/dds", label: "ДДС", icon: "Wallet", show: true },
    { key: "med", to: "/dds/med", label: "Медрасходка", icon: "Pill", show: medView(session) },
    { key: "med_order", to: "/dds/med-order", label: "Заказ", icon: "ShoppingCart", show: medView(session) },
    { key: "access", to: "/dds/access", label: "Доступы", icon: "Users", show: owner },
  ];
  const visible = tabs.filter((t) => t.show);

  return (
    <header className="bg-white border-b px-3 sm:px-5 py-2.5 flex items-center gap-2 sm:gap-4 flex-wrap">
      <div className="flex items-center gap-2 mr-auto">
        <Icon name="Building2" size={20} className="text-clinic-teal" />
        <span className="font-semibold text-slate-900">Учёт клиники</span>
      </div>
      {visible.length > 1 && (
        <nav className="flex gap-1 order-last w-full sm:order-none sm:w-auto overflow-x-auto">
          {visible.map((t) => (
            <Button key={t.key} asChild size="sm" variant={current === t.key ? "default" : "ghost"} className="shrink-0">
              <Link to={t.to}>
                <Icon name={t.icon} size={15} className="mr-1.5" />
                {t.label}
              </Link>
            </Button>
          ))}
        </nav>
      )}
      <div className="text-xs text-slate-500 text-right leading-tight">
        <div className="text-slate-800 font-medium">{session.name}</div>
        <div>
          {ROLE_LABEL[session.role]} · выход через {h > 0 ? `${h} ч ` : ""}
          {m} мин
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={onLogout}>
        <Icon name="LogOut" size={16} />
        <span className="hidden sm:inline ml-1">Выйти</span>
      </Button>
    </header>
  );
}
