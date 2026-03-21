import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const API_URL = "https://functions.poehali.dev/e3850f3d-bba8-4c1c-8dbb-bf8d3f7bdd34";

const trackGoal = (goal: string) => window.ym?.(108160921, 'reachGoal', goal);

export interface Service {
  id?: number | string;
  slug: string;
  icon: string;
  title: string;
  short: string;
  desc: string;
  items: string[];
  color: string;
  sort_order?: number;
}

// Kept as an exported empty array for backward compatibility with ServiceDetail.
// At runtime ServiceDetail will find services via the API; this acts as a safe fallback type anchor.
export const SERVICES_LIST: Service[] = [];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}?section=services`)
      .then((res) => res.json())
      .then((data: Service[]) => {
        setServices(data);
        // Sync into the module-level export so ServiceDetail (which imports it statically)
        // can access loaded data when navigating after this page has been mounted.
        SERVICES_LIST.splice(0, SERVICES_LIST.length, ...data);
      })
      .catch(() => {
        // silently fail — empty list will be shown
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO
        title="Услуги — ортопедия, травматология, блокады, инъекции, анализы в Новосибирске"
        description="Ортопедия, травматология, блокады, инъекции гиалуроновой кислоты, PRP-терапия, анализы, внутривенные инфузии. Клиника «Ваш Ортопед» в Новосибирске. Запись: +7 999 464 91 94."
        canonical="/services"
        breadcrumbs={[{ name: "Главная", url: "/" }, { name: "Услуги", url: "/services" }]}
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Услуги клиники Ваш Ортопед",
          "itemListElement": services.map((s, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": s.title,
            "description": s.desc,
            "url": `https://vash-ortoped.ru/services/${s.slug}`
          }))
        }}
      />
      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="Stethoscope" size={15} /> Что мы лечим
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-clinic-text mb-4">Услуги ортопеда в Новосибирске</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Ортопедия и травматология, блокады и инъекции, лабораторные анализы и внутривенные инфузии — всё в одной клинике. Выберите направление, чтобы узнать подробнее.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.slug} className="bg-white rounded-2xl border border-border overflow-hidden service-card flex flex-col">
                <div className={`p-6 pb-4 flex-1`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}>
                    <Icon name={service.icon} size={22} />
                  </div>
                  <h3 className="font-display text-2xl text-clinic-text mb-2">{service.title}</h3>
                  <p className="text-sm text-clinic-text-muted mb-4 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-1.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-clinic-text-muted">
                        <Icon name="Check" size={13} className="text-clinic-teal shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 pt-0 flex gap-2 border-t border-border mt-4">
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex-1 text-center text-clinic-teal text-sm font-medium py-2.5 border border-clinic-teal rounded-lg hover:bg-clinic-teal-light transition-all"
                  >
                    Подробнее
                  </Link>
                  <a
                    href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackGoal('click_zapis')}
                    className="flex-1 bg-clinic-teal text-white text-sm font-medium py-2.5 rounded-lg hover:bg-opacity-90 transition-all text-center"
                  >
                    Записаться
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-clinic-teal text-white py-14">
        <div className="container text-center">
          <h2 className="font-display text-3xl mb-3">Нужна консультация?</h2>
          <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
            Позвоните нам — мы поможем разобраться с симптомами и направим к нужному специалисту
          </p>
          <span className="inline-flex items-center gap-2 bg-white text-clinic-teal px-7 py-3 rounded-xl font-medium text-sm">
            <Icon name="Phone" size={15} /> +7 999 464 91 94
          </span>
        </div>
      </section>
    </>
  );
}
