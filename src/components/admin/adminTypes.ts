export const SETTINGS_API = "https://functions.poehali.dev/fb6d8843-3150-4c51-a87f-cbb7f6143e7e";
export const CONTENT_API  = "https://functions.poehali.dev/e3850f3d-bba8-4c1c-8dbb-bf8d3f7bdd34";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  description: string;
  img: string;
  imgPosition: string;
  imgHeight: string;
  imgMarginTop: string;
  sort_order: number;
  is_active: boolean;
}

export interface Service {
  id: number;
  slug: string;
  icon: string;
  title: string;
  short: string;
  desc: string;
  items: string[];
  color: string;
  sort_order: number;
  is_active: boolean;
}

export interface PriceItem {
  id: number;
  name: string;
  price: string;
  description: string;
}

export interface PriceSection {
  id: number;
  title: string;
  icon: string;
  sort_order?: number;
  items: PriceItem[];
}

export const SETTINGS_SECTIONS = [
  {
    id: "contacts",
    title: "Контакты",
    icon: "Phone",
    fields: [
      { key: "contacts.phone",           label: "Телефон" },
      { key: "contacts.email",           label: "Email" },
      { key: "contacts.address",         label: "Адрес" },
      { key: "contacts.hours_weekday",   label: "Часы работы: Пн–Пт" },
      { key: "contacts.hours_saturday",  label: "Часы работы: Суббота" },
      { key: "contacts.hours_sunday",    label: "Часы работы: Воскресенье" },
    ],
  },
  {
    id: "home",
    title: "Главная",
    icon: "Home",
    fields: [
      { key: "home.hero_title",    label: "Заголовок",    multiline: true },
      { key: "home.hero_subtitle", label: "Подзаголовок", multiline: true },
    ],
  },
  {
    id: "about",
    title: "О клинике",
    icon: "Building2",
    fields: [
      { key: "about.clinic_name", label: "Название клиники" },
      { key: "about.tagline",     label: "Слоган" },
    ],
  },
];

export const NAV_ITEMS = [
  { id: "contacts", title: "Контакты",  icon: "Phone",            group: "settings" },
  { id: "home",     title: "Главная",   icon: "Home",             group: "settings" },
  { id: "about",    title: "О клинике", icon: "Building2",        group: "settings" },
  { id: "doctors",  title: "Врачи",     icon: "Users",            group: "content"  },
  { id: "services", title: "Услуги",    icon: "Stethoscope",      group: "content"  },
  { id: "prices",   title: "Цены",      icon: "CircleDollarSign", group: "content"  },
];

export const blankDoctor = (): Omit<Doctor, "id"> => ({
  name: "", specialty: "", experience: "", description: "",
  img: "", imgPosition: "center top", imgHeight: "24rem", imgMarginTop: "0",
  sort_order: 0, is_active: true,
});

export const blankService = (): Omit<Service, "id"> => ({
  slug: "", icon: "", title: "", short: "", desc: "",
  items: [], color: "bg-blue-50 text-blue-600",
  sort_order: 0, is_active: true,
});