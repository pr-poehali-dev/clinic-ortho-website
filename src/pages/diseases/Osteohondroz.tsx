import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const SPINE_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/64785386-331a-40d5-a0ef-de342448151e.png";

const STEPS = [
  {
    number: "01",
    icon: "Syringe",
    title: "Снятие воспаления — медикаментозные блокады",
    desc: `Первый и ключевой этап лечения остеохондроза — быстрое и эффективное устранение болевого синдрома и воспаления. Врач вводит лекарственные препараты (анестетик + противовоспалительное) непосредственно в паравертебральную зону — ткани, окружающие позвоночник.`,
    details: [
      "Результат уже через 15–30 минут после процедуры",
      "Снятие острой боли, мышечного спазма и корешкового синдрома",
      "Точное введение под контролем врача",
      "Минимальный риск системных побочных эффектов",
    ],
  },
  {
    number: "02",
    icon: "Droplets",
    title: "Курс PRP-терапии (плазмотерапии)",
    desc: `После снятия острого воспаления назначается курс плазмотерапии — одного из наиболее эффективных методов регенеративной медицины. Из крови пациента выделяется плазма, богатая тромбоцитами (PRP — Platelet Rich Plasma), и вводится в поражённые ткани позвоночника.`,
    details: [
      "Стимулирует естественное восстановление межпозвонковых дисков",
      "Уменьшает хроническое воспаление и болевой синдром",
      "Улучшает кровоснабжение и питание хрящевой ткани",
      "Используется собственная плазма — полная биологическая совместимость",
      "Курс: 3–5 процедур с интервалом 7–10 дней",
    ],
  },
  {
    number: "03",
    icon: "FlaskConical",
    title: "Паравертебральное введение хондропротектора",
    desc: `Завершающий этап — введение хондропротектора паравертебрально (в околопозвоночные ткани) после курса плазмотерапии. Это позволяет закрепить и продлить достигнутый результат, активно питая хрящевую ткань дисков изнутри.`,
    details: [
      "Восстановление структуры межпозвонковых дисков",
      "Замедление дегенеративных процессов при остеохондрозе",
      "Пролонгирование эффекта PRP-терапии на месяцы вперёд",
      "Улучшение подвижности и снижение частоты обострений",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Сколько времени занимает полный курс лечения остеохондроза?",
    a: "Полный курс лечения обычно составляет 4–8 недель. Первый этап (блокады) — 1–2 процедуры, курс PRP — 3–5 сеансов, завершающее введение хондропротектора — 1–2 процедуры.",
  },
  {
    q: "Болезненны ли процедуры?",
    a: "Все инъекции выполняются с использованием тонких игл и местной анестезии. Большинство пациентов описывают ощущения как минимально дискомфортные.",
  },
  {
    q: "При каком остеохондрозе помогает этот метод?",
    a: "Методика эффективна при шейном, грудном и поясничном остеохондрозе, в том числе при грыжах и протрузиях межпозвонковых дисков, корешковом синдроме (ишиасе).",
  },
  {
    q: "Как долго сохраняется результат?",
    a: "При соблюдении рекомендаций врача результат лечения сохраняется от 6 месяцев до 1,5–2 лет. Для поддержания эффекта рекомендуется профилактический курс 1 раз в год.",
  },
];

export default function Osteohondroz() {
  return (
    <>
      <SEO
        title="Лечение остеохондроза в Новосибирске — клиника Ваш Ортопед"
        description="Эффективное лечение остеохондроза шейного, грудного и поясничного отдела позвоночника. Паравертебральные блокады, PRP-терапия. Клиника «Ваш Ортопед», Новосибирск. Запись: +7 999 464 91 94."
        canonical="/diseases/osteohondroz"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Заболевания", url: "/diseases" },
          { name: "Остеохондроз", url: "/diseases/osteohondroz" },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalCondition",
          "name": "Остеохондроз",
          "alternateName": "Osteochondrosis",
          "description": "Дегенеративно-дистрофическое заболевание позвоночника, поражающее межпозвоночные диски и прилегающие ткани.",
          "associatedAnatomy": {
            "@type": "AnatomicalStructure",
            "name": "Позвоночник"
          },
          "possibleTreatment": [
            {
              "@type": "MedicalTherapy",
              "name": "Паравертебральные блокады",
              "description": "Введение анестетика и противовоспалительного препарата в паравертебральную зону"
            },
            {
              "@type": "MedicalTherapy",
              "name": "PRP-терапия",
              "description": "Введение обогащённой тромбоцитами плазмы для восстановления тканей"
            }
          ],
          "recognizingAuthority": {
            "@type": "MedicalClinic",
            "name": "Ваш Ортопед",
            "telephone": "+7 999 464 91 94",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Есенина, д. 67",
              "addressLocality": "Новосибирск",
              "addressCountry": "RU"
            }
          }
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-clinic-warm min-h-[420px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={SPINE_IMG}
            alt="Лечение остеохондроза"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
        </div>
        <div className="container relative z-10 py-16">
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center gap-1 text-clinic-text-muted text-sm mb-6 hover:text-clinic-teal transition-colors">
              <Icon name="ChevronLeft" size={14} />
              На главную
            </Link>
            <div className="inline-flex items-center gap-2 bg-clinic-teal-light text-clinic-teal text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <Icon name="Activity" size={12} />
              Заболевания позвоночника
            </div>
            <h1 className="text-4xl md:text-5xl font-light leading-[1.15] text-clinic-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Лечение <span className="text-clinic-teal italic">остеохондроза</span>
            </h1>
            <p className="text-clinic-text-muted text-base leading-relaxed mb-6">
              Остеохондроз — дегенеративно-дистрофическое заболевание позвоночника, при котором разрушаются межпозвонковые диски и хрящевая ткань. Сопровождается болью, скованностью движений, онемением конечностей. Мы лечим остеохондроз шейного, грудного и поясничного отделов без операции.
            </p>
            <a
              href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-clinic-teal text-white px-6 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow-md"
            >
              <Icon name="CalendarDays" size={16} />
              Записаться на приём
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text mb-4">
            Комплексный подход к лечению остеохондроза
          </h2>
          <p className="text-clinic-text-muted leading-relaxed">
            В клинике «Ваш Ортопед» мы используем трёхэтапный протокол лечения остеохондроза, разработанный на основе современных принципов регенеративной медицины. Каждый этап усиливает эффект предыдущего, обеспечивая стойкое и длительное облегчение боли и восстановление функции позвоночника.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-secondary py-12">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-10">
            Этапы лечения остеохондроза
          </h2>
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {STEPS.map((step, idx) => (
              <div key={step.number} className="bg-white rounded-2xl p-8 border border-border shadow-sm flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                  <span className="text-5xl font-light text-clinic-teal/20 font-display leading-none">{step.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-clinic-teal flex items-center justify-center mt-2">
                    <Icon name={step.icon} size={22} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl text-clinic-text mb-3">{step.title}</h3>
                  <p className="text-clinic-text-muted leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-clinic-text-muted">
                        <Icon name="CheckCircle2" size={16} className="text-clinic-teal mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute right-0 items-center" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-8">
            Почему пациенты выбирают нас для лечения остеохондроза
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "Microscope", title: "Современные методы", desc: "PRP-терапия и паравертебральные инъекции — доказательная медицина без операций и длительной реабилитации" },
              { icon: "Clock", title: "Быстрый результат", desc: "Первое облегчение боли — уже после первой блокады. Устойчивый эффект — после полного курса" },
              { icon: "MapPin", title: "Удобное расположение", desc: "Клиника в Новосибирске, запись онлайн или по телефону, ежедневный приём" },
            ].map((item) => (
              <div key={item.title} className="bg-clinic-warm rounded-2xl p-6 border border-border">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-3">
                  <Icon name={item.icon} size={20} className="text-clinic-teal" />
                </div>
                <h3 className="font-semibold text-clinic-text mb-1">{item.title}</h3>
                <p className="text-sm text-clinic-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-12">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-clinic-text text-center mb-8">
            Часто задаваемые вопросы об остеохондрозе
          </h2>
          <div className="flex flex-col gap-4">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl p-6 border border-border">
                <h3 className="font-semibold text-clinic-text mb-2">{item.q}</h3>
                <p className="text-sm text-clinic-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-clinic-teal py-12">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
            Запишитесь на консультацию по остеохондрозу
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Врач проведёт осмотр, изучит снимки МРТ и составит индивидуальный план лечения. Не откладывайте — чем раньше начато лечение, тем лучше результат.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-clinic-teal px-6 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow-md"
            >
              <Icon name="CalendarDays" size={16} />
              Записаться онлайн
            </a>
            <a
              href="tel:+79994649194"
              className="inline-flex items-center justify-center gap-2 border border-white text-white px-6 py-3.5 rounded-xl font-medium text-sm hover:bg-white/10 transition-all"
            >
              <Icon name="Phone" size={16} />
              +7 999 464 91 94
            </a>
          </div>
        </div>
      </section>
    </>
  );
}