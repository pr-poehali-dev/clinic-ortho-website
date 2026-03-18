import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SERVICES_LIST } from "./Services";
import Icon from "@/components/ui/icon";
import AppointmentModal from "@/components/AppointmentModal";
import SEO from "@/components/SEO";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const service = SERVICES_LIST.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="container py-10 text-center">
        <h2 className="font-display text-3xl text-clinic-text mb-4">Услуга не найдена</h2>
        <Link to="/services" className="text-clinic-teal hover:underline text-sm">← Вернуться к услугам</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${service.title} в Новосибирске`}
        description={`${service.desc} Клиника «Ваш Ортопед», Новосибирск, ул. Есенина, 67. Запись: +7 999 464 91 94.`}
        canonical={`/services/${service.slug}`}
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Услуги", url: "/services" },
          { name: service.title, url: `/services/${service.slug}` },
        ]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": service.title,
          "description": service.desc,
          "procedureType": "https://schema.org/TherapeuticProcedure",
          "provider": {
            "@type": "MedicalClinic",
            "name": "Ваш Ортопед",
            "url": "https://vashortopped.ru",
            "telephone": "+79994649194",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "ул. Есенина, д. 67",
              "addressLocality": "Новосибирск",
              "addressCountry": "RU"
            }
          }
        }}
      />
      <AppointmentModal open={modalOpen} onClose={() => setModalOpen(false)} service={service.title} />

      {/* Breadcrumb */}
      <section className="bg-clinic-beige border-b border-border py-3">
        <div className="container flex items-center gap-2 text-sm text-clinic-text-muted">
          <Link to="/" className="hover:text-clinic-teal transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/services" className="hover:text-clinic-teal transition-colors">Услуги</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-clinic-text">{service.title}</span>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-clinic-beige py-10">
        <div className="container">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.color}`}>
            <Icon name={service.icon} size={26} />
          </div>
          <h1 className="font-display text-5xl text-clinic-text mb-4">{service.title}</h1>
          <p className="text-clinic-text-muted text-lg max-w-xl leading-relaxed">{service.desc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="container py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-2xl text-clinic-text mb-4">Что входит в услугу</h2>
            <ul className="space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${service.color}`}>
                    <Icon name="Check" size={14} />
                  </div>
                  <span className="text-clinic-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-2xl text-clinic-text mb-4">Как проходит лечение</h2>
            <div className="space-y-5">
              {[
                { step: "01", title: "Первичная консультация", text: "Врач проводит осмотр, изучает историю болезни и назначает необходимые обследования." },
                { step: "02", title: "Диагностика", text: "Проводим необходимые исследования (МРТ, рентген, анализы) для точной постановки диагноза." },
                { step: "03", title: "Составление плана лечения", text: "Врач разрабатывает индивидуальную программу с учётом вашего возраста и состояния здоровья." },
                { step: "04", title: "Лечение и контроль", text: "Проводим курс лечения с регулярным контролем результатов и корректировкой при необходимости." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="text-2xl font-display font-medium text-clinic-teal/30 shrink-0 w-9">{s.step}</div>
                  <div>
                    <h4 className="font-medium text-clinic-text mb-1">{s.title}</h4>
                    <p className="text-sm text-clinic-text-muted leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-clinic-teal text-white rounded-2xl p-6">
            <h3 className="font-display text-xl mb-2">Записаться на приём</h3>
            <p className="text-white/80 text-sm mb-5">Оставьте заявку — мы свяжемся в течение 30 минут</p>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-white text-clinic-teal py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
            >
              Оставить заявку
            </button>
            <a
              href="tel:+79994649194"
              className="mt-3 flex items-center justify-center gap-2 border border-white/40 text-white py-3 rounded-xl font-medium text-sm hover:bg-white/10 transition-all w-full"
            >
              <Icon name="Phone" size={14} /> Позвонить
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6">
            <h3 className="font-display text-xl text-clinic-text mb-4">Другие услуги</h3>
            <ul className="space-y-2">
              {SERVICES_LIST.filter((s) => s.slug !== slug).map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="flex items-center gap-2 text-sm text-clinic-text hover:text-clinic-teal transition-colors py-1"
                  >
                    <Icon name="ArrowRight" size={13} className="text-clinic-teal" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}