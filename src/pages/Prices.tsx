import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import PhoneModal from "@/components/PhoneModal";

const API_URL = "https://functions.poehali.dev/e3850f3d-bba8-4c1c-8dbb-bf8d3f7bdd34";

interface PriceItem {
  id?: number | string;
  name: string;
  price: string;
  description?: string;
}

interface PriceSection {
  id?: number | string;
  title: string;
  icon: string;
  sort_order?: number;
  items: PriceItem[];
}

export default function Prices() {
  const [active, setActive] = useState(0);
  const [priceSections, setPriceSections] = useState<PriceSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [phoneOpen, setPhoneOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}?section=prices`)
      .then((res) => res.json())
      .then((data: PriceSection[]) => {
        setPriceSections(data);
      })
      .catch(() => {
        // silently fail — empty list will be shown
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO
        title="Цены — консультации, PRP, блокады, SVF-терапия в Новосибирске"
        description="Прайс клиники «Ваш Ортопед»: консультация от 1 500 ₽, PRP-терапия от 4 000 ₽, SVF-терапия от 55 000 ₽, гиалуроновая кислота. Без скрытых доплат. Новосибирск."
        canonical="/prices"
        breadcrumbs={[{ name: "Главная", url: "/" }, { name: "Цены", url: "/prices" }]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "Ваш Ортопед",
          "url": "https://vash-ortoped.ru",
          "priceRange": "1500-105000",
          "currenciesAccepted": "RUB",
          "paymentAccepted": "Наличные, банковская карта",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Есенина, д. 67",
            "addressLocality": "Новосибирск",
            "addressCountry": "RU"
          }
        }}
      />
      {/* Hero */}
      <section className="bg-clinic-beige py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-3">
            <Icon name="CircleDollarSign" size={18} className="text-clinic-teal shrink-0" />
            <h1 className="font-display text-2xl md:text-4xl text-clinic-text">Цены на услуги в Новосибирске</h1>
          </div>
        </div>
      </section>

      {/* Prices */}
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
          <>
            {/* Mobile tabs — horizontal scroll */}
            <div className="lg:hidden mb-4 -mx-4 px-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {priceSections.map((section, i) => (
                  <button
                    key={section.id ?? section.title}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                      active === i
                        ? "bg-clinic-teal text-white"
                        : "bg-secondary text-clinic-text"
                    }`}
                  >
                    <Icon name={section.icon} size={15} />
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar tabs — desktop only */}
              <div className="hidden lg:block lg:col-span-1">
                <nav className="space-y-1 sticky top-24">
                  {priceSections.map((section, i) => (
                    <button
                      key={section.id ?? section.title}
                      onClick={() => setActive(i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                        active === i
                          ? "bg-clinic-teal text-white"
                          : "text-clinic-text hover:bg-secondary"
                      }`}
                    >
                      <Icon name={section.icon} size={16} />
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Price table */}
              <div className="lg:col-span-3">
                {priceSections[active] && (
                  <div className="bg-white rounded-2xl border border-border overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                      <Icon name={priceSections[active].icon} size={20} className="text-clinic-teal" />
                      <h2 className="font-display text-xl md:text-2xl text-clinic-text">{priceSections[active].title}</h2>
                    </div>
                    <div className="divide-y divide-border">
                      {priceSections[active].items.map((item) => (
                        <div key={item.id ?? item.name} className="flex items-start justify-between px-6 py-4 hover:bg-secondary/40 transition-colors gap-4">
                          <div className="flex-1 min-w-0">
                            <span className="text-sm text-clinic-text">{item.name}</span>
                            {item.description && (
                              <p className="text-xs text-clinic-text-muted mt-1 leading-relaxed">{item.description}</p>
                            )}
                          </div>
                          <span className="text-clinic-teal font-semibold font-body whitespace-nowrap shrink-0 mt-0.5">{item.price} ₽</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 bg-clinic-teal-light rounded-xl p-4 flex items-start gap-3">
                  <Icon name="Info" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
                  <p className="text-sm text-clinic-text">
                    Цены носят информационный характер. Точную стоимость уточняйте у администратора при записи.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14">
        <div className="container text-center">
          <h2 className="font-display text-3xl text-clinic-text mb-3">Хотите уточнить стоимость?</h2>
          <p className="text-clinic-text-muted mb-6 max-w-md mx-auto text-sm">
            Позвоните нам или запишитесь на консультацию — врач ответит на все вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-clinic-teal text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all"
            >
              <Icon name="CalendarDays" size={15} /> Записаться на приём
            </a>
            <button
              onClick={() => setPhoneOpen(true)}
              className="hidden sm:flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
            >
              <Icon name="Phone" size={15} /> +7 999 464 91 94
            </button>
            <a
              href="tel:+79994649194"
              className="sm:hidden flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
            >
              <Icon name="Phone" size={15} /> +7 999 464 91 94
            </a>
          </div>
        </div>
      </section>
      <PhoneModal open={phoneOpen} onClose={() => setPhoneOpen(false)} />
    </>
  );
}