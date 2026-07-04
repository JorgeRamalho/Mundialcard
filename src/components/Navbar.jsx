import { useEffect, useState } from "react";
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
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const handleAnchor = (to) => {
    setOpen(false);
    if (to.includes("#")) {
      const id = to.split("#")[1];
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="MundialCard" />
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Menu principal">
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
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {link.label}
              </NavLink>
            )
          )}

          <div className="nav-mobile-actions">
            <a
              href={contact.whatsappUrl}
              className="btn btn-ghost btn-sm"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
            <Link to="/agendamento" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
              Agendar consultas
            </Link>
            <Link to="/cadastro" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
              Cupom de lançamento
            </Link>
            <Link to="/area-cliente" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>
              Área do cliente
            </Link>
          </div>
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
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
