import { useState } from "react";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";
import SEO from "@/components/SEO";

const PRICE_SECTIONS = [
  {
    title: "Консультации",
    icon: "Stethoscope",
    items: [
      { name: "Первичный приём ортопеда-травматолога", price: "2 500" },
      { name: "Повторный приём ортопеда-травматолога", price: "1 800" },
      { name: "Первичный приём невролога", price: "2 500" },
      { name: "Консультация по результатам МРТ/КТ", price: "1 500" },
      { name: "Консультация реабилитолога", price: "2 000" },
    ],
  },
  {
    title: "Диагностика",
    icon: "ScanLine",
    items: [
      { name: "МРТ одного сустава", price: "4 500" },
      { name: "МРТ позвоночника (один отдел)", price: "4 500" },
      { name: "Рентген (одна проекция)", price: "800" },
      { name: "УЗИ сустава", price: "1 800" },
      { name: "КТ суставов", price: "5 500" },
    ],
  },
  {
    title: "Физиотерапия",
    icon: "Zap",
    items: [
      { name: "Ударно-волновая терапия (1 зона)", price: "2 200" },
      { name: "Лазеротерапия (1 процедура)", price: "1 200" },
      { name: "Магнитотерапия (1 процедура)", price: "900" },
      { name: "Электрофорез (1 процедура)", price: "800" },
      { name: "Курс физиотерапии (10 процедур)", price: "7 500" },
    ],
  },
  {
    title: "Инъекции и блокады",
    icon: "Syringe",
    items: [
      { name: "Внутрисуставная инъекция (гиалуроновая к-та)", price: "8 500" },
      { name: "PRP-терапия (плазмолифтинг)", price: "6 000" },
      { name: "Лечебная блокада позвоночника", price: "4 500" },
      { name: "Блокада триггерных точек", price: "2 500" },
    ],
  },
  {
    title: "Реабилитация",
    icon: "Dumbbell",
    items: [
      { name: "Лечебная физкультура (1 занятие)", price: "1 500" },
      { name: "Лечебный массаж (30 мин)", price: "1 800" },
      { name: "Механотерапия (1 процедура)", price: "1 200" },
      { name: "Реабилитационная программа (1 мес)", price: "18 000" },
    ],
  },
];

export default function Prices() {
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <SEO
        title="Цены на услуги ортопеда и травматолога"
        description="Стоимость услуг клиники «Ваш Ортопед» в Новосибирске. Консультации, PRP-терапия, SVF-терапия, блокады, гиалуроновая кислота. Прозрачные цены без скрытых доплат."
        canonical="/prices"
        breadcrumbs={[{ name: "Главная", url: "/" }, { name: "Цены", url: "/prices" }]}
      />
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="CircleDollarSign" size={15} /> Прозрачные цены
            </div>
            <h1 className="font-display text-5xl text-clinic-text mb-4">Стоимость услуг</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Цены без скрытых доплат. При необходимости дополнительных исследований — согласовываем заранее.
            </p>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <nav className="space-y-1 sticky top-24">
              {PRICE_SECTIONS.map((section, i) => (
                <button
                  key={section.title}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    active === i
                      ? "bg-clinic-teal text-white"
                      : "text-clinic-text hover:bg-secondary"
                  }`}
                >
                  <Icon name={section.icon} size={16} />
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Price table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <Icon name={PRICE_SECTIONS[active].icon} size={20} className="text-clinic-teal" />
                <h2 className="font-display text-2xl text-clinic-text">{PRICE_SECTIONS[active].title}</h2>
              </div>
              <div className="divide-y divide-border">
                {PRICE_SECTIONS[active].items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/40 transition-colors">
                    <span className="text-sm text-clinic-text pr-4">{item.name}</span>
                    <span className="text-clinic-teal font-semibold font-body whitespace-nowrap">{item.price} ₽</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-clinic-teal-light rounded-xl p-4 flex items-start gap-3">
              <Icon name="Info" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
              <p className="text-sm text-clinic-text">
                Цены носят информационный характер. Точную стоимость уточняйте у администратора при записи. Пенсионерам и ветеранам — скидка 10%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14">
        <div className="container text-center">
          <h2 className="font-display text-3xl text-clinic-text mb-3">Хотите уточнить стоимость?</h2>
          <p className="text-clinic-text-muted mb-6 max-w-md mx-auto text-sm">
            Позвоните нам или запишитесь на консультацию — врач ответит на все вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
            >
              <Icon name="CalendarDays" size={15} /> Записаться на приём
            </button>
            <a
              href="tel:+79994649194"
              className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
            >
              <Icon name="Phone" size={15} /> +7 999 464 91 94
            </a>
          </div>
        </div>
      </section>
    </>
  );
}