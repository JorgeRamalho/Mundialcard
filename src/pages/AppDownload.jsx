import { AppLink } from "../components/AppLink.jsx";
import AutoPlayVideo from "../components/AutoPlayVideo";
import { mediaAssets } from "../data/content";

export default function AppDownload() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Experiência mobile</span>
          <h1>Baixe o app MundialCard</h1>
          <p className="section-lead">
            Usabilidade de aplicativo, carteirinha digital, telemedicina, suporte e benefícios na
            palma da mão.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container app-download-layout">
          <div>
            <h2 className="section-title">Seu cartão de super benefícios no celular</h2>
            <p className="section-lead" style={{ marginBottom: "1.25rem" }}>
              Navegação compacta e sofisticada, pensada como produto digital escalável: do onboarding
              ao atendimento.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              <button type="button" className="btn btn-primary">
                App Store
              </button>
              <button type="button" className="btn btn-outline">
                Google Play
              </button>
              <AppLink
                to="/area-cliente"
                className="btn btn-ghost"
                style={{ color: "var(--navy-900)", borderColor: "rgba(10,22,40,.15)" }}
              >
                Abrir área web
              </AppLink>
            </div>
          </div>
          <AutoPlayVideo
            src={mediaAssets.app}
            title="Propaganda MundialCard"
            size="hero"
          />
        </div>
      </section>
    </>
  );
}
