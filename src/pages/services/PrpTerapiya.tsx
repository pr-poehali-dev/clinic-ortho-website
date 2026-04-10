import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089";

const SYNONYMS = [
  { term: "PRP-терапия", desc: "Официальное медицинское название метода" },
  { term: "Плазмотерапия", desc: "Самое распространённое название в России" },
  { term: "Плазмолифтинг", desc: "Используется в эстетической медицине" },
  { term: "Инъекции плазмы", desc: "Так говорят пациенты в разговоре" },
  { term: "Уколы из собственной крови", desc: "Народное название метода" },
];

const HOW_STEPS = [
  { icon: "Droplets", title: "Берём кровь из вены", desc: "Забираем 15–20 мл крови из вены пациента — как при обычном анализе. Занимает 2–3 минуты." },
  { icon: "Zap", title: "Центрифугируем", desc: "Кровь помещают в центрифугу на 5–8 минут. Плазма, обогащённая тромбоцитами, отделяется от эритроцитов." },
  { icon: "Syringe", title: "Вводим в сустав", desc: "Готовую плазму вводим точно в больной сустав под контролем УЗИ. Процедура занимает 10–15 минут." },
  { icon: "TrendingUp", title: "Запускается регенерация", desc: "Тромбоциты выделяют факторы роста, которые восстанавливают хрящ и снимают воспаление." },
];

const JOINTS = [
  { icon: "Footprints", title: "Коленный сустав", desc: "Гонартроз, боль при ходьбе и спуске по лестнице, выпот в суставе." },
  { icon: "PersonStanding", title: "Тазобедренный сустав", desc: "Коксартроз, боль в паху и бедре, ограничение ходьбы." },
  { icon: "Hand", title: "Плечевой сустав", desc: "Артроз, тендинит, боль при подъёме руки, ограничение вращения." },
  { icon: "Activity", title: "Позвоночник", desc: "Остеохондроз, грыжи, хроническая боль в спине и шее." },
  { icon: "Fingerprint", title: "Мелкие суставы", desc: "Суставы кистей, стоп — артроз, боль при движении, деформация." },
  { icon: "Move", title: "Пяточная шпора", desc: "Плантарный фасциит — боль в пятке при ходьбе." },
];

const RESULTS = [
  { value: "85%", label: "пациентов отмечают снижение боли уже после 1-й процедуры" },
  { value: "3–5", label: "инъекций в стандартном курсе лечения" },
  { value: "6–12 мес", label: "сохраняется эффект после курса" },
  { value: "0", label: "риск аллергии — используем только вашу кровь" },
];

const COMPARE = [
  { param: "Откуда берётся препарат", prp: "Из вашей собственной крови", other: "Синтетический или донорский" },
  { param: "Риск отторжения", prp: "Отсутствует", other: "Возможен" },
  { param: "Риск аллергии", prp: "Минимальный", other: "Есть" },
  { param: "Принцип действия", prp: "Запускает собственную регенерацию", other: "Замещает или блокирует" },
  { param: "Длительность эффекта", prp: "6–12 месяцев", other: "1–3 месяца" },
];

const FAQ_ITEMS = [
  {
    q: "Чем плазмотерапия отличается от плазмолифтинга?",
    a: "По сути — ничем. Это одна и та же процедура: инъекция обогащённой тромбоцитами плазмы (PRP). «Плазмолифтинг» — торговое название, чаще используется в косметологии. «Плазмотерапия» и «PRP-терапия» — медицинские термины для того же метода при лечении суставов.",
  },
  {
    q: "Больно делать укол плазмы в сустав?",
    a: "Нет. Процедура проводится с местной анестезией кожи. Игла тонкая, вводится под контролем УЗИ точно в нужное место. Большинство пациентов описывают лишь лёгкое давление или распирание в момент введения.",
  },
  {
    q: "Когда почувствую эффект от плазмотерапии?",
    a: "Первые улучшения — снижение воспаления и боли — обычно заметны через 1–2 недели после первой процедуры. Полный эффект накапливается к 3–4-й инъекции. Результат курса сохраняется 6–12 месяцев.",
  },
  {
    q: "Сколько процедур нужно?",
    a: "Стандартный курс — 3–5 инъекций с интервалом 1–2 недели. Для поддержания эффекта рекомендуем повторять курс 1 раз в год. Конкретный план составляет врач после осмотра.",
  },
  {
    q: "Есть ли противопоказания?",
    a: "Да. Плазмотерапия противопоказана при онкологических заболеваниях, острых инфекциях, нарушениях свёртываемости крови, приёме антикоагулянтов, беременности. Полный список уточняет врач на первичном приёме.",
  },
  {
    q: "Помогает ли плазмолифтинг при 3-й стадии артроза?",
    a: "На 3-й стадии PRP-терапия значительно снижает боль и воспаление, улучшает качество жизни. Однако для восстановления хряща при выраженном разрушении мы рекомендуем комбинировать с SVF-терапией (стволовые клетки). Врач подберёт оптимальную тактику.",
  },
];

