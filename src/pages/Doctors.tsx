import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const API_URL = "https://functions.poehali.dev/e3850f3d-bba8-4c1c-8dbb-bf8d3f7bdd34";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

interface Doctor {
  id?: number | string;
  name: string;
  specialty: string;
  experience: string;
  desc: string;
  description?: string;
  img: string | null;
  imgPosition?: string;
  imgMarginTop?: string;
  imgHeight?: string;
  sort_order?: number;
  is_active?: boolean;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}?section=doctors`)
      .then((res) => res.json())
      .then((data: Doctor[]) => {
        const mapped = data.map((d) => ({
          ...d,
          desc: d.description ?? d.desc ?? "",
        }));
        setDoctors(mapped);
      })
      .catch(() => {
        // silently fail — empty list will be shown
      })
      .finally(() => setLoading(false));
  }, []);

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
            "image": "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/83c76aac-9bd2-4f20-a174-a87de4042be4.JPG",
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
        {loading ? (
          <div className="flex items-center justify-center py-20 text-clinic-text-muted text-sm gap-3">
            <svg className="animate-spin h-5 w-5 text-clinic-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Загрузка...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {doctors.map((doctor) => (
              <div key={doctor.id ?? doctor.name} className="bg-white rounded-2xl border border-border overflow-hidden doctor-card flex flex-col">
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
        )}
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
            <span className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3 rounded-xl font-medium text-sm">
              <Icon name="Phone" size={15} /> +7 999 464 91 94
            </span>
          </div>
        </div>
      </section>
    </>
  );
}