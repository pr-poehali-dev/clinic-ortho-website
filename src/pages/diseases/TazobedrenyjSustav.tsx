import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=tazobedrennyj-sustav";

const SYMPTOMS = [
  { icon: "Zap", text: "Боль в паху, бедре и ягодице" },
  { icon: "Wind", text: "Скованность по утрам" },
  { icon: "Volume2", text: "Хруст и щелчки в тазобедренном суставе" },
  { icon: "ArrowDownToLine", text: "Боль при ходьбе и подъёме по лестнице" },
  { icon: "Move", text: "Ограничение отведения и вращения ноги" },
  { icon: "TrendingDown", text: "Укорочение конечности, хромота" },
];

const DIAGNOSES = [
  { icon: "PersonStanding", title: "Коксартроз (артроз ТБС)", desc: "Разрушение хряща тазобедренного сустава. Боль в паху, нарушение ходьбы. Лечим 1–3 стадию без операции и замены сустава." },
  { icon: "Flame", title: "Бурсит тазобедренного сустава", desc: "Воспаление суставных сумок. Боль по наружной поверхности бедра, усиливается при ходьбе и ночью. Блокады снимают воспаление быстро." },
  { icon: "Shield", title: "Синовит (выпот в суставе)", desc: "Скопление воспалительной жидкости. Ощущение распирания, ограничение движений. Аспирация + инъекции дают быстрое облегчение." },
  { icon: "Activity", title: "Тендинит и боли в бедре", desc: "Воспаление сухожилий вокруг сустава. Боль при нагрузке, ограничение движений. Лечим без операции с помощью PRP и блокад." },
];

const METHODS = [
  {
    icon: "Droplets",
    title: "PRP-терапия (плазмотерапия)",
    desc: "Обогащённую тромбоцитами плазму вводим в тазобедренный сустав под контролем УЗИ. Активирует регенерацию хряща, снимает воспаление, устраняет боль. Курс: 3–5 инъекций.",
    badge: "Популярно",
    price: "4 000 ₽ / процедура",
  },
  {
    icon: "Dna",
    title: "SVF-терапия (стволовые клетки)",
    desc: "Клетки из собственной жировой ткани вводятся в сустав — восстанавливают хрящ на клеточном уровне. Реальная альтернатива эндопротезированию при 3 стадии. Эффект до 5 лет.",
    badge: "Инновация",
    price: "55 000 ₽ / сустав",
  },
  {
    icon: "FlaskConical",
    title: "Гиалуроновая кислота",
    desc: "Препараты синовиальной жидкости вводятся в тазобедренный сустав — смазывают, питают хрящ и снижают трение. Эффект сохраняется до 12 месяцев.",
    badge: null,
    price: "от 7 800 ₽",
  },
  {
    icon: "Syringe",
    title: "Медикаментозные блокады",
    desc: "Точечное введение противовоспалительного препарата в сустав или околосуставные ткани. Быстрый эффект — уже в день процедуры. Снимает острую боль.",
    badge: null,
    price: "от 2 500 ₽",
  },
];

const STAGES = [
  {
    num: "I",
    title: "Начальная стадия",
    desc: "Периодическая боль в паху после нагрузки. Подвижность почти не ограничена. Хрящ начинает истончаться.",
    color: "bg-clinic-teal-light text-clinic-teal",
    result: "Отличный прогноз. PRP и гиалуроновая кислота полностью останавливают прогрессирование.",
  },
  {
    num: "II",
    title: "Умеренная стадия",
    desc: "Боль при ходьбе, лёгкая хромота. Ограничение вращения и отведения ноги. Сужение суставной щели на рентгене.",
    color: "bg-amber-50 text-amber-700",
    result: "Хороший прогноз. Комплекс PRP + гиалуроновая кислота даёт устойчивый длительный результат.",
  },
  {
    num: "III",
    title: "Выраженная стадия",
    desc: "Постоянная боль, выраженная хромота, укорочение ноги. Хрящ практически разрушен, деформация сустава.",
    color: "bg-orange-50 text-orange-700",
    result: "SVF-терапия значительно облегчает боль. В ряде случаев позволяет отказаться от замены сустава.",
  },
];

