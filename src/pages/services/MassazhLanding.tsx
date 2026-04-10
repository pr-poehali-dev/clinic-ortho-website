import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=massazh";

const TYPES = [
  {
    icon: "HandHeart",
    title: "Лечебный массаж",
    desc: "Устраняет боль в спине, шее, пояснице. Снимает мышечные спазмы, восстанавливает подвижность позвоночника.",
    badge: "Популярно",
  },
  {
    icon: "Bone",
    title: "Массаж при остеохондрозе",
    desc: "Снижает нагрузку на диски, улучшает кровообращение, убирает онемение рук и ног.",
    badge: null,
  },
  {
    icon: "Activity",
    title: "Массаж при грыже позвоночника",
    desc: "Расслабляет мышцы вокруг грыжи, снимает болевой синдром без операции.",
    badge: null,
  },
  {
    icon: "Footprints",
    title: "Массаж ног и стоп",
    desc: "При варикозе, усталости ног, отёках. Улучшает венозный отток, снимает тяжесть.",
    badge: null,
  },
  {
    icon: "Shield",
    title: "Реабилитационный массаж",
    desc: "После травм, операций и переломов. Восстанавливает мышечный тонус и подвижность суставов.",
    badge: null,
  },
  {
    icon: "Smile",
    title: "Расслабляющий массаж",
    desc: "Снимает стресс, нормализует сон, снижает тревогу. Полное расслабление за 60 минут.",
    badge: null,
  },
];

const RESULTS = [
  { value: "1–3", label: "сеанса достаточно для снятия острой боли в спине" },
  { value: "10–15", label: "сеансов в курсе для стойкого результата" },
  { value: "60 мин", label: "стандартный сеанс лечебного массажа" },
  { value: "с 1-го сеанса", label: "пациенты чувствуют облегчение" },
];

const INDICATIONS = [
  "Боль в спине, пояснице, шее",
  "Остеохондроз позвоночника",
  "Межпозвонковые грыжи",
  "Мышечные спазмы и зажимы",
  "Сколиоз и нарушения осанки",
  "Реабилитация после травм",
  "Головные боли напряжения",
  "Онемение рук и ног",
  "Усталость и стресс",
  "Варикоз и отёки ног",
  "Синдром хронической усталости",
  "Профилактика заболеваний",
];

const FAQ_ITEMS = [
  {
    q: "Сколько сеансов нужно для результата?",
    a: "При острой боли — 1–3 сеанса дают заметное облегчение. Для стойкого результата и профилактики рекомендуем курс 10–15 сеансов. Массажист подберёт оптимальный план на первом приёме.",
  },
  {
    q: "Больно ли делать лечебный массаж?",
    a: "Лечебный массаж может вызывать умеренный дискомфорт в зонах напряжения — это нормально. Специалист всегда учитывает болевой порог пациента и регулирует интенсивность. После сеанса обычно наступает приятное расслабление.",
  },
  {
    q: "Есть ли противопоказания?",
    a: "Да: острые воспалительные процессы, онкологические заболевания, тромбозы, высокая температура, кожные заболевания в зоне воздействия. Перед курсом обязательно консультируйтесь с врачом.",
  },
  {
    q: "Можно ли совмещать массаж с другими процедурами?",
    a: "Да — массаж отлично сочетается с физиотерапией, PRP-терапией, лечебной физкультурой. Комплексный подход даёт лучший результат. Врач составит индивидуальную программу.",
  },
  {
    q: "Как подготовиться к сеансу массажа?",
    a: "Не есть за 1–2 часа до процедуры. Принять душ. На сеанс лучше взять удобное нижнее бельё. Если есть медицинские документы (снимки, заключения) — возьмите с собой.",
  },
  {
    q: "Какой интервал между сеансами?",
    a: "При лечебном курсе — через день или ежедневно, в зависимости от состояния. При расслабляющем — 1–2 раза в неделю. Массажист даст точные рекомендации после первого сеанса.",
  },
];

