import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";
import SEO from "@/components/SEO";

const DISEASES = [
  {
    slug: "arthritis-arthrosis",
    title: "Артрит и Артроз",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/5e7bc39d-36e2-4ecb-9def-1086449b0f96.jpeg",
    desc: "Артрит и артроз — наиболее распространённые заболевания суставов, которые приводят к боли, скованности и ограничению подвижности. Мы применяем современные методы лечения, позволяющие остановить прогрессирование и вернуть качество жизни.",
    symptoms: [
      "Боль в суставе при движении и в покое",
      "Утренняя скованность более 30 минут",
      "Припухлость и покраснение сустава",
      "Хруст и щелчки при движении",
      "Ограничение подвижности",
      "Деформация сустава (при запущенных стадиях)",
    ],
    methods: [
      "PRP-терапия (плазмотерапия) — ускоряет регенерацию хрящевой ткани",
      "SVF-терапия (стволовые клетки) — восстановление без операции",
      "Введение гиалуроновой кислоты — смазка и питание сустава",
      "Медикаментозные блокады — быстрое снятие боли и воспаления",
      "Физиотерапия и ЛФК — укрепление мышц вокруг сустава",
    ],
    steps: [
      { step: "01", title: "Первичная консультация", text: "Ортопед проводит осмотр и собирает анамнез, определяет стадию заболевания." },
      { step: "02", title: "Диагностика", text: "МРТ, рентген, анализы крови — полная картина состояния сустава." },
      { step: "03", title: "Индивидуальный план лечения", text: "Выбираем оптимальную тактику с учётом стадии, возраста и образа жизни." },
      { step: "04", title: "Лечение и наблюдение", text: "Проводим курс процедур, контролируем динамику, при необходимости корректируем." },
    ],
  },
  {
    slug: "tendinitis-enthesitis",
    title: "Тендинит и Энтезит",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/03291c96-f0f2-4aa5-86a0-75edc001f8d8.jpeg",
    desc: "Тендинит — воспаление сухожилия, энтезит — воспаление в месте прикрепления сухожилия к кости. Оба состояния вызывают сильную боль и ограничивают движение. Современное лечение позволяет устранить воспаление без хирургического вмешательства.",
    symptoms: [
      "Боль в области сухожилия при нагрузке",
      "Болезненность при пальпации",
      "Отёк и местное повышение температуры",
      "Усиление боли после длительного отдыха",
      "Слабость и скованность конечности",
      "Характерный скрип при движении",
    ],
    methods: [
      "PRP-терапия — концентрированные факторы роста ускоряют заживление",
      "Ударно-волновая терапия — разрушение кальцинатов, улучшение кровотока",
      "Медикаментозные блокады — снятие острого воспаления",
      "Физиотерапия (ультразвук, электрофорез)",
      "Лечебная физкультура и растяжка",
    ],
    steps: [
      { step: "01", title: "Первичная консультация", text: "Врач определяет локализацию и степень воспаления, исключает разрыв сухожилия." },
      { step: "02", title: "УЗИ сухожилия", text: "Точная диагностика состояния мягких тканей без лучевой нагрузки." },
      { step: "03", title: "Подбор терапии", text: "Выбираем метод в зависимости от давности заболевания и степени повреждения." },
      { step: "04", title: "Восстановительный курс", text: "Проводим процедуры, обучаем правильной нагрузке для профилактики рецидивов." },
    ],
  },
  {
    slug: "synovitis",
    title: "Синовит",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/5e7bc39d-36e2-4ecb-9def-1086449b0f96.jpeg",
    desc: "Синовит — воспаление синовиальной оболочки сустава с накоплением жидкости (выпота). Чаще всего развивается в коленном суставе. Без лечения переходит в хроническую форму и приводит к нестабильности сустава.",
    symptoms: [
      "Выраженный отёк сустава с баллотированием надколенника",
      "Распирающая боль при накоплении жидкости",
      "Ограничение сгибания и разгибания",
      "Местное повышение температуры кожи",
      "Ощущение тяжести и напряжения в суставе",
      "Слабость мышц вокруг сустава",
    ],
    methods: [
      "Пункция сустава — удаление лишней жидкости для облегчения боли",
      "Введение кортикостероидов — быстрое снятие воспаления",
      "PRP-терапия — восстановление синовиальной оболочки",
      "Иммобилизация и разгрузка сустава на период обострения",
      "Физиотерапия после стихания острых явлений",
    ],
    steps: [
      { step: "01", title: "Первичная консультация", text: "Врач определяет причину синовита (травма, инфекция, системное заболевание)." },
      { step: "02", title: "УЗИ сустава", text: "Оцениваем объём выпота, состояние синовиальной оболочки, исключаем инфекцию." },
      { step: "03", title: "Лечебная пункция", text: "При необходимости удаляем жидкость и вводим противовоспалительный препарат." },
      { step: "04", title: "Реабилитация", text: "Восстанавливаем тонус мышц и разрабатываем сустав для предотвращения рецидива." },
    ],
  },
  {
    slug: "bursitis",
    title: "Бурсит",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/cff70cef-9298-45a3-a248-c868d542bbfb.jpeg",
    desc: "Бурсит — воспаление синовиальной сумки сустава, сопровождающееся скоплением жидкости и сильной болью. Чаще всего поражает плечо, локоть, колено и тазобедренный сустав. Лечится консервативно в большинстве случаев.",
    symptoms: [
      "Отёк и болезненная припухлость в области сустава",
      "Покраснение и местный жар",
      "Острая боль при движении и надавливании",
      "Ограничение подвижности сустава",
      "Мягкое флюктуирующее образование под кожей",
      "Повышение температуры тела при инфицировании",
    ],
    methods: [
      "Пункция и дренирование синовиальной сумки",
      "Медикаментозные блокады с кортикостероидами",
      "Антибиотикотерапия при септическом бурсите",
      "Физиотерапия — ускорение рассасывания экссудата",
      "Иммобилизация и разгрузка сустава",
    ],
    steps: [
      { step: "01", title: "Первичная консультация", text: "Врач осматривает сустав, определяет форму бурсита (острый, хронический, септический)." },
      { step: "02", title: "УЗИ и анализы", text: "Оцениваем объём выпота, исключаем инфекцию, определяем тактику лечения." },
      { step: "03", title: "Лечебная процедура", text: "Пункция для удаления жидкости или введение противовоспалительных препаратов." },
      { step: "04", title: "Реабилитация", text: "Физиотерапия и рекомендации по профилактике повторных обострений." },
    ],
  },
];

