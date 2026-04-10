import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const CONDITIONS = [
  "Остеохондроз шейного, грудного, поясничного отдела",
  "Межпозвоночные грыжи и протрузии",
  "Боли в спине и пояснице (люмбалгия, ишиас)",
  "Радикулопатия и защемление нерва",
  "Боли в шее и головные боли напряжения",
  "Онемение рук и ног",
  "Синдром запястного канала",
  "Миофасциальный болевой синдром",
];

const METHODS = [
  { icon: "Syringe", title: "Блокады позвоночника", desc: "Точечное введение препарата в зону воспаления — быстро снимает острую боль и спазм" },
  { icon: "Zap", title: "PRP-терапия", desc: "Плазмотерапия ускоряет восстановление межпозвоночных дисков и нервной ткани" },
  { icon: "Activity", title: "Внутривенные инфузии", desc: "Капельницы с витаминами группы B и противовоспалительными препаратами — питают нервную ткань" },
  { icon: "Shield", title: "Внутримышечные инъекции", desc: "Курсовое лечение для снятия воспаления, спазма и восстановления нервной проводимости" },
];

export default function Neurology() {
  return (
    <>
      <SEO
        title="Неврология в Новосибирске — лечение болей в спине, остеохондроза, грыжи"
        description="Неврология в клинике «Ваш Ортопед» в Новосибирске: лечение остеохондроза, грыжи диска, болей в спине и шее, защемления нерва. Блокады, PRP, капельницы. Запись онлайн."
        canonical="/services/neurology-clinic"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Неврология", url: "/services/neurology-clinic" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Неврология",
          "description": "Лечение болей в спине, остеохондроза и грыж позвоночника в Новосибирске",
          "medicineSystem": "WesternConventional",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
          "relevantSpecialty": "Neurological",
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Brain" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">Неврология в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Избавление от болей в спине, шее и конечностях — лечение остеохондроза, грыж и защемлений нерва
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Неврология в нашей клинике</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                Неврологические жалобы — боль в спине, онемение, прострелы — чаще всего связаны с позвоночником и окружающими его структурами. В клинике «Ваш Ортопед» в Новосибирске мы специализируемся именно на вертеброневрологии: лечении нервной системы через воздействие на позвоночник и суставы.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                Наш подход — устранить причину боли, а не просто заглушить симптомы. Мы применяем современные малоинвазивные методики, которые дают быстрый результат без операции и длительной реабилитации.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">С чем мы работаем</h2>
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
              <h2 className="font-display text-xl text-clinic-text mb-2">Когда нужно обратиться к неврологу</h2>
              <p className="text-sm text-clinic-text-muted mb-3">Не откладывайте визит, если вас беспокоит:</p>
              <ul className="space-y-1.5">
                {["Острая или хроническая боль в спине, пояснице, шее", "Онемение, покалывание или слабость в руках или ногах", "Боль, отдающая в руку или ногу", "Скованность по утрам, ограничение движений"].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-clinic-text">
                    <Icon name="AlertCircle" size={14} className="text-clinic-teal mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на приём</h3>
              <p className="text-sm text-clinic-text-muted mb-4">Первичная консультация — осмотр, разбор МРТ или рентгена, план лечения.</p>
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089&utm_source=site&utm_medium=organic&utm_campaign=neurology"
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