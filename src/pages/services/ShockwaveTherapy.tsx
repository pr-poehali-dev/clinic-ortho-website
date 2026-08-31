import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const TYPES = [
  { title: "УВТ при пяточной шпоре", desc: "Разрушает кальцинаты в подошвенной фасции, убирает утреннюю боль в пятке. Эффективность 80–88%" },
  { title: "УВТ при тендините плеча", desc: "Рассасывает отложения кальция в сухожилии надостной мышцы, возвращает объём движений в плече" },
  { title: "УВТ при эпикондилите", desc: "Лечение «локтя теннисиста» и «локтя гольфиста» — снимает хроническую боль в локте" },
  { title: "УВТ при болях в спине и суставах", desc: "Работа с триггерными точками, миофасциальным синдромом и околосуставными тканями" },
];

const INDICATIONS = [
  "Пяточная шпора и подошвенный фасциит",
  "Кальцифицирующий тендинит плеча",
  "Эпикондилит локтевого сустава",
  "Тендинопатия ахиллова сухожилия",
  "Трохантерит тазобедренного сустава",
  "Миофасциальный болевой синдром",
];

export default function ShockwaveTherapy() {
  return (
    <>
      <SEO
        title="Ударно-волновая терапия в Новосибирске — УВТ суставов, пяточной шпоры"
        description="Ударно-волновая терапия (УВТ) в клинике «Ваш Ортопед» в Новосибирске: лечение пяточной шпоры, тендинита плеча, эпикондилита. Без проколов и наркоза. Запись онлайн."
        canonical="/services/shockwave-therapy"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Ударно-волновая терапия", url: "/services/shockwave-therapy" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Ударно-волновая терапия (УВТ)",
          "description": "Ударно-волновая терапия при пяточной шпоре, тендините, эпикондилите и болях в суставах в Новосибирске",
          "medicineSystem": "WesternConventional",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Waves" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">Ударно-волновая терапия в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Лечение пяточной шпоры, тендинитов и хронических болей в суставах без проколов и наркоза
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">УВТ в клинике «Ваш Ортопед»</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                Ударно-волновая терапия — аппаратный метод лечения, при котором в поражённую зону направляют акустические волны высокой энергии. Они проходят через кожу без проколов, разрушают отложения кальция, усиливают кровоснабжение сухожилий и запускают восстановление ткани там, где мази и таблетки уже не помогают.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                В клинике «Ваш Ортопед» в Новосибирске процедуру проводит врач травматолог-ортопед, а наведение аппликатора выполняется по данным УЗИ — это гарантирует, что воздействие идёт точно в зону поражения. Курс всегда дополняется программой упражнений и, при необходимости, подбором ортопедических стелек.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Виды процедур УВТ</h2>
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
              <h2 className="font-display text-2xl text-clinic-text mb-4">Показания к ударно-волновой терапии</h2>
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
              <h2 className="font-display text-xl text-clinic-text mb-2">Как назначается курс УВТ</h2>
              <p className="text-sm text-clinic-text-muted leading-relaxed">
                Курс назначается врачом после осмотра и УЗИ-диагностики. Специалист определяет зону воздействия, тип аппарата и мощность в зависимости от диагноза. Как правило, курс составляет 3–7 процедур с интервалом 5–10 дней. Первое облегчение пациенты отмечают уже после 1–2 сеансов, максимальный эффект развивается через 4–12 недель после завершения курса.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на УВТ</h3>
              <p className="text-sm text-clinic-text-muted mb-4">Ударно-волновая терапия назначается после консультации врача. Запишитесь — определим план лечения.</p>
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=shockwave-therapy"
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
