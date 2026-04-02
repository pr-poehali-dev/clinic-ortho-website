import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089";

const promos = [
  {
    id: 1,
    accent: "20%",
    accentColor: "#2a7a6f",
    bg: "#f0faf8",
    border: "#2a7a6f",
    title: "Скидка на первичный приём",
    subtitle: "по пенсионному удостоверению",
    description: "Предъявите пенсионное удостоверение на приёме и получите скидку 20% на первичную консультацию врача травматолога-ортопеда.",
    icon: "UserCheck",
    promo: null,
  },
  {
    id: 2,
    accent: "25%",
    accentColor: "#e07a2f",
    bg: "#fdf6f0",
    border: "#e07a2f",
    title: "Скидка на курс PRP-терапии",
    subtitle: "1 инъекция в подарок из 4",
    description: "При оплате полного курса плазмотерапии суставов из 4 инъекций сразу — одна инъекция в подарок.",
    icon: "Syringe",
    promo: null,
  },
  {
    id: 3,
    accent: "400₽",
    accentColor: "#3a5fc8",
    bg: "#f0f4ff",
    border: "#3a5fc8",
    title: "Общий анализ крови",
    subtitle: "Исследования крови. Недорого.",
    description: "Большой спектр исследований крови и мочи — быстро, удобно, без очередей.",
    icon: "Droplets",
    promo: null,
  },
  {
    id: 4,
    accent: "25%",
    accentColor: "#2a7a6f",
    bg: "#f0faf8",
    border: "#2a7a6f",
    title: "Лечение артроза",
    subtitle: "Скидка на приём и плазму",
    description: "Скидка 25% на первичный приём врача и на процедуру PRP-плазмотерапии при лечении артроза суставов.",
    icon: "Bone",
    promo: "Ортопед Нск",
  },
  {
    id: 5,
    accent: "25%",
    accentColor: "#7c3aed",
    bg: "#f5f0ff",
    border: "#7c3aed",
    title: "Лечение грыж и протрузий",
    subtitle: "Скидка на приём невролога",
    description: "Скидка 25% на первичный приём при обращении с межпозвоночной грыжей или протрузией.",
    icon: "Brain",
    promo: "Ваш невролог",
  },
  {
    id: 6,
    accent: "10%",
    accentColor: "#b45309",
    bg: "#fffbeb",
    border: "#b45309",
    title: "Недорогой массаж",
    subtitle: "Скидка на курс из 10 процедур",
    description: "Скидка 10% на курс из 10 сеансов лечебного массажа при оплате сразу.",
    icon: "Hand",
    promo: "Ортомассаж",
  },
];

export default function Promos() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-clinic-teal py-4 px-4">
        <div className="container max-w-2xl mx-auto text-center text-white flex items-center justify-center gap-3">
          <Icon name="Tag" size={20} className="text-white/80" />
          <h1 className="text-2xl font-display font-bold">Акции и спецпредложения</h1>
        </div>
      </section>

      {/* Cards */}
      <section className="container max-w-3xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-3 mb-6">
        {promos.map((p) => (
          <div
            key={p.id}
            style={{ background: p.bg, borderLeft: `5px solid ${p.border}` }}
            className="rounded-xl px-5 py-4 shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ color: p.accentColor, fontSize: 38, fontWeight: 700, lineHeight: 1, flexShrink: 0 }}>
                {p.accent}
              </span>
              <div className="min-w-0">
                <div className="font-bold text-gray-900 text-sm leading-snug">{p.title}</div>
                {p.subtitle && <div className="text-xs text-gray-500 mt-0.5">{p.subtitle}</div>}
              </div>
            </div>
            <div className="text-xs text-gray-600 leading-relaxed mb-2">{p.description}</div>
            {p.promo && (
              <div className="inline-flex items-center gap-1.5 mt-auto pt-1 rounded-md px-2 py-1 self-start" style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${p.accentColor}` }}>
                <Icon name="Ticket" size={12} style={{ color: p.accentColor }} />
                <span className="text-xs font-semibold" style={{ color: p.accentColor }}>Промокод: «{p.promo}»</span>
              </div>
            )}
          </div>
        ))}
        </div>

        <p className="text-center text-lg font-bold mt-2" style={{ color: "#1a5248" }}>
          «Ваш ортопед» — пожалуй самые низкие цены в Новосибирске.
        </p>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-clinic-teal text-white text-base font-semibold px-6 py-3.5 rounded-xl hover:opacity-90 transition-all"
        >
          <Icon name="CalendarDays" size={18} />
          Записаться на приём
        </a>

        <Link to="/" className="text-center text-sm text-clinic-teal hover:underline">
          ← На главную
        </Link>
      </section>

    </div>
  );
}