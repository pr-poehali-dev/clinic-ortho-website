import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEO";
import FAQ, { FAQ_SCHEMA } from "@/components/FAQ";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

const HERO_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/4a0a4c5f-8b18-4083-8a51-0d1df1369b90.jpg";
const REHAB_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/aa8f2ae4-c5c4-4024-b1f9-a436f73e2de7.jpg";

const ADVANTAGES = [
  { icon: "Dna", title: "SVF терапия (биоимплантация)", desc: "Метод регенеративной медицины, использующий клетки из собственной жировой ткани пациента (стволовые клетки). В некоторых случаях альтернатива эндопротезированию." },
  { icon: "Droplets", title: "PRP терапия (плазмотерапия)", desc: "Метод основан на введении собственной плазмы, богатой факторами роста из тромбоцитов, которая стимулирует заживление, синтез коллагена и уменьшает воспаление." },
  { icon: "Syringe", title: "Медикаментозные блокады", desc: "Введение лекарственных препаратов непосредственно в полость сустава для быстрого облегчения симптомов. Снимают острую боль, уменьшают воспаление и восстанавливают подвижность." },
  { icon: "FlaskConical", title: "Гиалуроновая кислота", desc: "Препараты восстанавливают свойства синовиальной жидкости, действуя как смазка и амортизатор. Питают хрящ, улучшают обмен веществ и стимулируют регенерацию." },
];

