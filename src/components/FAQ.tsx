import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQS = [
  {
    q: "Как записаться на приём к ортопеду в Новосибирске?",
    a: "Записаться можно онлайн через форму на сайте, по телефону +7 999 464 91 94 или в мессенджерах. Принимаем ежедневно, без очередей.",
  },
  {
    q: "Какие методы лечения суставов применяются в клинике?",
    a: "Мы применяем PRP-терапию (плазмотерапию), SVF-терапию (стволовые клетки), введение гиалуроновой кислоты, медикаментозные блокады и физиотерапию. Выбор метода зависит от диагноза и стадии заболевания.",
  },
  {
    q: "Можно ли вылечить артроз без операции?",
    a: "Да, в большинстве случаев артроз успешно лечится консервативными методами. PRP-терапия и SVF-терапия позволяют восстановить хрящевую ткань и значительно снизить боль без хирургического вмешательства.",
  },
  {
    q: "Сколько стоит консультация травматолога-ортопеда?",
    a: "Стоимость первичной консультации указана в разделе «Цены». Мы придерживаемся прозрачного ценообразования — никаких скрытых доплат.",
  },
  {
    q: "Как долго длится курс лечения суставов?",
    a: "Продолжительность зависит от диагноза и выбранного метода. PRP-терапия обычно проводится курсом 3–5 инъекций с интервалом 1–2 недели. Эффект от гиалуроновой кислоты сохраняется до 12 месяцев.",
  },
  {
    q: "Проводите ли вы диагностику — УЗИ суставов, МРТ?",
    a: "Да, наш врач проводит УЗИ суставов прямо на приёме. Для МРТ и рентгена при необходимости направим в партнёрские центры с минимальным ожиданием.",
  },
];

export const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(({ q, a }) => ({
    "@type": "Question",
    "name": q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": a,
    },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="container py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-display text-4xl text-clinic-text mb-2">Частые вопросы</h2>
          <p className="text-clinic-text-muted text-sm">Ответы на вопросы наших пациентов</p>
        </div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-clinic-beige transition-colors"
              >
                <span className="font-medium text-clinic-text text-sm leading-snug">{faq.q}</span>
                <Icon
                  name="ChevronDown"
                  size={18}
                  className={`text-clinic-teal shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-clinic-text-muted leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
