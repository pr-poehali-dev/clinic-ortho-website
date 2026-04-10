import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";


const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=artroz";

const SYMPTOMS = [
  { icon: "Zap", text: "Боль при движении и в покое" },
  { icon: "Wind", text: "Скованность по утрам" },
  { icon: "Volume2", text: "Хруст и щелчки в суставе" },
  { icon: "ArrowDownToLine", text: "Отёк и припухлость сустава" },
  { icon: "Move", text: "Ограничение подвижности" },
  { icon: "TrendingDown", text: "Деформация сустава" },
];

const JOINTS = [
  { icon: "Footprints", title: "Артроз коленного сустава", desc: "Гонартроз — наиболее частая форма. Боль при ходьбе, спуске по лестнице, отёк колена." },
  { icon: "PersonStanding", title: "Артроз тазобедренного сустава", desc: "Коксартроз — боль в паху, бедре, ограничение при ходьбе, хромота." },
  { icon: "Hand", title: "Артроз плечевого сустава", desc: "Боль при подъёме руки, ограничение вращения, хруст в плечевом суставе." },
  { icon: "Fingerprint", title: "Артроз мелких суставов", desc: "Поражение суставов кистей, стоп — боль, деформация пальцев, затруднение мелкой моторики." },
];

const METHODS = [
  {
    icon: "Droplets",
    title: "PRP-терапия (плазмотерапия)",
    desc: "Вводим собственную плазму пациента, обогащённую тромбоцитами. Активирует регенерацию хряща, снимает воспаление, устраняет боль. Курс: 3–5 инъекций.",
    badge: "Популярно",
    price: "4 000 ₽ / процедура",
  },
  {
    icon: "Dna",
    title: "SVF-терапия (стволовые клетки)",
    desc: "Клетки из собственной жировой ткани восстанавливают хрящ на клеточном уровне. В ряде случаев — альтернатива эндопротезированию. Эффект держится до 5 лет, в зависимости от образа жизни пациента.",
    badge: "Инновация",
    price: "55 000 ₽ / сустав",
  },
  {
    icon: "FlaskConical",
    title: "Гиалуроновая кислота",
    desc: "Препараты синовиальной жидкости вводятся в сустав — смазывают, питают хрящ и снимают боль. Эффект сохраняется до 12 месяцев.",
    badge: null,
    price: "от 7 800 ₽",
  },
  {
    icon: "Syringe",
    title: "Медикаментозные блокады",
    desc: "Точечное введение лекарства в очаг боли. Быстрый эффект — уже в день процедуры. Снимает острую боль и воспаление.",
    badge: null,
    price: "от 2 500 ₽",
  },
];

const STAGES = [
  {
    num: "I",
    title: "Начальная стадия",
    desc: "Периодические боли после нагрузки, лёгкий дискомфорт. Хрящ истончается незначительно.",
    color: "bg-clinic-teal-light text-clinic-teal",
    result: "Отличный прогноз. Лечение позволяет полностью остановить прогрессирование.",
  },
  {
    num: "II",
    title: "Умеренная стадия",
    desc: "Боль усиливается, появляется хруст, подвижность ограничена. Видны изменения на рентгене.",
    color: "bg-amber-50 text-amber-700",
    result: "Хороший прогноз. PRP и гиалуроновая кислота дают устойчивый результат.",
  },
  {
    num: "III",
    title: "Выраженная стадия",
    desc: "Боль постоянная, сустав деформирован, движения резко ограничены.",
    color: "bg-orange-50 text-orange-700",
    result: "Лечение облегчает боль и улучшает качество жизни. SVF-терапия — альтернатива операции.",
  },
];

const RESULTS = [
  { value: "85%", label: "пациентов отмечают снижение боли уже после 1-й процедуры" },
  { value: "12 мес", label: "сохраняется эффект гиалуроновой кислоты" },
  { value: "3–5", label: "инъекций в курсе PRP-терапии" },
  { value: "без операции", label: "лечим 1–3 стадию артроза" },
];

const FAQ_ITEMS = [
  {
    q: "Можно ли вылечить артроз полностью?",
    a: "Полное восстановление хряща на поздних стадиях невозможно, однако современные методы — PRP, SVF, гиалуроновая кислота — позволяют остановить прогрессирование, устранить боль и вернуть подвижность. При 1–2 стадии результаты особенно значительные.",
  },
  {
    q: "Больно ли делать инъекции в сустав?",
    a: "Процедура проводится с местной анестезией. Большинство пациентов описывают лишь небольшой дискомфорт. Врач использует тонкую иглу под УЗИ-контролем — точно и безопасно.",
  },
  {
    q: "Сколько стоит лечение артроза?",
    a: "Стоимость зависит от выбранного метода и стадии заболевания. Первичная консультация — 2 500 ₽, включает осмотр и УЗИ сустава. Конкретный план и цену рассчитаем на приёме.",
  },
  {
    q: "Как быстро наступает эффект?",
    a: "После блокады — уже в день процедуры. После PRP-терапии — в течение 2–4 недель по мере накопления эффекта. После курса лечения результат стабилен и сохраняется длительно.",
  },
  {
    q: "Нужно ли как-то готовиться к процедурам?",
    a: "Для большинства процедур специальной подготовки не нужно. Для PRP-терапии — сдать кровь натощак. Врач подробно расскажет на консультации.",
  },
  {
    q: "Лечите ли вы артроз 3-й стадии без операции?",
    a: "Да. SVF-терапия (стволовые клетки из собственного жира) и комплексное лечение помогают даже на 3-й стадии значительно уменьшить боль и улучшить качество жизни. В ряде случаев это позволяет отложить или избежать эндопротезирования.",
  },
];