const SERVICES_PREVIEW = [
  { icon: "Bone", title: "Ортопедия и травматология", desc: "Лечение заболеваний суставов, опорно-двигательного аппарата и травм", href: "/services/orthopedics" },
  { icon: "Brain", title: "Неврология", desc: "Избавление от болей в спине — лечение остеохондроза, грыж и протрузий", href: "/services/neurology" },
  { icon: "Hand", title: "Массаж", desc: "Восстановление после заболеваний и травм опорно-двигательного аппарата", href: "/services/massage" },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Лечение суставов в Новосибирске — клиника Ваш Ортопед"
        description="Лечение артроза, артрита, бурсита, синовита в Новосибирске. PRP и SVF-терапия, гиалуроновая кислота, блокады. Врач-травматолог-ортопед. Запись: +7 999 464 91 94."
        canonical="/"
        schema={[LOCAL_BUSINESS_SCHEMA, FAQ_SCHEMA]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-clinic-warm min-h-[780px] flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Врач и пациент" className="w-4/5 h-full object-cover object-[80%_20%] opacity-80 absolute right-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-clinic-teal-light text-clinic-teal text-xs font-medium px-3 py-1.5 rounded-full mb-5 animate-fade-in">
              <Icon name="MapPin" size={12} />
              г. Новосибирск • Принимаем ежедневно
            </div>
            <h1 className="text-4xl md:text-5xl font-light leading-[1.15] text-clinic-text mb-5 animate-fade-in-up" style={{fontFamily: "'Playfair Display', serif"}}>
              Ваши суставы в <span className="text-clinic-teal italic">надёжных руках</span>
            </h1>
            <p className="text-clinic-text-muted text-base leading-relaxed mb-8 animate-fade-in-up-delay-1">
              Клиника лечения суставов. Мы возвращаем свободу движения и качество жизни людям любого возраста.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_zapis')}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarDays" size={16} />
                Записаться на приём
              </a>
              <span
                className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3.5 rounded-xl font-medium text-sm"
              >
                <Icon name="Phone" size={16} />
                +7 999 464 91 94
              </span>
            </div>

          </div>
        </div>

        {/* Специализации — прижаты к нижней границе hero */}
        <div className="absolute bottom-6 left-0 right-0 z-10 animate-fade-in-up-delay-2">
          <div className="container">
            <p className="text-xs text-clinic-text-muted uppercase tracking-widest mb-3 font-medium">Наша специализация</p>
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2">
              {[
                { icon: "Bone", label: "Ортопедия", href: "/services/orthopedics-clinic" },
                { icon: "Brain", label: "Неврология", href: "/services/neurology-clinic" },
                { icon: "Hand", label: "Массаж", href: "/services/massage-clinic" },
                { icon: "FlaskConical", label: "Анализы", href: "/services/lab-tests" },
                { icon: "Scan", label: "УЗИ суставов", href: "/services/ultrasound" },
                { icon: "Droplets", label: "Капельницы", href: "/services/infusions" },
              ].map(({ icon, label, href }) => (
                <Link key={label} to={href} className="flex items-center gap-2 bg-white/80 border-[3px] border-clinic-teal rounded-xl py-3 px-4 transition-transform duration-200 hover:scale-105" style={{boxShadow: '0 0 0 5px rgba(74,154,110,0.18), 0 0 12px 4px rgba(74,154,110,0.13)'}}>
                  <Icon name={icon} size={18} className="text-clinic-teal shrink-0" />
                  <span className="text-sm sm:text-lg font-bold text-clinic-text whitespace-nowrap">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* gradient: white → teal */}
      <div className="h-10 bg-gradient-to-b from-white to-[hsl(91,50%,38%)]" />

      {/* Diseases */}
      <section className="bg-clinic-teal py-6">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl text-white text-center mb-4">Что мы лечим</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            {[
              { titles: ["Артрит", "Артроз"], img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/5e7bc39d-36e2-4ecb-9def-1086449b0f96.jpeg", href: "/diseases/arthritis-arthrosis" },
              { titles: ["Тендинит", "Энтезит"], img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/03291c96-f0f2-4aa5-86a0-75edc001f8d8.jpeg", href: "/diseases/tendinitis-enthesitis" },
              { titles: ["Бурсит", "Синовит"], img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/cff70cef-9298-45a3-a248-c868d542bbfb.jpeg", href: "/diseases/bursitis" },
              { titles: ["Остеохондроз"], img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/64785386-331a-40d5-a0ef-de342448151e.png", href: "/diseases/osteohondroz" },
            ].map((item) => (
              <Link key={item.titles[0]} to={item.href} className="relative rounded-2xl cursor-pointer group block p-3">
                <img
                  src={item.img}
                  alt={item.titles.join(", ")}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden"
                />
                <div className="absolute inset-3 rounded-xl bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 gap-1">
                  <div className="flex flex-wrap justify-center gap-x-2">
                    {item.titles.map((t) => (
                      <span key={t} className="text-white font-bold text-xl leading-tight drop-shadow">{t}</span>
                    ))}
                  </div>
                  <span className="text-sm text-white/80 flex items-center gap-1 group-hover:text-white transition-colors mt-1">
                    Подробнее <Icon name="ArrowRight" size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* gradient: teal → secondary */}
      <div className="h-10 bg-gradient-to-b from-[hsl(91,50%,38%)] to-[hsl(203,60%,93%)]" />

      {/* Services preview */}
      <section className="bg-secondary py-10">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-4xl text-clinic-text mb-3">Наши услуги</h2>
            <p className="text-clinic-text-muted">Комплексная помощь при заболеваниях опорно-двигательного аппарата</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {SERVICES_PREVIEW.map((s) => (
              <Link key={s.title} to={s.href} className="bg-white rounded-2xl p-7 border border-border service-card block">
                <div className="w-12 h-12 rounded-xl bg-clinic-teal flex items-center justify-center mb-4">
                  <Icon name={s.icon} size={22} className="text-white" />
                </div>
                <h3 className="font-display text-2xl text-clinic-text mb-2">{s.title}</h3>
                <p className="text-sm text-clinic-text-muted leading-relaxed mb-4">{s.desc}</p>
                <span className="text-clinic-teal text-sm font-medium flex items-center gap-1">
                  Подробнее <Icon name="ArrowRight" size={14} />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3 rounded-xl font-medium hover:bg-clinic-teal-light transition-all text-sm"
            >
              Все услуги <Icon name="ArrowRight" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* gradient: secondary → white */}
      <div className="h-10 bg-gradient-to-b from-[hsl(203,60%,93%)] to-white" />

      {/* Advantages */}
      <section className="container py-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-4xl text-clinic-text mb-1">Клиника «Ваш Ортопед» — это</h2>
          <p className="text-clinic-text-muted">Сочетание многолетнего опыта наших врачей и современные методы лечения</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVANTAGES.map((adv) => (
            <div key={adv.title} className="bg-white rounded-2xl p-6 border border-border service-card">
              <div className="w-12 h-12 rounded-xl bg-clinic-teal-light flex items-center justify-center mb-4">
                <Icon name={adv.icon} size={22} className="text-clinic-teal" />
              </div>
              <h3 className="font-display text-xl text-clinic-text mb-2">{adv.title}</h3>
              <p className="text-sm text-clinic-text-muted leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* gradient: white → teal */}
      <div className="h-10 bg-gradient-to-b from-white to-[hsl(91,50%,38%)]" />

      {/* CTA Banner */}
      <section className="bg-clinic-teal py-10">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-4xl text-white mb-4">Не откладывайте здоровье на потом</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Запишитесь на консультацию сейчас и получите развёрнутый план лечения от наших специалистов
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-white text-clinic-teal px-7 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow"
            >
              <Icon name="CalendarDays" size={16} />
              Записаться на приём
            </button>
            <a
              href="tel:+79994649194"
              className="flex items-center justify-center gap-2 border border-white/50 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-white/10 transition-all text-sm"
            >
              <Icon name="Phone" size={16} />
              Позвонить нам
            </a>
          </div>
        </div>
      </section>
    </>
  );
}