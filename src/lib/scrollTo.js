export const SECTION_QUERY_KEY = "section";

/** Link para seção da Home compatível com HashRouter (`#/?section=planos`). */
export function homeSectionLink(sectionId) {
  if (!sectionId) return "/";
  return pageSectionLink("/", sectionId);
}

/** Link para seção em qualquer página (`#/rota?section=id`). */
export function pageSectionLink(pathname, sectionId) {
  const base = pathname?.startsWith("/") ? pathname : `/${pathname || ""}`;
  if (!sectionId) return base;
  return `${base}?${SECTION_QUERY_KEY}=${encodeURIComponent(sectionId)}`;
}

const LEGACY_SECTION_PATHS = {
  planos: "planos",
  beneficios: "beneficios",
  telemedicina: "telemedicina",
  faq: "faq",
  "parceiros-rede": "parceiros-rede",
  hero: "hero",
  jornada: "jornada",
  suporte: "suporte",
  lancamento: "lancamento",
};

export function legacySectionRedirect(pathname) {
  const key = pathname.replace(/^\//, "");
  return LEGACY_SECTION_PATHS[key] || null;
}

export function parseRouteTarget(to) {
  if (typeof to === "string") {
    const [pathname = "/", search = ""] = to.split("?");
    return {
      pathname: pathname || "/",
      search: search ? `?${search}` : "",
    };
  }

  const pathname = to.pathname || "/";
  const search = to.search
    ? to.search.startsWith("?")
      ? to.search
      : `?${to.search}`
    : "";

  return { pathname, search };
}

export function isSameRoute(location, to) {
  const target = parseRouteTarget(to);
  return location.pathname === target.pathname && (location.search || "") === target.search;
}

export function scrollToTop(behavior = "auto") {
  window.scrollTo({ top: 0, left: 0, behavior });
}

export function scrollToElement(elementOrId, options = {}) {
  const { behavior = "smooth" } = options;
  const el =
    typeof elementOrId === "string" ? document.getElementById(elementOrId) : elementOrId;
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function scrollToElementWithRetry(elementOrId, options = {}) {
  const { attempts = 12, interval = 60, behavior = "smooth", onFail } = options;
  let count = 0;

  const run = () => {
    const instant = count === 0 ? "auto" : behavior;
    if (scrollToElement(elementOrId, { behavior: instant })) return;
    count += 1;
    if (count < attempts) {
      setTimeout(run, interval);
      return;
    }
    onFail?.();
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
}

export function getSectionFromSearch(search) {
  return new URLSearchParams(search).get(SECTION_QUERY_KEY);
}

export function handleScrollNavigation(location, to, behavior = "smooth") {
  if (isSameRoute(location, to)) {
    scrollToTop(behavior);
    return true;
  }
  return false;
}
