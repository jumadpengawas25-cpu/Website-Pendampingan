import { useState } from "react";
import { sekolahCredentials } from "../data/sekolah.js";

const STORAGE_KEY = "portal_sekolah_session";

export function usePortalAuth() {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (npsn, password) => {
    const account = sekolahCredentials.find(
      (acc) => acc.npsn === npsn && acc.password === password
    );
    if (account) {
      const sessionData = {
        npsn,
        schoolSlug: account.schoolSlug,
        loggedInAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      localStorage.setItem("loggedInSchool", npsn);
      setSession(sessionData);
      return { success: true, schoolSlug: account.schoolSlug };
    }
    return {
      success: false,
      error: "NPSN atau Password tidak cocok!",
    };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("loggedInSchool");
    setSession(null);
  };

  return { session, login, logout, isLoggedIn: !!session };
}
