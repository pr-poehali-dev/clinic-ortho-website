import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

declare global {
  interface Window { ym: (id: number, action: string, goal: string) => void; }
}
const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/doctors", label: "Наши врачи" },
  { href: "/services", label: "Услуги" },
  { href: "/prices", label: "Цены" },
  { href: "/contacts", label: "Контакты" },
  { href: "/publications", label: "Публикации" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-white border-b border-border text-clinic-text-muted text-sm py-2">
        <div className="container flex items-center justify-between">
          <span className="hidden sm:flex items-center gap-2">
            <Icon name="Clock" size={14} />
            Пн–Сб: 09:00–19:00
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <a href="https://t.me/+79994649194" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-clinic-teal transition-colors">
              <Icon name="Send" size={14} />
              <span className="hidden md:inline">Написать в Telegram</span>
              <span className="md:hidden">Telegram</span>
            </a>
            <a href="https://max.ru/u/f9LHodD0cOIXwBPcc19ip2Oq2Y7a4MK8MaQsGM3O_elnk0ZNNUZ6QtXdNJg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-clinic-teal transition-colors">
              <Icon name="MessageCircle" size={14} />
              <span className="hidden md:inline">Написать в Max</span>
              <span className="md:hidden">Max</span>
            </a>
            <a href="tel:+79994649194" className="flex items-center gap-1.5 font-medium text-clinic-teal hover:underline transition-colors">
              <Icon name="Phone" size={14} />
              <span className="hidden sm:inline">+7 999 464 91 94</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <img
              src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/be83b83d-194a-4c69-a655-e21e8ea68f8d.png"
              alt="Ваш Ортопед"
              className="h-12 w-auto object-contain"
            />
            <span className="text-[10px] font-body tracking-[0.22em] uppercase leading-none mt-0.5 pl-0.5 whitespace-nowrap text-clinic-text-muted">Клиника ортопедии и травматологии</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`nav-link text-sm font-body font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-clinic-teal active"
                    : "text-clinic-text hover:text-clinic-teal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <a
              href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_zapis')}
              className="hidden md:inline-flex items-center gap-2 bg-clinic-teal text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
            >
              <Icon name="CalendarDays" size={15} />
              Записаться
            </a>
            <button
              className="md:hidden p-2 text-clinic-text"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-white animate-fade-in">
            <nav className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "bg-clinic-teal-light text-clinic-teal"
                      : "text-clinic-text hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { setMenuOpen(false); trackGoal('click_zapis'); }}
                className="mt-2 flex items-center justify-center gap-2 bg-clinic-teal text-white text-sm font-medium px-4 py-2.5 rounded-lg"
              >
                <Icon name="CalendarDays" size={15} />
                Записаться на приём
              </a>
              <div className="flex gap-2 mt-1">
                <a
                  href="https://t.me/+79994649194"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal text-sm font-medium px-3 py-2.5 rounded-lg"
                >
                  <Icon name="Send" size={15} />
                  Telegram
                </a>
                <a
                  href="https://max.ru/u/f9LHodD0cOIXwBPcc19ip2Oq2Y7a4MK8MaQsGM3O_elnk0ZNNUZ6QtXdNJg"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal text-sm font-medium px-3 py-2.5 rounded-lg"
                >
                  <Icon name="MessageCircle" size={15} />
                  Max
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-clinic-text text-white mt-8">
        <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/3e87c830-678c-485d-b730-8467068e3086.png"
                alt="Ваш Ортопед"
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-xl text-white">Ваш Ортопед</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Клиника ортопедии и травматологии. Помогаем жить без боли с 2005 года.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-white">Разделы</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 text-white">Контакты</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={14} className="text-clinic-teal shrink-0" />
                <a href="tel:+79994649194" className="hover:text-white transition-colors">+7 999 464 91 94</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Clock" size={14} className="text-clinic-teal shrink-0" />
                Пн–Сб: 09:00–19:00
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={14} className="text-clinic-teal shrink-0 mt-0.5" />
                г. Новосибирск, ул. Есенина, д. 67
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container py-4 text-center text-xs text-white/30">
            © 2024 ОртоМед. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}