import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const SPINE_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/64785386-331a-40d5-a0ef-de342448151e.png";

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089";

const SYMPTOMS = [
  { icon: "Zap", text: "Боль в шее, спине или пояснице" },
  { icon: "Wind", text: "Скованность движений по утрам" },
  { icon: "AlertCircle", text: "Онемение рук или ног" },
  { icon: "ArrowDownToLine", text: "Головные боли при шейном остеохондрозе" },
  { icon: "Move", text: "Боль при наклонах и поворотах" },
  { icon: "TrendingDown", text: "Слабость и быстрая утомляемость" },
];

const DEPARTMENTS = [
  { icon: "PersonStanding", title: "Шейный отдел", desc: "Боль в шее, затылке, головокружение, онемение рук — характерные проявления шейного остеохондроза." },
  { icon: "Activity", title: "Грудной отдел", desc: "Боль в спине и груди, ощущение сдавленности, межрёберные боли — признаки поражения грудного отдела." },
  { icon: "Footprints", title: "Поясничный отдел", desc: "Боль в пояснице, ишиас, онемение ног — наиболее распространённая форма остеохондроза." },
  { icon: "Layers", title: "Распространённый остеохондроз", desc: "Поражение нескольких отделов позвоночника одновременно — требует комплексного подхода к лечению." },
];

const METHODS = [
  {
    icon: "Syringe",
    title: "Медикаментозные блокады",
    desc: "Введение анестетика и противовоспалительного препарата в паравертебральную зону. Устраняет боль уже через 15–30 минут. Снимает мышечный спазм и корешковый синдром.",
    badge: "Быстрый эффект",
    price: "от 2 500 ₽",
  },
  {
    icon: "Droplets",
    title: "PRP-терапия (плазмотерапия)",
    desc: "Из крови пациента выделяется плазма, богатая тромбоцитами, и вводится в поражённые ткани позвоночника. Стимулирует восстановление межпозвонковых дисков, снимает хроническое воспаление.",
    badge: "Популярно",
    price: "4 000 ₽ / процедура",
  },
  {
    icon: "FlaskConical",
    title: "Хондропротекторы паравертебрально",
    desc: "Введение хондропротектора в околопозвоночные ткани после курса PRP. Питает хрящевую ткань дисков изнутри, закрепляет и продлевает результат терапии.",
    badge: null,
    price: "от 3 000 ₽",
  },
  {
    icon: "Layers",
    title: "Комплексный курс лечения",
    desc: "Трёхэтапный протокол: блокада → PRP-терапия → хондропротектор. Каждый этап усиливает эффект предыдущего. Устойчивый результат на 1–2 года.",
    badge: "Рекомендуем",
    price: "по плану лечения",
  },
];

const RESULTS = [
  { value: "15 мин", label: "до снятия острой боли после блокады" },
  { value: "3–5", label: "процедур в курсе PRP-терапии" },
  { value: "1–2 года", label: "сохраняется результат после курса" },
  { value: "без операции", label: "лечим шейный, грудной и поясничный отдел" },
];

const FAQ_ITEMS = [
  {
    q: "Сколько времени занимает полный курс лечения?",
    a: "Полный курс составляет 4–8 недель. Блокады — 1–2 процедуры, курс PRP — 3–5 сеансов, хондропротектор — 1–2 инъекции. Конкретный план составляется индивидуально на первичном приёме.",
  },
  {
    q: "Больно ли делать инъекции в позвоночник?",
    a: "Все процедуры выполняются с местной анестезией. Большинство пациентов описывают ощущения как минимально дискомфортные. Используются тонкие иглы, врач контролирует введение.",
  },
  {
    q: "При каком остеохондрозе помогает лечение?",
    a: "Методика эффективна при шейном, грудном и поясничном остеохондрозе, грыжах и протрузиях дисков, корешковом синдроме (ишиасе). Лечим как начальные, так и запущенные стадии.",
  },
  {
    q: "Как долго сохраняется результат?",
    a: "При соблюдении рекомендаций врача результат сохраняется от 6 месяцев до 1,5–2 лет. Для поддержания рекомендуется профилактический курс раз в год.",
  },
  {
    q: "Нужны ли снимки МРТ перед лечением?",
    a: "МРТ помогает точно определить уровень поражения и подобрать оптимальный метод. Если снимков нет — не страшно, врач проведёт осмотр и при необходимости направит на диагностику.",
  },
  {
    q: "Чем ваш подход отличается от обычной физиотерапии?",
    a: "Физиотерапия снимает симптомы, но не восстанавливает ткань. PRP-терапия и хондропротекторы воздействуют непосредственно на межпозвонковые диски, стимулируя их регенерацию — это принципиально иной уровень лечения.",
  },
];

