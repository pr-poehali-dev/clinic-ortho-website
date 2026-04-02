import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const TYPES = [
  { title: "Лечебный массаж спины", desc: "Снимает мышечный спазм, улучшает кровообращение, уменьшает боль при остеохондрозе и протрузиях" },
  { title: "Массаж шейно-воротниковой зоны", desc: "Избавляет от головных болей, скованности в шее и напряжения при сидячей работе" },
  { title: "Массаж суставов", desc: "Улучшает подвижность и питание суставного хряща, снижает отёчность" },
  { title: "Общий лечебный массаж", desc: "Комплексное воздействие на всё тело — восстановление и профилактика" },
];

const INDICATIONS = [
  "Остеохондроз и боли в спине",
  "Реабилитация после травм и операций",
  "Артроз суставов (в стадии ремиссии)",
  "Мышечные спазмы и напряжение",
  "Нарушение осанки",
  "Хроническая усталость и стресс",
];

export default function Massage() {
  return (
    <>
      <SEO
        title="Лечебный массаж в Новосибирске — массаж спины, суставов, реабилитация"
        description="Лечебный массаж в клинике «Ваш Ортопед» в Новосибирске: массаж спины, шеи, суставов. Снятие боли, восстановление после травм, реабилитация. Запись онлайн."
        canonical="/services/massage-clinic"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Массаж", url: "/services/massage-clinic" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Лечебный массаж",
          "description": "Лечебный массаж спины, суставов и шейно-воротниковой зоны в Новосибирске",
          "medicineSystem": "WesternConventional",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Hand" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">Лечебный массаж в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Восстановление после заболеваний и травм опорно-двигательного аппарата — профессиональный лечебный массаж
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Лечебный массаж в клинике «Ваш Ортопед»</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                Лечебный массаж — это медицинская процедура, которая выполняется специалистом с профессиональной подготовкой. В отличие от расслабляющего массажа в спа, лечебный массаж направлен на устранение конкретной проблемы: снятие боли, устранение спазма, улучшение кровотока в поражённом участке.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                В клинике «Ваш Ортопед» в Новосибирске массаж проводится в составе комплексного лечения — в сочетании с физиотерапией, инъекционными методиками и рекомендациями ортопеда и невролога. Это позволяет добиться устойчивого результата.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Виды массажа</h2>
              <div className="space-y-3">
                {TYPES.map((t) => (
                  <div key={t.title} className="bg-white border border-border rounded-xl p-4">
                    <h3 className="font-semibold text-clinic-text mb-1">{t.title}</h3>
                    <p className="text-sm text-clinic-text-muted">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Показания к лечебному массажу</h2>
              <ul className="space-y-2">
                {INDICATIONS.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-clinic-text-muted text-sm">
                    <Icon name="CheckCircle" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-clinic-teal-light rounded-2xl p-6">
              <h2 className="font-display text-xl text-clinic-text mb-2">Как назначается курс массажа</h2>
              <p className="text-sm text-clinic-text-muted leading-relaxed">
                Массаж назначается врачом после осмотра. Специалист определяет зоны воздействия, интенсивность и количество сеансов в зависимости от диагноза. Как правило, курс составляет 8–10 сеансов. Первый результат ощущается уже после 3–4 процедур.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на массаж</h3>
              <p className="text-sm text-clinic-text-muted mb-4">Лечебный массаж назначается после консультации врача. Запишитесь — определим план лечения.</p>
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-clinic-teal text-white px-5 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
              >
                <Icon name="CalendarDays" size={15} /> Записаться онлайн
              </a>
              <a href="tel:+79994649194" className="w-full flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-5 py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all mt-2">
                <Icon name="Phone" size={15} /> +7 999 464 91 94
              </a>
              <p className="text-xs text-clinic-text-muted mt-3 text-center">г. Новосибирск, ул. Есенина, 67</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}