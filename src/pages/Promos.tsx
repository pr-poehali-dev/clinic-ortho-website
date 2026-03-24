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
    description:
      "Предъявите пенсионное удостоверение на приёме и получите скидку 20% на первичную консультацию врача травматолога-ортопеда.",
    icon: "UserCheck",
  },
  {
    id: 2,
    accent: "25%",
    accentColor: "#e07a2f",
    bg: "#fdf6f0",
    border: "#e07a2f",
    title: "Скидка на курс PRP-терапии",
    subtitle: "1 инъекция в подарок из 4",
    description:
      "При оплате полного курса плазмотерапии суставов из 4 инъекций сразу — одна инъекция в подарок.",
    icon: "Syringe",
  },
  {
    id: 3,
    accent: "400₽",
    accentColor: "#3a5fc8",
    bg: "#f0f4ff",
    border: "#3a5fc8",
    title: "Общий анализ крови",
    subtitle: null,
    description:
      "Большой спектр исследований крови и мочи — быстро, удобно, без очередей.",
    footer: "Исследования крови. Недорого.",
    icon: "Droplets",
  },
];

export default function Promos() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-clinic-teal py-4 px-4">
        <div className="container max-w-2xl mx-auto text-center text-white flex items-center justify-center gap-3">
          <Icon name="Tag" size={20} className="text-white/80" />
          <h1 className="text-xl font-display font-bold">Акции и спецпредложения</h1>
        </div>
      </section>

      {/* Cards */}
      <section className="container max-w-2xl mx-auto px-4 py-10 flex flex-col gap-5">
        {promos.map((p) => (
          <div
            key={p.id}
            style={{ background: p.bg, borderLeft: `5px solid ${p.border}` }}
            className="rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-3">
              <span
                style={{ color: p.accentColor, fontSize: 42, fontWeight: 700, lineHeight: 1 }}
              >
                {p.accent}
              </span>
              <div>
                <div className="text-base font-bold text-gray-900">{p.title}</div>
                {p.subtitle && (
                  <div className="text-sm text-gray-500 mt-0.5">{p.subtitle}</div>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{p.description}</p>
            {p.footer && (
              <div className="text-sm font-bold text-gray-900">— {p.footer}</div>
            )}
          </div>
        ))}

        <p
          className="text-center text-lg font-bold mt-2"
          style={{ color: "#1a5248" }}
        >
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

        <Link
          to="/"
          className="text-center text-sm text-clinic-teal hover:underline"
        >
          ← На главную
        </Link>
      </section>
    </div>
  );
}