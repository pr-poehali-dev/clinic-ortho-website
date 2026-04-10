import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089";

const SYNONYMS = [
  { term: "Гиалуроновая кислота в сустав", desc: "Медицинское название процедуры" },
  { term: "Уколы для суставов", desc: "Так чаще всего говорят пациенты" },
  { term: "Протезирование синовиальной жидкости", desc: "Официальный медицинский термин" },
  { term: "Смазка для суставов", desc: "Народное название — отражает суть" },
  { term: "Вискосупплементация", desc: "Международное клиническое название" },
];

const HOW_STEPS = [
  { icon: "Stethoscope", title: "Осмотр и УЗИ", desc: "Врач осматривает сустав, делает УЗИ — определяет степень изменений и точку введения." },
  { icon: "Shield", title: "Анестезия", desc: "Кожу обрабатываем местным анестетиком. Игла тонкая — большинство пациентов почти не чувствуют." },
  { icon: "Syringe", title: "Инъекция под УЗИ", desc: "Препарат вводится точно в полость сустава под контролем УЗИ. Занимает 5–10 минут." },
  { icon: "TrendingUp", title: "Эффект нарастает", desc: "Гиалуроновая кислота заполняет пространство сустава — смазывает, защищает хрящ, снимает боль." },
];

const JOINTS = [
  { icon: "Footprints", title: "Коленный сустав", desc: "Самая частая процедура. Гонартроз, боль при ходьбе, скованность. Эффект — до 12 месяцев." },
  { icon: "PersonStanding", title: "Тазобедренный сустав", desc: "Коксартроз, боль в паху и бедре. Вводим под УЗИ — точно и безопасно." },
  { icon: "Hand", title: "Плечевой сустав", desc: "Артроз, тендинит, боль при подъёме руки. Возвращаем подвижность без операции." },
  { icon: "Activity", title: "Голеностоп", desc: "Посттравматический артроз, хроническая боль в стопе. Хороший ответ на гиалуронат." },
  { icon: "Fingerprint", title: "Мелкие суставы", desc: "Суставы кистей и стоп. Снимаем боль и улучшаем мелкую моторику." },
  { icon: "Move", title: "Фасеточные суставы позвоночника", desc: "Боль в спине и шее при артрозе фасеточных суставов." },
];

const DRUGS = [
  {
    name: "Синвиск / Synvisc",
    duration: "до 12 мес",
    sessions: "1–3 инъекции",
    desc: "Высокомолекулярный гиалуронат. Длительный эффект, хорошо изучен.",
    badge: "Популярно",
  },
  {
    name: "Дьюралан / Durolane",
    duration: "до 12 мес",
    sessions: "1 инъекция",
    desc: "Однократное введение — максимальное удобство для пациента.",
    badge: null,
  },
  {
    name: "Ферматрон / Fermatron",
    duration: "6–9 мес",
    sessions: "3–5 инъекций",
    desc: "Классический препарат с хорошим соотношением цена/эффект.",
    badge: null,
  },
  {
    name: "Гиастат / Hyastat",
    duration: "6–12 мес",
    sessions: "1–3 инъекции",
    desc: "Современный российский препарат. Сертифицирован Минздравом.",
    badge: null,
  },
];

const RESULTS = [
  { value: "12 мес", label: "максимальный срок эффекта после курса" },
  { value: "80%", label: "пациентов отмечают снижение боли уже после 1-й инъекции" },
  { value: "1–5", label: "инъекций в курсе в зависимости от препарата" },
  { value: "без операции", label: "лечим артроз 1–3 стадии" },
];

const COMPARE = [
  { param: "Что вводим", gel: "Гиалуроновую кислоту", prp: "Плазму из вашей крови" },
  { param: "Принцип действия", gel: "Смазывает и защищает хрящ", prp: "Стимулирует регенерацию хряща" },
  { param: "Эффект", gel: "Быстрое снижение боли", prp: "Нарастает 2–4 недели" },
  { param: "Длительность", gel: "6–12 месяцев", prp: "6–12 месяцев" },
  { param: "Лучше при", gel: "Боли, скованности, нехватке «смазки»", prp: "Воспалении, начале разрушения хряща" },
];

