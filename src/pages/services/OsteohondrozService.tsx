import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=osteohondroz";

const SYMPTOMS = [
  { icon: "Zap", text: "Боль в шее, спине или пояснице" },
  { icon: "Wind", text: "Скованность движений по утрам" },
  { icon: "AlertCircle", text: "Онемение рук или ног" },
  { icon: "ArrowDownToLine", text: "Головные боли и головокружение" },
  { icon: "Move", text: "Боль при наклонах и поворотах" },
  { icon: "TrendingDown", text: "Слабость и быстрая утомляемость" },
];

const DEPARTMENTS = [
  { icon: "PersonStanding", title: "Шейный отдел", desc: "Боль в шее, затылке, головокружение, онемение рук — характерные проявления шейного остеохондроза." },
  { icon: "Activity", title: "Грудной отдел", desc: "Боль в спине и груди, ощущение сдавленности, межрёберные боли — признаки поражения грудного отдела." },
  { icon: "Footprints", title: "Поясничный отдел", desc: "Боль в пояснице, ишиас, онемение ног — наиболее распространённая форма остеохондроза." },
  { icon: "Layers", title: "Распространённый остеохондроз", desc: "Поражение нескольких отделов позвоночника — требует комплексного подхода к лечению." },
];

const METHODS = [
  {
    icon: "Syringe",
    title: "Медикаментозные блокады",
    desc: "Введение анестетика и противовоспалительного препарата в паравертебральную зону. Снимает острую боль, мышечный спазм и корешковый синдром уже через 15–30 минут после процедуры.",
    badge: "Быстрый эффект",
    price: "от 2 500 ₽",
  },
  {
    icon: "Droplets",
    title: "PRP-терапия (плазмотерапия)",
    desc: "Из крови пациента выделяется плазма, богатая тромбоцитами, и вводится в поражённые ткани позвоночника. Стимулирует восстановление межпозвонковых дисков, снимает хроническое воспаление. Курс: 3–5 процедур.",
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
    desc: "Трёхэтапный протокол: блокада → PRP-терапия → хондропротектор. Каждый этап усиливает эффект предыдущего. Устойчивый результат, который сохраняется 1–2 года.",
    badge: "Рекомендуем",
    price: "по плану лечения",
  },
];