const RESULTS = [
  { value: "85%", label: "пациентов отмечают снижение боли уже после 1-й процедуры" },
  { value: "12 мес", label: "сохраняется эффект гиалуроновой кислоты в суставе" },
  { value: "3–5", label: "инъекций в курсе PRP-терапии" },
  { value: "без операции", label: "лечим коксартроз 1–3 стадии" },
];

const FAQ_ITEMS = [
  {
    q: "Можно ли вылечить коксартроз без операции и замены сустава?",
    a: "При 1–2 стадии — да, современные методы (PRP, гиалуроновая кислота, SVF) позволяют остановить разрушение хряща и сохранить сустав. При 3 стадии SVF-терапия в ряде случаев помогает отложить или полностью исключить эндопротезирование.",
  },
  {
    q: "Больно ли делать инъекции в тазобедренный сустав?",
    a: "Все процедуры выполняются под местной анестезией под контролем УЗИ. Тазобедренный сустав расположен глубоко, поэтому УЗИ-навигация особенно важна — она гарантирует точное попадание и безопасность. Большинство пациентов переносят легко.",
  },
  {
    q: "Сколько стоит лечение тазобедренного сустава?",
    a: "Первичный приём с УЗИ сустава — 2 500 ₽. PRP-терапия — от 4 000 ₽ за процедуру, гиалуроновая кислота — от 7 800 ₽, блокады — от 2 500 ₽. Точную стоимость рассчитаем после осмотра.",
  },
  {
    q: "Как быстро пройдёт боль в тазобедренном суставе?",
    a: "После блокады — облегчение уже в день процедуры. После PRP — в течение 2–4 недель по мере накопления эффекта. Результат после курса сохраняется от 6 до 12 месяцев и дольше.",
  },
  {
    q: "Нужна ли подготовка к процедурам?",
    a: "Для большинства процедур специальной подготовки не нужно. Для PRP-терапии — сдать кровь натощак. Врач расскажет всё подробно на первичном приёме.",
  },
  {
    q: "Помогает ли лечение при бурсите тазобедренного сустава?",
    a: "Да. Блокада с противовоспалительным препаратом снимает боль и воспаление уже после первой процедуры. PRP-терапия дополнительно восстанавливает повреждённые ткани и даёт долгосрочный эффект.",
  },
];

