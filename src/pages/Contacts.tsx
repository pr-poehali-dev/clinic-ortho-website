import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-clinic-beige py-16 border-b border-border">
        <div className="container">
          <div className="max-w-xl">
            <div className="text-clinic-teal text-sm font-medium mb-2 flex items-center gap-2">
              <Icon name="MapPin" size={15} /> Как нас найти
            </div>
            <h1 className="font-display text-5xl text-clinic-text mb-4">Контакты</h1>
            <p className="text-clinic-text-muted leading-relaxed">
              Мы находимся в центре Москвы. Удобная парковка и рядом со станцией метро.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                  <a href="tel:+79994649194" className="text-clinic-text font-medium text-lg hover:text-clinic-teal transition-colors">
                    +7 999 464 91 94
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
                  <p className="text-clinic-text font-medium">г. Москва, ул. Здоровья, д. 12</p>
                  <p className="text-xs text-clinic-text-muted mt-0.5">м. Проспект Мира, 5 мин пешком</p>
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
                      <span className="font-medium">8:00 — 20:00</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Суббота</span>
                      <span className="font-medium">9:00 — 17:00</span>
                    </div>
                    <div className="flex justify-between gap-6 text-clinic-text-muted">
                      <span>Воскресенье</span>
                      <span>Выходной</span>
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
                  <a href="mailto:info@ortomed.ru" className="text-clinic-text font-medium hover:text-clinic-teal transition-colors">
                    info@ortomed.ru
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Map placeholder */}
          <div className="bg-clinic-beige rounded-2xl border border-border overflow-hidden h-56 flex items-center justify-center">
            <div className="text-center text-clinic-text-muted">
              <Icon name="Map" size={36} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Карта проезда</p>
              <p className="text-xs">г. Москва, ул. Здоровья, д. 12</p>
            </div>
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
                <p className="text-xs text-clinic-text-muted">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
                <button
                  type="submit"
                  className="w-full bg-clinic-teal text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={15} />
                  Отправить сообщение
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
