import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("promo_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
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
      <div style={{ position: "relative", background: "#fff", borderRadius: "16px", maxWidth: "380px", width: "100%", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "#2a7a6f", padding: "24px 24px 32px", textAlign: "center", color: "#fff" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.2)", marginBottom: 16 }}>
            <Icon name="Tag" size={28} className="text-white" />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Специальное предложение</div>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>20%</div>
          <div style={{ fontSize: 17, fontWeight: 500 }}>скидка на первичный приём</div>
        </div>

        <div style={{ padding: "20px 24px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 20, color: "#2d3748" }}>
            При предъявлении <strong style={{ color: "#2a7a6f" }}>пенсионного удостоверения</strong> вы получаете скидку 20% на первичную консультацию врача травматолога-ортопеда.
          </p>
          <a
            href="https://booking.medflex.ru/?user=331eaa0fb0b7b75fcc25b457b8454089"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{ display: "block", width: "100%", background: "#2a7a6f", color: "#fff", padding: "12px", borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none", marginBottom: 12 }}
          >
            Записаться со скидкой
          </a>
          <button
            onClick={close}
            style={{ fontSize: 12, color: "#888", background: "none", border: "none", cursor: "pointer" }}
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