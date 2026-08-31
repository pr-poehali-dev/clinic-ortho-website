import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=uvt";

const TYPES = [
  {
    icon: "Footprints",
    title: "УВТ при пяточной шпоре",
    desc: "Разрушает кальцинаты в подошвенной фасции, убирает утреннюю боль в пятке. Эффективность 80–88%.",
    badge: "Популярно",
  },
  {
    icon: "Bone",
    title: "УВТ при тендините плеча",
    desc: "Рассасывает отложения кальция в сухожилии надостной мышцы, возвращает объём движений в плече.",
    badge: null,
  },
  {
    icon: "Activity",
    title: "УВТ при эпикондилите",
    desc: "Лечение «локтя теннисиста» и «локтя гольфиста». Снимает хроническую боль в локте без блокад.",
    badge: null,
  },
  {
    icon: "Zap",
    title: "УВТ при боли в спине",
    desc: "Работа с триггерными точками и миофасциальным синдромом. Снимает мышечные зажимы и спазмы.",
    badge: null,
  },
  {
    icon: "Shield",
    title: "УВТ при тендинопатии ахилла",
    desc: "Восстанавливает структуру сухожилия, возвращает к спорту после хронической перегрузки.",
    badge: null,
  },
  {
    icon: "HeartPulse",
    title: "УВТ при артрозе",
    desc: "Улучшает питание околосуставных тканей, снимает мышечный компонент боли в колене и бедре.",
    badge: null,
  },
];

const RESULTS = [
  { value: "80–88%", label: "эффективность при пяточной шпоре" },
  { value: "3–7", label: "процедур в стандартном курсе" },
  { value: "7–20 мин", label: "длительность одного сеанса" },
  { value: "без наркоза", label: "процедура не требует проколов и анестезии" },
];

const INDICATIONS = [
  "Пяточная шпора",
  "Подошвенный фасциит",
  "Боль в пятке при ходьбе",
  "Кальцифицирующий тендинит плеча",
  "Эпикондилит («локоть теннисиста»)",
  "Тендинопатия ахиллова сухожилия",
  "«Колено прыгуна»",
  "Трохантерит бедра",
  "Миофасциальные боли",
  "Триггерные точки в мышцах",
  "Хронические энтезопатии",
  "Замедленное сращение переломов",
];

const FAQ_ITEMS = [
  {
    q: "Сколько сеансов УВТ нужно для результата?",
    a: "Стандартный курс — 3–7 процедур с интервалом 5–10 дней. При свежем подошвенном фасциите бывает достаточно 3–4 сеансов, при кальцифицирующем тендините плеча обычно нужно 5–7. Точное количество врач определяет после УЗИ.",
  },
  {
    q: "Больно ли делать ударно-волновую терапию?",
    a: "Процедура терпима и не требует анестезии. Ощущения описывают как ритмичные постукивания с ломотой в глубине тканей. Врач подбирает мощность индивидуально и ориентируется на вашу обратную связь, поэтому воздействие остаётся комфортным.",
  },
  {
    q: "Есть ли противопоказания к УВТ?",
    a: "Да: онкологические заболевания, беременность, нарушения свёртываемости крови, приём антикоагулянтов без коррекции, наличие кардиостимулятора, острая инфекция или гнойный процесс в зоне воздействия, тромбоз вен этой области. Все ограничения врач проверяет на консультации.",
  },
  {
    q: "Когда появится результат от процедуры?",
    a: "Многие отмечают облегчение уже после первого-второго сеанса, но эффект накопительный: полностью он раскрывается через 4–12 недель после окончания курса, когда завершается рост новых капилляров и перестройка ткани.",
  },
  {
    q: "Нужна ли подготовка к сеансу УВТ?",
    a: "Специальной подготовки нет. За 7–10 дней по согласованию с врачом отменяются противовоспалительные препараты и мази в зоне лечения — они снижают эффект. В день процедуры не наносите на кожу кремы и масла, приходите в удобной одежде.",
  },
  {
    q: "Что нельзя делать после процедуры?",
    a: "В течение 48 часов исключаются интенсивные нагрузки на обработанную зону, бег, прыжки, подъём тяжестей, а также баня, сауна и горячая ванна. Обычная ходьба и повседневные дела разрешены сразу — больничный не нужен.",
  },
];

