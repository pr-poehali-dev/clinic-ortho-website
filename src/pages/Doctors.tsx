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

const ROW_ZOOM: Record<number, { scale: number; origin: string }> = {
  1: { scale: 1.6, origin: "52% 14%" },
  2: { scale: 1.6, origin: "74% 14%" },
};

const CERT_URL: Record<number, string> = {
  1: "/doctors/bulanbayev/certificates",
  8: "/doctors/lunyakina/certificates",
};

const BOOKING_URL = "https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089";

function DoctorRow({ doctor }: { doctor: Doctor }) {
  const [expanded, setExpanded] = useState(false);
  const certUrl = CERT_URL[Number(doctor.id)];
  const zoom = ROW_ZOOM[Number(doctor.id)];
  const tags = doctor.experience.split(" · ").filter(Boolean);
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden doctor-card">
      <div className="flex">
        <div className="relative shrink-0 w-28 sm:w-36 bg-clinic-teal-light overflow-hidden">
          {doctor.img ? (
            <img
              src={doctor.img}
              alt={`${doctor.name} — ${doctor.specialty}, клиника Ваш Ортопед, Новосибирск`}
              className="absolute inset-0 w-full h-full"
              style={{
                objectFit: doctor.imgHeight === "17rem" ? "contain" : "cover",
                objectPosition: doctor.imgPosition ?? "center top",
                ...(zoom ? { transform: `scale(${zoom.scale})`, transformOrigin: zoom.origin } : {}),
              }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-display font-medium text-clinic-teal">
              {doctor.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("")}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1 min-w-0">
          <h2 className="font-display text-lg sm:text-xl text-clinic-text leading-tight mb-1">{doctor.name}</h2>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <p className="text-clinic-teal text-xs sm:text-sm font-medium">{doctor.specialty}</p>
            {certUrl && (
              <Link
                to={certUrl}
                className="flex items-center gap-1 text-xs text-clinic-teal border border-clinic-teal rounded-full px-2 py-0.5 hover:bg-clinic-teal hover:text-white transition-all"
              >
                <Icon name="Award" size={11} /> Сертификаты
              </Link>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mb-3 max-h-[3.25rem] overflow-hidden">
            {tags.map((tag: string) => (
              <span key={tag} className="bg-clinic-teal-light text-clinic-teal text-[11px] px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-3 flex-wrap">
            {doctor.img && (
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('click_zapis')}
                className="flex items-center gap-1.5 bg-clinic-teal text-white text-xs sm:text-sm px-3 py-2 rounded-lg hover:bg-opacity-90 transition-all"
              >
                <Icon name="CalendarDays" size={14} />
                Записаться
              </a>
            )}
            {doctor.desc && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="flex items-center gap-1 text-xs sm:text-sm text-clinic-teal font-medium hover:underline"
                aria-expanded={expanded}
              >
                {expanded ? "Свернуть" : "Подробнее"}
                <Icon name={expanded ? "ChevronUp" : "ChevronDown"} size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-3 border-t border-border">
          <p className="text-sm text-clinic-text-muted leading-relaxed whitespace-pre-line">{doctor.desc}</p>
        </div>
      )}
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
        description="Опытные травматологи-ортопеды и неврологи в Новосибирске со стажем до 28 лет. PRP-терапия, SVF-терапия, лечение артроза, все виды блокад включая внутрикостные, лечение головных болей и остеохондроза. Запись: +7 999 464 91 94."
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
            "description": "Врач травматолог-ортопед в Новосибирске. Диагностика и лечение травм и заболеваний опорно-двигательного аппарата: артроза, артрита, бурсита, тендинита, болей в коленном, тазобедренном и плечевом суставах, болей в спине. PRP-терапия и SVF-терапия, внутрисуставные и паравертебральные блокады, пункции суставов, введение гиалуроновой кислоты. Консервативное лечение травм: репозиция переломов, вправление вывихов, иммобилизация, подбор ортезов.",
            "image": "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/75955528-13fd-4d82-b63e-6244a71d260f.png",
            "worksFor": { "@type": "MedicalClinic", "name": "Ваш Ортопед", "url": "https://vash-ortoped.ru" },
            "medicalSpecialty": ["Orthopedic", "Traumatology"],
            "knowsAbout": ["Лечение артроза", "Лечение артрита", "Лечение бурсита", "Лечение тендинита", "PRP-терапия", "SVF-терапия", "Гиалуроновая кислота", "Внутрисуставные блокады", "Паравертебральные блокады", "Пункция сустава", "Репозиция переломов", "Ортезирование"],
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
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Лунякина Светлана Борисовна",
            "jobTitle": "Врач-невролог высшей квалификационной категории",
            "description": "Врач-невролог высшей категории в Новосибирске со стажем около 30 лет. Лечение болей в спине и шее, остеохондроза, грыж и протрузий межпозвонковых дисков, радикулопатий, головных болей, мигрени, головокружения, когнитивных нарушений, невропатий и хронических заболеваний нервной системы.",
            "image": "https://cdn.poehali.dev/projects/6e339ebb-3990-4eb0-b0e9-b0325ebc1901/bucket/288d8ee1-3566-4f5f-bbbd-4477a18fc101.png",
            "worksFor": { "@type": "MedicalClinic", "name": "Ваш Ортопед", "url": "https://vash-ortoped.ru" },
            "medicalSpecialty": ["Neurologic"],
            "alumniOf": [{ "@type": "CollegeOrUniversity", "name": "Новосибирский государственный медицинский институт" }],
            "hasCredential": [
              { "@type": "EducationalOccupationalCredential", "credentialCategory": "Высшая квалификационная категория по специальности «Неврология», 2025" },
              { "@type": "EducationalOccupationalCredential", "credentialCategory": "Аккредитация специалиста «Неврология», действует до 2030 года" }
            ],
            "knowsAbout": ["Неврология", "Лечение остеохондроза", "Грыжа межпозвонкового диска", "Протрузия диска", "Радикулопатия", "Боль в спине", "Головная боль", "Мигрень", "Головокружение", "Когнитивные нарушения", "Полинейропатия", "Вертеброгенные заболевания нервной системы", "Медицинская реабилитация", "Физиотерапия"],
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

      <section className="container py-6 mb-6">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-clinic-text-muted text-sm gap-3">
            <svg className="animate-spin h-5 w-5 text-clinic-teal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Загрузка...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            {[
              { title: "Травматологи-ортопеды", icon: "Bone", list: orthopeds },
              { title: "Неврологи", icon: "Brain", list: neurologists },
            ].map((group) => (
              <div key={group.title}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 bg-clinic-beige border border-border rounded-xl px-4 py-1.5">
                    <Icon name={group.icon} fallback="Stethoscope" size={15} className="text-clinic-teal" />
                    <span className="text-clinic-text font-medium text-sm">{group.title}</span>
                  </div>
                  <span className="text-xs text-clinic-text-muted">{group.list.length}</span>
                </div>
                {group.list.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {group.list.map((doctor) => (
                      <DoctorRow key={doctor.id ?? doctor.name} doctor={doctor} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-clinic-beige border border-border rounded-2xl flex items-center justify-center" style={{ minHeight: "8rem" }}>
                    <span className="text-clinic-text-muted text-sm">Скоро здесь появятся наши врачи</span>
                  </div>
                )}
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