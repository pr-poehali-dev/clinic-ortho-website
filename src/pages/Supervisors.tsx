import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const orgs = [
  {
    name: "Министерство здравоохранения Новосибирской области",
    address: "630011, г. Новосибирск, Красный проспект, д. 18",
    phone: "+7 (383) 238-63-68",
    phoneHot: "+7 (383) 238-63-63",
    phoneHotLabel: "Горячая линия",
    email: "zdrav@nso.ru",
    site: "https://zdrav.nso.ru",
    siteLabel: "zdrav.nso.ru",
  },
  {
    name: "Территориальный орган Росздравнадзора по Новосибирской области",
    address: "630007, г. Новосибирск, Красный проспект, д. 11 / ул. Коммунистическая, 44",
    phone: "+7 (383) 223-23-15",
    phoneHot: "+7 800 550 99 03",
    phoneHotLabel: "Горячая линия (бесплатно)",
    email: "priemnaya@reg54.roszdravnadzor.ru",
    site: "https://54reg.roszdravnadzor.gov.ru",
    siteLabel: "54reg.roszdravnadzor.gov.ru",
    note: "Приём руководителя: вторник с 14:30 до 17:00",
  },
  {
    name: "Управление Роспотребнадзора по Новосибирской области",
    address: "630132, г. Новосибирск, ул. Челюскинцев, д. 7а",
    phone: "+7 (383) 220-28-75",
    site: "https://54.rospotrebnadzor.ru",
    siteLabel: "54.rospotrebnadzor.ru",
  },
  {
    name: "Министерство здравоохранения Российской Федерации",
    address: "127994, ГСП-4, г. Москва, Рахмановский пер., д. 3",
    phone: "+7 (495) 628-44-53",
    phoneHot: "+7 (495) 627-29-93",
    phoneHotLabel: "Телефон для обращений граждан",
    site: "https://minzdrav.gov.ru",
    siteLabel: "minzdrav.gov.ru",
  },
];

export default function Supervisors() {
  return (
    <>
      <SEO
        title="Контролирующие органы — Ваш Ортопед"
        description="Контакты контролирующих органов в сфере здравоохранения по Новосибирской области."
        canonical="/supervisors"
      />

      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <Link to="/contacts" className="inline-flex items-center gap-1 text-sm text-clinic-teal hover:underline mb-4">
            <Icon name="ChevronLeft" size={15} />
            Назад к контактам
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center">
              <Icon name="Scale" size={20} className="text-clinic-teal" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-clinic-text">Контролирующие органы</h1>
          </div>
          <p className="text-clinic-text-muted text-sm mt-1">Куда обратиться по вопросам качества медицинской помощи</p>
        </div>
      </section>

      <section className="container py-10">
        <div className="space-y-5 max-w-3xl">
          {orgs.map((org) => (
            <div key={org.name} className="bg-white rounded-2xl border border-border p-6">
              <h2 className="font-display text-lg text-clinic-text mb-4">{org.name}</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <Icon name="MapPin" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
                  <span className="text-clinic-text-muted">{org.address}</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Icon name="Phone" size={16} className="text-clinic-teal shrink-0" />
                  <a href={`tel:${org.phone.replace(/\s|\(|\)|-/g, "")}`} className="text-clinic-text hover:text-clinic-teal transition-colors">
                    {org.phone}
                  </a>
                </li>
                {org.phoneHot && (
                  <li className="flex items-center gap-3 text-sm">
                    <Icon name="PhoneCall" size={16} className="text-clinic-teal shrink-0" />
                    <span>
                      <a href={`tel:${org.phoneHot.replace(/\s|\(|\)|-/g, "")}`} className="text-clinic-text hover:text-clinic-teal transition-colors">
                        {org.phoneHot}
                      </a>
                      {org.phoneHotLabel && <span className="text-clinic-text-muted ml-2">— {org.phoneHotLabel}</span>}
                    </span>
                  </li>
                )}
                {org.email && (
                  <li className="flex items-center gap-3 text-sm">
                    <Icon name="Mail" size={16} className="text-clinic-teal shrink-0" />
                    <a href={`mailto:${org.email}`} className="text-clinic-teal hover:underline">
                      {org.email}
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3 text-sm">
                  <Icon name="Globe" size={16} className="text-clinic-teal shrink-0" />
                  <a href={org.site} target="_blank" rel="noopener noreferrer" className="text-clinic-teal hover:underline">
                    {org.siteLabel}
                  </a>
                </li>
                {org.note && (
                  <li className="flex items-center gap-3 text-sm">
                    <Icon name="Clock" size={16} className="text-clinic-text-muted shrink-0" />
                    <span className="text-clinic-text-muted">{org.note}</span>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
