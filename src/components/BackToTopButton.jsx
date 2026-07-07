import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSectionFromSearch, scrollToTop } from "../lib/scrollTo.js";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, location.search, location.hash]);

  const goToTop = () => {
    const section = getSectionFromSearch(location.search);

    if (location.pathname === "/" && section) {
      navigate("/");
      return;
    }

    scrollToTop("smooth");
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={goToTop}
      aria-label="Voltar ao topo desta página"
      title="Voltar ao topo desta página"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
