import { registrationForm } from "../data/content.js";

export default function RegistrationFormDownload({ variant = "default", showEyebrow = true }) {
  const isPanel = variant === "panel";

  return (
    <div className={`plans-registration-card${isPanel ? " plans-registration-card--panel" : ""}`}>
      <div className="plans-registration-copy">
        {showEyebrow ? (
          <span className="eyebrow">Cartão de Convênio Familiar</span>
        ) : null}
        {isPanel ? (
          <h4>{registrationForm.title}</h4>
        ) : (
          <h3>{registrationForm.title}</h3>
        )}
        <p>{registrationForm.description}</p>

        <div className="registration-file-meta" aria-label="Informações do arquivo">
          <span className="registration-file-badge" aria-hidden="true">
            PDF
          </span>
          <span className="registration-file-details">
            Documento oficial · {registrationForm.sizeLabel}
          </span>
        </div>

        <ul className="registration-trust-list">
          {registrationForm.trustPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <a
        href={registrationForm.url}
        download={registrationForm.fileName}
        type={registrationForm.mimeType}
        rel="noopener noreferrer"
        className={`btn btn-primary${isPanel ? " btn-sm" : ""}`}
        aria-describedby="registration-trust-note"
      >
        Baixar ficha de cadastro
      </a>

      <p id="registration-trust-note" className="registration-trust-note">
        {registrationForm.trustNote}
      </p>
    </div>
  );
}