export default function Artroz() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Лечение артроза в Новосибирске — цены, PRP и стволовые клетки | Ваш Ортопед"
        description="Лечение артроза коленного, тазобедренного, плечевого сустава в Новосибирске без операции. PRP-терапия от 4000₽, SVF-терапия, гиалуроновая кислота от 7800₽, блокады от 2500₽. Первичный приём + УЗИ — 2500₽. Запись онлайн."
        keywords="лечение артроза Новосибирск, лечение артроза коленного сустава, артроз тазобедренного сустава лечение, PRP терапия Новосибирск, плазмолифтинг суставов, SVF терапия стволовыми клетками, гиалуроновая кислота в сустав, уколы в коленный сустав, гонартроз лечение, коксартроз Новосибирск, лечение суставов без операции, ортопед Новосибирск, внутрисуставные инъекции"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/d883e60f-e326-44d2-85f9-5c96a302aca5.jpeg"
            alt="Лечение артроза коленного сустава в Новосибирске"
            className="w-3/5 object-cover opacity-60 absolute right-0 hidden sm:block"
            style={{ filter: "brightness(1.25) saturate(0.85)", top: "-120px", height: "calc(100% + 180px)", objectPosition: "60% 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-clinic-warm via-clinic-warm/90 to-clinic-warm/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-clinic-warm" />
        </div>
        <div className="container relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="inline-flex items-center gap-2 bg-clinic-teal-light text-clinic-teal text-xs font-medium px-3 py-1.5 rounded-full">
                <Icon name="MapPin" size={13} />
                Новосибирск · Лечение суставов
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
                <Icon name="BadgePercent" size={13} />
                Пожалуй самые низкие цены на лечение
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-light leading-[1.15] text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Лечение <span className="text-clinic-teal italic">артроза</span><br />в Новосибирске без операции
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Лечим артроз коленного, тазобедренного и плечевого сустава современными методами: PRP-терапия, SVF (стволовые клетки), гиалуроновая кислота, блокады. Снимаем боль и восстанавливаем подвижность на 1–3 стадии артроза.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_artroz_zapis')}
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
                  <span className="text-base font-bold text-clinic-text block">Первичный приём + УЗИ сустава — 2 500 ₽</span>
                  <span className="text-sm text-amber-700 font-medium">Запись сегодня · без очереди</span>
                </div>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_artroz_promo')}
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
            Симптомы артроза
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

      {/* ВИДЫ АРТРОЗА */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Какие суставы лечим
          </h2>
          <p className="text-clinic-text-muted mb-8">Артроз может поражать любой сустав — мы специализируемся на всех его формах</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {JOINTS.map((j) => (
              <div key={j.title} className="bg-white rounded-2xl p-5 border border-clinic-beige-dark/30 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name={j.icon as "Footprints"} size={20} className="text-clinic-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-text mb-1">{j.title}</h3>
                  <p className="text-sm text-clinic-text-muted leading-relaxed">{j.desc}</p>
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
            Методы лечения артроза
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
                    <Icon name={m.icon as "Droplets"} size={20} className="text-clinic-teal" />
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
            Стадии артроза и прогноз
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
              { step: "01", title: "Запись и первичный приём", desc: "Консультация травматолога-ортопеда + УЗИ сустава прямо на приёме. Ставим точный диагноз, определяем стадию. Стоимость — 2 500 ₽." },
              { step: "02", title: "План лечения", desc: "Врач составляет индивидуальный план с учётом стадии, образа жизни и бюджета. Объясняем каждый шаг — без навязывания лишнего." },
              { step: "03", title: "Проведение процедур", desc: "PRP, гиалуроновая кислота, блокады — всё делаем в клинике за один визит. Процедура занимает 20–40 минут." },
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
            Консультация + УЗИ сустава — 2 500 ₽. Приём сегодня, без очереди.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_artroz_zapis_cta')}
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
            Частые вопросы об артрозе
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
            <Link to="/diseases/osteohondroz" className="text-sm text-clinic-teal border border-clinic-teal/40 px-4 py-2 rounded-lg hover:bg-clinic-teal-light transition-colors">
              Лечение остеохондроза
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