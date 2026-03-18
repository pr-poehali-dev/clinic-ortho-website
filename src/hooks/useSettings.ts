import { useEffect, useState } from "react";

const API_URL = "https://functions.poehali.dev/fb6d8843-3150-4c51-a87f-cbb7f6143e7e";

let cache: Record<string, string> | null = null;

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, string>>(cache ?? {});
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        cache = data;
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const get = (key: string, fallback = "") => settings[key] ?? fallback;

  return { settings, loading, get };
}
