import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";

const HERO_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/3d7e3e0f-9ab2-42fd-bcba-6a199b3118ab.jpg";
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
      <section className="bg-clinic-warm py-16 md:py-20">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-clinic-teal-light text-clinic-teal text-xs font-medium px-3 py-1.5 rounded-full mb-5 animate-fade-in">
              <Icon name="MapPin" size={12} />
              г. Новосибирск • Принимаем ежедневно
            </div>
            <h1 className="text-4xl md:text-5xl font-light leading-[1.15] text-clinic-text mb-5 animate-fade-in-up" style={{fontFamily: "'Playfair Display', serif"}}>
              Ваши суставы<br />
              <span className="text-clinic-teal italic">в надёжных руках</span>
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
          {/* Photo */}
          <div className="relative animate-fade-in">
            <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src={HERO_IMG} alt="Врач и пациент" className="w-full h-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-clinic-teal-light flex items-center justify-center shrink-0">
                <Icon name="Star" size={16} className="text-clinic-teal" />
              </div>
              <div>
                <div className="text-xs text-clinic-text-muted">Рейтинг клиники</div>
                <div className="text-sm font-semibold text-clinic-text">4.9 / 5.0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-clinic-teal text-white py-8">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "20+", label: "лет работы" },
            { num: "15 000", label: "пациентов" },
            { num: "12", label: "врачей" },
            { num: "95%", label: "успешных случаев" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-semibold">{s.num}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-clinic-text mb-3">Почему выбирают нас</h2>
          <p className="text-clinic-text-muted max-w-lg mx-auto">Мы сочетаем многолетний опыт с современными методами лечения</p>
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

      {/* Services preview */}
      <section className="bg-secondary py-20">
        <div className="container">
          <div className="text-center mb-12">
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

      {/* Rehab section */}
      <section className="container py-20">
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
      <section className="bg-clinic-teal text-white py-16">
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