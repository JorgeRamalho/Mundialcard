import { AppLink } from "./AppLink.jsx";
import { brand, contact } from "../data/content";
import { assetUrl } from "../lib/assetUrl.js";
import { homeSectionLink } from "../lib/scrollTo.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={assetUrl("/logo-white.svg")} alt="MundialCard" />
          <span className="eyebrow">{brand.slogan}</span>
          <p className="footer-desc">{brand.description}</p>
          <p className="footer-contact">
            <strong>Endereço</strong>
            <span>{contact.address}</span>
          </p>
          <p className="footer-contact">
            <strong>Telefone</strong>
            <a href={contact.phoneHref}>{contact.phone}</a>
          </p>
          <a
            className="btn btn-primary btn-sm"
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.whatsappLabel}
          </a>
        </div>
        <div>
          <h4>Produto</h4>
          <AppLink to={homeSectionLink("beneficios")}>Benefícios</AppLink>
          <AppLink to={homeSectionLink("planos")}>Planos</AppLink>
          <AppLink to={homeSectionLink("telemedicina")}>Telemedicina</AppLink>
          <AppLink to={homeSectionLink("parceiros-rede")}>Parceiros</AppLink>
          <AppLink to="/produtos">Produtos e serviços</AppLink>
        </div>
        <div>
          <h4>Plataforma</h4>
          <AppLink to="/dashboard">Dashboard</AppLink>
          <AppLink to="/area-cliente">Área do cliente</AppLink>
          <AppLink to="/parceiros">Área do representante</AppLink>
          <AppLink to="/consulta-digital">Dr. Digital — triagem</AppLink>
          <AppLink to="/agendamento">Agendar consulta</AppLink>
          <AppLink to="/app">Baixar app</AppLink>
        </div>
        <div>
          <h4>Institucional</h4>
          <AppLink to="/cadastro">Cupom de inauguração</AppLink>
          <AppLink to="/atendimento">Central de atendimento</AppLink>
          <AppLink to="/politica-de-cookies">Política de cookies</AppLink>
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
            Fale conosco (WhatsApp)
          </a>
          <a href={contact.site} target="_blank" rel="noopener noreferrer">
            Site oficial
          </a>
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => window.dispatchEvent(new Event("cookie-consent:open"))}
          >
            Preferências de cookies
          </button>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
        </span>
        <span className="footer-slogan">{brand.slogan}</span>
      </div>
    </footer>
  );
}