export default function OsteohondrozService() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Лечение остеохондроза в Новосибирске — PRP, блокады, хондропротекторы | Ваш Ортопед"
        description="Лечение остеохондроза шейного, грудного и поясничного отдела без операции. PRP-терапия, паравертебральные блокады, хондропротекторы. Клиника «Ваш Ортопед», Новосибирск."
        canonical="/services/osteohondroz"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Специализация", url: "/services" },
          { name: "Лечение остеохондроза", url: "/services/osteohondroz" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-clinic-warm min-h-[440px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={SPINE_IMG}
            alt="Лечение остеохондроза"
            className="w-full h-full object-cover object-center opacity-25"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
        </div>
        <div className="container relative z-10 py-16">
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center gap-1 text-clinic-text-muted text-sm mb-6 hover:text-clinic-teal transition-colors">
              <Icon name="ChevronLeft" size={14} />
              На главную
            </Link>
            <div className="inline-flex items-center gap-2 bg-clinic-teal-light text-clinic-teal text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Icon name="Activity" size={12} />
              Специализация клиники
            </div>
            <h1 className="text-4xl md:text-5xl font-light leading-[1.15] text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Лечение <span className="text-clinic-teal italic">остеохондроза</span>
            </h1>
            <p className="text-clinic-text-muted text-base leading-relaxed mb-6">
              Остеохондроз — дегенеративное заболевание позвоночника, при котором разрушаются межпозвонковые диски. Боль, скованность, онемение конечностей. Лечим без операции: блокады, PRP-терапия, хондропротекторы.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarDays" size={16} />
                Записаться на приём
              </a>
              <button
                onClick={() => setCallModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-6 py-3.5 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
              >
                <Icon name="Phone" size={16} />
                Заказать звонок
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-3">
            Симптомы остеохондроза
          </h2>
          <p className="text-clinic-text-muted text-center mb-8 max-w-xl mx-auto">
            Если вы замечаете хотя бы несколько из этих признаков — не откладывайте визит к врачу
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SYMPTOMS.map((s) => (
              <div key={s.text} className="flex items-center gap-3 bg-clinic-warm rounded-xl px-4 py-3 border border-border">
                <div className="w-8 h-8 rounded-lg bg-clinic-teal-light flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon} size={16} className="text-clinic-teal" />
                </div>
                <span className="text-sm text-clinic-text">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-secondary py-12">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-3">
            Какой остеохондроз мы лечим
          </h2>
          <p className="text-clinic-text-muted text-center mb-8 max-w-xl mx-auto">
            Специализируемся на всех отделах позвоночника
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {DEPARTMENTS.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-clinic-teal flex items-center justify-center mb-4">
                  <Icon name={d.icon} size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-clinic-text text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-clinic-text-muted leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-3">
            Методы лечения остеохондроза
          </h2>
          <p className="text-clinic-text-muted text-center mb-8 max-w-xl mx-auto">
            Без операций и длительной реабилитации — только доказательные методы
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {METHODS.map((m) => (
              <div key={m.title} className="bg-clinic-warm rounded-2xl p-6 border border-border relative">
                {m.badge && (
                  <span className="absolute top-4 right-4 bg-clinic-teal text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {m.badge}
                  </span>
                )}
                <div className="w-11 h-11 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-4">
                  <Icon name={m.icon} size={20} className="text-clinic-teal" />
                </div>
                <h3 className="font-semibold text-clinic-text text-lg mb-2 pr-20">{m.title}</h3>
                <p className="text-sm text-clinic-text-muted leading-relaxed mb-3">{m.desc}</p>
                <span className="text-clinic-teal font-semibold text-sm">{m.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-clinic-teal py-12">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl text-white text-center mb-8">
            Результаты лечения в цифрах
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {RESULTS.map((r) => (
              <div key={r.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display text-white mb-2">{r.value}</div>
                <div className="text-white/70 text-sm leading-snug">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-8">
            Почему выбирают нашу клинику
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "Microscope", title: "Современные методы", desc: "PRP-терапия и паравертебральные инъекции — доказательная медицина без операций" },
              { icon: "Clock", title: "Быстрый результат", desc: "Первое облегчение боли уже после первой блокады. Устойчивый эффект после полного курса" },
              { icon: "MapPin", title: "Удобно в Новосибирске", desc: "Клиника на ул. Есенина, 67. Запись онлайн или по телефону, ежедневный приём" },
            ].map((item) => (
              <div key={item.title} className="bg-clinic-warm rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                  <Icon name={item.icon} size={20} className="text-clinic-teal" />
                </div>
                <h3 className="font-semibold text-clinic-text mb-1">{item.title}</h3>
                <p className="text-sm text-clinic-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-12">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-8">
            Часто задаваемые вопросы
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4"
                >
                  <span className="font-semibold text-clinic-text text-sm">{item.q}</span>
                  <Icon name={openFaq === idx ? "ChevronUp" : "ChevronDown"} size={16} className="text-clinic-teal flex-shrink-0" />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-clinic-text-muted leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-clinic-teal py-12">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
            Запишитесь на консультацию
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Врач проведёт осмотр, изучит снимки МРТ и составит индивидуальный план лечения. Не откладывайте — чем раньше начато лечение, тем лучше результат.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-clinic-teal px-6 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow-md"
            >
              <Icon name="CalendarDays" size={16} />
              Записаться онлайн
            </a>
            <button
              onClick={() => setCallModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 border border-white text-white px-6 py-3.5 rounded-xl font-medium text-sm hover:bg-white/10 transition-all"
            >
              <Icon name="Phone" size={16} />
              Заказать звонок
            </button>
          </div>
        </div>
      </section>

      <PhoneModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />
    </>
  );
}
