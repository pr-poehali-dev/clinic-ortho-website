import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SERVICES_LIST, type Service } from "./Services";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const API_URL = "https://functions.poehali.dev/e3850f3d-bba8-4c1c-8dbb-bf8d3f7bdd34";
const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const SERVICE_FAQS: Record<string, { q: string; a: string }[]> = {
  orthopedics: [
    { q: "Какие суставы лечит ортопед?", a: "Ортопед лечит все суставы: коленные, тазобедренные, плечевые, голеностопные, локтевые, суставы кистей и стоп, а также позвоночник. Принимаем с болями любой локализации." },
    { q: "Можно ли вылечить артроз без операции?", a: "В большинстве случаев — да. PRP-терапия, SVF-терапия и инъекции гиалуроновой кислоты позволяют восстановить хрящ и убрать боль без хирургического вмешательства даже при 2–3 стадии артроза." },
    { q: "Как быстро наступает эффект от лечения?", a: "Первые улучшения пациенты замечают уже после 1–2 процедур. Устойчивый результат формируется через 3–6 недель. Длительность эффекта зависит от метода и стадии заболевания." },
    { q: "Нужно ли направление от другого врача?", a: "Нет, направление не требуется. Вы можете записаться напрямую к нашему ортопеду-травматологу. Врач самостоятельно назначит все необходимые обследования." },
  ],
  traumatology: [
    { q: "В какие сроки нужно обратиться после травмы?", a: "Чем раньше — тем лучше. Идеально — в первые 24–48 часов. Своевременная помощь предотвращает осложнения и ускоряет восстановление в 2–3 раза." },
    { q: "Лечите ли вы застарелые травмы и последствия переломов?", a: "Да, мы работаем как со свежими травмами, так и с застарелыми повреждениями: неправильно сросшиеся переломы, хронические нестабильности суставов, повреждения связок и сухожилий." },
    { q: "Делаете ли вы рентген и МРТ на месте?", a: "УЗИ суставов врач проводит прямо на приёме. Для рентгена и МРТ направляем в партнёрские центры с минимальным ожиданием и скидкой для наших пациентов." },
    { q: "Как долго длится реабилитация после перелома?", a: "Сроки зависят от места и сложности перелома. Например, переломы пальцев срастаются за 3–4 недели, переломы голени — 6–8 недель. Мы составим индивидуальный план восстановления." },
  ],
  neurology: [
    { q: "При каких симптомах нужен невролог?", a: "Обратитесь к неврологу при болях в шее, спине или пояснице, онемении рук или ног, головных болях, головокружении, скованности по утрам, а также если боль отдаёт в руку или ногу." },
    { q: "Можно ли вылечить грыжу диска без операции?", a: "В 80–90% случаев — да. Современные методы: медикаментозные блокады, физиотерапия, лечебный массаж и ЛФК позволяют убрать симптомы грыжи и вернуться к нормальной жизни без операции." },
    { q: "Чем отличается протрузия от грыжи?", a: "Протрузия — это начальная стадия, при которой диск выпячивается, но оболочка ещё цела. Грыжа — это разрыв оболочки с выходом ядра. Оба состояния хорошо поддаются консервативному лечению." },
    { q: "Сколько нужно сеансов для лечения остеохондроза?", a: "Курс подбирается индивидуально. Как правило, для выраженного улучшения достаточно 5–10 сеансов. Поддерживающий курс рекомендуется 1–2 раза в год для профилактики обострений." },
  ],
  massage: [
    { q: "Какой вид массажа подходит при болях в спине?", a: "При болях в спине чаще всего назначают лечебный классический массаж, точечный или глубокотканный. Конкретный вид определяет врач после осмотра — самостоятельно назначать массаж при острой боли не рекомендуется." },
    { q: "Сколько сеансов массажа нужно на курс?", a: "Стандартный курс — 10 сеансов через день. При лёгких нарушениях достаточно 5–7 процедур. Для поддержания результата рекомендуем повторный курс каждые 3–6 месяцев." },
    { q: "Можно ли делать массаж при грыже позвоночника?", a: "Да, но только вне стадии обострения и только специалистом с медицинским образованием. Наши массажисты работают в связке с неврологом и ортопедом, что гарантирует безопасность процедуры." },
    { q: "Есть ли противопоказания к массажу?", a: "Да. Массаж противопоказан при острых воспалениях, высокой температуре, онкологии, тромбозе, открытых ранах и в период обострения хронических заболеваний. Перед курсом врач проведёт осмотр." },
  ],
  blockades: [
    { q: "Больно ли делать блокаду сустава?", a: "Процедура проводится с местной анестезией. Большинство пациентов отмечают лишь небольшой дискомфорт при введении иглы. Болевой синдром, ради снятия которого и делается блокада, уходит в течение нескольких минут." },
    { q: "Как долго длится эффект блокады?", a: "Эффект зависит от препарата и диагноза. Новокаиновые блокады действуют несколько часов, кортикостероидные — от 2 недель до 3 месяцев. Наш врач подберёт оптимальный вариант для вашего случая." },
    { q: "Сколько раз можно делать блокады?", a: "Частота зависит от препарата. Кортикостероиды не рекомендуется вводить в один сустав чаще 3–4 раз в год. Более щадящие альтернативы — гиалуроновая кислота и PRP — можно применять чаще." },
    { q: "Нужно ли как-то готовиться к блокаде?", a: "Специальной подготовки не требуется. Желательно не приходить натощак. После процедуры рекомендуем 20–30 минут отдохнуть в клинике и не нагружать сустав в этот день." },
  ],
  injections: [
    { q: "Чем отличается гиалуроновая кислота от PRP?", a: "Гиалуроновая кислота — это «смазка» для сустава: она восстанавливает синовиальную жидкость и питает хрящ. PRP (плазмотерапия) — это ваша собственная плазма с факторами роста, которая запускает регенерацию тканей изнутри." },
    { q: "Сколько уколов гиалуроновой кислоты нужно на курс?", a: "Курс составляет от 1 до 5 инъекций в зависимости от препарата и стадии артроза. Эффект сохраняется от 6 до 18 месяцев. Точное количество определяет врач после осмотра." },
    { q: "Больно ли делать инъекции в сустав?", a: "Укол делается тонкой иглой под местной анестезией. Большинство пациентов практически не чувствуют боли. После процедуры возможна небольшая отёчность, которая проходит за 1–2 дня." },
    { q: "При какой стадии артроза эффективны инъекции?", a: "Наилучшие результаты — при 1–3 стадии артроза. При 4 стадии (полное разрушение хряща) инъекции менее эффективны и чаще рассматривается эндопротезирование. Точную стадию определит врач на приёме." },
  ],
  analyses: [
    { q: "Какие анализы сдают при болях в суставах?", a: "Базовый набор: общий анализ крови, СРБ, РФ (ревматоидный фактор), мочевая кислота, АСО. При подозрении на системные заболевания назначают расширенную ревматологическую панель. Врач назначит нужные анализы после осмотра." },
    { q: "Как быстро готовы результаты анализов?", a: "Большинство анализов готовы в течение 1 рабочего дня. Расширенные ревматологические исследования — 2–3 рабочих дня. Результаты отправляются вам и вашему лечащему врачу." },
    { q: "Нужно ли сдавать анализы натощак?", a: "Большинство биохимических и иммунологических анализов сдаются натощак (8–12 часов без еды). Общий анализ крови можно сдавать не натощак. Точные рекомендации уточним при записи." },
    { q: "Можно ли сдать анализы без назначения врача?", a: "Да, вы можете сдать анализы самостоятельно. Но для правильной интерпретации результатов рекомендуем пройти консультацию врача — одни и те же показатели могут означать разные состояния." },
  ],
  infusions: [
    { q: "Сколько времени занимает капельница?", a: "В зависимости от состава и объёма раствора — от 30 минут до 2 часов. Процедура проходит в комфортном кресле, вы можете читать или пользоваться телефоном." },
    { q: "Какие препараты вводят внутривенно при заболеваниях суставов?", a: "Чаще всего применяют хондропротекторы (Хондрогард, Алфлутоп), НПВП (Ксефокам), сосудистые препараты, витамины группы B и растворы для детоксикации. Состав подбирает врач индивидуально." },
    { q: "Чем внутривенное введение лучше таблеток?", a: "Препарат попадает напрямую в кровь, минуя ЖКТ. Это даёт более быстрый и предсказуемый эффект, а также снижает нагрузку на желудок по сравнению с пероральными формами." },
    { q: "Нужна ли госпитализация для курса капельниц?", a: "Нет, все процедуры проводятся амбулаторно в нашей клинике. После капельницы вы можете идти домой. Курс обычно составляет 5–10 процедур через день или ежедневно." },
  ],
};