export const DISEASES_LIST = DISEASES;

export default function DiseaseDetail() {
  const { slug } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const disease = DISEASES.find((d) => d.slug === slug);

  if (!disease) {
    return (
      <div className="container py-10 text-center">
        <h2 className="font-display text-3xl text-clinic-text mb-4">Страница не найдена</h2>
        <Link to="/" className="text-clinic-teal hover:underline text-sm">← На главную</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${disease.title} — лечение в Новосибирске`}
        description={`${disease.desc} Клиника «Ваш Ортопед», Новосибирск, ул. Есенина, 67. Запись: +7 999 464 91 94.`}
        canonical={`/diseases/${disease.slug}`}
        image={disease.img}
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: disease.title, url: `/diseases/${disease.slug}` },
        ]}
      />
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Breadcrumb */}
      <section className="bg-clinic-beige border-b border-border py-3">
        <div className="container flex items-center gap-2 text-sm text-clinic-text-muted">
          <Link to="/" className="hover:text-clinic-teal transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-clinic-text">{disease.title}</span>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden bg-clinic-beige py-12">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-display text-5xl text-clinic-text mb-4 leading-tight">{disease.title}</h1>
            <p className="text-clinic-text-muted text-base leading-relaxed mb-6">{disease.desc}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow"
              >
                <Icon name="CalendarDays" size={16} />
                Записаться на приём
              </button>
              <a
                href="tel:+79994649194"
                className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal px-6 py-3.5 rounded-xl font-medium hover:bg-clinic-teal-light transition-all text-sm"
              >
                <Icon name="Phone" size={16} />
                Позвонить
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={disease.img} alt={disease.title} className="w-full h-72 object-cover" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">

          {/* Symptoms */}
          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-2xl text-clinic-text mb-5">Симптомы</h2>
            <ul className="space-y-3">
              {disease.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-clinic-teal-light flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="Check" size={13} className="text-clinic-teal" />
                  </div>
                  <span className="text-clinic-text text-sm leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methods */}
          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-2xl text-clinic-text mb-5">Методы лечения</h2>
            <ul className="space-y-3">
              {disease.methods.map((m) => (
                <li key={m} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-clinic-teal flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="Check" size={13} className="text-white" />
                  </div>
                  <span className="text-clinic-text text-sm leading-relaxed">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-2xl text-clinic-text mb-5">Как проходит лечение</h2>
            <div className="space-y-5">
              {disease.steps.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="text-2xl font-display font-medium text-clinic-teal/30 shrink-0 w-9">{s.step}</div>
                  <div>
                    <h4 className="font-medium text-clinic-text mb-1">{s.title}</h4>
                    <p className="text-sm text-clinic-text-muted leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-clinic-teal text-white rounded-2xl p-6">
            <h3 className="font-display text-xl mb-2">Записаться на приём</h3>
            <p className="text-white/80 text-sm mb-5">Оставьте заявку — свяжемся в течение 30 минут</p>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-white text-clinic-teal py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
            >
              Оставить заявку
            </button>
            <a
              href="tel:+79994649194"
              className="mt-3 flex items-center justify-center gap-2 border border-white/40 text-white py-3 rounded-xl font-medium text-sm hover:bg-white/10 transition-all w-full"
            >
              <Icon name="Phone" size={14} /> Позвонить
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-display text-xl text-clinic-text mb-4">Другие заболевания</h3>
            <ul className="space-y-2">
              {DISEASES.filter((d) => d.slug !== slug).map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/diseases/${d.slug}`}
                    className="flex items-center gap-2 text-sm text-clinic-text hover:text-clinic-teal transition-colors py-1"
                  >
                    <Icon name="ArrowRight" size={13} className="text-clinic-teal" />
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}