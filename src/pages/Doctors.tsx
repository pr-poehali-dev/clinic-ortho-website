import { useState } from "react";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";
import SEO from "@/components/SEO";

const DOCTORS = [
  {
    name: "Буланбаев Бекболот Ардинатович",
    specialty: "Врач травматолог-ортопед",
    experience: "Травматология · Ортопедия · УЗИ суставов",
    desc: "Опытный врач травматолог‑ортопед в Новосибирске, специализирующийся на диагностике и лечении заболеваний опорно‑двигательного аппарата: артроза, артрита, бурсита, синовита, тендинита и энтезита. Сочетает современные методы лечения — PRP‑терапию, медикаментозные блокады, введение гиалуроновой кислоты — с точной инструментальной диагностикой (УЗИ суставов, рентген, МРТ) и индивидуальным подходом к каждому пациенту. Ведёт пациента полностью: от первичной консультации до контроля результатов лечения.",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/1017135a-54d3-4d0d-9a11-65fd55dbb932.JPG",
  },
  {
    name: "Дуйшеналиев Канатбек Дуйшеналиевич",
    specialty: "Врач травматолог-ортопед",
    experience: "Травматология · Ортопедия · PRP-терапия · SVF-терапия",
    desc: "Врач травматолог-ортопед в Новосибирске. Диагностика и лечение травм и заболеваний опорно-двигательного аппарата. Проводит PRP-терапию и SVF-терапию, внутрисуставные и паравертебральные блокады, пункции суставов с введением лекарственных препаратов. Консервативное лечение: репозиция переломов, вправление вывихов, иммобилизация, скелетное вытяжение.",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/f6799da4-a0ad-47e2-874f-187ebc0bb6af.jpg",
  },
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
      <SEO
        title="Наши врачи — ортопеды и травматологи"
        description="Врачи клиники «Ваш Ортопед» в Новосибирске. Буланбаев Бекболот Ардинатович и Дуйшеналиев Канатбек Дуйшеналиевич — травматологи-ортопеды. PRP-терапия, остеосинтез, лечение артроза, операции на суставах. Запись: +7 999 464 91 94."
        canonical="/doctors"
        breadcrumbs={[{ name: "Главная", url: "/" }, { name: "Врачи", url: "/doctors" }]}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Буланбаев Бекболот Ардинатович",
            "jobTitle": "Врач травматолог-ортопед",
            "description": "Опытный врач травматолог-ортопед в Новосибирске, специализирующийся на диагностике и лечении заболеваний опорно-двигательного аппарата. PRP-терапия, медикаментозные блокады, введение гиалуроновой кислоты, УЗИ суставов.",
            "image": "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/1017135a-54d3-4d0d-9a11-65fd55dbb932.JPG",
            "worksFor": { "@type": "MedicalClinic", "name": "Ваш Ортопед", "url": "https://vashortopped.ru" },
            "medicalSpecialty": ["Orthopedic", "Traumatology"],
            "knowsAbout": ["Лечение артроза", "Лечение артрита", "PRP-терапия", "УЗИ суставов", "Медикаментозные блокады"],
            "url": "https://vashortopped.ru/doctors"
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Дуйшеналиев Канатбек Дуйшеналиевич",
            "jobTitle": "Врач травматолог-ортопед",
            "description": "Врач травматолог-ортопед в Новосибирске. Остеосинтез, реконструктивные операции на стопе, PRP-терапия, блокады суставов, лечение переломов и травм.",
            "image": "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/d1155204-000e-4540-b19b-d091244c8a41.jpg",
            "worksFor": { "@type": "MedicalClinic", "name": "Ваш Ортопед", "url": "https://vashortopped.ru" },
            "medicalSpecialty": ["Orthopedic", "Traumatology"],
            "knowsAbout": ["Остеосинтез", "Реконструктивная хирургия стопы", "PRP-терапия", "Лечение переломов", "Паравертебральные блокады", "Операции на сухожилиях"],
            "url": "https://vashortopped.ru/doctors"
          }
        ]}
      />
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} service={selectedDoctor ? `Запись к врачу: ${selectedDoctor}` : ""} />

      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-lg">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="Users" size={15} /> Наша команда
            </div>
            <h1 className="font-display text-5xl text-clinic-text mb-4">Наши врачи</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Опытные практикующие врачи нашей клиники всегда готовы помочь
            </p>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {DOCTORS.map((doctor) => (
            <div key={doctor.name} className="bg-white rounded-2xl border border-border overflow-hidden doctor-card flex flex-col">
              {doctor.img ? (
                <img src={doctor.img} alt={`${doctor.name} — ${doctor.specialty}, клиника Ваш Ортопед, Новосибирск`} className="w-full h-96 object-cover object-center" />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-clinic-teal-light text-5xl font-display font-medium text-clinic-teal">
                  {doctor.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="font-display text-2xl text-clinic-text mb-1">{doctor.name}</h2>
                  <p className="text-clinic-teal text-sm font-medium mb-3">{doctor.specialty}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {doctor.experience.split(" · ").map((tag: string) => (
                      <span key={tag} className="bg-clinic-teal-light text-clinic-teal text-xs px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <p className="text-sm text-clinic-text-muted leading-relaxed">{doctor.desc}</p>
                </div>
                {doctor.img && (
                  <button
                    onClick={() => openModal(doctor.name)}
                    className="mt-5 flex items-center gap-2 bg-clinic-teal text-white text-sm px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition-all w-fit"
                  >
                    <Icon name="CalendarDays" size={14} />
                    Записаться на приём
                  </button>
                )}
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