const SEO_META: Record<string, { title: string; description: string }> = {
  orthopedics: {
    title: "Ортопед в Новосибирске — лечение суставов, артроза, артрита | Ваш Ортопед",
    description: "Лечение артроза, артрита, бурсита, синовита, болей в суставах в Новосибирске. Ортопед-травматолог на Есенина 67. PRP, SVF, гиалуроновая кислота. Запись: +7 999 464 91 94.",
  },
  traumatology: {
    title: "Травматолог в Новосибирске — лечение переломов, вывихов, травм | Ваш Ортопед",
    description: "Лечение переломов, вывихов, растяжений, травм мягких тканей и связок в Новосибирске. Травматолог-ортопед на Есенина 67. Запись: +7 999 464 91 94.",
  },
  neurology: {
    title: "Невролог в Новосибирске — лечение остеохондроза, грыж, болей в спине | Ваш Ортопед",
    description: "Лечение остеохондроза, межпозвоночных грыж, протрузий, радикулопатии и болей в спине в Новосибирске. Невролог на Есенина 67. Без очередей. Запись: +7 999 464 91 94.",
  },
  massage: {
    title: "Лечебный массаж в Новосибирске — при болях в спине, суставах, реабилитация | Ваш Ортопед",
    description: "Лечебный, спортивный и восстановительный массаж при остеохондрозе, артрозе, грыжах и травмах в Новосибирске. Клиника Ваш Ортопед, Есенина 67. Запись: +7 999 464 91 94.",
  },
  blockades: {
    title: "Блокады суставов и позвоночника в Новосибирске — быстрое снятие боли | Ваш Ортопед",
    description: "Медикаментозные блокады для быстрого устранения боли в суставах и позвоночнике в Новосибирске. Опытные врачи, точное введение препарата. Запись: +7 999 464 91 94.",
  },
  injections: {
    title: "Инъекции в суставы в Новосибирске — гиалуроновая кислота, PRP | Ваш Ортопед",
    description: "Внутрисуставные инъекции гиалуроновой кислоты, PRP-терапия, обогащённая плазма для лечения артроза в Новосибирске. Клиника Ваш Ортопед. Запись: +7 999 464 91 94.",
  },
  analyses: {
    title: "Анализы в Новосибирске — лабораторная диагностика суставов | Ваш Ортопед",
    description: "Анализы крови и лабораторная диагностика при заболеваниях суставов и позвоночника в Новосибирске. Быстрые результаты. Клиника Ваш Ортопед. Запись: +7 999 464 91 94.",
  },
  infusions: {
    title: "Капельницы и внутривенные инфузии в Новосибирске | Ваш Ортопед",
    description: "Внутривенные инфузии для лечения заболеваний суставов и восстановления организма в Новосибирске. Клиника Ваш Ортопед, Есенина 67. Запись: +7 999 464 91 94.",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState<Service | undefined>(SERVICES_LIST.find((s) => s.slug === slug));
  const [loading, setLoading] = useState(!service);

  useEffect(() => {
    if (service) return;
    fetch(`${API_URL}?section=services`)
      .then((r) => r.json())
      .then((data: Service[]) => {
        SERVICES_LIST.splice(0, SERVICES_LIST.length, ...data);
        setService(data.find((s) => s.slug === slug));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-20 flex items-center justify-center gap-3 text-clinic-text-muted text-sm">
        <svg className="animate-spin h-5 w-5 text-clinic-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        Загрузка...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container py-10 text-center">
        <h2 className="font-display text-3xl text-clinic-text mb-4">Услуга не найдена</h2>
        <Link to="/services" className="text-clinic-teal hover:underline text-sm">← Вернуться к услугам</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={SEO_META[service.slug]?.title ?? `${service.title} в Новосибирске`}
        description={SEO_META[service.slug]?.description ?? `${service.desc} Клиника «Ваш Ортопед», Новосибирск, ул. Есенина, 67. Запись: +7 999 464 91 94.`}
        canonical={`/services/${service.slug}`}
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Услуги", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": service.title,
            "description": service.desc,
            "procedureType": "https://schema.org/TherapeuticProcedure",
            "provider": {
              "@type": "MedicalClinic",
              "name": "Ваш Ортопед",
              "url": "https://vash-ortoped.ru",
              "telephone": "+79994649194",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "ул. Есенина, д. 67",
                "addressLocality": "Новосибирск",
                "addressCountry": "RU"
              }
            }
          },
          ...(SERVICE_FAQS[service.slug] ? [{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": SERVICE_FAQS[service.slug].map(({ q, a }) => ({
              "@type": "Question",
              "name": q,
              "acceptedAnswer": { "@type": "Answer", "text": a },
            })),
          }] : []),
        ]}
      />
      {/* Breadcrumb */}
      <section className="bg-clinic-beige border-b border-border py-3">
        <div className="container flex items-center gap-2 text-sm text-clinic-text-muted">
          <Link to="/" className="hover:text-clinic-teal transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/services" className="hover:text-clinic-teal transition-colors">Услуги</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-clinic-text">{service.title}</span>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-clinic-beige py-10">
        <div className="container">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.color}`}>
            <Icon name={service.icon} size={26} />
          </div>
          <h1 className="font-display text-3xl md:text-5xl text-clinic-text mb-4">{service.title}</h1>
          <p className="text-clinic-text-muted text-lg max-w-xl leading-relaxed">{service.desc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-xl md:text-2xl text-clinic-text mb-4">Что входит в услугу</h2>
            <ul className="space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${service.color}`}>
                    <Icon name="Check" size={14} />
                  </div>
                  <span className="text-clinic-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-xl md:text-2xl text-clinic-text mb-4">Как проходит лечение</h2>
            <div className="space-y-5">
              {[
                { step: "01", title: "Первичная консультация", text: "Врач проводит осмотр, собирает анамнез, изучает имеющиеся документы и назначает необходимые обследования." },
                { step: "02", title: "Лабораторная диагностика", text: "При необходимости назначаем анализы крови и другие лабораторные исследования для точной постановки диагноза и оценки активности воспаления." },
                { step: "03", title: "Составление плана лечения", text: "Врач разрабатывает индивидуальную программу терапии с учётом возраста, образа жизни и состояния здоровья пациента." },
                { step: "04", title: "Лечение, массаж и контроль", text: "Проводим курс лечения — при показаниях назначаем лечебный массаж и физиотерапию. Регулярно контролируем результат и при необходимости корректируем программу." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="text-2xl font-display font-medium text-clinic-teal/30 shrink-0 w-9">{s.step}</div>
                  <div>
                    <h4 className="font-medium text-clinic-text mb-1">{s.title}</h4>
                    <p className="text-sm text-clinic-text-muted leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-clinic-teal text-white rounded-2xl p-6">
            <h3 className="font-display text-xl mb-2">Записаться на приём</h3>
            <p className="text-white/80 text-sm mb-5">Оставьте заявку — мы свяжемся в течение 30 минут</p>
            <a
              href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_zapis')}
              className="w-full bg-white text-clinic-teal py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all block text-center"
            >
              Оставить заявку
            </a>
            <span className="mt-3 flex items-center justify-center gap-2 border border-white/40 text-white py-3 rounded-xl font-medium text-sm w-full">
              <Icon name="Phone" size={14} /> +7 999 464 91 94
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-display text-xl text-clinic-text mb-4">Другие услуги</h3>
            <ul className="space-y-2">
              {SERVICES_LIST.filter((s) => s.slug !== slug).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="flex items-center gap-2 text-sm text-clinic-text hover:text-clinic-teal transition-colors py-1"
                  >
                    <Icon name="ArrowRight" size={13} className="text-clinic-teal" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {SERVICE_FAQS[service.slug] && (
        <section className="bg-clinic-beige py-12">
          <div className="container max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl text-clinic-text mb-2">Частые вопросы</h2>
              <p className="text-clinic-text-muted text-sm">Ответы на вопросы о {service.title.toLowerCase()}</p>
            </div>
            <ServiceFAQ faqs={SERVICE_FAQS[service.slug]} />
          </div>
        </section>
      )}
    </>
  );
}

function ServiceFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/80 transition-colors"
          >
            <span className="font-medium text-clinic-text text-sm leading-snug">{faq.q}</span>
            <Icon
              name="ChevronDown"
              size={18}
              className={`text-clinic-teal shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-clinic-text-muted leading-relaxed border-t border-border pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}