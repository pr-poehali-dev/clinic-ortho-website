import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  desc: string;
  img: string | null;
  imgPosition?: string;
  imgMarginTop?: string;
  imgHeight?: string;
}

const DOCTORS: Doctor[] = [
  {
    name: "Буланбаев Бекболот Ардинатович",
    specialty: "Врач травматолог-ортопед",
    experience: "Травматология · Ортопедия · УЗИ суставов",
    desc: "Опытный врач травматолог‑ортопед в Новосибирске, специализирующийся на диагностике и лечении заболеваний опорно‑двигательного аппарата: артроза, артрита, бурсита, синовита, тендинита и энтезита. Сочетает современные методы лечения — PRP‑терапию, медикаментозные блокады, введение гиалуроновой кислоты — с точной инструментальной диагностикой (УЗИ суставов, рентген, МРТ) и индивидуальным подходом к каждому пациенту. Ведёт пациента полностью: от первичной консультации до контроля результатов лечения.",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/1017135a-54d3-4d0d-9a11-65fd55dbb932.JPG",
    imgPosition: "center 10%",
  },
  {
    name: "Дуйшеналиев Канатбек Дуйшеналиевич",
    specialty: "Врач травматолог-ортопед",
    experience: "Травматология · Ортопедия · PRP-терапия · SVF-терапия",
    desc: "Врач травматолог-ортопед в Новосибирске. Диагностика и лечение травм и заболеваний опорно-двигательного аппарата. Проводит PRP-терапию и SVF-терапию, внутрисуставные и паравертебральные блокады, пункции суставов с введением лекарственных препаратов. Консервативное лечение: репозиция переломов, вправление вывихов, иммобилизация.",
    img: "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/70271e2d-4950-4f42-9bb0-74b0709c3806.JPG",
    imgPosition: "center top",
    imgMarginTop: "-1cm",
    imgHeight: "calc(26rem + 3px)",
  },
];



export default function Doctors() {
  return (
    <>
      <SEO
        title="Травматологи-ортопеды в Новосибирске — клиника Ваш Ортопед"
        description="Опытные травматологи-ортопеды в Новосибирске. PRP-терапия, SVF-терапия, лечение артроза, блокады суставов, гиалуроновая кислота. Запись: +7 999 464 91 94."
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
            "worksFor": { "@type": "MedicalClinic", "name": "Ваш Ортопед", "url": "https://vash-ortoped.ru" },
            "medicalSpecialty": ["Orthopedic", "Traumatology"],
            "knowsAbout": ["Лечение артроза", "Лечение артрита", "PRP-терапия", "УЗИ суставов", "Медикаментозные блокады"],
            "url": "https://vash-ortoped.ru/doctors"
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Дуйшеналиев Канатбек Дуйшеналиевич",
            "jobTitle": "Врач травматолог-ортопед",
            "description": "Врач травматолог-ортопед в Новосибирске. Остеосинтез, реконструктивные операции на стопе, PRP-терапия, блокады суставов, лечение переломов и травм.",
            "image": "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/files/d1155204-000e-4540-b19b-d091244c8a41.jpg",
            "worksFor": { "@type": "MedicalClinic", "name": "Ваш Ортопед", "url": "https://vash-ortoped.ru" },
            "medicalSpecialty": ["Orthopedic", "Traumatology"],
            "knowsAbout": ["Остеосинтез", "Реконструктивная хирургия стопы", "PRP-терапия", "Лечение переломов", "Паравертебральные блокады", "Операции на сухожилиях"],
            "url": "https://vash-ortoped.ru/doctors"
          }
        ]}
      />
      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-lg">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="Users" size={15} /> Наша команда
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-clinic-text mb-4">Травматологи-ортопеды Новосибирска</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Опытные практикующие врачи всегда готовы помочь
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
                <div className="relative">
                  <img src={doctor.img} alt={`${doctor.name} — ${doctor.specialty}, клиника Ваш Ортопед, Новосибирск`} className="w-full object-cover" style={{ height: doctor.imgHeight ?? "24rem", objectPosition: doctor.imgPosition ?? "center top", marginTop: doctor.imgMarginTop ?? "0" }} />
                  <img src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/3e87c830-678c-485d-b730-8467068e3086.png" alt="Ваш Ортопед" className="absolute top-3 right-3 h-10 w-10 object-contain opacity-90" />
                </div>
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
                  <a
                    href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackGoal('click_zapis')}
                    className="mt-5 flex items-center gap-2 bg-clinic-teal text-white text-sm px-4 py-2.5 rounded-lg hover:bg-opacity-90 transition-all w-fit"
                  >
                    <Icon name="CalendarDays" size={14} />
                    Записаться на приём
                  </a>
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
            <a
              href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal('click_zapis')}
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
            >
              <Icon name="CalendarDays" size={15} /> Записаться на приём
            </a>
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