const FAQ_ITEMS = [
  {
    q: "Больно ли делать укол гиалуроновой кислоты в сустав?",
    a: "Нет. Процедура проводится с местной анестезией. Игла тонкая, вводится под контролем УЗИ — точно в полость сустава. Большинство пациентов ощущают лишь лёгкое давление или кратковременное распирание.",
  },
  {
    q: "Когда пройдёт боль после укола?",
    a: "Первое облегчение многие пациенты замечают уже через 1–3 дня. Полный эффект развивается в течение 2–4 недель и сохраняется от 6 до 12 месяцев.",
  },
  {
    q: "Сколько уколов нужно сделать?",
    a: "Зависит от выбранного препарата: однократные препараты (Дьюралан) — 1 инъекция, большинство других — курс из 3–5 инъекций с интервалом 1 неделя. Врач подберёт оптимальный вариант после осмотра.",
  },
  {
    q: "Помогает ли гиалуроновая кислота при 3-й стадии артроза?",
    a: "При 3-й стадии гиалуронат уменьшает боль и улучшает подвижность, но не восстанавливает разрушенный хрящ. Для максимального эффекта на 3-й стадии рекомендуем комбинировать с PRP-терапией или SVF (стволовые клетки).",
  },
  {
    q: "Есть ли противопоказания?",
    a: "Да: острое инфекционное воспаление сустава, кожные заболевания в зоне инъекции, аллергия на компоненты препарата. Абсолютных противопоказаний немного — врач уточнит на приёме.",
  },
  {
    q: "Можно ли сочетать гиалуроновую кислоту с PRP-терапией?",
    a: "Да, это одна из наиболее эффективных комбинаций. PRP запускает восстановление хряща, а гиалуроновая кислота создаёт защитную «смазку». Врач разработает индивидуальный протокол.",
  },
];

