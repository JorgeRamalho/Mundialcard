import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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

        <nav className={`nav-links ${open ? "open" : ""}`}>
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
        </nav>

        <div className="nav-actions">
          <a
            href={contact.whatsappUrl}
            className="btn btn-ghost btn-sm nav-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <Link to="/agendamento" className="btn btn-ghost btn-sm">
            Agendar consultas
          </Link>
          <Link to="/cadastro" className="btn btn-primary btn-sm">
            Cupom de lançamento
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
