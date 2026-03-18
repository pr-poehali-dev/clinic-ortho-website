import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import { DISEASES_LIST } from "@/pages/DiseaseDetail";

export default function Publications() {
  return (
    <>
      <SEO
        title="Публикации — статьи о заболеваниях опорно-двигательного аппарата"
        description="Читайте статьи об артрите, артрозе, бурсите, тендините и других заболеваниях суставов и позвоночника. Клиника «Ваш Ортопед», Новосибирск."
        canonical="/publications"
      />

      {/* Breadcrumb */}
      <section className="bg-clinic-beige border-b border-border py-3">
        <div className="container flex items-center gap-2 text-sm text-clinic-text-muted">
          <Link to="/" className="hover:text-clinic-teal transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-clinic-text">Публикации</span>
        </div>
      </section>

      {/* Header */}
      <section className="container py-12">
        <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
          <Icon name="BookOpen" size={15} /> Публикации
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-clinic-text mb-4">Статьи о заболеваниях</h1>
        <p className="text-clinic-text-muted max-w-2xl leading-relaxed">
          Подробные материалы о заболеваниях опорно-двигательного аппарата: симптомы, современные методы лечения и этапы восстановления.
        </p>
      </section>

      {/* Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISEASES_LIST.map((disease) => (
            <Link
              key={disease.slug}
              to={`/diseases/${disease.slug}`}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={disease.img}
                  alt={disease.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-display text-xl text-clinic-text mb-2 group-hover:text-clinic-teal transition-colors">
                  {disease.title}
                </h2>
                <p className="text-sm text-clinic-text-muted leading-relaxed line-clamp-3 flex-1">
                  {disease.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-clinic-teal text-sm font-medium">
                  Читать статью <Icon name="ArrowRight" size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