export default function UvtLanding() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Ударно-волновая терапия в Новосибирске — УВТ, запись, цены | Ваш Ортопед"
        description="Ударно-волновая терапия (УВТ) в Новосибирске. Лечение пяточной шпоры, тендинита плеча, эпикондилита, болей в суставах. Без проколов и наркоза. Запись онлайн. Клиника «Ваш Ортопед», Есенина 67."
        keywords="ударно-волновая терапия Новосибирск, УВТ Новосибирск, лечение пяточной шпоры Новосибирск, УВТ пяточной шпоры, ударно волновая терапия суставов, УВТ плечевого сустава, лечение эпикондилита, УВТ цена Новосибирск, ударно-волновая терапия отзывы"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/3fba9dd5-4929-465e-8358-a82376dba7a4.jpg"
            alt="Ударно-волновая терапия в Новосибирске"
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
                Новосибирск · Клиника «Ваш Ортопед»
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
                <Icon name="BadgePercent" size={13} />
                Пожалуй самые низкие цены на лечение
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-light leading-[1.15] text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-clinic-teal italic">Ударно-волновая терапия</span><br />в Новосибирске
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Лечим пяточную шпору, тендинит плеча и хроническую боль в суставах. Без проколов, наркоза и больничного. Процедуру проводит врач под контролем УЗИ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_uvt_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarCheck" size={16} />
                Записаться на УВТ
              </a>
              <button
                onClick={() => { setCallModalOpen(true); trackGoal('click_uvt_zvonok'); }}
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
                  <span className="text-base font-bold text-clinic-text block">Боль в пятке? УВТ помогает в 80–88% случаев</span>
                  <span className="text-sm text-amber-700 font-medium">Запись сегодня · без очереди</span>
                </div>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_uvt_promo')}
                className="sm:ml-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap"
              >
                <Icon name="CalendarDays" size={15} />
                Записаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ВИДЫ ПРОЦЕДУР */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            При каких проблемах помогает УВТ
          </h2>
          <p className="text-clinic-text-muted mb-8">Подбираем параметры воздействия под вашу ситуацию и диагноз</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TYPES.map((t) => (
              <div key={t.title} className="bg-clinic-warm rounded-2xl p-6 border border-clinic-teal/10 relative">
                {t.badge && (
                  <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full bg-clinic-teal text-white">{t.badge}</span>
                )}
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                  <Icon name={t.icon} size={20} className="text-clinic-teal" />
                </div>
                <h3 className="font-semibold text-clinic-text mb-2">{t.title}</h3>
                <p className="text-sm text-clinic-text/75 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_uvt_vidy')}
              className="inline-flex items-center gap-2 bg-clinic-teal text-white px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all shadow-md"
            >
              <Icon name="CalendarCheck" size={16} />
              Записаться на сеанс
            </a>
          </div>
        </div>
      </section>

      {/* ПОКАЗАНИЯ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Показания к ударно-волновой терапии
          </h2>
          <p className="text-clinic-text-muted mb-8">Если у вас есть хотя бы один из симптомов — УВТ поможет</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {INDICATIONS.map((ind) => (
              <div key={ind} className="flex items-center gap-3 bg-white border border-clinic-beige-dark/40 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name="Check" size={15} className="text-clinic-teal" />
                </div>
                <span className="text-sm text-clinic-text">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК ПРОХОДИТ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Как проходит процедура
          </h2>
          <p className="text-clinic-text-muted mb-8">Амбулаторно, без проколов и анестезии — можно сразу вернуться к делам</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { step: "1", title: "Осмотр и УЗИ", desc: "Врач находит точную зону поражения и исключает состояния, при которых УВТ противопоказана." },
              { step: "2", title: "Наведение аппликатора", desc: "На кожу наносится контактный гель, аппликатор устанавливается в точку максимальной болезненности." },
              { step: "3", title: "Подача импульсов", desc: "За сеанс подаётся 1500–3000 импульсов. Мощность врач наращивает по вашей обратной связи." },
              { step: "4", title: "Домой сразу", desc: "Через несколько минут после сеанса можно идти. Больничный и восстановление не требуются." },
            ].map((s) => (
              <div key={s.step} className="bg-clinic-warm rounded-2xl p-6 border border-clinic-teal/10">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal text-white flex items-center justify-center mb-3 font-bold">
                  {s.step}
                </div>
                <h3 className="font-semibold text-clinic-text mb-2 text-sm">{s.title}</h3>
                <p className="text-sm text-clinic-text/75 leading-relaxed">{s.desc}</p>
              </div>
            ))}
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

      {/* ПОЧЕМУ МЫ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Почему выбирают нас
          </h2>
          <p className="text-clinic-text-muted mb-8">Клиника «Ваш Ортопед» — врачебный подход к аппаратному лечению</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: "UserCheck", title: "Процедуру ведёт врач", desc: "УВТ выполняет травматолог-ортопед, а не средний персонал. Параметры подбираются под диагноз." },
              { icon: "Scan", title: "Наведение по УЗИ", desc: "УЗИ выполняется на приёме — мы видим кальцинат и работаем точно по зоне поражения." },
              { icon: "Stethoscope", title: "Сначала диагноз", desc: "Одна и та же боль в пятке бывает разной природы. Сперва находим причину, потом лечим." },
              { icon: "Clock", title: "Запись в день обращения", desc: "Онлайн-запись без ожиданий. Принимаем в удобное для вас время." },
              { icon: "Wallet", title: "Прозрачные цены", desc: "Стоимость курса называем до начала лечения. Никаких скрытых доплат." },
              { icon: "BadgeCheck", title: "Лицензия Минздрава", desc: "Клиника работает официально. Все процедуры в рамках российского законодательства." },
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
          <p className="text-clinic-text-muted mb-8">Об ударно-волновой терапии в нашей клинике</p>
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

      {/* CTA ФИНАЛЬНЫЙ */}
      <section className="py-14 bg-white">
        <div className="container text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Болит пятка или плечо? Запишитесь на УВТ
          </h2>
          <p className="text-clinic-text-muted mb-8">
            Врач проведёт осмотр с УЗИ, определит причину боли и подберёт курс.
            Запись онлайн — без ожиданий, в удобное время.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_uvt_final')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-md text-base"
            >
              <Icon name="CalendarCheck" size={18} />
              Записаться на УВТ
            </a>
            <button
              onClick={() => { setCallModalOpen(true); trackGoal('click_uvt_final_zvonok'); }}
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
