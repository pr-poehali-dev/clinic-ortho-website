import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=svf";

const TYPES = [
  {
    icon: "Bone",
    title: "SVF при артрозе колена",
    desc: "Гонартроз 1–3 стадии. Убирает боль, восстанавливает хрящ и позволяет отсрочить замену сустава.",
    badge: "Популярно",
  },
  {
    icon: "PersonStanding",
    title: "SVF при коксартрозе",
    desc: "Артроз тазобедренного сустава. Снимает боль в паху и бедре, возвращает свободу движений.",
    badge: null,
  },
  {
    icon: "Activity",
    title: "SVF при артрозе плеча",
    desc: "Плечевой, голеностопный, локтевой суставы. Восстановление подвижности без операции.",
    badge: null,
  },
  {
    icon: "Shield",
    title: "SVF при тендинопатиях",
    desc: "Хронические поражения сухожилий, не отвечающие на стандартное лечение и физиотерапию.",
    badge: null,
  },
  {
    icon: "Layers",
    title: "SVF при повреждении менисков",
    desc: "Дегенеративные изменения менисков и хряща. Альтернатива артроскопической операции.",
    badge: null,
  },
  {
    icon: "HeartPulse",
    title: "SVF после операций",
    desc: "Ускорение восстановления хряща после артроскопии и других вмешательств на суставе.",
    badge: null,
  },
];

const RESULTS = [
  { value: "60–80%", label: "снижение боли по данным исследований" },
  { value: "1", label: "процедура вместо курса инъекций" },
  { value: "18 мес+", label: "длительность эффекта, часто несколько лет" },
  { value: "0%", label: "риск отторжения — материал собственный" },
];

const INDICATIONS = [
  "Артроз коленного сустава",
  "Артроз тазобедренного сустава",
  "Артроз плечевого сустава",
  "Артроз голеностопа и локтя",
  "Боль в суставе при нагрузке",
  "Утренняя скованность суставов",
  "Хруст и ограничение движений",
  "Хронические тендинопатии",
  "Повреждения менисков",
  "Хронический синовит",
  "Состояние после артроскопии",
  "Предложено эндопротезирование",
];

const FAQ_ITEMS = [
  {
    q: "Что такое SVF-терапия простыми словами?",
    a: "Это лечение сустава клетками из собственной жировой ткани. У вас берут небольшой объём жира через микропрокол, выделяют концентрат регенеративных клеток — стромально-васкулярную фракцию — и вводят в больной сустав под контролем УЗИ. Клетки снимают хроническое воспаление и запускают восстановление хряща.",
  },
  {
    q: "Чем SVF отличается от PRP-терапии?",
    a: "PRP — это плазма крови с факторами роста, курс из 3–5 инъекций, оптимален при начальных стадиях артроза. SVF содержит живые регенеративные клетки из жировой ткани, выполняется однократно и обладает более мощным восстановительным потенциалом. При 2–3 стадии артроза SVF предпочтительнее.",
  },
  {
    q: "Можно ли с помощью SVF избежать замены сустава?",
    a: "При артрозе 1–3 стадии метод во многих случаях позволяет надолго отсрочить или полностью избежать эндопротезирования. При 4 стадии, когда хрящ разрушен полностью и кости контактируют напрямую, SVF неэффективна — в этом случае мы честно рекомендуем консультацию хирурга.",
  },
  {
    q: "Больно ли делать SVF-терапию?",
    a: "Процедура проводится под местной анестезией и переносится комфортно. Забор жировой ткани через микропрокол практически безболезнен, внутрисуставное введение ощущается как обычная инъекция с чувством распирания. В первые 2–3 дня возможна умеренная болезненность — это нормальная реакция.",
  },
  {
    q: "Через сколько появится результат?",
    a: "SVF работает постепенно, а не мгновенно. Первое улучшение — через 3–4 недели, устойчивый эффект формируется к 2–3 месяцу, максимальный результат развивается к 6 месяцам. Такая динамика естественна: клетки восстанавливают ткань, а не просто блокируют боль.",
  },
  {
    q: "Безопасно ли это? Есть ли риск отторжения?",
    a: "Риск отторжения отсутствует полностью — используется собственная ткань пациента, а не донорский материал. Противопоказания: активная онкология, острые инфекции, тяжёлые нарушения свёртываемости крови, беременность, обострение аутоиммунных заболеваний. Всё проверяется на консультации.",
  },
];

