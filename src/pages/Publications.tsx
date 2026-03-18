import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import { ARTICLES, CATEGORIES } from "@/data/articles";

export default function Publications() {
  const [activeCategory, setActiveCategory] = useState<string>("Все");

  const allCategories = ["Все", ...CATEGORIES];
  const filtered = activeCategory === "Все"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <>
      <SEO
        title="Публикации — статьи об ортопедических заболеваниях"
        description="Статьи об артрите, артрозе, тендините, бурсите, синовите и остеохондрозе. Клиника «Ваш Ортопед», Новосибирск."
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
      <section className="container py-10">
        <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
          <Icon name="BookOpen" size={15} /> Публикации
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-clinic-text mb-4">Статьи об ортопедии</h1>
        <p className="text-clinic-text-muted max-w-2xl leading-relaxed">
          Подробные материалы о заболеваниях суставов, позвоночника и опорно-двигательного аппарата от врачей клиники «Ваш Ортопед».
        </p>
      </section>

      {/* Filters */}
      <section className="container pb-6">
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-clinic-teal text-white"
                  : "bg-clinic-beige text-clinic-text hover:bg-clinic-teal/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-clinic-teal/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-display text-lg text-clinic-text mb-2 group-hover:text-clinic-teal transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-clinic-text-muted leading-relaxed line-clamp-3 flex-1">
                  {article.lead}
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
