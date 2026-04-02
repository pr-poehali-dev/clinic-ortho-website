import SEO from "@/components/SEO";
import Icon from "@/components/ui/icon";

const TESTS = [
  { icon: "Droplets", title: "Общий анализ крови", desc: "Базовый показатель состояния здоровья, воспаления и иммунитета" },
  { icon: "FlaskConical", title: "Биохимия крови", desc: "Оценка работы почек, печени, уровня мочевой кислоты, глюкозы" },
  { icon: "Activity", title: "Маркеры воспаления", desc: "СОЭ, С-реактивный белок, ревматоидный фактор — диагностика артрита и аутоиммунных заболеваний" },
  { icon: "Syringe", title: "Гормоны и витамины", desc: "Витамин D, кальций, паратгормон — важны при заболеваниях костей и суставов" },
];

const REASONS = [
  "Контроль воспаления при артрите и артрозе",
  "Оценка эффективности лечения",
  "Подготовка к PRP-терапии или SVF-терапии",
  "Диагностика перед назначением курса лечения",
  "Ежегодный профилактический осмотр",
];

export default function LabTests() {
  return (
    <>
      <SEO
        title="Анализы крови в Новосибирске — сдать анализы в клинике «Ваш Ортопед»"
        description="Сдать анализы крови в Новосибирске в клинике «Ваш Ортопед»: общий анализ, биохимия, маркеры воспаления, ревматоидный фактор. Быстро, точно, рядом с домом."
        canonical="/services/lab-tests"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Анализы", url: "/services/lab-tests" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalTest",
          "name": "Лабораторная диагностика",
          "description": "Забор и анализ крови для диагностики заболеваний суставов и позвоночника в Новосибирске",
          "usedToDiagnose": "Артрит, артроз, остеохондроз, воспалительные заболевания суставов",
          "recognizingAuthority": { "@type": "Organization", "name": "Ваш Ортопед" },
        }}
      />

      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="FlaskConical" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">Анализы в Новосибирске</h1>
          </div>
          <p className="text-clinic-text-muted text-sm md:text-base max-w-2xl ml-9">
            Забор крови и лабораторная диагностика для точного выявления причины болей в суставах и позвоночнике
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Анализы для диагностики суставов</h2>
              <p className="text-clinic-text-muted leading-relaxed mb-3">
                Точный диагноз невозможен без лабораторных данных. Боль в суставах может быть следствием артроза, артрита, подагры, аутоиммунного заболевания — внешне симптомы похожи, но лечение принципиально разное. Анализы крови помогают врачу понять, что именно происходит в организме.
              </p>
              <p className="text-clinic-text-muted leading-relaxed">
                В клинике «Ваш Ортопед» в Новосибирске вы можете сдать анализы прямо на приёме — забор крови выполняется в день визита, результаты передаются в лабораторию немедленно.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Какие анализы мы берём</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TESTS.map((t) => (
                  <div key={t.title} className="bg-white border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                      <Icon name={t.icon} size={20} className="text-clinic-teal" />
                    </div>
                    <h3 className="font-semibold text-clinic-text mb-1">{t.title}</h3>
                    <p className="text-sm text-clinic-text-muted">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-clinic-text mb-4">Когда нужно сдать анализы</h2>
              <ul className="space-y-2">
                {REASONS.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-clinic-text-muted text-sm">
                    <Icon name="CheckCircle" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-clinic-teal-light rounded-2xl p-6">
              <h2 className="font-display text-xl text-clinic-text mb-2">Удобно: забор крови на приёме</h2>
              <p className="text-sm text-clinic-text-muted leading-relaxed">
                Не нужно ехать в отдельную лабораторию. Медсестра возьмёт кровь прямо во время визита к врачу. Результаты готовы в течение 1–2 рабочих дней и отправляются вам удобным способом.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-display text-lg text-clinic-text mb-4">Записаться на анализы</h3>
              <p className="text-sm text-clinic-text-muted mb-4">Забор крови выполняется в день визита. Приходите натощак (голодание 8 часов).</p>
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
