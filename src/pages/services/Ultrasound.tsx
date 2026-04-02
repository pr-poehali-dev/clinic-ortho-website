import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const JOINTS = [
  "Коленный сустав — мениски, связки, суставная жидкость",
  "Тазобедренный сустав — хрящ, капсула, бурсы",
  "Плечевой сустав — ротаторная манжета, сухожилия",
  "Голеностопный сустав — связки, сухожилия",
  "Локтевой сустав — связки, нервы",
  "Лучезапястный сустав и суставы кисти",
  "Мелкие суставы стоп и кистей",
];

const ADVANTAGES = [
  { icon: "Zap", title: "Быстро", desc: "Исследование занимает 10–20 минут, результат — сразу после процедуры" },
  { icon: "Shield", title: "Безопасно", desc: "Никакого излучения — метод абсолютно безвреден, подходит для повторных исследований" },
  { icon: "Eye", title: "Динамически", desc: "УЗИ показывает движение сустава в реальном времени — то, что недоступно МРТ и рентгену" },
  { icon: "Target", title: "Под контролем", desc: "Инъекции в сустав выполняются под УЗ-контролем — точно в нужную точку" },
];

export default function Ultrasound() {
  return (
    <>
      <SEO
        title="УЗИ суставов в Новосибирске — ультразвуковая диагностика коленного, плечевого, тазобедренного сустава"
        description="УЗИ суставов в Новосибирске в клинике «Ваш Ортопед»: коленный, плечевой, тазобедренный, голеностопный суставы. Результат сразу на приёме. Запись онлайн."
        canonical="/services/ultrasound"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "УЗИ суставов", url: "/services/ultrasound" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTest",
          "name": "УЗИ суставов",
          "description": "Ультразвуковая диагностика суставов в Новосибирске",
          "usedToDiagnose": "Артроз, артрит, повреждение менисков, разрыв связок, бурсит, синовит",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Scan" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">УЗИ суставов в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Ультразвуковая диагностика суставов — быстро, точно, без вреда для здоровья
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">УЗИ суставов: что это и зачем</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                УЗИ (ультразвуковое исследование) суставов — это метод визуализации мягкотканных структур: хряща, синовиальной оболочки, суставной жидкости, связок и сухожилий. Рентген показывает кости, МРТ — детальную структуру, но УЗИ незаменимо в режиме реального времени и доступно непосредственно на приёме у врача.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                В клинике «Ваш Ортопед» в Новосибирске врач-ортопед проводит УЗИ сустава прямо во время консультации. Это позволяет поставить диагноз и сразу назначить лечение — в одно посещение.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Какие суставы мы исследуем</h2>
              <ul className="space-y-2">
                {JOINTS.map((j) => (
                  <li key={j} className="flex items-start gap-3 text-clinic-text-muted text-sm">
                    <Icon name="CheckCircle" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
                    {j}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Преимущества УЗИ суставов</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADVANTAGES.map((a) => (
                  <div key={a.title} className="bg-white border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                      <Icon name={a.icon} size={20} className="text-clinic-teal" />
                    </div>
                    <h3 className="font-semibold text-clinic-text mb-1">{a.title}</h3>
                    <p className="text-sm text-clinic-text-muted">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-clinic-teal-light rounded-2xl p-6">
              <h2 className="font-display text-xl text-clinic-text mb-2">УЗИ + инъекция под контролем</h2>
              <p className="text-sm text-clinic-text-muted leading-relaxed">
                Особое преимущество УЗИ в нашей клинике — возможность выполнить инъекцию (PRP, гиалуроновая кислота, блокада) прямо под ультразвуковым контролем. Это повышает точность процедуры и её эффективность: препарат попадает точно в суставную полость, а не в окружающие ткани.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на УЗИ</h3>
              <p className="text-sm text-clinic-text-muted mb-4">УЗИ выполняется на приёме врача-ортопеда. Специальной подготовки не требуется.</p>
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
