import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/SEO";
import { useSettings } from "@/hooks/useSettings";

const API_URL = "https://functions.poehali.dev/669b91b8-f4ae-4395-951c-9bdf20aefe50";

export default function Contacts() {
  const { get } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, comment: form.message }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Не удалось отправить. Позвоните нам: +7 999 464 91 94");
      }
    } catch {
      setError("Ошибка соединения. Позвоните нам: +7 999 464 91 94");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Контакты клиники Ваш Ортопед в Новосибирске"
        description="Адрес: Новосибирск, ул. Есенина, 67. Телефон: +7 999 464 91 94. Пн–Пт 8:00–20:00, сб 9:00–17:00. Запись онлайн или по телефону. Удобная парковка."
        canonical="/contacts"
        breadcrumbs={[{ name: "Главная", url: "/" }, { name: "Контакты", url: "/contacts" }]}
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "Ваш Ортопед",
          "url": "https://vash-ortoped.ru",
          "telephone": "+79994649194",
          "email": "admin@vash-ortoped.ru",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Есенина, д. 67",
            "addressLocality": "Новосибирск",
            "addressCountry": "RU",
            "postalCode": "630000"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 55.034839,
            "longitude": 82.995861
          },
          "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "20:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "17:00" }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+79994649194",
            "contactType": "customer service",
            "availableLanguage": "Russian"
          }
        }}
      />
      {/* Hero */}
      <section className="bg-clinic-beige py-10 border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="MapPin" size={15} /> Как нас найти
            </div>
            <h1 className="font-display text-5xl text-clinic-text mb-4">Контакты</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Удобная парковка рядом с клиникой.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border p-7">
            <h2 className="font-display text-2xl text-clinic-text mb-6">Наши контакты</h2>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name="Phone" size={18} className="text-clinic-teal" />
                </div>
                <div>
                  <div className="text-xs text-clinic-text-muted mb-1">Телефон</div>
                  <a href={`tel:${get("contacts.phone", "+7 999 464 91 94").replace(/\s/g, "")}`} className="text-clinic-text font-medium text-lg hover:text-clinic-teal transition-colors">
                    {get("contacts.phone", "+7 999 464 91 94")}
                  </a>
                  <p className="text-xs text-clinic-text-muted mt-0.5">Ежедневно с 8:00 до 20:00</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={18} className="text-clinic-teal" />
                </div>
                <div>
                  <div className="text-xs text-clinic-text-muted mb-1">Адрес</div>
                  <p className="text-clinic-text font-medium">{get("contacts.address", "г. Новосибирск, ул. Есенина, д. 67")}</p>
                  <p className="text-xs text-clinic-text-muted mt-0.5">Удобная парковка рядом с клиникой</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name="Clock" size={18} className="text-clinic-teal" />
                </div>
                <div>
                  <div className="text-xs text-clinic-text-muted mb-1">Режим работы</div>
                  <div className="space-y-1 text-sm text-clinic-text">
                    <div className="flex justify-between gap-6">
                      <span>Понедельник — Пятница</span>
                      <span className="font-medium">{get("contacts.hours_weekday", "8:00 — 20:00")}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Суббота</span>
                      <span className="font-medium">{get("contacts.hours_saturday", "9:00 — 17:00")}</span>
                    </div>
                    <div className="flex justify-between gap-6 text-clinic-text-muted">
                      <span>Воскресенье</span>
                      <span>{get("contacts.hours_sunday", "Выходной")}</span>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name="Mail" size={18} className="text-clinic-teal" />
                </div>
                <div>
                  <div className="text-xs text-clinic-text-muted mb-1">Email</div>
                  <a href={`mailto:${get("contacts.email", "admin@vash-ortoped54.ru")}`} className="text-clinic-text font-medium hover:text-clinic-teal transition-colors">
                    {get("contacts.email", "admin@vash-ortoped54.ru")}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-clinic-teal-light flex items-center justify-center shrink-0">
                  <Icon name="MessageCircle" size={18} className="text-clinic-teal" />
                </div>
                <div>
                  <div className="text-xs text-clinic-text-muted mb-1">Мессенджеры</div>
                  <div className="flex gap-3 mt-1">
                    <a
                      href="https://t.me/+79994649194"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#29a9eb] text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Icon name="Send" size={15} />
                      Написать в Telegram
                    </a>
                    <a
                      href="https://max.ru/+79994649194"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#0077FF] text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Icon name="MessageCircle" size={15} />
                      Написать в Max
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Map Yandex */}
          <div className="rounded-2xl border border-border overflow-hidden h-64">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=82.995861%2C55.034839&z=16&pt=82.995861%2C55.034839%2Cpm2rdm&text=%D0%92%D0%B0%D1%88+%D0%9E%D1%80%D1%82%D0%BE%D0%BF%D0%B5%D0%B4"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Карта — Ваш Ортопед"
              allowFullScreen
            />
          </div>
        </div>

        {/* Feedback form */}
        <div className="bg-white rounded-2xl border border-border p-7">
          {submitted ? (
            <div className="py-12 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-clinic-teal-light flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-clinic-teal" />
              </div>
              <h3 className="font-display text-2xl mb-2 text-clinic-text">Спасибо за обращение!</h3>
              <p className="text-sm text-clinic-text-muted">
                Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", message: "" }); }}
                className="mt-6 text-clinic-teal text-sm hover:underline"
              >
                Отправить ещё одно сообщение
              </button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl text-clinic-text mb-2">Написать нам</h2>
              <p className="text-sm text-clinic-text-muted mb-6">Ответим в течение рабочего дня</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-clinic-text mb-1.5 block">Ваше имя *</label>
                  <Input
                    required
                    placeholder="Иван Иванович"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-clinic-text mb-1.5 block">Телефон *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-clinic-text mb-1.5 block">Сообщение</label>
                  <Textarea
                    placeholder="Задайте ваш вопрос или опишите проблему..."
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}
                <p className="text-xs text-clinic-text-muted">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-clinic-teal text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <Icon name="Loader" size={15} className="animate-spin" />
                  ) : (
                    <Icon name="Send" size={15} />
                  )}
                  {loading ? "Отправляем..." : "Отправить сообщение"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Quick contacts bar */}
      <section className="bg-clinic-teal text-white py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl">Нужна срочная консультация?</p>
            <p className="text-white/70 text-sm">Звоните — мы всегда на связи в рабочие часы</p>
          </div>
          <a
            href="tel:+79994649194"
            className="flex items-center gap-2 bg-white text-clinic-teal px-7 py-3 rounded-xl font-medium text-sm hover:bg-opacity-90 transition-all whitespace-nowrap"
          >
            <Icon name="Phone" size={16} />
            +7 999 464 91 94
          </a>
        </div>
      </section>
    </>
  );
}