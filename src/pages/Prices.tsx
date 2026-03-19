import { useState } from "react";
import Icon from "@/components/ui/icon";
import SEO from "@/components/SEO";

const PRICE_SECTIONS = [
  {
    title: "Консультации",
    icon: "Stethoscope",
    items: [
      { name: "Приём врача травматолога-ортопеда первичный", price: "2 200" },
      { name: "Приём врача травматолога-ортопеда повторный", price: "1 500" },
    ],
  },
  {
    title: "Блокады",
    icon: "Syringe",
    items: [
      { name: "Внутрисуставное введение Флостерон сусп. д/ин. 7мг/мл", price: "2 500" },
      { name: "Локальная инъекционная терапия с Дексаметазон + Артикаин", price: "2 500" },
      { name: "Локальная инъекционная терапия с Дексаметазон + Лидокаин", price: "2 500" },
      { name: "Локальная инъекционная терапия с Дексаметазон + Новокаин", price: "2 500" },
      { name: "Локальная инъекционная терапия с Дексаметазон + Новокаин + Мидокалм", price: "2 800" },
      { name: "Локальная инъекционная терапия с Дипромет + Лидокаин", price: "2 800" },
      { name: "Локальная инъекционная терапия с Дипромет + Новокаин", price: "2 800" },
      { name: "Локальная инъекционная терапия с Дипромет + Артикаин", price: "2 800" },
      { name: "Локальная инъекционная терапия с Дипромет + Дексаметазон", price: "2 800" },
      { name: "Локальная инъекционная терапия с Дипроспан + Лидокаин", price: "3 000" },
      { name: "Локальная инъекционная терапия с Дипроспан + Новокаин", price: "3 000" },
      { name: "Локальная инъекционная терапия с Кеналог + Лидокаин", price: "2 500" },
      { name: "Локальная инъекционная терапия с Кеналог + Новокаин", price: "2 500" },
      { name: "Локальная инъекционная терапия с Мидокалм + Новокаин", price: "2 500" },
      { name: "Локальная инъекционная терапия с Плексатрон 4мл + Артикаин", price: "4 500" },
      { name: "Локальная инъекционная терапия с Флостерон + Лидокаин", price: "2 800" },
      { name: "Локальная инъекционная терапия с Флостерон + Новокаин", price: "2 800" },
      { name: "Локальная инъекционная терапия тазобедренного сустава с Дипроспан + Лидокаин", price: "3 500" },
      { name: "Околосуставное введение Дипромет 1 мл №1", price: "2 800" },
      { name: "Околосуставное введение Дипроспан 1 мл №1", price: "2 800" },
      { name: "Околосуставное введение Кеналог 1 мл №1", price: "2 500" },
      { name: "Околосуставное введение Флостерон 1 мл №1", price: "2 500" },
      { name: "Блокада места перелома (включая стоимость анестетика)", price: "500" },
      { name: "Блокада по триггерным зонам + внутрисуставная инъекция (Дексаметазон)", price: "2 800" },
      { name: "Блокада по триггерным зонам + внутрисуставная инъекция (Дипромет)", price: "3 000" },
      { name: "Блокада по триггерным зонам + внутрисуставная инъекция (Дипроспан)", price: "3 000" },
      { name: "Блокада по триггерным зонам + внутрисуставная инъекция (Флостерон)", price: "2 800" },
      { name: "Блокада по триггерным зонам с лидокаином", price: "1 200" },
      { name: "Блокада с использованием Артикаин 2 мл", price: "1 000" },
      { name: "Введение анестезии для гиалуроновой кислоты (Артикаин 20мг/мл)", price: "300" },
      { name: "Введение местной анестезии (Артикаин 20 мг/мл)", price: "800" },
      { name: "Внутрисуставное введение в тазобедренный сустав Дипромет 1 мл №1", price: "3 000" },
      { name: "Внутрисуставное введение в тазобедренный сустав Дипроспан 1 мл №1", price: "3 200" },
      { name: "Внутрисуставное введение в тазобедренный сустав Флостерон 7мг/мл", price: "3 000" },
      { name: "Внутрисуставное введение Дексаметазон + Лидокаин", price: "2 500" },
      { name: "Внутрисуставное введение Дексаметазон + Новокаин", price: "2 500" },
      { name: "Внутрисуставное введение Дипромет 1 мл №1", price: "2 500" },
      { name: "Внутрисуставное введение Дипроспан 1 мл №1", price: "2 800" },
      { name: "Внутрисуставное введение полинуклеотидов (Хронотрон 2мл)", price: "13 000" },
      { name: "Внутрисуставное введение Флостерон + Артикаин", price: "2 800" },
      { name: "Блокада паравертебральная с новокаином + мидокалм + дексаметазон", price: "3 000" },
      { name: "Блокада паравертебральная с новокаином + мидокалм + дексаметазон + артикаин", price: "3 200" },
      { name: "Блокада паравертебральная с использованием Артикаин 40 мг/мл", price: "1 800" },
      { name: "Локальная инъекционная терапия с Флостерон + Новокаин + Мидокалм", price: "2 800" },
    ],
  },
  {
    title: "PRP-терапия",
    icon: "Droplets",
    items: [
      { name: "Введение ультранасыщенной тромбоцитарной аутоплазмы (Плазмолифтинг/PRP)", price: "4 000" },
      { name: "Плазмолифтинг/PRP + введение коллагена (Плексатрон 2мл)", price: "7 000" },
    ],
  },
  {
    title: "Гиалуроновые кислоты",
    icon: "FlaskConical",
    items: [
      { name: "Гиалуформ 1% — 2,0 мл", price: "9 000" },
      { name: "Гиалуформ 1,8% — 2,0 мл", price: "11 000" },
      { name: "Гиалуформ 2,5% — 3,0 мл", price: "24 000" },
      { name: "Visko Plus Gel 2,5%, 3 мл", price: "26 500" },
      { name: "Армавискон Platinum 3%, 3мл", price: "21 000" },
      { name: "Армавискон МН 2 мл", price: "10 000" },
      { name: "Армавискон МН 2 мл + Артикаин 2 мл", price: "10 200" },
      { name: "Армавискон Плюс 1,5%, 2 мл", price: "10 000" },
      { name: "Гиалрепайер 02 Хондрорепарант 2,0 мл", price: "15 000" },
      { name: "Гиалрепайер 10 Хондрорепарант 1,5%, 2,0 мл", price: "18 000" },
      { name: "Синовиальная жидкость BIOPORT CROSSLINK 2%, 3мл", price: "24 000" },
      { name: "Гиалрипайер 10 ХондроРепарант 5мл (локальная терапия)", price: "8 000" },
      { name: "Висколан М 2,0%, 2мл (околосуставное введение)", price: "13 000" },
      { name: "Висколан Лонг 2,3%, 3мл (около- или внутрисуставное введение)", price: "18 000" },
    ],
  },
  {
    title: "Суставные инъекции",
    icon: "Zap",
    items: [
      { name: "Внутрисуставное введение лекарственных препаратов", price: "2 500" },
      { name: "М. И. ОСТЕОКОЛЛ 2 мл", price: "3 500" },
      { name: "М. И. ОСТЕОКОЛЛ 4 мл", price: "5 000" },
      { name: "М. И. ОСТЕОКОЛЛ 6 мл", price: "6 500" },
      { name: "М. И. ОСТЕОКОЛЛ 8 мл", price: "8 000" },
      { name: "Плексатрон 2мл", price: "3 500" },
      { name: "Плексатрон 2мл в тазобедренный сустав", price: "4 000" },
      { name: "Плексатрон 4мл", price: "5 000" },
      { name: "Плексатрон 4мл в тазобедренный сустав", price: "5 500" },
      { name: "Плексатрон 6мл", price: "6 500" },
      { name: "Плексатрон 8мл", price: "8 000" },
      { name: "Локальная инъекционная терапия (без учёта стоимости лек. средств)", price: "1 500" },
      { name: "Плексатрон 2мл (локальная терапия)", price: "3 500" },
      { name: "Плексатрон 6мл (локальная терапия)", price: "6 500" },
      { name: "Флостерон 1 мл №1 (локальная терапия)", price: "3 500" },
    ],
  },
  {
    title: "SVF-терапия",
    icon: "Microscope",
    items: [
      { name: "Стенозирующий лигаментит кольцевидной связки пальца (щёлкающий палец)", price: "6 700" },
      { name: "SVF-терапия суставов — 1 сустав", price: "55 000" },
      { name: "SVF-терапия суставов — 2 сустава", price: "85 000" },
      { name: "SVF-терапия суставов — 3 сустава", price: "105 000" },
      { name: "Удаление гигромы (без гистологического исследования)", price: "6 000" },
      { name: "Устранение контрактуры пальцев (игольчатая апоневротомия, контрактура Дюпютрена)", price: "8 000" },
    ],
  },
  {
    title: "Пункции",
    icon: "CircleDot",
    items: [
      { name: "Пункция кист, гематом, суставов, синовиальных сумок (диагностическая, без введения лек. средств)", price: "1 500" },
      { name: "Пункция с введением лекарственных средств", price: "2 000" },
      { name: "Пункция с использованием Дипроспан 1 мл №1", price: "3 000" },
      { name: "Пункция с использованием Дипромет 1 мл №1", price: "3 000" },
      { name: "Пункция с использованием Флостерон 1 мл №1", price: "3 000" },
      { name: "Пункция с использованием Кеналог 1 мл №1", price: "3 000" },
      { name: "Пункция с использованием Дексаметазон 4 мг", price: "3 000" },
    ],
  },
  {
    title: "Травмпункт",
    icon: "Cross",
    items: [
      { name: "Удаление спиц под местной анестезией 1 шт", price: "3 000" },
      { name: "Удаление ногтевой пластинки при травматическом повреждении", price: "3 000" },
      { name: "Удаление поверхностно-расположенного инородного тела", price: "1 500" },
      { name: "Наложение фиксирующей повязки", price: "500" },
      { name: "Наложение гипсовой повязки (большой)", price: "3 500" },
      { name: "Наложение гипсовой повязки (средней: предплечье, кисть, стопа, лодыжка)", price: "2 300" },
      { name: "Наложение гипсовой повязки (малой: фаланги пальцев)", price: "1 500" },
      { name: "Снятие гипсовой повязки / лангеты", price: "500" },
      { name: "Снятие циркулярной гипсовой повязки", price: "800" },
      { name: "Коррекция гипсовой повязки (сторонней)", price: "500" },
      { name: "Первичная хирургическая обработка раны 1 степени", price: "2 000" },
      { name: "Первичная хирургическая обработка раны 2 степени", price: "3 000" },
      { name: "Первичная хирургическая обработка раны 3 степени", price: "4 500" },
      { name: "Наложение повязки при ушибе", price: "500" },
      { name: "Снятие швов", price: "1 000" },
      { name: "Перевязка послеоперационной раны", price: "800" },
      { name: "Иссечение мягкотканных опухолей руки (гигромы, липомы)", price: "10 000" },
      { name: "Иммобилизирующая повязка при переломе пальца кисти", price: "1 500" },
      { name: "Перевязка", price: "600" },
      { name: "Резекция ногтевой пластины (вросший ноготь)", price: "5 000" },
      { name: "Шов сухожилия", price: "7 500" },
      { name: "Формовка индивидуальных стелек-супинаторов", price: "5 000" },
      { name: "Снятие кольца", price: "1 500" },
      { name: "Аппликация тейпа (лечебное тейпирование) на одну анатомическую зону", price: "1 500" },
    ],
  },
  {
    title: "Капельницы",
    icon: "Dribbble",
    items: [
      { name: "Дексаметазон 16мг + Натрия Хлорид 200 мл", price: "400" },
      { name: "Дексаметазон 24мг + Натрия Хлорид 200 мл", price: "450" },
      { name: "Дексаметазон 4мг + Ксефокам 8мг + Натрия Хлорид 200 мл", price: "2 000" },
      { name: "Кетопрофен + Эуфиллин + Магния сульфат + Дексаметазон + Натрия Хлорид 200 мл", price: "2 000" },
      { name: "Ксефокам + Натрия Хлорид 250 мл + Новокаин + Дексаметазон 24мг", price: "2 000" },
      { name: "Натрия Хлорид 0,9% 250 мл", price: "400" },
      { name: "Никотиновая кислота + Натрия Хлорид 200 мл", price: "2 000" },
      { name: "Новокаин + Дексаметазон + Ксефокам + Натрия Хлорид 250 мл", price: "2 000" },
      { name: "Пентоксифиллин + Дексаметазон 4мг + Натрия Хлорид 200 мл", price: "2 000" },
      { name: "Пентоксифиллин + Дексаметазон 8мг + Натрия Хлорид 200 мл", price: "2 000" },
      { name: "Пентоксифиллин + Натрия Хлорид 250 мл", price: "2 000" },
      { name: "Пентоксифиллин + Натрия Хлорид 500 мл", price: "2 000" },
      { name: "Пентоксифиллин + Анальгин + Натрия Хлорид 250 мл", price: "2 000" },
      { name: "Пентоксифиллин + Ксефокам + Натрия Хлорид 250 мл", price: "2 000" },
      { name: "Цитофлавин + Натрия Хлорид 250 мл", price: "450" },
      { name: "Цитофлавин + Натрия Хлорид 500 мл", price: "500" },
      { name: "Актовегин 10,0 + Натрия Хлорид 200 мл", price: "1 500" },
      { name: "Ксефокам + Пентоксифиллин + Дексаметазон 4мг + Натрия Хлорид 200 мл", price: "2 000" },
      { name: "Инфузия (без стоимости препарата)", price: "1 000" },
    ],
  },
  {
    title: "УЗИ",
    icon: "ScanLine",
    items: [
      { name: "УЗИ на первичном приёме", price: "600" },
      { name: "УЗИ суставов", price: "1 700" },
      { name: "УЗИ парных суставов", price: "2 200" },
      { name: "УЗИ поверхностных мягких тканей", price: "1 600" },
    ],
  },
];

