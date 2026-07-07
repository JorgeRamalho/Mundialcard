import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppLink, AppNavLink } from "./AppLink.jsx";
import DrDigitalIcon from "./triage/DrDigitalIcon.jsx";
import { contact } from "../data/content";
import { homeSectionLink } from "../lib/scrollTo.js";
import NavClientLogin from "./NavClientLogin";

/** Links do menu desktop (texto limpo). */
const desktopLinks = [
  { to: "/", label: "Início", end: true },
  { to: homeSectionLink("beneficios"), label: "Benefícios", section: true },
  { to: homeSectionLink("parceiros-rede"), label: "Parceiros", section: true },
  { to: homeSectionLink("planos"), label: "Planos", section: true },
  { to: homeSectionLink("telemedicina"), label: "Telemedicina", section: true },
  { to: homeSectionLink("faq"), label: "FAQ", section: true },
  { to: "/consulta-digital", label: "Dr. Digital", drDigital: true },
  { to: "/atendimento", label: "Atendimento" },
];

/** Menu mobile completo — plano de saúde com emojis e ícones. */
const mobileNavSections = [
  {
    id: "plano",
    title: "Plano de saúde",
    icon: "🏥",
    items: [
      { to: "/", label: "Início", icon: "🏠", end: true },
      { to: homeSectionLink("beneficios"), label: "Benefícios", icon: "💊", section: true },
      { to: homeSectionLink("planos"), label: "Planos", icon: "📋", section: true },
      { to: homeSectionLink("telemedicina"), label: "Telemedicina", icon: "🩺", section: true },
      { to: homeSectionLink("parceiros-rede"), label: "Rede credenciada", icon: "🤝", section: true },
      { to: homeSectionLink("faq"), label: "Dúvidas frequentes", icon: "❓", section: true },
    ],
  },
  {
    id: "digital",
    title: "Atendimento digital",
    icon: "📱",
    items: [
      { to: "/consulta-digital", label: "Dr. Digital — triagem", icon: "dr-digital", end: false },
      { to: "/agendamento", label: "Agendar consulta", icon: "📅" },
      { to: "/atendimento", label: "Central de atendimento", icon: "💬" },
      { to: "/area-cliente", label: "Área do cliente", icon: "👤" },
    ],
  },
  {
    id: "plataforma",
    title: "Plataforma",
    icon: "⚙️",
    items: [
      { to: "/dashboard", label: "Dashboard operacional", icon: "📊" },
      { to: "/produtos", label: "Produtos e serviços", icon: "🛒" },
      { to: "/app", label: "Baixar app", icon: "📲" },
      { to: "/parceiros", label: "Área do representante", icon: "🧑‍💼" },
    ],
  },
  {
    id: "institucional",
    title: "Institucional",
    icon: "🏛️",
    items: [
      { to: "/cadastro", label: "Cupom de inauguração", icon: "🎁" },
      { to: "/politica-de-cookies", label: "Política de cookies", icon: "🍪" },
    ],
  },
];

const mobileQuickActions = [
  {
    href: contact.whatsappUrl,
    label: "WhatsApp",
    icon: "💚",
    external: true,
    variant: "ghost",
  },
  {
    to: "/cadastro",
    label: "Cupom de lançamento",
    icon: "🎟️",
    variant: "primary",
  },
];

function MobileNavIcon({ icon }) {
  if (icon === "dr-digital") {
    return (
      <span className="mobile-nav__icon mobile-nav__icon--svg" aria-hidden="true">
        <DrDigitalIcon size={28} />
      </span>
    );
  }

  return (
    <span className="mobile-nav__icon" aria-hidden="true">
      {icon}
    </span>
  );
}

function MobileNavItem({ item, onClose }) {
  const content = (
    <>
      <MobileNavIcon icon={item.icon} />
      <span className="mobile-nav__text">{item.label}</span>
    </>
  );

  if (item.section) {
    return (
      <AppLink to={item.to} onClick={onClose} className="mobile-nav__link">
        {content}
      </AppLink>
    );
  }

  return (
    <AppNavLink
      to={item.to}
      end={item.end}
      onClick={onClose}
      className={({ isActive }) => `mobile-nav__link${isActive ? " active" : ""}`}
    >
      {content}
    </AppNavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!open) return undefined;

    const scrollY = window.scrollY;
    document.body.classList.add("nav-open");
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.classList.remove("nav-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const renderDesktopLinks = () => (
    <>
      {desktopLinks.map((link) =>
        link.section ? (
          <AppLink key={link.to} to={link.to} onClick={closeMenu}>
            {link.label}
          </AppLink>
        ) : link.drDigital ? (
          <AppNavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={closeMenu}
            title="Dr. Digital — triagem médica"
            className={({ isActive }) => `nav-link-dr-digital${isActive ? " active" : ""}`}
          >
            <span className="nav-dr-digital__badge" aria-hidden="true">
              🩺
            </span>
            <span className="nav-dr-digital__label">{link.label}</span>
          </AppNavLink>
        ) : (
          <AppNavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {link.label}
          </AppNavLink>
        )
      )}
    </>
  );

  const renderMobileMenu = () => (
    <>
      <div className="mobile-nav__hero">
        <DrDigitalIcon size={48} />
        <div>
          <strong>MundialCard</strong>
          <span>Seu cartão de super benefícios</span>
        </div>
      </div>

      {mobileNavSections.map((section) => (
        <div key={section.id} className="mobile-nav__section">
          <p className="mobile-nav__group">
            <span aria-hidden="true">{section.icon}</span>
            {section.title}
          </p>
          {section.items.map((item) => (
            <MobileNavItem key={`${section.id}-${item.to}`} item={item} onClose={closeMenu} />
          ))}
        </div>
      ))}

      <div className="nav-mobile-actions">
        {mobileQuickActions.map((action) =>
          action.external ? (
            <a
              key={action.label}
              href={action.href}
              className={`btn btn-${action.variant} btn-sm mobile-nav__action`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <span aria-hidden="true">{action.icon}</span>
              {action.label}
            </a>
          ) : (
            <AppLink
              key={action.label}
              to={action.to}
              className={`btn btn-${action.variant} btn-sm mobile-nav__action`}
              onClick={closeMenu}
            >
              <span aria-hidden="true">{action.icon}</span>
              {action.label}
            </AppLink>
          )
        )}
      </div>
    </>
  );

  return (
    <>
      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="navbar-inner">
          <AppLink to="/" className="brand" onClick={closeMenu}>
            <img src="/logo.svg" alt="MundialCard" />
          </AppLink>

          <nav className="nav-links nav-links-desktop" aria-label="Menu principal">
            {renderDesktopLinks()}
          </nav>

          <div className="nav-actions">
            <NavClientLogin />
            <button
              type="button"
              className="nav-toggle"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {open &&
        createPortal(
          <div className="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu de navegação">
            <div className="mobile-nav__header">
              <AppLink to="/" className="brand" onClick={closeMenu}>
                <img src="/logo.svg" alt="MundialCard" />
              </AppLink>
              <button
                type="button"
                className="mobile-nav__close"
                aria-label="Fechar menu"
                onClick={closeMenu}
              >
                ✕
              </button>
            </div>
            <nav className="mobile-nav__panel" aria-label="Menu principal mobile">
              {renderMobileMenu()}
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
