import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const base = "/docs/lunyakina";

const certificates = [
  { id: 1, title: "Выписка о присвоении высшей квалификационной категории по специальности «Неврология», 2025", url: `${base}/1.jpg` },
  { id: 2, title: "Выписка о прохождении периодической аккредитации специалиста «Неврология», действует до 2030 года", url: `${base}/2.jpg` },
  { id: 3, title: "Сертификат специалиста по специальности «Неврология», 2020", url: `${base}/3.jpg` },
  { id: 4, title: "Диплом Новосибирского государственного медицинского института, «Лечебное дело», 1994", url: `${base}/4.jpg` },
  { id: 5, title: "Удостоверение об окончании интернатуры, Новосибирский медицинский институт, 1995", url: `${base}/5.jpg` },
  { id: 6, title: "Повышение квалификации «Вопросы неврологии», Новокузнецкий ГИДУВ, 1995", url: `${base}/6.jpg` },
  { id: 7, title: "Справка о первичной специализации по неврологии, ГКБ №2 Новосибирска, 1996", url: `${base}/7.jpg` },
  { id: 8, title: "Удостоверение о повышении квалификации — Медицинская реабилитация, НГМУ, 2014", url: `${base}/8.jpg` },
  { id: 9, title: "Удостоверение о повышении квалификации — Правовая регламентация медицинской деятельности, НГМУ, 2017", url: `${base}/9.jpg` },
  { id: 10, title: "Удостоверение о повышении квалификации — Хронические прогрессирующие заболевания нервной системы, 2021", url: `${base}/10.jpg` },
  { id: 11, title: "Удостоверение о повышении квалификации — Физиотерапия в физической и реабилитационной медицине, 2022", url: `${base}/11.jpg` },
  { id: 12, title: "Удостоверение о повышении квалификации — Нарушение когнитивных функций, 2025", url: `${base}/12.jpg` },
  { id: 13, title: "Удостоверение о повышении квалификации — Вертеброгенные заболевания нервной системы, 2025", url: `${base}/13.jpg` },
];

export default function LunyakinaCertificates() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Сертификаты — Лунякина Светлана Борисовна, невролог высшей категории"
        description="Диплом, сертификаты, аккредитация и удостоверения о повышении квалификации врача-невролога высшей категории Лунякиной Светланы Борисовны, клиника «Ваш Ортопед», Новосибирск."
        canonical="/doctors/lunyakina/certificates"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Врачи", url: "/doctors" },
          { name: "Лунякина С.Б.", url: "/doctors/lunyakina/certificates" },
        ]}
      />

      <section className="bg-clinic-beige py-6 border-b border-border">
        <div className="container">
          <Link to="/doctors" className="inline-flex items-center gap-1.5 text-clinic-teal text-sm mb-4 hover:underline">
            <Icon name="ChevronLeft" size={15} /> Назад к врачам
          </Link>
          <div>
            <p className="text-clinic-text-muted text-sm mb-0.5">Врач-невролог высшей категории</p>
            <h1 className="font-display text-2xl md:text-3xl text-clinic-text">Лунякина Светлана Борисовна</h1>
          </div>
          <p className="text-clinic-teal font-medium text-sm mt-2 flex items-center gap-1.5">
            <Icon name="Award" size={14} /> Сертификаты и документы о квалификации
          </p>
        </div>
      </section>

      <section className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl">
          {certificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setPreview(cert.url)}
              className="flex items-center gap-3 bg-white border border-border rounded-xl px-3 py-3 hover:border-clinic-teal hover:bg-clinic-teal-light transition-all group text-left w-full"
            >
              <img src={cert.url} alt={cert.title} className="w-14 h-14 object-cover rounded-lg shrink-0 border border-border" loading="lazy" decoding="async" />
              <span className="flex-1 text-sm text-clinic-text leading-snug group-hover:text-clinic-teal transition-colors">{cert.title}</span>
              <span className="shrink-0 text-clinic-text-muted group-hover:text-clinic-teal transition-colors">
                <Icon name="Expand" size={14} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {preview && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="relative max-h-[92vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreview(null)}
              className="absolute -top-3 -right-3 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-clinic-beige transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
            <img src={preview} alt="Документ" className="max-h-[88vh] max-w-[88vw] rounded-xl shadow-2xl object-contain" decoding="async" />
          </div>
        </div>
      )}
    </>
  );
}
