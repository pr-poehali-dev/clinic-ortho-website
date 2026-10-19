import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { ROLE_LABEL, Session } from "./api";

interface Props {
  session: Session;
  minutesLeft: number;
  onLogout: () => void;
  current: "table" | "access";
}

export default function DdsHeader({ session, minutesLeft, onLogout, current }: Props) {
  const h = Math.floor(minutesLeft / 60);
  const m = minutesLeft % 60;
  return (
    <header className="bg-white border-b px-3 sm:px-5 py-2.5 flex items-center gap-2 sm:gap-4 flex-wrap">
      <div className="flex items-center gap-2 mr-auto">
        <Icon name="Wallet" size={20} className="text-clinic-teal" />
        <span className="font-semibold text-slate-900">ДДС клиники</span>
      </div>
      {session.role === "owner" && (
        <nav className="flex gap-1">
          <Button asChild size="sm" variant={current === "table" ? "default" : "ghost"}>
            <Link to="/dds">Таблица</Link>
          </Button>
          <Button asChild size="sm" variant={current === "access" ? "default" : "ghost"}>
            <Link to="/dds/access">Доступы</Link>
          </Button>
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