export default function GialuronovayaKislota() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Гиалуроновая кислота в сустав в Новосибирске — уколы, цены | Ваш Ортопед"
        description="Уколы гиалуроновой кислоты в сустав в Новосибирске. Лечение артроза коленного, тазобедренного, плечевого сустава без операции. От 7800₽. Эффект до 12 месяцев. Первичный приём + УЗИ — 2500₽."
        keywords="гиалуроновая кислота в сустав Новосибирск, уколы гиалуроновой кислоты в колено, гиалуронат в коленный сустав, вискосупплементация Новосибирск, протезирование синовиальной жидкости, уколы в тазобедренный сустав, лечение артроза инъекциями, смазка для суставов укол, синвиск Новосибирск, гиастат"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/128312cf-6597-4060-a340-1a0615af1e5c.jpg"
            alt="Гиалуроновая кислота в сустав Новосибирск"
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
              <span className="text-clinic-teal italic">Гиалуроновая кислота</span><br />в сустав в Новосибирске
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Уколы гиалуроновой кислоты — «смазка» для больного сустава. Быстро убирают боль, восстанавливают подвижность и защищают хрящ. Эффект сохраняется до 12 месяцев.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_gk_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarCheck" size={16} />
                Записаться на приём
              </a>
              <button
                onClick={() => { setCallModalOpen(true); trackGoal('click_gk_zvonok'); }}
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
                onClick={() => trackGoal('click_gk_promo')}
                className="sm:ml-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap"
              >
                <Icon name="CalendarDays" size={15} />
                Записаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ЧТО ЭТО */}
      <section className="py-10 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Гиалуроновая кислота в сустав — что это и зачем
          </h2>
          <p className="text-clinic-text-muted mb-6">Разные названия — одна процедура. Суть: вернуть суставу его «родную смазку»</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
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
          <div className="bg-clinic-teal-light border border-clinic-teal/20 rounded-2xl p-5 flex items-start gap-3">
            <Icon name="Info" size={18} className="text-clinic-teal shrink-0 mt-0.5" />
            <p className="text-sm text-clinic-text/80 leading-relaxed">
              В здоровом суставе есть синовиальная жидкость — она смазывает хрящи и не даёт им стираться. При артрозе этой жидкости становится меньше, хрящи трутся друг о друга и разрушаются.
              <strong className="text-clinic-text"> Гиалуроновая кислота восполняет этот дефицит</strong> — буквально заменяет натуральную смазку, защищает хрящ и убирает боль.
            </p>
          </div>
        </div>
      </section>

      {/* КАК ПРОХОДИТ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Как проходит процедура
          </h2>
          <p className="text-clinic-text-muted mb-8">Безболезненно, под контролем УЗИ. Всего 20–30 минут</p>
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
        </div>
      </section>

      {/* КАКИЕ СУСТАВЫ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Какие суставы лечим гиалуроновой кислотой
          </h2>
          <p className="text-clinic-text-muted mb-8">Вводим в любой сустав под УЗИ-контролем</p>
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

      {/* ПРЕПАРАТЫ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Препараты гиалуроновой кислоты
          </h2>
          <p className="text-clinic-text-muted mb-8">Работаем с проверенными препаратами — врач подберёт оптимальный</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DRUGS.map((d) => (
              <div key={d.name} className="bg-white rounded-2xl p-6 border border-clinic-teal/10 shadow-sm relative">
                {d.badge && (
                  <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full bg-clinic-teal text-white">{d.badge}</span>
                )}
                <h3 className="font-semibold text-clinic-text mb-3 pr-16">{d.name}</h3>
                <div className="flex gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-sm text-clinic-teal font-medium">
                    <Icon name="Clock" size={14} />
                    {d.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-clinic-text/60">
                    <Icon name="Syringe" size={14} />
                    {d.sessions}
                  </div>
                </div>
                <p className="text-sm text-clinic-text/75 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЦЕНА */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Стоимость
          </h2>
          <p className="text-clinic-text-muted mb-8">Прозрачные цены — называем стоимость до начала лечения</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Первичный приём + УЗИ", price: "2 500 ₽", desc: "Осмотр врача-ортопеда, УЗИ сустава, постановка диагноза, план лечения", badge: "Старт" },
              { title: "1 инъекция гиалуроната", price: "от 7 800 ₽", desc: "Стоимость зависит от препарата и сустава. Включает УЗИ-навигацию.", badge: "Основа" },
              { title: "Курс 3 инъекции", price: "от 20 000 ₽", desc: "Полный курс с классическим препаратом. Однократные препараты — дороже, но 1 укол.", badge: "Выгодно" },
            ].map((p) => (
              <div key={p.title} className="bg-clinic-warm rounded-2xl p-6 border border-clinic-teal/10 shadow-sm relative">
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
              onClick={() => trackGoal('click_gk_ceny')}
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
            Результаты в цифрах
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

      {/* ГИАЛУРОНАТ vs PRP */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Гиалуроновая кислота или PRP-терапия?
          </h2>
          <p className="text-clinic-text-muted mb-8">Оба метода работают — врач подберёт нужный или комбинацию</p>
          <div className="rounded-2xl overflow-hidden border border-clinic-teal/10 shadow-sm">
            <div className="grid grid-cols-3 bg-clinic-teal text-white text-sm font-semibold">
              <div className="px-5 py-3">Параметр</div>
              <div className="px-5 py-3">Гиалуроновая кислота</div>
              <div className="px-5 py-3">PRP / Плазмотерапия</div>
            </div>
            {COMPARE.map((row, i) => (
              <div key={row.param} className={`grid grid-cols-3 text-sm border-t border-clinic-teal/10 ${i % 2 === 0 ? "bg-white" : "bg-clinic-warm"}`}>
                <div className="px-5 py-3 text-clinic-text/70">{row.param}</div>
                <div className="px-5 py-3 font-medium text-clinic-teal">{row.gel}</div>
                <div className="px-5 py-3 text-clinic-text/60">{row.prp}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-clinic-text/60 mt-4 text-center">
            Лучший результат — комбинация обоих методов. Врач подберёт протокол индивидуально.
          </p>
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
              { icon: "Microscope", title: "УЗИ-навигация", desc: "Каждую инъекцию выполняем под контролем УЗИ — точное попадание в полость сустава." },
              { icon: "UserCheck", title: "Врачи-ортопеды", desc: "Специалисты с опытом 10+ лет. Сотни успешных инъекций гиалуроновой кислоты." },
              { icon: "Package", title: "Оригинальные препараты", desc: "Работаем только с сертифицированными препаратами от проверенных производителей." },
              { icon: "Clock", title: "Приём в день обращения", desc: "Без ожидания — запись онлайн, процедура в удобное для вас время." },
              { icon: "Wallet", title: "Прозрачные цены", desc: "Называем стоимость до начала. Никаких скрытых платежей." },
              { icon: "BadgeCheck", title: "Лицензия Минздрава", desc: "Клиника работает официально. Все процедуры в рамках российского законодательства." },
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
            Частые вопросы
          </h2>
          <p className="text-clinic-text-muted mb-8">Об инъекциях гиалуроновой кислоты в сустав</p>
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

      {/* CTA ФИНАЛЬНЫЙ */}
      <section className="py-14 bg-clinic-warm">
        <div className="container text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Болит сустав? Запишитесь на приём
          </h2>
          <p className="text-clinic-text-muted mb-8">
            Врач-ортопед осмотрит сустав, сделает УЗИ и скажет, поможет ли вам гиалуроновая кислота.
            Стоимость приёма с УЗИ — 2 500 ₽.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_gk_final')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-md text-base"
            >
              <Icon name="CalendarCheck" size={18} />
              Записаться на приём
            </a>
            <button
              onClick={() => { setCallModalOpen(true); trackGoal('click_gk_final_zvonok'); }}
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
