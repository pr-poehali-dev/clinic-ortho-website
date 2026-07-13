import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const BADGE_COVER: Record<number, { top: string; left: string; width: string; height: string }> = {};

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const badge = BADGE_COVER[Number(doctor.id)];
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden doctor-card flex flex-col">
      {doctor.img ? (
        <div className="relative">
          <img src={doctor.img} alt={`${doctor.name} — ${doctor.specialty}, клиника Ваш Ортопед, Новосибирск`} className="w-full object-cover" style={{ height: doctor.imgHeight ?? "24rem", objectPosition: doctor.imgPosition ?? "center top", marginTop: doctor.imgMarginTop ?? "0" }} loading="lazy" decoding="async" />
          {badge && (
            <div className="absolute" style={{ top: badge.top, left: badge.left, width: badge.width, height: badge.height, backgroundColor: "#eef1f4" }} aria-hidden="true" />
          )}
          <img src="https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/3e87c830-678c-485d-b730-8467068e3086.png" alt="Ваш Ортопед" className="absolute top-3 right-3 h-10 w-10 object-contain opacity-90" loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-clinic-teal-light text-5xl font-display font-medium text-clinic-teal">
          {doctor.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
        </div>
      )}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h2 className="font-display text-2xl text-clinic-text mb-1">{doctor.name}</h2>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <p className="text-clinic-teal text-sm font-medium">{doctor.specialty}</p>
            {(() => {
              const certUrl: Record<number, string> = {
                1: "/doctors/bulanbayev/certificates",
              };
              const url = certUrl[Number(doctor.id)];
              return url ? (
                <Link
                  to={url}
                  className="flex items-center gap-1 text-xs text-clinic-teal border border-clinic-teal rounded-full px-2.5 py-0.5 hover:bg-clinic-teal hover:text-white transition-all"
                >
                  <Icon name="Award" size={11} /> Сертификаты
                </Link>
              ) : null;
            })()}
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {doctor.experience.split(" · ").map((tag: string) => (
              <span key={tag} className="bg-clinic-teal-light text-clinic-teal text-xs px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <p className="text-sm text-clinic-text-muted leading-relaxed whitespace-pre-line">{doctor.desc}</p>
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
  );
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

  const neurologists = doctors.filter((d) => d.specialty.toLowerCase().includes("невролог"));
  const orthopeds = doctors.filter((d) => !d.specialty.toLowerCase().includes("невролог"));

  return (
    <>
      <SEO
        title="Врачи: травматологи-ортопеды и неврологи в Новосибирске — клиника Ваш Ортопед"
        description="Опытные травматологи-ортопеды и неврологи в Новосибирске. PRP-терапия, SVF-терапия, лечение артроза, блокады суставов, лечение головных болей и остеохондроза. Запись: +7 999 464 91 94."
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
            "name": "Ракин Сергей Михайлович",
            "jobTitle": "Врач-невролог",
            "description": "Заботливый, внимательный врач-невролог в Новосибирске со стажем более 28 лет. Диагностика и лечение заболеваний центральной, периферической и вегетативной нервной системы. PRP-терапия в неврологии, лечебные блокады, тейпирование. Лечение головных болей, головокружения, невропатий, последствий ОНМК и черепно-мозговых травм.",
            "image": "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/5abf2912-99d9-4ff6-96f5-8882183ca1ab.jpg",
            "worksFor": { "@type": "MedicalClinic", "name": "Ваш Ортопед", "url": "https://vash-ortoped.ru" },
            "medicalSpecialty": ["Neurologic"],
            "knowsAbout": ["Неврология", "PRP-терапия", "Лечебные блокады", "Лечение головных болей", "Лечение остеохондроза", "Невропатия тройничного нерва", "Невропатия лицевого нерва", "Тейпирование"],
            "url": "https://vash-ortoped.ru/doctors"
          },
        ]}
      />
      {/* Hero */}
      <section className="bg-clinic-beige py-6 border-b border-border">
        <div className="container">
          <div className="max-w-xs">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="Users" size={15} /> Наша команда
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-clinic-text mb-2">Врачи клиники</h1>
            <p className="text-clinic-text-muted text-sm">Опытные практикующие врачи<br />всегда готовы помочь</p>
          </div>
        </div>
      </section>

      {/* Специализация-бейдж */}
      <div className="container mt-8 mb-2">
        <div className="inline-block bg-clinic-beige border border-border rounded-xl px-5 py-2">
          <span className="text-clinic-text font-medium text-sm">Травматологи-ортопеды</span>
        </div>
      </div>

      {/* Doctors */}
      <section className="container py-6">
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
            {orthopeds.map((doctor) => (
              <DoctorCard key={doctor.id ?? doctor.name} doctor={doctor} />
            ))}
          </div>
        )}
      </section>

      {/* Неврологи-бейдж */}
      <div className="container mb-2">
        <div className="inline-block bg-clinic-beige border border-border rounded-xl px-5 py-2">
          <span className="text-clinic-text font-medium text-sm">Неврологи</span>
        </div>
      </div>

      {/* Неврологи */}
      <section className="container mb-10">
        {loading ? null : neurologists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {neurologists.map((doctor) => (
              <DoctorCard key={doctor.id ?? doctor.name} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-clinic-beige border border-border rounded-2xl flex items-center justify-center" style={{ minHeight: "8rem" }}>
            <span className="text-clinic-text-muted text-sm">Скоро здесь появятся наши неврологи</span>
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