import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

export const SERVICES_LIST = [
  {
    slug: "orthopedics",
    icon: "Bone",
    title: "Ортопедия",
    short: "Лечение заболеваний суставов, позвоночника и деформаций опорно-двигательного аппарата",
    desc: "Консервативное лечение артроза, артрита, деформаций стопы, остеохондроза и заболеваний позвоночника. Врач подбирает индивидуальную программу терапии и, при необходимости, расписывает курс реабилитации после лечения.",
    items: ["Лечение артроза и артрита суставов", "Лечение остеохондроза и межпозвоночных грыж", "Коррекция деформаций стопы (вальгус, плоскостопие)", "Лечение сколиоза и нарушений осанки", "Подбор ортопедических стелек и ортезов"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    slug: "traumatology",
    icon: "Bandage",
    title: "Травматология",
    short: "Лечение переломов, вывихов, разрывов связок и травм опорно-двигательного аппарата",
    desc: "Комплексная помощь при острых травмах и последствиях застарелых повреждений. Применяем консервативные методы фиксации и лечения. После завершения основного курса врач составляет индивидуальную программу реабилитации для полного восстановления функций.",
    items: ["Лечение переломов и трещин костей", "Вправление и лечение вывихов", "Лечение разрывов связок и сухожилий", "Лечение повреждений мениска", "Лечение последствий спортивных травм"],
    color: "bg-rose-50 text-rose-600",
  },
  {
    slug: "blockades",
    icon: "ShieldPlus",
    title: "Блокады",
    short: "Лечебные блокады для быстрого снятия боли при патологиях суставов и позвоночника",
    desc: "Паравертебральные и периартикулярные блокады — эффективный метод быстрого купирования болевого синдрома. Процедура проводится опытным врачом-ортопедом в условиях клиники, снимает воспаление и восстанавливает подвижность за один сеанс.",
    items: ["Блокады при болях в шейном отделе позвоночника", "Блокады при болях в поясничном отделе позвоночника", "Периартикулярные блокады плечевого сустава", "Блокады при эпикондилите (теннисный локоть)", "Блокады триггерных точек при миофасциальном синдроме"],
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    slug: "injections",
    icon: "Syringe",
    title: "Инъекции",
    short: "Внутрисуставные инъекции, PRP-терапия и гиалуроновая кислота",
    desc: "Современные инъекционные методы лечения суставов без операции. Инъекции гиалуроновой кислоты восстанавливают суставную жидкость, PRP-терапия запускает собственные механизмы регенерации тканей — результат сохраняется до 12–18 месяцев.",
    items: ["Инъекции гиалуроновой кислоты в суставы", "PRP-терапия (плазмолифтинг) суставов", "SVF-терапия стромально-васкулярной фракцией", "Внутрисуставное введение кортикостероидов", "Пролотерапия при нестабильности связок"],
    color: "bg-green-50 text-green-600",
  },
  {
    slug: "analyses",
    icon: "FlaskConical",
    title: "Анализы",
    short: "Лабораторные анализы крови, мочи и синовиальной жидкости",
    desc: "Клиника проводит забор биоматериала и направляет образцы в аккредитованную лабораторию. Результаты анализов помогают врачу поставить точный диагноз, оценить активность воспаления и подобрать оптимальное лечение.",
    items: ["Общий и биохимический анализ крови", "Маркёры воспаления (СРБ, ревматоидный фактор)", "Анализ на мочевую кислоту (диагностика подагры)", "Гормональные и иммунологические исследования", "Исследование синовиальной жидкости сустава"],
    color: "bg-amber-50 text-amber-600",
  },
  {
    slug: "infusions",
    icon: "Droplets",
    title: "Внутривенные инфузии",
    short: "Капельницы с хондропротекторами, противовоспалительными и обезболивающими препаратами",
    desc: "Внутривенное введение лекарственных препаратов обеспечивает быстрое и точное действие — без потерь при прохождении через желудочно-кишечный тракт. Курс капельниц назначается врачом при выраженном болевом синдроме, обострении артроза или системных воспалительных заболеваниях.",
    items: ["Капельницы с хондропротекторами (хондроитин, глюкозамин)", "Внутривенная противовоспалительная терапия", "Инфузионная обезболивающая терапия", "Капельницы с препаратами для улучшения кровообращения", "Витаминно-минеральные инфузии для восстановления суставов"],
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Услуги — ортопедия, травматология, блокады, инъекции, анализы в Новосибирске"
        description="Ортопедия, травматология, блокады, инъекции гиалуроновой кислоты, PRP-терапия, анализы, внутривенные инфузии. Клиника «Ваш Ортопед» в Новосибирске. Запись: +7 999 464 91 94."
        canonical="/services"
        breadcrumbs={[{ name: "Главная", url: "/" }, { name: "Услуги", url: "/services" }]}
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Услуги клиники Ваш Ортопед",
          "itemListElement": SERVICES_LIST.map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": s.title,
            "description": s.desc,
            "url": `https://vash-ortoped.ru/services/${s.slug}`
          }))
        }}
      />
      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="Stethoscope" size={15} /> Что мы лечим
            </div>
            <h1 className="font-display text-5xl text-clinic-text mb-4">Услуги ортопеда в Новосибирске</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Ортопедия и травматология, блокады и инъекции, лабораторные анализы и внутривенные инфузии — всё в одной клинике. Выберите направление, чтобы узнать подробнее.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div key={service.slug} className="bg-white rounded-2xl border border-border overflow-hidden service-card flex flex-col">
              <div className={`p-6 pb-4 flex-1`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}>
                  <Icon name={service.icon} size={22} />
                </div>
                <h3 className="font-display text-2xl text-clinic-text mb-2">{service.title}</h3>
                <p className="text-sm text-clinic-text-muted mb-4 leading-relaxed">{service.desc}</p>
                <ul className="space-y-1.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-clinic-text-muted">
                      <Icon name="Check" size={13} className="text-clinic-teal shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 pt-0 flex gap-2 border-t border-border mt-4">
                <Link
                  to={`/services/${service.slug}`}
                  className="flex-1 text-center text-clinic-teal text-sm font-medium py-2.5 border border-clinic-teal rounded-lg hover:bg-clinic-teal-light transition-all"
                >
                  Подробнее
                </Link>
                <a
                  href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-clinic-teal text-white text-sm font-medium py-2.5 rounded-lg hover:bg-opacity-90 transition-all text-center"
                >
                  Записаться
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-clinic-teal text-white py-14">
        <div className="container text-center">
          <h2 className="font-display text-3xl mb-3">Нужна консультация?</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
            Позвоните нам — мы поможем разобраться с симптомами и направим к нужному специалисту
          </p>
          <a
            href="tel:+79994649194"
            className="inline-flex items-center gap-2 bg-white text-clinic-teal px-7 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
          >
            <Icon name="Phone" size={15} /> +7 999 464 91 94
          </a>
        </div>
      </section>
    </>
  );
}