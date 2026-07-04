import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contact } from "../data/content";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/#beneficios", label: "Benefícios" },
  { to: "/#parceiros-rede", label: "Parceiros" },
  { to: "/#planos", label: "Planos" },
  { to: "/#telemedicina", label: "Telemedicina" },
  { to: "/#faq", label: "FAQ" },
  { to: "/atendimento", label: "Atendimento" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

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

  const handleAnchor = (to) => {
    closeMenu();
    if (to.includes("#")) {
      const id = to.split("#")[1];
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const renderMenuLinks = (mobileActions = false) => (
    <>
      {links.map((link) =>
        link.to.includes("#") ? (
          <Link key={link.to} to={link.to} onClick={() => handleAnchor(link.to)}>
            {link.label}
          </Link>
        ) : (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            {link.label}
          </NavLink>
        )
      )}

      {mobileActions && (
        <div className="nav-mobile-actions">
          <a
            href={contact.whatsappUrl}
            className="btn btn-ghost btn-sm"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            WhatsApp
          </a>
          <Link to="/agendamento" className="btn btn-ghost btn-sm" onClick={closeMenu}>
            Agendar consultas
          </Link>
          <Link to="/cadastro" className="btn btn-primary btn-sm" onClick={closeMenu}>
            Cupom de lançamento
          </Link>
          <Link to="/area-cliente" className="btn btn-outline btn-sm" onClick={closeMenu}>
            Área do cliente
          </Link>
        </div>
      )}
    </>
  );

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="brand" onClick={closeMenu}>
            <img src="/logo.svg" alt="MundialCard" />
          </Link>

          <nav className="nav-links nav-links-desktop" aria-label="Menu principal">
            {renderMenuLinks(false)}
          </nav>

          <div className="nav-actions">
            <a
              href={contact.whatsappUrl}
              className="btn btn-ghost btn-sm nav-desktop-only"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <Link to="/agendamento" className="btn btn-ghost btn-sm nav-desktop-only">
              Agendar consultas
            </Link>
            <Link to="/cadastro" className="btn btn-primary btn-sm nav-desktop-only">
              Cupom de lançamento
            </Link>
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
              <Link to="/" className="brand" onClick={closeMenu}>
                <img src="/logo.svg" alt="MundialCard" />
              </Link>
              <button
                type="button"
                className="mobile-nav__close"
                aria-label="Fechar menu"
                onClick={closeMenu}
              >
                ✕
              </button>
            </div>
            <nav className="mobile-nav__panel" aria-label="Menu principal">
              {renderMenuLinks(true)}
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
