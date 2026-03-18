import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";
import SEO from "@/components/SEO";

export const SERVICES_LIST = [
  {
    slug: "orthopedics",
    icon: "Bone",
    title: "Ортопедия",
    short: "Диагностика и лечение заболеваний суставов и позвоночника",
    desc: "Комплексное лечение артроза, артрита, деформаций стопы, заболеваний позвоночника. Применяем как консервативные, так и хирургические методы.",
    items: ["Лечение артроза и артрита", "Эндопротезирование суставов", "Лечение остеохондроза", "Исправление деформаций стопы", "Операции на позвоночнике"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    slug: "traumatology",
    icon: "Bandage",
    title: "Травматология",
    short: "Лечение переломов, вывихов и травм опорно-двигательного аппарата",
    desc: "Оказываем помощь при острых травмах и последствиях старых повреждений. Современные методы фиксации и минимально инвазивные операции.",
    items: ["Лечение переломов", "Вправление вывихов", "Пластика связок", "Лечение мениска", "Удаление металлоконструкций"],
    color: "bg-rose-50 text-rose-600",
  },
  {
    slug: "rehabilitation",
    icon: "Dumbbell",
    title: "Реабилитация",
    short: "Восстановительные программы после операций и травм",
    desc: "Индивидуальные программы восстановления с применением ЛФК, физиотерапии, массажа и современного оборудования.",
    items: ["ЛФК и кинезиотерапия", "Физиотерапия", "Лечебный массаж", "Механотерапия", "Гидрокинезотерапия"],
    color: "bg-teal-50 text-teal-600",
  },
  {
    slug: "diagnostics",
    icon: "ScanLine",
    title: "Диагностика",
    short: "МРТ, рентген, КТ и лабораторные исследования",
    desc: "Полный спектр диагностических исследований на оборудовании последнего поколения. Быстрое получение результатов и расшифровка.",
    items: ["МРТ суставов и позвоночника", "Рентгенография", "КТ исследования", "УЗИ суставов", "Лабораторные анализы"],
    color: "bg-amber-50 text-amber-600",
  },
  {
    slug: "physiotherapy",
    icon: "Zap",
    title: "Физиотерапия",
    short: "Аппаратные методы лечения боли и воспаления",
    desc: "Безоперационное лечение с помощью аппаратных методов: ударно-волновая терапия, лазер, магнитотерапия и другие.",
    items: ["Ударно-волновая терапия", "Лазеротерапия", "Магнитотерапия", "Электрофорез", "Ультразвуковая терапия"],
    color: "bg-purple-50 text-purple-600",
  },
  {
    slug: "injections",
    icon: "Syringe",
    title: "Блокады и инъекции",
    short: "Быстрое снятие боли и воспаления суставов",
    desc: "Лечебные блокады, инъекции гиалуроновой кислоты и PRP-терапия для быстрого и долгосрочного облегчения болевого синдрома.",
    items: ["Внутрисуставные инъекции", "Инъекции гиалуроновой кислоты", "PRP-терапия (плазмолифтинг)", "Блокады при болях в спине", "Блокады триггерных точек"],
    color: "bg-green-50 text-green-600",
  },
];

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openModal = (title: string) => {
    setSelectedService(title);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title="Услуги — ортопедия, травматология, PRP-терапия в Новосибирске"
        description="Ортопедия, травматология, PRP и SVF-терапия, гиалуроновая кислота, блокады, реабилитация. Клиника «Ваш Ортопед» в Новосибирске. Запись: +7 999 464 91 94."
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
            "url": `https://vashortopped.ru/services/${s.slug}`
          }))
        }}
      />
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} service={selectedService} />

      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="Stethoscope" size={15} /> Что мы лечим
            </div>
            <h1 className="font-display text-5xl text-clinic-text mb-4">Услуги клиники</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Полный спектр услуг в области ортопедии, травматологии и реабилитации. Выберите направление, чтобы узнать подробнее.
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
                <button
                  onClick={() => openModal(service.title)}
                  className="flex-1 bg-clinic-teal text-white text-sm font-medium py-2.5 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Записаться
                </button>
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