export default function PrpTerapiya() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="PRP-терапия суставов в Новосибирске — плазмотерапия, плазмолифтинг | Ваш Ортопед"
        description="PRP-терапия (плазмотерапия, плазмолифтинг) суставов в Новосибирске. Лечение артроза, боли в колене, тазобедренном и плечевом суставе инъекциями собственной плазмы. От 4000₽ за процедуру. Первичный приём + УЗИ — 2500₽."
        keywords="PRP терапия Новосибирск, плазмотерапия суставов, плазмолифтинг суставов, уколы плазмы в сустав, плазмотерапия коленного сустава, PRP инъекции Новосибирск, лечение суставов плазмой крови, плазмолифтинг колена, плазмотерапия тазобедренного сустава, обогащённая тромбоцитами плазма"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/5c532f91-bfe8-4b3c-bc3d-cf60c7688fd6.jpg"
            alt="PRP-терапия плазмотерапия суставов Новосибирск"
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
              <span className="text-clinic-teal italic">PRP-терапия</span> суставов<br />
              <span className="text-2xl md:text-3xl text-clinic-text-muted font-light">плазмотерапия · плазмолифтинг</span>
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Лечим суставы инъекциями вашей собственной плазмы — без операции, без синтетики. PRP запускает естественное восстановление хряща, снимает воспаление и убирает боль на 6–12 месяцев.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_prp_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarCheck" size={16} />
                Записаться на приём
              </a>
              <button
                onClick={() => { setCallModalOpen(true); trackGoal('click_prp_zvonok'); }}
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

            {/* CTA-плашка */}
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
                onClick={() => trackGoal('click_prp_promo')}
                className="sm:ml-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap"
              >
                <Icon name="CalendarDays" size={15} />
                Записаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* КАК ЭТО НАЗЫВАЕТСЯ */}
      <section className="py-10 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            PRP, плазмотерапия, плазмолифтинг — это одно и то же
          </h2>
          <p className="text-clinic-text-muted mb-6">Разные названия одной процедуры — инъекции обогащённой тромбоцитами плазмы</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SYNONYMS.map((s) => (
              <div key={s.term} className="flex items-start gap-3 bg-clinic-warm border border-clinic-beige-dark/40 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-clinic-teal-light flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="Check" size={15} className="text-clinic-teal" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-clinic-text block">{s.term}</span>
                  <span className="text-xs text-clinic-text/70">{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК ПРОХОДИТ ПРОЦЕДУРА */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Как проходит процедура плазмотерапии
          </h2>
          <p className="text-clinic-text-muted mb-8">4 простых шага — от забора крови до инъекции. Всего 30–40 минут</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {HOW_STEPS.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl p-5 border border-clinic-teal/10 shadow-sm relative">
                <div className="absolute top-4 right-4 text-3xl font-bold text-clinic-teal/10 leading-none">{i + 1}</div>
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                  <Icon name={s.icon} size={20} className="text-clinic-teal" />
                </div>
                <h3 className="font-semibold text-clinic-text mb-2 text-sm">{s.title}</h3>
                <p className="text-sm text-clinic-text/75 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-white rounded-2xl p-5 border border-clinic-teal/20 flex items-start gap-3">
            <Icon name="Info" size={18} className="text-clinic-teal shrink-0 mt-0.5" />
            <p className="text-sm text-clinic-text/75 leading-relaxed">
              Все инъекции выполняются <strong className="text-clinic-text">под контролем УЗИ</strong> — врач видит точное положение иглы в суставе. Это гарантирует безопасность и максимальную эффективность процедуры.
            </p>
          </div>
        </div>
      </section>

      {/* КАКИЕ СУСТАВЫ ЛЕЧИМ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Какие суставы лечим плазмотерапией
          </h2>
          <p className="text-clinic-text-muted mb-8">PRP-инъекции применяем для любого сустава и позвоночника</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {JOINTS.map((j) => (
              <div key={j.title} className="bg-clinic-warm rounded-2xl p-5 flex gap-4 border border-clinic-teal/10">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
                  <Icon name={j.icon} size={20} className="text-clinic-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-text mb-1 text-sm">{j.title}</h3>
                  <p className="text-sm text-clinic-text/75 leading-relaxed">{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЦЕНА */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Стоимость плазмотерапии
          </h2>
          <p className="text-clinic-text-muted mb-8">Прозрачные цены — называем стоимость до начала лечения</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Первичный приём + УЗИ", price: "2 500 ₽", desc: "Осмотр врача-ортопеда, УЗИ сустава, постановка диагноза, план лечения", badge: "Старт" },
              { title: "1 процедура PRP", price: "4 000 ₽", desc: "Забор крови, центрифугирование, инъекция под УЗИ-контролем", badge: "Основа" },
              { title: "Курс 3 процедуры", price: "12 000 ₽", desc: "Полный стандартный курс плазмотерапии. При оплате сразу — 4 процедуры по цене трёх.", badge: "Выгодно" },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 border border-clinic-teal/10 shadow-sm relative">
                <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full bg-clinic-teal text-white">{p.badge}</span>
                <h3 className="font-semibold text-clinic-text mb-1 pr-16">{p.title}</h3>
                <p className="text-2xl font-bold text-clinic-teal mb-3">{p.price}</p>
                <p className="text-sm text-clinic-text/75 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_prp_ceny')}
              className="inline-flex items-center gap-2 bg-clinic-teal text-white px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all shadow-md"
            >
              <Icon name="CalendarCheck" size={16} />
              Записаться на первичный приём
            </a>
          </div>
        </div>
      </section>

      {/* РЕЗУЛЬТАТЫ */}
      <section className="py-12 bg-clinic-teal">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Результаты плазмотерапии в цифрах
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RESULTS.map((r) => (
              <div key={r.value} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{r.value}</div>
                <p className="text-white/80 text-sm leading-snug">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRP vs ДРУГИЕ МЕТОДЫ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Почему PRP лучше синтетических препаратов
          </h2>
          <p className="text-clinic-text-muted mb-8">Плазма — из вашей крови. Никакой химии, никакого отторжения</p>
          <div className="rounded-2xl overflow-hidden border border-clinic-teal/10 shadow-sm">
            <div className="grid grid-cols-3 bg-clinic-teal text-white text-sm font-semibold">
              <div className="px-5 py-3">Параметр</div>
              <div className="px-5 py-3">PRP / Плазмотерапия</div>
              <div className="px-5 py-3">Другие инъекции</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.param} className={`grid grid-cols-3 text-sm border-t border-clinic-teal/10 ${i % 2 === 0 ? "bg-white" : "bg-clinic-warm"}`}>
                <div className="px-5 py-3 text-clinic-text/70">{row.param}</div>
                <div className="px-5 py-3 font-medium text-clinic-teal flex items-center gap-1.5">
                  <Icon name="Check" size={14} className="shrink-0" />
                  {row.prp}
                </div>
                <div className="px-5 py-3 text-clinic-text/60">{row.other}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Почему выбирают нас
          </h2>
          <p className="text-clinic-text-muted mb-8">Клиника «Ваш Ортопед» — специализация на суставах</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: "Microscope", title: "УЗИ-навигация", desc: "Все PRP-инъекции выполняем под контролем УЗИ — точное попадание в сустав, без осложнений." },
              { icon: "UserCheck", title: "Врачи-ортопеды", desc: "Специалисты с опытом 10+ лет. Сотни успешных курсов плазмотерапии." },
              { icon: "FlaskConical", title: "Качественное оборудование", desc: "Медицинские центрифуги для PRP, сертифицированные пробирки — максимум тромбоцитов в плазме." },
              { icon: "Clock", title: "Приём в день обращения", desc: "Без ожидания — запись онлайн, процедура в удобное для вас время." },
              { icon: "Wallet", title: "Прозрачные цены", desc: "Называем стоимость до начала. Никаких скрытых платежей и навязанных услуг." },
              { icon: "BadgeCheck", title: "Лицензия Минздрава", desc: "Клиника работает официально. Все процедуры — в рамках российского законодательства." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-white border border-clinic-teal/10">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
                  <Icon name={item.icon} size={20} className="text-clinic-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-text mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm text-clinic-text/75 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Частые вопросы о плазмотерапии
          </h2>
          <p className="text-clinic-text-muted mb-8">PRP, плазмолифтинг, плазмотерапия — отвечаем на всё</p>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-clinic-warm rounded-2xl border border-clinic-teal/10 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-clinic-text text-sm pr-4">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="shrink-0 text-clinic-teal" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-clinic-text/75 leading-relaxed border-t border-clinic-teal/10 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-ФИНАЛЬНЫЙ */}
      <section className="py-14 bg-clinic-warm">
        <div className="container text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Хотите попробовать плазмотерапию?
          </h2>
          <p className="text-clinic-text-muted mb-8">
            Запишитесь на первичный приём — врач-ортопед осмотрит сустав, сделает УЗИ и скажет, подойдёт ли вам PRP-терапия.
            Стоимость приёма с УЗИ — 2 500 ₽.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_prp_final')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-md text-base"
            >
              <Icon name="CalendarCheck" size={18} />
              Записаться на приём
            </a>
            <button
              onClick={() => { setCallModalOpen(true); trackGoal('click_prp_final_zvonok'); }}
              className="hidden sm:flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-8 py-4 rounded-xl font-medium hover:bg-clinic-teal-light transition-all text-base"
            >
              <Icon name="Phone" size={18} />
              Позвонить
            </button>
            <a
              href="tel:+79994649194"
              className="sm:hidden flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-8 py-4 rounded-xl font-medium hover:bg-clinic-teal-light transition-all text-base"
            >
              <Icon name="Phone" size={18} />
              Позвонить
            </a>
          </div>
          <p className="text-xs text-clinic-text-muted mt-4">Пн–Сб: 9:00–19:00 · Новосибирск</p>
        </div>
      </section>

      <PhoneModal open={callModalOpen} onOpenChange={setCallModalOpen} />
    </>
  );
}