const STAGES = [
  {
    num: "I",
    title: "Начальная стадия",
    desc: "Периодические боли после нагрузки, лёгкая скованность. Диски истончаются незначительно.",
    color: "bg-clinic-teal-light text-clinic-teal",
    result: "Отличный прогноз. Лечение позволяет полностью остановить прогрессирование.",
  },
  {
    num: "II",
    title: "Умеренная стадия",
    desc: "Боль усиливается, появляется онемение, подвижность ограничена. Видны изменения на МРТ.",
    color: "bg-amber-50 text-amber-700",
    result: "Хороший прогноз. PRP-терапия и блокады дают устойчивый результат.",
  },
  {
    num: "III",
    title: "Выраженная стадия",
    desc: "Боль постоянная, выраженное онемение, протрузии или грыжи дисков.",
    color: "bg-orange-50 text-orange-700",
    result: "Лечение облегчает боль и улучшает качество жизни. Во многих случаях позволяет избежать операции.",
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
        description="Лечение остеохондроза шейного, грудного и поясничного отдела без операции. Паравертебральные блокады от 2500₽, PRP-терапия от 4000₽. Первичный приём невролога — 2500₽. Запись онлайн."
        keywords="лечение остеохондроза Новосибирск, остеохондроз шейного отдела лечение, поясничный остеохондроз, PRP терапия позвоночник, паравертебральные блокады, хондропротекторы, невролог Новосибирск, лечение грыжи диска, протрузия лечение, корешковый синдром лечение"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/64785386-331a-40d5-a0ef-de342448151e.png"
            alt="Лечение остеохондроза в Новосибирске"
            className="w-3/5 object-cover opacity-40 absolute right-0 hidden sm:block"
            style={{ filter: "brightness(1.15) saturate(0.85)", top: "-60px", height: "calc(100% + 120px)", objectPosition: "50% 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-clinic-warm via-clinic-warm/90 to-clinic-warm/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-clinic-warm" />
        </div>
        <div className="container relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="inline-flex items-center gap-2 bg-clinic-teal-light text-clinic-teal text-xs font-medium px-3 py-1.5 rounded-full">
                <Icon name="MapPin" size={13} />
                Новосибирск · Лечение позвоночника
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
                <Icon name="BadgePercent" size={13} />
                Пожалуй самые низкие цены на лечение
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-light leading-[1.15] text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Лечение <span className="text-clinic-teal italic">остеохондроза</span><br />в Новосибирске без операции
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Лечим остеохондроз шейного, грудного и поясничного отдела современными методами: PRP-терапия, паравертебральные блокады, хондропротекторы. Снимаем боль и восстанавливаем подвижность позвоночника.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_osteohondroz_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarDays" size={16} />
                Записаться на приём
              </a>
              <button
                onClick={() => setCallModalOpen(true)}
                className="hidden sm:flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
              >
                <Icon name="Phone" size={16} />
                Позвонить
              </button>
              <a
                href="tel:+79994649194"
                className="sm:hidden flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
              >
                <Icon name="Phone" size={16} />
                Позвонить
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
                  <Icon name="Tag" size={18} className="text-amber-700" />
                </div>
                <div>
                  <span className="text-base font-bold text-clinic-text block">Первичный приём невролога в Новосибирске — 2 500 ₽</span>
                  <span className="text-sm text-amber-700 font-medium">Запись сегодня · без очереди</span>
                </div>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_osteohondroz_promo')}
                className="sm:ml-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap"
              >
                <Icon name="CalendarDays" size={15} />
                Записаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* СИМПТОМЫ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Симптомы остеохондроза
          </h2>
          <p className="text-clinic-text-muted mb-8">Обратитесь к врачу, если замечаете хотя бы один из признаков</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SYMPTOMS.map((s) => (
              <div key={s.text} className="flex items-center gap-3 bg-clinic-warm border border-clinic-beige-dark/40 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name={s.icon as "Zap"} size={15} className="text-clinic-teal" />
                </div>
                <span className="text-sm text-clinic-text">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОТДЕЛЫ ПОЗВОНОЧНИКА */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Какой остеохондроз мы лечим
          </h2>
          <p className="text-clinic-text-muted mb-8">Остеохондроз может поражать любой отдел позвоночника — мы специализируемся на всех формах</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DEPARTMENTS.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-5 border border-clinic-beige-dark/30 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name={d.icon as "PersonStanding"} size={20} className="text-clinic-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-text mb-1">{d.title}</h3>
                  <p className="text-sm text-clinic-text-muted leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* МЕТОДЫ ЛЕЧЕНИЯ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Методы лечения остеохондроза
          </h2>
          <p className="text-clinic-text-muted mb-8">Применяем только доказательные методы с подтверждённой эффективностью</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {METHODS.map((m) => (
              <div key={m.title} className="rounded-2xl border border-clinic-beige-dark/40 p-5 relative bg-clinic-warm">
                {m.badge && (
                  <span className="absolute top-4 right-4 text-xs bg-clinic-teal text-white px-2.5 py-0.5 rounded-full font-medium">
                    {m.badge}
                  </span>
                )}
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-white border border-clinic-beige-dark/40 flex items-center justify-center shrink-0">
                    <Icon name={m.icon as "Syringe"} size={20} className="text-clinic-teal" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-clinic-text mb-2">{m.title}</h3>
                    <p className="text-sm text-clinic-text-muted leading-relaxed mb-3">{m.desc}</p>
                    <div className="inline-flex items-center gap-1.5 bg-white border border-clinic-teal/30 rounded-lg px-3 py-1.5">
                      <Icon name="Banknote" size={13} className="text-clinic-teal shrink-0" />
                      <span className="text-sm font-semibold text-clinic-teal">{m.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СТАДИИ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Стадии остеохондроза и прогноз
          </h2>
          <p className="text-clinic-text-muted mb-8">Чем раньше начать лечение, тем лучше результат — но мы беремся за все стадии</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STAGES.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-5 border border-clinic-beige-dark/30">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-lg mb-3 ${s.color}`}>
                  {s.num}
                </div>
                <h3 className="font-semibold text-clinic-text mb-2">{s.title}</h3>
                <p className="text-sm text-clinic-text-muted mb-3 leading-relaxed">{s.desc}</p>
                <div className="flex items-start gap-2 bg-clinic-teal-light rounded-lg px-3 py-2">
                  <Icon name="CheckCircle" size={14} className="text-clinic-teal mt-0.5 shrink-0" />
                  <p className="text-xs text-clinic-teal font-medium leading-relaxed">{s.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* РЕЗУЛЬТАТЫ */}
      <section className="py-12 bg-clinic-teal">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Результаты лечения в цифрах
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {RESULTS.map((r) => (
              <div key={r.label} className="text-center bg-white/10 rounded-2xl p-4">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{r.value}</div>
                <div className="text-xs text-white/75 leading-relaxed">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК ПРОХОДИТ ЛЕЧЕНИЕ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Как проходит лечение
          </h2>
          <p className="text-clinic-text-muted mb-8">Прозрачный процесс — от записи до результата</p>
          <div className="flex flex-col gap-0">
            {[
              { step: "01", title: "Запись и первичный приём", desc: "Консультация невролога + осмотр. При необходимости направляем на МРТ. Ставим точный диагноз, определяем стадию. Стоимость приёма — 2 500 ₽." },
              { step: "02", title: "План лечения", desc: "Врач составляет индивидуальный план с учётом стадии, образа жизни и бюджета. Объясняем каждый шаг — без навязывания лишнего." },
              { step: "03", title: "Проведение процедур", desc: "Блокады, PRP-терапия, хондропротекторы — всё делаем в клинике. Каждая процедура занимает 20–40 минут." },
              { step: "04", title: "Контроль и поддержка", desc: "Отслеживаем динамику, корректируем лечение. Доступны по телефону и в мессенджерах между приёмами." },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-clinic-teal text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  {i < arr.length - 1 && <div className="w-0.5 bg-clinic-teal/20 flex-1 my-1" />}
                </div>
                <div className="pb-6">
                  <h3 className="font-semibold text-clinic-text mb-1">{item.title}</h3>
                  <p className="text-sm text-clinic-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-clinic-warm border-y border-clinic-beige-dark/30">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Запишитесь на первичный приём
          </h2>
          <p className="text-clinic-text-muted mb-6 max-w-md mx-auto">
            Консультация невролога — 2 500 ₽. Приём сегодня, без очереди.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_osteohondroz_zapis_cta')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow"
            >
              <Icon name="CalendarDays" size={16} />
              Записаться онлайн
            </a>
            <button
              onClick={() => setCallModalOpen(true)}
              className="hidden sm:flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
            >
              <Icon name="Phone" size={16} />
              Позвонить нам
            </button>
            <a
              href="tel:+79994649194"
              className="sm:hidden flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
            >
              <Icon name="Phone" size={16} />
              Позвонить нам
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Частые вопросы об остеохондрозе
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="border border-clinic-beige-dark/40 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between gap-3 px-4 py-4 bg-clinic-warm hover:bg-clinic-teal-light transition-colors"
                >
                  <span className="font-medium text-clinic-text text-sm leading-snug">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-clinic-teal shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-4 py-3 bg-white text-sm text-clinic-text-muted leading-relaxed border-t border-clinic-beige-dark/30">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ссылки на другие услуги */}
      <section className="py-10 bg-clinic-warm border-t border-clinic-beige-dark/30">
        <div className="container">
          <p className="text-sm text-clinic-text-muted mb-4">Другие направления клиники:</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/services/orthopedics-clinic" className="text-sm text-clinic-teal border border-clinic-teal/40 px-4 py-2 rounded-lg hover:bg-clinic-teal-light transition-colors">
              Ортопедия и травматология
            </Link>
            <Link to="/services/neurology-clinic" className="text-sm text-clinic-teal border border-clinic-teal/40 px-4 py-2 rounded-lg hover:bg-clinic-teal-light transition-colors">
              Неврология
            </Link>
            <Link to="/diseases/artroz" className="text-sm text-clinic-teal border border-clinic-teal/40 px-4 py-2 rounded-lg hover:bg-clinic-teal-light transition-colors">
              Лечение артроза
            </Link>
            <Link to="/prices" className="text-sm text-clinic-teal border border-clinic-teal/40 px-4 py-2 rounded-lg hover:bg-clinic-teal-light transition-colors">
              Цены
            </Link>
          </div>
        </div>
      </section>

      <PhoneModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />
    </>
  );
}
