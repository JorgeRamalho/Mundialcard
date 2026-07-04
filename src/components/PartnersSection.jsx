import { partners } from "../data/content";

export default function PartnersSection() {
  return (
    <section className="section partners-section" id="parceiros-rede">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Rede credenciada</span>
          <h2 className="section-title">Nossos parceiros</h2>
          <p className="section-lead">
            Empresas e instituições de saúde que fazem parte da rede MundialCard — a mesma base de
            confiança do site oficial, agora no ambiente digital.
          </p>
        </div>

        <div className="partners-grid">
          {partners.map((partner, index) => {
            const isExternal = partner.url && partner.url !== "#";
            const Tag = isExternal ? "a" : "div";
            const linkProps = isExternal
              ? {
                  href: partner.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Tag
                key={`${partner.name}-${index}`}
                className="partner-card"
                title={partner.name}
                {...linkProps}
              >
                <img src={partner.logo} alt={partner.name} loading="lazy" />
                <span>{partner.name}</span>
              </Tag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