export default function MassazhLanding() {
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="Лечебный массаж в Новосибирске — запись, цены | Ваш Ортопед"
        description="Лечебный массаж в Новосибирске. Массаж при остеохондрозе, грыже, болях в спине и пояснице. Реабилитационный и расслабляющий массаж. Запись онлайн. Первичная консультация — 2500₽."
        keywords="лечебный массаж Новосибирск, массаж спины Новосибирск, массаж при остеохондрозе, массаж при грыже позвоночника, массаж поясницы, реабилитационный массаж, расслабляющий массаж Новосибирск, массаж шеи, массаж от боли в спине"
      />

      {/* HERO */}
      <section className="relative bg-clinic-warm md:min-h-[560px] flex items-center pt-8 pb-6 md:pt-10 md:pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/f7e0e41a-d81e-47ba-9d16-10d71c186fbf.jpg"
            alt="Лечебный массаж в Новосибирске"
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
              <span className="text-clinic-teal italic">Лечебный массаж</span><br />в Новосибирске
            </h1>
            <p className="text-clinic-text-muted text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Снимаем боль в спине, шее и пояснице. Лечебный, реабилитационный и расслабляющий массаж у опытных специалистов. Записывайтесь онлайн — без ожиданий.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_massage_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-7 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarCheck" size={16} />
                Записаться на массаж
              </a>
              <button
                onClick={() => { setCallModalOpen(true); trackGoal('click_massage_zvonok'); }}
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
                  <span className="text-base font-bold text-clinic-text block">Недорогой массаж в Новосибирске — от 800 ₽</span>
                  <span className="text-sm text-amber-700 font-medium">Запись сегодня · без очереди</span>
                </div>
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_massage_promo')}
                className="sm:ml-auto flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap"
              >
                <Icon name="CalendarDays" size={15} />
                Записаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ВИДЫ МАССАЖА */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Виды массажа
          </h2>
          <p className="text-clinic-text-muted mb-8">Подбираем вид массажа под вашу ситуацию и цель</p>
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
              onClick={() => trackGoal('click_massage_vidy')}
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
            Показания к лечебному массажу
          </h2>
          <p className="text-clinic-text-muted mb-8">Если у вас есть хотя бы один из симптомов — массаж поможет</p>
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

      {/* ЦЕНЫ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Стоимость массажа
          </h2>
          <p className="text-clinic-text-muted mb-8">Прозрачные цены — называем стоимость до начала</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { title: "Сеанс 10–30 минут", price: "800–1 500 ₽", desc: "Массаж отдельной зоны: спина, шея, поясница или ноги.", badge: "Старт" },
              { title: "Сеанс 60 минут", price: "3 000 ₽", desc: "Полноценный лечебный или расслабляющий массаж всей спины.", badge: "Основа" },
              { title: "Курс 10 сеансов", price: "Скидка 10%", desc: "При единовременной оплате курса. Стойкий результат и профилактика.", badge: "Выгодно" },
            ].map((p) => (
              <div key={p.title} className="bg-clinic-warm rounded-2xl p-6 border border-clinic-teal/10 shadow-sm relative">
                <span className="absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full bg-clinic-teal text-white">{p.badge}</span>
                <h3 className="text-lg font-bold text-clinic-text mb-1 pr-16">{p.title}</h3>
                <p className="text-3xl font-bold text-clinic-teal mb-3">{p.price}</p>
                <p className="text-sm text-clinic-text/75 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_massage_ceny')}
              className="inline-flex items-center gap-2 bg-clinic-teal text-white px-8 py-3.5 rounded-xl font-medium hover:opacity-90 transition-all shadow-md"
            >
              <Icon name="CalendarCheck" size={16} />
              Записаться на первый сеанс
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

      {/* ПОЧЕМУ МЫ */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-light text-clinic-text mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Почему выбирают нас
          </h2>
          <p className="text-clinic-text-muted mb-8">Клиника «Ваш Ортопед» — медицинский подход к массажу</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: "UserCheck", title: "Опытные специалисты", desc: "Массажисты с медицинским образованием и опытом 5+ лет. Знают анатомию и работают безопасно." },
              { icon: "Stethoscope", title: "Медицинский подход", desc: "Массаж назначается врачом после осмотра — с учётом диагноза и противопоказаний." },
              { icon: "Clock", title: "Запись в день обращения", desc: "Онлайн-запись без ожиданий. Принимаем в удобное для вас время." },
              { icon: "Wallet", title: "Прозрачные цены", desc: "Называем стоимость курса до начала. Никаких скрытых доплат." },
              { icon: "HeartHandshake", title: "Индивидуальный подбор", desc: "Вид и интенсивность массажа подбирается под каждого пациента персонально." },
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
          <p className="text-clinic-text-muted mb-8">О лечебном массаже в нашей клинике</p>
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
            Болит спина? Запишитесь на массаж
          </h2>
          <p className="text-clinic-text-muted mb-8">
            Опытный массажист снимет боль и напряжение уже после первого сеанса.
            Запись онлайн — без ожиданий, в удобное время.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_massage_final')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-all shadow-md text-base"
            >
              <Icon name="CalendarCheck" size={18} />
              Записаться на массаж
            </a>
            <button
              onClick={() => { setCallModalOpen(true); trackGoal('click_massage_final_zvonok'); }}
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