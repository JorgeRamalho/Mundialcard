import { useLocation, useNavigate } from "react-router-dom";
import { AppLink } from "./AppLink.jsx";

const PAGE_LABELS = {
  "/cadastro": "Cadastro",
  "/dashboard": "Dashboard",
  "/area-cliente": "Área do cliente",
  "/parceiros": "Parceiros B2B",
  "/atendimento": "Atendimento",
  "/agendamento": "Agendamentos",
  "/produtos": "Produtos",
  "/app": "App",
  "/consulta-digital": "Dr. Digital",
  "/politica-de-cookies": "Política de cookies",
};

export default function PageWayfinding() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.replace(/\/$/, "") || "/";

  if (path === "/") return null;

  const currentLabel = PAGE_LABELS[path];

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <nav className="page-wayfinding" aria-label="Orientação de navegação">
      <div className="page-wayfinding__inner">
        <div className="page-wayfinding__actions">
          <button type="button" className="page-wayfinding__btn page-wayfinding__btn--back" onClick={handleBack}>
            <span className="page-wayfinding__icon" aria-hidden="true">
              ←
            </span>
            Voltar
          </button>
          <AppLink to="/" className="page-wayfinding__btn page-wayfinding__btn--home">
            <span className="page-wayfinding__icon" aria-hidden="true">
              🏠
            </span>
            Início
          </AppLink>
        </div>
        {currentLabel ? (
          <p className="page-wayfinding__hint">
            Você está em: <strong>{currentLabel}</strong>
          </p>
        ) : null}
      </div>
    </nav>
  );
}
