import { useCallback, useEffect, useState } from "react";
import { MedRole, Session, ddsRequest, loadSession, login as apiLogin, logout as apiLogout, clearSession, patchSession } from "./api";

export default function useDdsSession() {
  const [session, setSession] = useState<Session | null>(() => loadSession());
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => {
      setNow(Date.now());
      const s = loadSession();
      if (!s) setSession(null);
    }, 15000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!session || session.med_role) return;
    ddsRequest<{ med_role: MedRole }>("GET", { action: "me" })
      .then((r) => {
        patchSession({ med_role: r.med_role });
        setSession(loadSession());
      })
      .catch(() => undefined);
  }, [session]);

  const login = useCallback(async (l: string, p: string) => {
    const s = await apiLogin(l, p);
    setSession(s);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setSession(null);
  }, []);

  const expire = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const minutesLeft = session ? Math.max(0, Math.ceil((session.expiresAt - now) / 60000)) : 0;

  return { session, login, logout, expire, minutesLeft };
}
