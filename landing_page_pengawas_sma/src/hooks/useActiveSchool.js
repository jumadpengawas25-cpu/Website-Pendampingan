import { useMemo } from "react";
import { schools, getSchoolBySlug } from "../data.js";
import { useParams } from "../router.jsx";
import { usePortalAuth, getActiveSchool } from "./usePortalAuth.js";

export function useActiveSchool() {
  const params = useParams();
  const { session, isLoggedIn } = usePortalAuth();

  return useMemo(() => {
    const urlSlug = params.school;
    const sessionSlug = isLoggedIn ? session?.schoolSlug : null;
    const lsActive = getActiveSchool();

    const slug =
      urlSlug || sessionSlug || lsActive?.slug || schools[0]?.slug;

    const school = getSchoolBySlug(slug) ?? schools[0] ?? null;

    if (!school && lsActive) {
      return {
        id: lsActive.id,
        slug: lsActive.slug,
        name: lsActive.name,
        npsn: lsActive.npsn,
        logo: lsActive.logo,
        logoAlt: lsActive.logoAlt,
      };
    }

    return school ?? schools[0] ?? null;
  }, [params.school, session?.schoolSlug, isLoggedIn]);
}
