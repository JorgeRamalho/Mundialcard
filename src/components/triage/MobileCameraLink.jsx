import { buildCameraSecureUrl, needsHttpsForCamera } from "../../lib/cameraAccess.js";

export default function MobileCameraLink() {
  if (!needsHttpsForCamera()) return null;

  const secureUrl = buildCameraSecureUrl();

  return (
    <div className="mobile-camera-link" role="region" aria-label="Acesso à câmera no celular">
      <div className="mobile-camera-link__icon" aria-hidden="true">
        📷
      </div>
      <div className="mobile-camera-link__body">
        <strong>Câmera no celular</strong>
        <p>
          Você está em HTTP. Para usar a câmera do Dr. Digital, abra o link HTTPS abaixo (porta 5174).
          O restante do site continua funcionando em HTTP.
        </p>
        <a href={secureUrl} className="btn btn-primary btn-sm mobile-camera-link__cta">
          Abrir câmera (HTTPS)
        </a>
        <p className="mobile-camera-link__url">
          <a href={secureUrl}>{secureUrl}</a>
        </p>
      </div>
    </div>
  );
}
