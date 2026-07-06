import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { defaultPreferences, getStoredConsent, saveConsent } from "../lib/cookieConsent";

const CATEGORIES = [
  {
    id: "essential",
    title: "Necessários",
    description:
      "Garantem o funcionamento básico do site, como segurança e lembrar suas escolhas. Sempre ativos.",
    required: true,
  },
  {
    id: "analytics",
    title: "Estatísticas",
    description:
      "Ajudam a entender como as páginas são usadas, de forma anônima, para melhorar o site.",
    required: false,
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Permitem conteúdos e ofertas mais relevantes em outros canais, com base no seu interesse.",
    required: false,
  },
];

export default function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [prefs, setPrefs] = useState(defaultPreferences);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored?.decided) {
      setBannerVisible(true);
      return;
    }
    setPrefs({
      essential: true,
      analytics: stored.analytics,
      marketing: stored.marketing,
    });
  }, []);

  useEffect(() => {
    const openPrefs = () => {
      const stored = getStoredConsent();
      if (stored) {
        setPrefs({
          essential: true,
          analytics: stored.analytics,
          marketing: stored.marketing,
        });
      }
      setPrefsOpen(true);
      setBannerVisible(false);
    };

    window.addEventListener("cookie-consent:open", openPrefs);
    return () => window.removeEventListener("cookie-consent:open", openPrefs);
  }, []);

  const closePrefs = () => {
    const stored = getStoredConsent();
    setPrefsOpen(false);
    if (!stored?.decided) setBannerVisible(true);
  };

  const closeAll = (nextPrefs) => {
    saveConsent(nextPrefs);
    setPrefs({ essential: true, ...nextPrefs });
    setBannerVisible(false);
    setPrefsOpen(false);
  };

  const acceptAll = () => closeAll({ analytics: true, marketing: true });

  const refuseOptional = () => closeAll({ analytics: false, marketing: false });

  const savePreferences = () => closeAll({ analytics: prefs.analytics, marketing: prefs.marketing });

  const togglePref = (id) => {
    setPrefs((current) => ({ ...current, [id]: !current[id] }));
  };

  if (!bannerVisible && !prefsOpen) return null;

  return (
    <>
      {bannerVisible && !prefsOpen && (
        <aside
          className="cookie-banner"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
        >
          <div className="cookie-banner__inner container">
            <div className="cookie-banner__text">
              <p id="cookie-banner-title" className="cookie-banner__title">
                Sua privacidade importa
              </p>
              <p id="cookie-banner-desc" className="cookie-banner__desc">
                Usamos cookies e dados semelhantes para o site funcionar, medir o uso das páginas e,
                somente com sua permissão, personalizar conteúdos. Você pode{" "}
                <strong>aceitar</strong>, <strong>recusar</strong> os opcionais ou{" "}
                <strong>configurar</strong> o que autoriza — e alterar isso quando quiser.
              </p>
              <Link className="cookie-banner__link" to="/politica-de-cookies">
                Política de cookies
              </Link>
            </div>
            <div className="cookie-banner__actions">
              <button type="button" className="btn btn-outline btn-sm" onClick={refuseOptional}>
                Recusar
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setPrefsOpen(true)}>
                Configurar
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={acceptAll}>
                Aceitar
              </button>
            </div>
          </div>
        </aside>
      )}

      {prefsOpen && (
        <div className="cookie-prefs" role="dialog" aria-modal="true" aria-labelledby="cookie-prefs-title">
          <div className="cookie-prefs__backdrop" onClick={closePrefs} aria-hidden="true" />
          <div className="cookie-prefs__panel">
            <header className="cookie-prefs__head">
              <h2 id="cookie-prefs-title">Preferências de cookies</h2>
              <p>
                Escolha quais categorias autoriza. Os cookies necessários não podem ser desativados,
                pois são essenciais para o funcionamento do site.
              </p>
            </header>

            <ul className="cookie-prefs__list">
              {CATEGORIES.map((category) => (
                <li key={category.id} className="cookie-prefs__item">
                  <div className="cookie-prefs__item-text">
                    <strong>{category.title}</strong>
                    <span>{category.description}</span>
                  </div>
                  {category.required ? (
                    <span className="cookie-prefs__badge">Sempre ativo</span>
                  ) : (
                    <label className="cookie-prefs__switch">
                      <input
                        type="checkbox"
                        checked={prefs[category.id]}
                        onChange={() => togglePref(category.id)}
                      />
                      <span className="cookie-prefs__switch-ui" aria-hidden="true" />
                      <span className="sr-only">Ativar {category.title}</span>
                    </label>
                  )}
                </li>
              ))}
            </ul>

            <footer className="cookie-prefs__foot">
              <button type="button" className="btn btn-outline btn-sm" onClick={refuseOptional}>
                Recusar opcionais
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={savePreferences}>
                Salvar preferências
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
