import { useEffect, useRef, useState } from "react";

interface Props {
  value: number | null | undefined;
  editable: boolean;
  onSave: (v: number) => Promise<void> | void;
  className?: string;
  decimals?: boolean;
  placeholder?: string;
  format?: (v: number) => string;
}

export default function NumCell({ value, editable, onSave, className = "", decimals, placeholder = "", format }: Props) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (edit) ref.current?.select();
  }, [edit]);

  const shown = value ? (format ? format(value) : String(value)) : placeholder;

  if (!editable) return <div className={`px-1.5 py-1.5 ${className}`}>{shown}</div>;

  if (!edit) {
    return (
      <button
        type="button"
        onClick={() => {
          setText(value ? String(value) : "");
          setEdit(true);
        }}
        className={`w-full h-full min-h-[32px] px-1.5 py-1.5 hover:bg-clinic-teal/10 focus:outline-none focus:ring-2 focus:ring-clinic-teal/40 rounded ${className}`}
      >
        {shown}
      </button>
    );
  }

  const commit = async () => {
    setEdit(false);
    const raw = text.trim().replace(",", ".").replace(/\s/g, "");
    const n = raw === "" ? 0 : decimals ? Number(raw) : Math.round(Number(raw));
    if (Number.isNaN(n) || n < 0 || n === (value || 0)) return;
    await onSave(n);
  };

  return (
    <input
      ref={ref}
      inputMode={decimals ? "decimal" : "numeric"}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        if (e.key === "Escape") setEdit(false);
      }}
      className="w-full min-w-[44px] h-8 px-1.5 text-center bg-white border-2 border-clinic-teal rounded outline-none"
    />
  );
}
