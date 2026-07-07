import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getSectionFromSearch,
  homeSectionLink,
  legacySectionRedirect,
  scrollToElementWithRetry,
  scrollToTop,
} from "../lib/scrollTo.js";

export default function ScrollManager() {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPathRef = useRef("");
  const previousSearchRef = useRef("");

  useEffect(() => {
    const legacySection = legacySectionRedirect(location.pathname);
    if (legacySection) {
      navigate(homeSectionLink(legacySection), { replace: true });
      return;
    }

    const section = getSectionFromSearch(location.search);
    const pathChanged = previousPathRef.current !== location.pathname;
    const searchChanged = previousSearchRef.current !== location.search;

    previousPathRef.current = location.pathname;
    previousSearchRef.current = location.search;

    if (section) {
      scrollToElementWithRetry(section, {
        behavior: pathChanged ? "auto" : "smooth",
        onFail: () => scrollToTop("auto"),
      });
      return;
    }

    if (pathChanged || searchChanged) {
      scrollToTop("auto");
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}
