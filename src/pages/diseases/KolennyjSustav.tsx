import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089";

const SYMPTOMS = [
  { icon: "Zap", text: "Боль при ходьбе и спуске по лестнице" },
  { icon: "Wind", text: "Утренняя скованность в колене" },
  { icon: "Volume2", text: "Хруст и щелчки при движении" },
  { icon: "ArrowDownToLine", text: "Отёк и припухлость колена" },
  { icon: "Move", text: "Ограничение сгибания/разгибания" },
  { icon: "TrendingDown", text: "Деформация коленного сустава" },
];

const DIAGNOSES = [
  { icon: "Footprints", title: "Гонартроз (артроз колена)", desc: "Разрушение хряща коленного сустава. Боль при ходьбе, нагрузке, спуске по лестнице. Лечим 1–3 стадию без операции." },
  { icon: "Activity", title: "Менисковые боли", desc: "Повреждение или дегенерация мениска. Боль при сгибании, блокировка сустава, отёк. Инъекционное лечение без операции." },
  { icon: "Flame", title: "Бурсит коленного сустава", desc: "Воспаление суставных сумок. Боль, краснота, отёк в области колена. Блокады снимают воспаление быстро." },
  { icon: "Shield", title: "Синовит (выпот в суставе)", desc: "Скопление жидкости в суставной полости. Ощущение распирания, ограничение движений. Аспирация + инъекции." },
];

const METHODS = [
  {
    icon: "Droplets",
    title: "PRP-терапия (плазмотерапия)",
    desc: "Вводим обогащённую тромбоцитами плазму крови пациента прямо в коленный сустав. Активирует регенерацию хряща, снимает воспаление, устраняет боль. Курс: 3–5 инъекций.",
    badge: "Популярно",
    price: "4 000 ₽ / процедура",
  },
  {
    icon: "Dna",
    title: "SVF-терапия (стволовые клетки)",
    desc: "Клетки из собственной жировой ткани вводятся в коленный сустав — восстанавливают хрящ на клеточном уровне. Альтернатива эндопротезированию. Эффект до 5 лет.",
    badge: "Инновация",
    price: "55 000 ₽ / сустав",
  },
  {
    icon: "FlaskConical",
    title: "Гиалуроновая кислота",
    desc: "Препараты синовиальной жидкости — «смазка» для коленного сустава. Питают хрящ, снижают трение, устраняют боль. Эффект сохраняется до 12 месяцев.",
    badge: null,
    price: "от 7 800 ₽",
  },
  {
    icon: "Syringe",
    title: "Медикаментозные блокады",
    desc: "Точечное введение противовоспалительного препарата в колено. Быстрый эффект — уже в день процедуры. Снимает острую боль и воспаление.",
    badge: null,
    price: "от 2 500 ₽",
  },
];

const STAGES = [
  {
    num: "I",
    title: "Начальная стадия",
    desc: "Боль после нагрузки, лёгкий дискомфорт. Хрящ истончается незначительно, рентгенологические изменения минимальны.",
    color: "bg-clinic-teal-light text-clinic-teal",
    result: "Отличный прогноз. PRP и гиалуроновая кислота полностью останавливают прогрессирование.",
  },
  {
    num: "II",
    title: "Умеренная стадия",
    desc: "Боль при ходьбе и спуске по лестнице, хруст, отёк. Сужение суставной щели на рентгене.",
    color: "bg-amber-50 text-amber-700",
    result: "Хороший прогноз. Комплекс PRP + гиалуроновая кислота даёт устойчивый результат.",
  },
  {
    num: "III",
    title: "Выраженная стадия",
    desc: "Боль постоянная, сустав деформирован, движения резко ограничены. Хрящ практически разрушен.",
    color: "bg-orange-50 text-orange-700",
    result: "SVF-терапия значительно облегчает боль и улучшает качество жизни. Альтернатива замене сустава.",
  },
];

const RESULTS = [
  { value: "85%", label: "пациентов отмечают снижение боли уже после 1-й процедуры" },
  { value: "12 мес", label: "сохраняется эффект гиалуроновой кислоты в коленном суставе" },
  { value: "3–5", label: "инъекций в курсе PRP-терапии" },
  { value: "без операции", label: "лечим гонартроз 1–3 стадии" },
];

