import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const certificates = [
  {
    id: 1,
    title: "Сертификат специалиста по применению технологии Plasmolifting в ортопедии и травматологии",
    type: "Сертификат",
    url: "https://cdn.poehali.dev/files/1b422a9c-56dc-48f7-9fd3-af50f17f3f3a.jpg",
  },
  {
    id: 2,
    title: "Сертификат — Ультразвуковая диагностика суставов, тканей и костей",
    type: "Сертификат",
    url: "https://cdn.poehali.dev/files/b51ea2c9-16d8-4b46-8039-db2bf71964ee.jpg",
  },
  {
    id: 3,
    title: "Сертификат — Дуплексное исследование артерий и вен нижних конечностей",
    type: "Сертификат",
    url: "https://cdn.poehali.dev/files/f0db1a62-b249-4e1b-9e2f-73d4ea3fad3a.jpg",
  },
  {
    id: 4,
    title: "Сертификат — Ортезирование стоп (Сурсил-Орто)",
    type: "Сертификат",
    url: "https://cdn.poehali.dev/files/fcd199d0-ece2-4e91-8f4d-87c943cd94ff.jpg",
  },
  {
    id: 5,
    title: "Сертификат участника — Цивьяновские чтения",
    type: "Сертификат",
    url: "https://cdn.poehali.dev/files/8adda1d2-792e-449b-af84-e6c3fd8ff1a9.jpg",
  },
  {
    id: 6,
    title: "Патент на изобретение № 2691916 — Способ хирургического лечения деформирующего остеоартроза коленного сустава",
    type: "Патент",
    url: "https://cdn.poehali.dev/files/401cbbfe-c14a-4429-a9cd-ebaf9a42a772.jpg",
  },
  {
    id: 7,
    title: "Удостоверение о повышении квалификации — Ультразвуковая диагностика суставов, тканей и костей (МЕДТРЕЙН)",
    type: "Удостоверение",
    url: "https://cdn.poehali.dev/files/50d9a4fa-eb3b-4ef6-ab73-dfb514933f5e.jpg",
  },
  {
    id: 8,
    title: "Удостоверение о повышении квалификации — Ультразвуковая диагностика в ортопедии (АМТЕК Казань)",
    type: "Удостоверение",
    url: "https://cdn.poehali.dev/files/e3f73ac6-3322-4c6e-8ea4-b8c26786b366.jpg",
  },
  {
    id: 9,
    title: "Удостоверение о повышении квалификации — МРТ в диагностике повреждений и заболеваний крупных суставов",
    type: "Удостоверение",
    url: "https://cdn.poehali.dev/files/8922ed66-37e5-4984-8919-5929feeea5da.jpg",
  },
  {
    id: 10,
    title: "Удостоверение о повышении квалификации — Дуплексное исследование артерий и вен нижних конечностей",
    type: "Удостоверение",
    url: "https://cdn.poehali.dev/files/4f461d8e-2799-45d6-b053-14eeeea51822.jpg",
  },
  {
    id: 11,
    title: "Удостоверение о повышении квалификации — Артроскопия крупных суставов верхней и нижней конечностей (ННИИТО)",
    type: "Удостоверение",
    url: "https://cdn.poehali.dev/files/fcf3bb74-03a5-4aaf-a216-9df23418bfdf.jpg",
  },
  {
    id: 12,
    title: "Удостоверение о повышении квалификации — PRP-терапия в травматологии",
    type: "Удостоверение",
    url: "https://cdn.poehali.dev/files/1509df91-5652-4807-abe9-5d9f2763a34b.jpg",
  },
];

const typeIcon: Record<string, string> = {
  Сертификат: "Award",
  Патент: "FileText",
  Удостоверение: "GraduationCap",
};

export default function BulanbayevCertificates() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Сертификаты — Буланбаев Бекболот Ардинатович"
        description="Сертификаты, удостоверения и патенты врача травматолога-ортопеда Буланбаева Бекболота Ардинатовича."
        canonical="/doctors/bulanbayev/certificates"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Врачи", url: "/doctors" },
          { name: "Буланбаев Б.А.", url: "/doctors/bulanbayev/certificates" },
        ]}
      />

      {/* Hero */}
      <section className="bg-clinic-beige py-6 border-b border-border">
        <div className="container">
          <Link to="/doctors" className="inline-flex items-center gap-1.5 text-clinic-teal text-sm mb-4 hover:underline">
            <Icon name="ChevronLeft" size={15} /> Назад к врачам
          </Link>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-clinic-text-muted text-sm mb-0.5">Врач травматолог-ортопед</p>
              <h1 className="font-display text-2xl md:text-3xl text-clinic-text">Буланбаев Бекболот Ардинатович</h1>
            </div>
          </div>
          <p className="text-clinic-teal font-medium text-sm mt-2 flex items-center gap-1.5">
            <Icon name="Award" size={14} /> Сертификаты и документы о квалификации
          </p>
        </div>
      </section>

      {/* List */}
      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl">
          {certificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setPreview(cert.url)}
              className="flex items-center gap-3 bg-white border border-border rounded-xl px-3 py-3 hover:border-clinic-teal hover:bg-clinic-teal-light transition-all group text-left w-full"
            >
              <img
                src={cert.url}
                alt={cert.title}
                className="w-14 h-14 object-cover rounded-lg shrink-0 border border-border"
                loading="lazy"
                decoding="async"
              />
              <span className="flex-1 text-sm text-clinic-text leading-snug group-hover:text-clinic-teal transition-colors">
                {cert.title}
              </span>
              <span className="shrink-0 text-clinic-text-muted group-hover:text-clinic-teal transition-colors">
                <Icon name="Expand" size={14} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-h-[92vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-3 -right-3 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-clinic-beige transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
            <img
              src={preview}
              alt="Сертификат"
              className="max-h-[88vh] max-w-[88vw] rounded-xl shadow-2xl object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
    </>
  );
}