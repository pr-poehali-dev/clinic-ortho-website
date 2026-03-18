import { useState } from "react";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";

const DOCTOR_IMG = "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/89f6e07c-a644-417c-a248-ae426b56751b.jpg";

const DOCTORS = [
  {
    name: "Сергей Владимирович Орлов",
    specialty: "Ортопед-травматолог",
    category: "Высшая категория",
    experience: "24 года опыта",
    desc: "Кандидат медицинских наук. Специализируется на эндопротезировании суставов и лечении дегенеративных заболеваний позвоночника.",
    img: DOCTOR_IMG,
  },
  {
    name: "Елена Николаевна Захарова",
    specialty: "Врач-реабилитолог",
    category: "Первая категория",
    experience: "16 лет опыта",
    desc: "Специалист по восстановительному лечению после травм и операций. Разрабатывает индивидуальные программы реабилитации.",
    img: null,
  },
  {
    name: "Андрей Петрович Куликов",
    specialty: "Травматолог-ортопед",
    category: "Высшая категория",
    experience: "19 лет опыта",
    desc: "Специализируется на лечении спортивных травм, повреждений связочного аппарата и артроскопических операциях.",
    img: null,
  },
  {
    name: "Ирина Михайловна Власова",
    specialty: "Невролог",
    category: "Высшая категория",
    experience: "22 года опыта",
    desc: "Занимается диагностикой и лечением болевых синдромов, остеохондроза, грыж межпозвонковых дисков.",
    img: null,
  },
];

const INITIALS_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-rose-100 text-rose-600",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-600",
];

export default function Doctors() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const openModal = (name: string) => {
    setSelectedDoctor(name);
    setModalOpen(true);
  };

  return (
    <>
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} service={selectedDoctor ? `Запись к врачу: ${selectedDoctor}` : ""} />

      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="Users" size={15} /> Наша команда
            </div>
            <h1 className="font-display text-5xl text-clinic-text mb-4">Наши врачи</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Команда опытных специалистов с многолетней практикой. Каждый врач прошёл стажировки в ведущих клиниках России и Европы.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOCTORS.map((doctor, i) => (
            <div key={doctor.name} className="bg-white rounded-2xl border border-border overflow-hidden doctor-card flex flex-col sm:flex-row">
              {doctor.img ? (
                <img src={doctor.img} alt={doctor.name} className="w-full sm:w-44 h-52 sm:h-auto object-cover shrink-0" />
              ) : (
                <div className={`w-full sm:w-44 h-32 sm:h-auto flex items-center justify-center shrink-0 text-4xl font-display font-medium ${INITIALS_COLORS[i % INITIALS_COLORS.length]}`}>
                  {doctor.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1 bg-clinic-teal-light text-clinic-teal text-xs px-2.5 py-1 rounded-full mb-3">
                    <Icon name="Award" size={11} /> {doctor.category}
                  </div>
                  <h3 className="font-display text-2xl text-clinic-text mb-1">{doctor.name}</h3>
                  <p className="text-clinic-teal text-sm font-medium mb-3">{doctor.specialty} · {doctor.experience}</p>
                  <p className="text-sm text-clinic-text-muted leading-relaxed">{doctor.desc}</p>
                </div>
                <button
                  onClick={() => openModal(doctor.name)}
                  className="mt-5 flex items-center gap-2 bg-clinic-teal text-white text-sm px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition-all w-fit"
                >
                  <Icon name="CalendarDays" size={14} />
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-clinic-beige py-14">
        <div className="container text-center">
          <h2 className="font-display text-3xl text-clinic-text mb-3">Не знаете, к какому врачу обратиться?</h2>
          <p className="text-clinic-text-muted mb-6 max-w-md mx-auto text-sm">
            Позвоните нам или оставьте заявку — мы поможем выбрать нужного специалиста
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openModal("")}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
            >
              <Icon name="CalendarDays" size={15} /> Записаться на приём
            </button>
            <a
              href="tel:+79994649194"
              className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
            >
              <Icon name="Phone" size={15} /> +7 999 464 91 94
            </a>
          </div>
        </div>
      </section>
    </>
  );
}