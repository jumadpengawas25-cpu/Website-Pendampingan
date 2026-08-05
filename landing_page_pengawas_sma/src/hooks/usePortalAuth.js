import { useState } from "react";
import { sekolahCredentials } from "../data/sekolah.js";
import { schools } from "../data.js";

const STORAGE_KEY = "portal_sekolah_session";
const ACTIVE_SCHOOL_KEY = "activeSchool";

export function getActiveSchool() {
  try {
    const stored = localStorage.getItem(ACTIVE_SCHOOL_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setActiveSchool(school) {
  if (school) {
    localStorage.setItem(ACTIVE_SCHOOL_KEY, JSON.stringify(school));
  } else {
    localStorage.removeItem(ACTIVE_SCHOOL_KEY);
  }
}

export function clearActiveSchool() {
  localStorage.removeItem(ACTIVE_SCHOOL_KEY);
}

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
      const school = schools.find((s) => s.slug === account.schoolSlug) ?? null;
      const activeSchoolData = {
        id: school?.id ?? null,
        slug: account.schoolSlug,
        name: school?.name ?? "",
        npsn: account.npsn,
        logo: school?.logo ?? null,
        logoAlt: school?.logoAlt ?? "",
      };
      const sessionData = {
        npsn,
        schoolSlug: account.schoolSlug,
        schoolId: activeSchoolData.id,
        loggedInAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
      localStorage.setItem("loggedInSchool", npsn);
      setActiveSchool(activeSchoolData);
      setSession(sessionData);
      return { success: true, schoolSlug: account.schoolSlug, schoolId: activeSchoolData.id };
    }
    return {
      success: false,
      error: "NPSN atau Password tidak cocok!",
    };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("loggedInSchool");
    clearActiveSchool();
    setSession(null);
  };

  return { session, login, logout, isLoggedIn: !!session };
}
