import { Link } from "react-router-dom";
import { brand, contact } from "../data/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo-white.svg" alt="MundialCard" />
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
          <Link to="/#beneficios">Benefícios</Link>
          <Link to="/#planos">Planos</Link>
          <Link to="/#telemedicina">Telemedicina</Link>
          <Link to="/#parceiros-rede">Parceiros</Link>
          <Link to="/produtos">Produtos e serviços</Link>
        </div>
        <div>
          <h4>Plataforma</h4>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/area-cliente">Área do cliente</Link>
          <Link to="/parceiros">Área do representante</Link>
          <Link to="/agendamento">Agendar consulta</Link>
          <Link to="/app">Baixar app</Link>
        </div>
        <div>
          <h4>Institucional</h4>
          <Link to="/cadastro">Cupom de inauguração</Link>
          <Link to="/atendimento">Central de atendimento</Link>
          <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer">
            Fale conosco (WhatsApp)
          </a>
          <a href={contact.site} target="_blank" rel="noopener noreferrer">
            Site oficial
          </a>
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
