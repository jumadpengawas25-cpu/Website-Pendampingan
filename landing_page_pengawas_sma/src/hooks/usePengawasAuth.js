import { useState, useCallback } from "react";

const STORAGE_KEY = "pengawas_session";
const ROLE_KEY = "role";

export function usePengawasAuth() {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((username, password) => {
    if (username === "pengawas" && password === "admin") {
      const sessionData = {
        username,
        role: "pengawas",
        loggedInAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      localStorage.setItem(ROLE_KEY, "pengawas");
      setSession(sessionData);
      return { success: true };
    }
    return { success: false, error: "Username atau Password salah!" };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ROLE_KEY);
    setSession(null);
  }, []);

  return { session, login, logout, isLoggedIn: !!session };
}