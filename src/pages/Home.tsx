import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";

const HERO_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/4a0a4c5f-8b18-4083-8a51-0d1df1369b90.jpg";
const REHAB_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/aa8f2ae4-c5c4-4024-b1f9-a436f73e2de7.jpg";

const ADVANTAGES = [
  { icon: "Shield", title: "20 лет опыта", desc: "Клиника работает с 2005 года. Более 15 000 пациентов прошли лечение." },
  { icon: "Users", title: "Опытные врачи", desc: "12 специалистов высшей категории, кандидаты медицинских наук." },
  { icon: "Activity", title: "Современное оборудование", desc: "МРТ, КТ, рентген и физиотерапевтические комплексы последнего поколения." },
  { icon: "Heart", title: "Индивидуальный подход", desc: "Программа лечения составляется персонально для каждого пациента." },
];

const SERVICES_PREVIEW = [
  { icon: "Bone", title: "Ортопедия", desc: "Лечение заболеваний суставов, позвоночника и опорно-двигательного аппарата", href: "/services/orthopedics" },
  { icon: "Bandage", title: "Травматология", desc: "Лечение переломов, вывихов, травм мягких тканей и реабилитация", href: "/services/traumatology" },
  { icon: "Dumbbell", title: "Реабилитация", desc: "Восстановительные программы после операций и травм", href: "/services/rehabilitation" },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-clinic-warm min-h-[580px] flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Врач и пациент" className="w-4/5 h-full object-cover object-[80%_20%] opacity-80 absolute right-0" />
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
              Клиника ортопедии и травматологии. Мы возвращаем свободу движения и качество жизни людям любого возраста.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up-delay-2">
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm shadow-md"
              >
                <Icon name="CalendarDays" size={16} />
                Записаться на приём
              </button>
              <a
                href="tel:+79994649194"
                className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3.5 rounded-xl font-medium hover:bg-clinic-teal-light transition-all text-sm"
              >
                <Icon name="Phone" size={16} />
                +7 999 464 91 94
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-secondary py-10">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl text-clinic-text mb-3">Наши услуги</h2>
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

      {/* Advantages */}
      <section className="container py-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl text-clinic-text mb-1">Клиника «Ваш Ортопед» — это</h2>
          <p className="text-clinic-text-muted whitespace-nowrap">Сочетание многолетнего опыта наших врачей и современные методы лечения</p>
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

      {/* Rehab section */}
      <section className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img src={REHAB_IMG} alt="Реабилитация" className="rounded-2xl w-full h-80 object-cover shadow-md" />
          </div>
          <div>
            <h2 className="font-display text-4xl text-clinic-text mb-5 leading-tight">
              Реабилитация после<br />операций и травм
            </h2>
            <p className="text-clinic-text-muted leading-relaxed mb-4">
              Наша программа реабилитации разработана специально для людей старшего возраста. Мы помогаем восстановить функции суставов, укрепить мышцы и вернуться к полноценной жизни.
            </p>
            <ul className="space-y-3 mb-7">
              {["Индивидуальная программа упражнений", "Физиотерапия и массаж", "Психологическая поддержка", "Контроль на каждом этапе"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-clinic-text">
                  <Icon name="Check" size={16} className="text-clinic-teal shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-clinic-teal text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm"
            >
              <Icon name="CalendarDays" size={15} />
              Записаться на консультацию
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-clinic-teal text-white py-10">
        <div className="container text-center">
          <h2 className="font-display text-4xl mb-4">Не откладывайте здоровье на потом</h2>
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