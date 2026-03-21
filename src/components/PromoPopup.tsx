import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promo_dismissed");
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const close = () => {
    sessionStorage.setItem("promo_dismissed", "1");
    setOpen(false);
  };

  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0,0,0,0.55)",
      }}
    >
      <div style={{ position: "relative", background: "#fff", borderRadius: "16px", maxWidth: "420px", width: "100%", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "#2a7a6f", padding: "24px 24px 28px", textAlign: "center", color: "#fff" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", marginBottom: 16 }}>
            <Icon name="Tag" size={28} className="text-white" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.7)", marginBottom: 6 }}>Специальные предложения</div>
          <div style={{ fontSize: 17, fontWeight: 500 }}>Акции для наших пациентов</div>
        </div>

        <div style={{ padding: "20px 24px 24px" }}>
          {/* Оффер 1 */}
          <div style={{ background: "#f0faf8", borderRadius: 12, padding: "16px", marginBottom: 12, borderLeft: "4px solid #2a7a6f" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#2a7a6f", lineHeight: 1 }}>20%</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>скидка на первичный приём</div>
                <div style={{ fontSize: 12, color: "#666" }}>по пенсионному удостоверению</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5, margin: 0 }}>
              Предъявите пенсионное удостоверение на приёме и получите скидку 20% на первичную консультацию врача травматолога-ортопеда.
            </p>
          </div>

          {/* Оффер 2 */}
          <div style={{ background: "#fdf6f0", borderRadius: 12, padding: "16px", marginBottom: 20, borderLeft: "4px solid #e07a2f" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#e07a2f", lineHeight: 1 }}>25%</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>скидка на курс PRP-терапии</div>
                <div style={{ fontSize: 12, color: "#666" }}>1 инъекция в подарок из 4</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5, margin: 0 }}>
              При оплате полного курса плазмотерапии суставов из 4 инъекций сразу — одна инъекция в подарок.
            </p>
          </div>

          <a
            href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{ display: "block", width: "100%", background: "#2a7a6f", color: "#fff", padding: "12px", borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none", marginBottom: 10, textAlign: "center" }}
          >
            Записаться на приём
          </a>
          <button
            onClick={close}
            style={{ display: "block", width: "100%", fontSize: 12, color: "#888", background: "none", border: "none", cursor: "pointer", textAlign: "center" }}
          >
            Закрыть
          </button>
        </div>

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