export default function TazobedrenyjSustav() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Лечение тазобедренного сустава в Новосибирске — коксартроз, боль в бедре | Ваш Ортопед"
        description="Лечение тазобедренного сустава в Новосибирске без операции. Коксартроз, бурсит, синовит. PRP-терапия от 4000₽, гиалуроновая кислота от 7800₽, SVF-терапия, блокады от 2500₽. Первичный приём + УЗИ — 2500₽."
        keywords="лечение тазобедренного сустава Новосибирск, коксартроз лечение, боль в бедре Новосибирск, бурсит тазобедренного сустава, PRP терапия тазобедренного сустава, гиалуроновая кислота в тазобедренный сустав, лечение без операции замены сустава, ортопед Новосибирск"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/3ba82a5d-6372-4ca5-835f-8b8c2cd2bdb3.jpg"
            alt="Лечение тазобедренного сустава в Новосибирске"
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
              Лечение <span className="text-clinic-teal italic">тазобедренного сустава</span><br />в Новосибирске без операции
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Лечим коксартроз, бурсит, синовит и боли в бедре современными методами: PRP-терапия, SVF (стволовые клетки), гиалуроновая кислота, блокады. Снимаем боль и сохраняем сустав без операции.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_tbs_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarCheck" size={16} />
                Записаться на приём
              </a>
              <button
                onClick={() => { setCallModalOpen(true); trackGoal('click_tbs_zvonok'); }}
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
                onClick={() => trackGoal('click_tbs_promo')}
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
            Симптомы боли в тазобедренном суставе
          </h2>
          <p className="text-clinic-text-muted mb-8">Обратитесь к врачу, если замечаете хотя бы один из признаков</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SYMPTOMS.map((s) => (
              <div key={s.text} className="flex items-center gap-3 bg-clinic-warm border border-clinic-beige-dark/40 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name={s.icon} size={15} className="text-clinic-teal" />
                </div>
                <span className="text-sm text-clinic-text">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ДИАГНОЗЫ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Какие болезни тазобедренного сустава мы лечим
          </h2>
          <p className="text-clinic-text-muted mb-8">Комплексный подход без операции</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DIAGNOSES.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border border-clinic-teal/10">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
                  <Icon name={d.icon} size={20} className="text-clinic-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-clinic-text mb-1 text-sm">{d.title}</h3>
                  <p className="text-sm text-clinic-text/75 leading-relaxed">{d.desc}</p>
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
            Методы лечения тазобедренного сустава
          </h2>
          <p className="text-clinic-text-muted mb-8">Подбираем метод индивидуально под стадию и диагноз</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {METHODS.map((m) => (
              <div key={m.title} className="bg-clinic-warm rounded-2xl p-6 border border-clinic-teal/10 relative">
                {m.badge && (
                  <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full bg-clinic-teal text-white">
                    {m.badge}
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                  <Icon name={m.icon} size={20} className="text-clinic-teal" />
                </div>
                <h3 className="font-semibold text-clinic-text mb-2">{m.title}</h3>
                <p className="text-sm text-clinic-text/75 leading-relaxed mb-3">{m.desc}</p>
                <p className="text-clinic-teal font-semibold text-sm">{m.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_tbs_metody')}
              className="inline-flex items-center gap-2 bg-clinic-teal text-white px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all shadow-md"
            >
              <Icon name="CalendarCheck" size={16} />
              Записаться на консультацию
            </a>
          </div>
        </div>
      </section>

      {/* СТАДИИ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Лечение по стадиям коксартроза
          </h2>
          <p className="text-clinic-text-muted mb-8">Чем раньше начать — тем лучше результат</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STAGES.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-6 border border-clinic-teal/10 shadow-sm">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold mb-4 ${s.color}`}>
                  {s.num}
                </div>
                <h3 className="font-semibold text-clinic-text mb-2">{s.title}</h3>
                <p className="text-sm text-clinic-text/75 mb-4 leading-relaxed">{s.desc}</p>
                <div className="border-t border-clinic-teal/10 pt-3">
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
            Наши результаты в цифрах
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

      {/* ПОЧЕМУ МЫ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Почему выбирают нас
          </h2>
          <p className="text-clinic-text-muted mb-8">Клиника «Ваш Ортопед» — специализация на суставах</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: "Microscope", title: "УЗИ-навигация", desc: "Все инъекции в тазобедренный сустав выполняем под контролем УЗИ — точно, безопасно, без осложнений." },
              { icon: "UserCheck", title: "Врачи-ортопеды", desc: "Специалисты с опытом 10+ лет, прошедшие обучение в ведущих клиниках России." },
              { icon: "Clock", title: "Приём в день обращения", desc: "Без долгого ожидания — запись онлайн, приём в удобное для вас время." },
              { icon: "Wallet", title: "Прозрачные цены", desc: "Называем стоимость до начала лечения. Никаких скрытых платежей." },
              { icon: "HeartHandshake", title: "Индивидуальный подход", desc: "Подбираем лечение под конкретный диагноз, стадию и образ жизни пациента." },
              { icon: "BadgeCheck", title: "Лицензия Минздрава", desc: "Клиника работает официально. Лечение в рамках российского законодательства." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-clinic-warm border border-clinic-teal/10">
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
      <section className="py-12 bg-clinic-warm">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Частые вопросы
          </h2>
          <p className="text-clinic-text-muted mb-8">О лечении тазобедренного сустава</p>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-clinic-teal/10 overflow-hidden">
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
      <section className="py-14 bg-white">
        <div className="container text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Боль в бедре? Не откладывайте лечение
          </h2>
          <p className="text-clinic-text-muted mb-8">
            Запишитесь на первичный приём — врач-ортопед осмотрит сустав, сделает УЗИ и составит план лечения.
            Стоимость приёма с УЗИ — 2 500 ₽.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_tbs_final')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-md text-base"
            >
              <Icon name="CalendarCheck" size={18} />
              Записаться на приём
            </a>
            <button
              onClick={() => { setCallModalOpen(true); trackGoal('click_tbs_final_zvonok'); }}
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