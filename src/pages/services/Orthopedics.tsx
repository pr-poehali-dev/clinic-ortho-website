import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const CONDITIONS = [
  "Артроз коленного, тазобедренного, плечевого суставов",
  "Артрит и синовит",
  "Бурсит и тендинит",
  "Межпозвоночные грыжи и протрузии",
  "Плечелопаточный периартрит",
  "Пяточная шпора (плантарный фасциит)",
  "Травмы связок и сухожилий",
  "Переломы и вывихи",
];

const METHODS = [
  { icon: "Syringe", title: "PRP-терапия", desc: "Инъекции обогащённой тромбоцитами плазмы — запускают естественное восстановление хряща и тканей суставов" },
  { icon: "Droplets", title: "Гиалуроновая кислота", desc: "Внутрисуставные инъекции — восстанавливают смазку сустава, уменьшают боль и скованность" },
  { icon: "Zap", title: "SVF-терапия", desc: "Инновационная терапия стромально-васкулярной фракцией — помогает при выраженном артрозе" },
  { icon: "Shield", title: "Блокады суставов", desc: "Быстрое снятие воспаления и боли под контролем УЗИ — эффект уже после первой процедуры" },
];

export default function Orthopedics() {
  return (
    <>
      <SEO
        title="Ортопедия в Новосибирске — лечение суставов и опорно-двигательного аппарата"
        description="Ортопедия в клинике «Ваш Ортопед» в Новосибирске: лечение артроза, артрита, бурсита, грыжи. PRP-терапия, гиалуроновая кислота, SVF-терапия. Запись онлайн."
        canonical="/services/orthopedics-clinic"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Ортопедия", url: "/services/orthopedics-clinic" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Ортопедия и травматология",
          "description": "Лечение заболеваний суставов и опорно-двигательного аппарата в Новосибирске",
          "medicineSystem": "WesternConventional",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
          "relevantSpecialty": "Orthopedic",
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Bone" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">Ортопедия в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Лечение заболеваний суставов и опорно-двигательного аппарата без операции — современными методами
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Что такое ортопедия и травматология</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                Ортопедия и травматология — это медицинская специальность, занимающаяся диагностикой и лечением заболеваний и травм опорно-двигательного аппарата: костей, суставов, связок, сухожилий и мышц. В клинике «Ваш Ортопед» в Новосибирске ведёт приём опытный врач-травматолог-ортопед, специализирующийся на безоперационных методах лечения.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                Мы помогаем пациентам избавиться от боли в суставах, восстановить подвижность и вернуться к активной жизни — без длительного пребывания в стационаре и хирургического вмешательства.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Какие заболевания мы лечим</h2>
              <ul className="space-y-2">
                {CONDITIONS.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-clinic-text-muted text-sm">
                    <Icon name="CheckCircle" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Методы лечения</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {METHODS.map((m) => (
                  <div key={m.title} className="bg-white border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                      <Icon name={m.icon} size={20} className="text-clinic-teal" />
                    </div>
                    <h3 className="font-semibold text-clinic-text mb-1">{m.title}</h3>
                    <p className="text-sm text-clinic-text-muted">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-clinic-teal-light rounded-2xl p-6">
              <h2 className="font-display text-xl text-clinic-text mb-3">Как проходит приём ортопеда</h2>
              <ol className="space-y-2">
                {["Сбор анамнеза и жалоб — врач выслушает вашу проблему", "Осмотр и пальпация суставов", "УЗИ сустава при необходимости — прямо на приёме", "Постановка диагноза и объяснение причины боли", "Составление плана лечения с учётом вашего образа жизни"].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-clinic-text">
                    <span className="w-6 h-6 rounded-full bg-clinic-teal text-white text-xs flex items-center justify-center shrink-0 font-bold">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на приём</h3>
              <p className="text-sm text-clinic-text-muted mb-4">Врач-травматолог-ортопед. Первичная консультация — осмотр, УЗИ, план лечения.</p>
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=orthopedics"
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