const FAQ_ITEMS = [
  {
    q: "Можно ли вылечить гонартроз без операции?",
    a: "Да, при 1–2 стадии — современные методы (PRP, гиалуроновая кислота, SVF) позволяют полностью остановить разрушение хряща и вернуть качество жизни. При 3 стадии значительно уменьшаем боль и откладываем или исключаем необходимость операции.",
  },
  {
    q: "Больно ли делать инъекции в коленный сустав?",
    a: "Процедура проводится с местной анестезией под контролем УЗИ. Большинство пациентов отмечают лишь лёгкий дискомфорт. Точное попадание иглы под УЗИ-навигацией — гарантия безопасности и эффективности.",
  },
  {
    q: "Сколько стоит лечение коленного сустава?",
    a: "Первичный приём с УЗИ сустава — 2 500 ₽. Стоимость лечения зависит от метода и стадии: PRP — от 4 000 ₽ за процедуру, гиалуроновая кислота — от 7 800 ₽, блокады — от 2 500 ₽. Точную цену рассчитаем на приёме.",
  },
  {
    q: "Как быстро пройдёт боль в колене?",
    a: "После блокады — облегчение уже в день процедуры. После PRP — в течение 2–4 недель по мере накопления эффекта. После курса — результат стабилен и сохраняется от 6 до 12 месяцев и дольше.",
  },
  {
    q: "Нужна ли подготовка к инъекциям в колено?",
    a: "Для большинства процедур специальной подготовки не нужно. Для PRP-терапии — сдать кровь натощак. Врач подробно расскажет на консультации и ответит на все вопросы.",
  },
  {
    q: "Помогает ли лечение при выпоте (жидкости) в колене?",
    a: "Да. Сначала проводим аспирацию (удаление жидкости), затем вводим препарат в полость сустава. Уже после первой процедуры пациент чувствует значительное облегчение.",
  },
];

export default function KolennyjSustav() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Лечение коленного сустава в Новосибирске — гонартроз, боль в колене | Ваш Ортопед"
        description="Лечение боли в коленном суставе в Новосибирске без операции. Гонартроз, бурсит, синовит, менисковые боли. PRP-терапия от 4000₽, гиалуроновая кислота от 7800₽, блокады от 2500₽. Первичный приём + УЗИ — 2500₽."
        keywords="лечение коленного сустава Новосибирск, гонартроз лечение, боль в колене Новосибирск, PRP терапия коленного сустава, гиалуроновая кислота в колено, бурсит колена лечение, синовит коленного сустава, лечение мениска без операции, ортопед Новосибирск, уколы в коленный сустав"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/cd555453-081c-4af4-951d-2fbd0d6e6381.jpg"
            alt="Лечение коленного сустава в Новосибирске"
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
              Лечение <span className="text-clinic-teal italic">коленного сустава</span><br />в Новосибирске без операции
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Лечим гонартроз, бурсит, синовит и боли в колене современными методами: PRP-терапия, SVF (стволовые клетки), гиалуроновая кислота, блокады. Снимаем боль и восстанавливаем подвижность на 1–3 стадии.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_koleno_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarCheck" size={16} />
                Записаться на приём
              </a>
              <button
                onClick={() => { setCallModalOpen(true); trackGoal('click_koleno_zvonok'); }}
                className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-7 py-3.5 rounded-xl font-medium hover:bg-clinic-teal-light transition-all text-sm"
              >
                <Icon name="Phone" size={16} />
                Позвонить
              </button>
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
                onClick={() => trackGoal('click_koleno_cta')}
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
            Симптомы боли в колене
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
            Какие болезни колена мы лечим
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
            Методы лечения коленного сустава
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
              onClick={() => trackGoal('click_koleno_metody')}
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
            Лечение по стадиям гонартроза
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
              { icon: "Microscope", title: "УЗИ-навигация", desc: "Все инъекции выполняем под контролем УЗИ — точно, безопасно, без осложнений." },
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
          <p className="text-clinic-text-muted mb-8">О лечении коленного сустава</p>
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
                  <div className="px-6 pb-5 text-sm text-clinic-text-muted leading-relaxed border-t border-clinic-teal/10 pt-4">
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
            Болит колено? Не откладывайте лечение
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
              onClick={() => trackGoal('click_koleno_final')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-md text-base"
            >
              <Icon name="CalendarCheck" size={18} />
              Записаться на приём
            </a>
            <button
              onClick={() => { setCallModalOpen(true); trackGoal('click_koleno_final_zvonok'); }}
              className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-8 py-4 rounded-xl font-medium hover:bg-clinic-teal-light transition-all text-base"
            >
              <Icon name="Phone" size={18} />
              Позвонить
            </button>
          </div>
          <p className="text-xs text-clinic-text-muted mt-4">Пн–Сб: 9:00–19:00 · Новосибирск</p>
        </div>
      </section>

      <PhoneModal open={callModalOpen} onOpenChange={setCallModalOpen} />
    </>
  );
}