export default function SvfLanding() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="SVF-терапия в Новосибирске — стромально-васкулярная фракция, цены | Ваш Ортопед"
        description="SVF-терапия (стромально-васкулярная фракция) в Новосибирске. Клеточное лечение артроза коленного и тазобедренного суставов без операции — альтернатива эндопротезированию. Запись онлайн. Клиника «Ваш Ортопед», Есенина 67."
        keywords="SVF терапия Новосибирск, стромально-васкулярная фракция, лечение артроза без операции Новосибирск, клеточная терапия суставов, SVF коленного сустава, биоимплантация сустава, лечение гонартроза Новосибирск, альтернатива эндопротезированию, SVF цена Новосибирск"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/16157819-bd55-4a51-ad93-7b7dc64d61c5.jpg"
            alt="SVF-терапия в Новосибирске"
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
              <span className="text-clinic-teal italic">SVF-терапия</span><br />в Новосибирске
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Лечение артроза собственными клетками из жировой ткани. Убираем боль и восстанавливаем хрящ без операции — во многих случаях это альтернатива замене сустава.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_svf_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarCheck" size={16} />
                Записаться на консультацию
              </a>
              <button
                onClick={() => { setCallModalOpen(true); trackGoal('click_svf_zvonok'); }}
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
                  <span className="text-base font-bold text-clinic-text block">Предложили заменить сустав? Сначала к нам</span>
                  <span className="text-sm text-amber-700 font-medium">Осмотр с УЗИ · честная оценка стадии</span>
                </div>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_svf_promo')}
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
            При каких проблемах помогает SVF
          </h2>
          <p className="text-clinic-text-muted mb-8">Подбираем тактику под ваш сустав и стадию заболевания</p>
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
              onClick={() => trackGoal('click_svf_vidy')}
              className="inline-flex items-center gap-2 bg-clinic-teal text-white px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all shadow-md"
            >
              <Icon name="CalendarCheck" size={16} />
              Записаться на консультацию
            </a>
          </div>
        </div>
      </section>

      {/* ПОКАЗАНИЯ */}
      <section className="py-12 bg-clinic-warm">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Показания к SVF-терапии
          </h2>
          <p className="text-clinic-text-muted mb-8">Если у вас есть хотя бы один из симптомов — приходите на осмотр</p>
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
          <p className="text-clinic-text-muted mb-8">Амбулаторно, около 2 часов — госпитализация не требуется</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { step: "1", title: "Осмотр и УЗИ", desc: "Врач оценивает стадию артроза и честно говорит, будет ли метод эффективен именно в вашем случае." },
              { step: "2", title: "Забор жировой ткани", desc: "Под местной анестезией через микропрокол берётся небольшой объём жира с живота или бедра." },
              { step: "3", title: "Выделение клеток", desc: "Материал обрабатывается в закрытой стерильной системе — выделяется стромально-васкулярная фракция." },
              { step: "4", title: "Введение в сустав", desc: "Концентрат вводится внутрисуставно под контролем УЗИ. Через 30–40 минут вы уходите домой." },
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
          <p className="text-clinic-text-muted mb-8">Клиника «Ваш Ортопед» — честный подход к клеточной терапии</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: "UserCheck", title: "Опытные врачи", desc: "Процедуру проводят травматологи-ортопеды, владеющие всеми методами регенеративной медицины." },
              { icon: "Scan", title: "Введение под УЗИ", desc: "Все внутрисуставные манипуляции — только под ультразвуковым контролем, без попадания «мимо»." },
              { icon: "Stethoscope", title: "Честная оценка", desc: "Не назначаем SVF всем подряд. Если метод не поможет — скажем прямо и предложим альтернативу." },
              { icon: "ShieldCheck", title: "Собственный материал", desc: "Используется только ваша ткань — риск отторжения и иммунного конфликта исключён полностью." },
              { icon: "Wallet", title: "Прозрачные цены", desc: "Стоимость называем после осмотра, до начала лечения. Никаких скрытых доплат." },
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
          <p className="text-clinic-text-muted mb-8">О SVF-терапии в нашей клинике</p>
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
            Болит сустав? Узнайте, поможет ли SVF
          </h2>
          <p className="text-clinic-text-muted mb-8">
            Врач проведёт осмотр с УЗИ, определит стадию артроза и подберёт метод.
            Запись онлайн — без ожиданий, в удобное время.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_svf_final')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-md text-base"
            >
              <Icon name="CalendarCheck" size={18} />
              Записаться на консультацию
            </a>
            <button
              onClick={() => { setCallModalOpen(true); trackGoal('click_svf_final_zvonok'); }}
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
