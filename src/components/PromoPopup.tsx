import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

const OFFERS = [
  {
    accent: "20%",
    accentColor: "#2a7a6f",
    bg: "#f0faf8",
    border: "#2a7a6f",
    title: "Скидка на первичный приём",
    subtitle: "по пенсионному удостоверению",
    desc: "Предъявите пенсионное удостоверение и получите скидку 20% на консультацию.",
    promo: null,
  },
  {
    accent: "25%",
    accentColor: "#e07a2f",
    bg: "#fdf6f0",
    border: "#e07a2f",
    title: "Лечение артроза",
    subtitle: "Скидка на приём и плазму",
    desc: "Скидка 25% на приём врача и PRP-плазмотерапию при лечении артроза.",
    promo: "Ортопед Нск",
  },
  {
    accent: "25%",
    accentColor: "#7c3aed",
    bg: "#f5f0ff",
    border: "#7c3aed",
    title: "Лечение грыж и протрузий",
    subtitle: "Скидка на приём невролога",
    desc: "Скидка 25% на первичный приём при обращении с грыжей или протрузией.",
    promo: "Ваш невролог",
  },
  {
    accent: "10%",
    accentColor: "#b45309",
    bg: "#fffbeb",
    border: "#b45309",
    title: "Недорогой массаж",
    subtitle: "Курс 10 процедур при оплате сразу",
    desc: "Скидка 10% на курс из 10 сеансов лечебного массажа при единовременной оплате.",
    promo: "Ортомассаж",
  },
];

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promo_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const close = () => {
    sessionStorage.setItem("promo_dismissed", "1");
    setOpen(false);
  };

  if (!open) return null;

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        backgroundColor: "rgba(0,0,0,0.55)",
        overflowY: "auto",
      }}
    >
      <div style={{
        position: "relative",
        background: "#fff",
        borderRadius: 20,
        width: "100%",
        maxWidth: 560,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        maxHeight: "calc(100vh - 24px)",
        overflowY: "auto",
        margin: "auto",
      }}>
        {/* Header */}
        <div style={{ background: "#2a7a6f", padding: "20px 24px 22px", textAlign: "center", color: "#fff" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.2)", marginBottom: 10 }}>
            <Icon name="Tag" size={24} className="text-white" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Специальные предложения</div>
          <div style={{ fontSize: 17, fontWeight: 600 }}>Акции для наших пациентов</div>
        </div>

        {/* Offers */}
        <div style={{ padding: "16px 16px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 16 }}>
            {OFFERS.map((o) => (
              <div key={o.title} style={{ background: o.bg, borderLeft: `4px solid ${o.border}`, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: o.accentColor, lineHeight: 1, flexShrink: 0 }}>{o.accent}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3 }}>{o.title}</div>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}>{o.subtitle}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5, margin: "0 0 8px" }}>{o.desc}</p>
                {o.promo && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.7)", border: `1px solid ${o.border}`, borderRadius: 6, padding: "3px 8px" }}>
                    <Icon name="Ticket" size={11} style={{ color: o.accentColor }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: o.accentColor }}>«{o.promo}»</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: "#1a5248", marginBottom: 14, lineHeight: 1.4 }}>
            «Ваш ортопед» — пожалуй самые низкие цены в Новосибирске.
          </div>

          <a
            href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{ display: "block", width: "100%", background: "#2a7a6f", color: "#fff", padding: "13px", borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none", marginBottom: 8, textAlign: "center", boxSizing: "border-box" }}
          >
            Записаться на приём
          </a>
          <button
            onClick={close}
            style={{ display: "block", width: "100%", fontSize: 12, color: "#888", background: "none", border: "none", cursor: "pointer", textAlign: "center", padding: "4px 0" }}
          >
            Закрыть
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={close}
          style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", color: "#fff" }}
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>,
    document.body
  );
}
