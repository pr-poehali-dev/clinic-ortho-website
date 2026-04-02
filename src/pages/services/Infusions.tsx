import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const TYPES = [
  { icon: "Droplets", title: "Внутривенные капельницы", desc: "Медленное введение препарата — максимальное всасывание, мягкое воздействие на организм. Продолжительность 30–60 минут." },
  { icon: "Syringe", title: "Внутривенные струйные", desc: "Быстрое введение препарата в вену — применяется при острых состояниях и в комплексном лечении." },
  { icon: "Activity", title: "Внутримышечные инъекции", desc: "Курсовые инъекции витаминов, противовоспалительных и хондропротекторов для лечения суставов и позвоночника." },
];

const INDICATIONS = [
  "Обострение остеохондроза и радикулита",
  "Выраженный болевой синдром при артрозе",
  "Восстановление после операций на суставах",
  "Питание нервной ткани при неврологических заболеваниях",
  "Системная противовоспалительная терапия",
  "Хондропротекторная терапия (восстановление хряща)",
];

export default function Infusions() {
  return (
    <>
      <SEO
        title="Капельницы и инъекции в Новосибирске — внутривенные инфузии при болях в суставах"
        description="Капельницы и внутривенные инъекции в Новосибирске в клинике «Ваш Ортопед»: лечение болей в суставах и позвоночнике, витамины группы B, хондропротекторы. Запись онлайн."
        canonical="/services/infusions"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Капельницы", url: "/services/infusions" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Внутривенные инфузии и инъекционная терапия",
          "description": "Капельницы и инъекции для лечения заболеваний суставов и позвоночника в Новосибирске",
          "medicineSystem": "WesternConventional",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Droplets" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">Капельницы в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Внутривенные инфузии и инъекции для лечения болей в суставах, позвоночнике и нервной системе
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Инфузионная терапия при заболеваниях суставов</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                Внутривенное и внутримышечное введение препаратов — один из самых эффективных способов доставки лекарства в организм. При таком пути введения препарат действует быстро и полностью, минуя желудочно-кишечный тракт. Это особенно важно при острых болях и в случаях, когда таблетки плохо переносятся.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                В клинике «Ваш Ортопед» в Новосибирске процедуры проводятся в комфортных условиях под наблюдением медперсонала. Курс назначается врачом-ортопедом индивидуально.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Виды инфузий и инъекций</h2>
              <div className="space-y-4">
                {TYPES.map((t) => (
                  <div key={t.title} className="bg-white border border-border rounded-2xl p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                      <Icon name={t.icon} size={20} className="text-clinic-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-clinic-text mb-1">{t.title}</h3>
                      <p className="text-sm text-clinic-text-muted">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Показания к инфузионной терапии</h2>
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
              <h2 className="font-display text-xl text-clinic-text mb-2">Что входит в курс капельниц</h2>
              <p className="text-sm text-clinic-text-muted leading-relaxed mb-3">
                Состав инфузии подбирается врачом индивидуально. Как правило, это комбинация:
              </p>
              <ul className="space-y-1.5">
                {["Витамины группы B (B1, B6, B12) — восстановление нервной проводимости", "НПВС — снятие воспаления и боли", "Хондропротекторы — восстановление хряща", "Сосудистые препараты — улучшение питания тканей"].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-clinic-text">
                    <Icon name="ArrowRight" size={13} className="text-clinic-teal mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на капельницу</h3>
              <p className="text-sm text-clinic-text-muted mb-4">Курс назначается после осмотра врача. Процедуры проводятся в удобное для вас время.</p>
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
