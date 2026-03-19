import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import { ARTICLES, ARTICLES_BY_CATEGORY } from "@/data/articles";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-white hover:bg-clinic-beige/60 transition-colors"
      >
        <span className="font-medium text-clinic-text text-sm leading-snug">{q}</span>
        <Icon
          name="ChevronDown"
          size={16}
          className={`shrink-0 text-clinic-teal transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-clinic-beige/30 text-sm text-clinic-text-muted leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container py-10 text-center">
        <h2 className="font-display text-3xl text-clinic-text mb-4">Статья не найдена</h2>
        <Link to="/publications" className="text-clinic-teal hover:underline text-sm">← К публикациям</Link>
      </div>
    );
  }

  const related = (ARTICLES_BY_CATEGORY[article.category] || [])
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const faqSchema = article.faq?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": article.metaTitle,
    "description": article.metaDesc,
    "url": `https://vashortopped.ru/articles/${article.slug}`,
    "image": article.img,
    "inLanguage": "ru",
    "datePublished": "2024-01-01",
    "dateModified": "2025-01-01",
    "author": {
      "@type": "Organization",
      "name": "Клиника «Ваш Ортопед»",
      "url": "https://vashortopped.ru",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Клиника «Ваш Ортопед»",
      "url": "https://vashortopped.ru",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vashortopped.ru/logo.png",
      },
    },
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient",
    },
    "about": {
      "@type": "MedicalCondition",
      "name": article.category,
    },
    "mainEntity": {
      "@type": "Article",
      "headline": article.title,
      "description": article.lead,
      "articleBody": article.sections.map((s) => `${s.title}. ${s.content}`).join(" "),
    },
  };

  return (
    <>
      <SEO
        title={article.metaTitle}
        description={article.metaDesc}
        canonical={`/articles/${article.slug}`}
        image={article.img}
        schema={faqSchema ? [articleSchema, faqSchema] : articleSchema}
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Публикации", url: "/publications" },
          { name: article.title, url: `/articles/${article.slug}` },
        ]}
      />
      {/* Breadcrumb */}
      <section className="bg-clinic-beige border-b border-border py-3">
        <div className="container flex items-center gap-2 text-sm text-clinic-text-muted flex-wrap">
          <Link to="/" className="hover:text-clinic-teal transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/publications" className="hover:text-clinic-teal transition-colors">Публикации</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-clinic-text line-clamp-1">{article.title}</span>
        </div>
      </section>

      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-8">
          <span className="inline-block bg-clinic-teal text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="font-display text-2xl md:text-4xl text-white leading-tight max-w-3xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Lead */}
            <p className="text-lg text-clinic-text leading-relaxed border-l-4 border-clinic-teal pl-5 mb-8 bg-clinic-beige/50 py-4 pr-4 rounded-r-xl">
              {article.lead}
            </p>

            {/* Sections */}
            <div className="space-y-8">
              {article.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="font-display text-2xl text-clinic-text mb-3">{section.title}</h2>
                  <p className="text-clinic-text-muted leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            {/* FAQ */}
            {article.faq?.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-clinic-text mb-5 flex items-center gap-2">
                  <Icon name="CircleHelp" size={22} className="text-clinic-teal" />
                  Часто задаваемые вопросы
                </h2>
                <div className="space-y-3">
                  {article.faq.map((item, i) => (
                    <FaqItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 bg-clinic-teal rounded-2xl p-6 text-white">
              <h3 className="font-display text-2xl mb-2">Нужна консультация?</h3>
              <p className="text-white/80 text-sm mb-4">
                Запишитесь к ортопеду — поставим точный диагноз и подберём лечение
              </p>
              <a
                href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-clinic-teal px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all flex items-center gap-2"
              >
                <Icon name="CalendarDays" size={15} />
                Записаться на приём
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            {/* Table of contents */}
            <div className="bg-clinic-beige rounded-2xl p-5 mb-6 sticky top-6">
              <h3 className="font-display text-lg text-clinic-text mb-3 flex items-center gap-2">
                <Icon name="List" size={16} /> Содержание
              </h3>
              <ol className="space-y-2">
                {article.sections.map((section, i) => (
                  <li key={i} className="text-sm text-clinic-text-muted flex gap-2">
                    <span className="text-clinic-teal font-medium shrink-0">{i + 1}.</span>
                    <span className="leading-snug">{section.title}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h3 className="font-display text-lg text-clinic-text mb-3">По теме</h3>
                <div className="space-y-3">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/articles/${rel.slug}`}
                      className="flex gap-3 group items-start"
                    >
                      <img
                        src={rel.img}
                        alt={rel.title}
                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                      />
                      <span className="text-sm text-clinic-text leading-snug group-hover:text-clinic-teal transition-colors">
                        {rel.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}