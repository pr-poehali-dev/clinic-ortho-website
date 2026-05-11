import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const certificates: { id: number; title: string; type: string; url: string }[] = [
  {
    id: 1,
    title: "Сертификат специалиста — Мануальная терапия (МГМСУ им. А.И. Евдокимова, 2020)",
    type: "Сертификат",
    url: "https://cdn.poehali.dev/files/3bf01454-63d8-4d9f-8423-413bb297f7ba.jpeg",
  },
  {
    id: 2,
    title: "Диплом о профессиональной переподготовке — Детский массаж (Институт восстановительных технологий, 2020)",
    type: "Диплом",
    url: "https://cdn.poehali.dev/files/09bd2dff-ca9a-4421-92bf-f428eb7176db.jpeg",
  },
  {
    id: 3,
    title: "Сертификат — Пункция плечевых, коленных и тазобедренных суставов под контролем УЗИ. Техника внутрисуставных и периартикулярных инъекций (ГиалСин, 2024)",
    type: "Сертификат",
    url: "https://cdn.poehali.dev/files/b40ff215-dc45-4340-b63c-52b4260a8e6a.jpeg",
  },
  {
    id: 4,
    title: "Удостоверение о повышении квалификации — Постковидная реабилитация в практике специалиста по оздоровлению: ревматология (НИПКРЗ, 2013)",
    type: "Удостоверение",
    url: "https://cdn.poehali.dev/files/f773a09c-3ec3-46d6-8f98-16e2e2e43422.jpeg",
  },
  {
    id: 5,
    title: "Грамота — Работа с никелидо-титановыми конструкциями, имплантантами при переломах шейки бедра и трубчатых костей, при остеопорозе",
    type: "Грамота",
    url: "https://cdn.poehali.dev/files/ca5e8722-98c4-4c5b-bad5-3144f5ef3977.jpeg",
  },
];

const typeIcon: Record<string, string> = {
  Сертификат: "Award",
  Патент: "FileText",
  Удостоверение: "GraduationCap",
  Диплом: "ScrollText",
  Грамота: "Medal",
};

export default function KlochikhinCertificates() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Сертификаты — Клочихин Игорь Михайлович"
        description="Сертификаты, удостоверения и документы о квалификации врача травматолога-ортопеда высшей категории Клочихина Игоря Михайловича."
        canonical="/doctors/klochikhin/certificates"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Врачи", url: "/doctors" },
          { name: "Клочихин И.М.", url: "/doctors/klochikhin/certificates" },
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
              <p className="text-clinic-text-muted text-sm mb-0.5">Врач травматолог-ортопед, артролог, хирург · высшая категория</p>
              <h1 className="font-display text-2xl md:text-3xl text-clinic-text">Клочихин Игорь Михайлович</h1>
            </div>
          </div>
          <p className="text-clinic-teal font-medium text-sm mt-2 flex items-center gap-1.5">
            <Icon name="Award" size={14} /> Сертификаты и документы о квалификации
          </p>
        </div>
      </section>

      {/* List */}
      <section className="container py-8">
        {certificates.length === 0 ? (
          <div className="max-w-4xl bg-clinic-beige border border-border rounded-2xl flex items-center justify-center text-center px-4" style={{ minHeight: "8rem" }}>
            <span className="text-clinic-text-muted text-sm">Сертификаты скоро появятся на этой странице</span>
          </div>
        ) : (
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
        )}
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