export default function Prices() {
  const [active, setActive] = useState(0);

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
          "url": "https://vashortopped.ru",
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <nav className="space-y-1 sticky top-24">
              {PRICE_SECTIONS.map((section, i) => (
                <button
                  key={section.title}
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
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-3">
                <Icon name={PRICE_SECTIONS[active].icon} size={20} className="text-clinic-teal" />
                <h2 className="font-display text-xl md:text-2xl text-clinic-text">{PRICE_SECTIONS[active].title}</h2>
              </div>
              <div className="divide-y divide-border">
                {PRICE_SECTIONS[active].items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/40 transition-colors">
                    <span className="text-sm text-clinic-text pr-4">{item.name}</span>
                    <span className="text-clinic-teal font-semibold font-body whitespace-nowrap">{item.price} ₽</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 bg-clinic-teal-light rounded-xl p-4 flex items-start gap-3">
              <Icon name="Info" size={16} className="text-clinic-teal mt-0.5 shrink-0" />
              <p className="text-sm text-clinic-text">
                Цены носят информационный характер. Точную стоимость уточняйте у администратора при записи. При предъявлении пенсионного удостоверения скидка — 20%.
              </p>
            </div>
          </div>
        </div>
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
            <a
              href="tel:+79994649194"
              className="flex items-center justify-center gap-2 border border-clinic-teal text-clinic-teal bg-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-clinic-teal-light transition-all"
            >
              <Icon name="Phone" size={15} /> +7 999 464 91 94
            </a>
          </div>
        </div>
      </section>
    </>
  );
}