import { useState } from "react";
import AutoPlayVideo from "../components/AutoPlayVideo";
import { AppShell } from "./Dashboard";
import { contact, faqItems, mediaAssets, supportSteps } from "../data/content";

export default function Atendimento() {
  const [query, setQuery] = useState("");
  const [aiReply, setAiReply] = useState("");

  const filtered = faqItems.filter(
    (item) =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase())
  );

  const askAi = () => {
    if (!query.trim()) {
      setAiReply("Digite sua dúvida para a IA orientar o próximo passo.");
      return;
    }
    const hit = faqItems.find(
      (item) =>
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.a.toLowerCase().includes(query.toLowerCase())
    );
    setAiReply(
      hit
        ? `Com base na base oficial: ${hit.a} Se ainda precisar, solicite atendimento humano.`
        : "Não encontrei na base. Recomendo assistir aos vídeos explicativos ou acionar um atendente humano."
    );
  };

  return (
    <AppShell title="Plataforma de atendimento">
      <div className="grid-2">
        <div className="panel">
          <h3>Busca na base (antes da IA)</h3>
          <div className="form-field" style={{ marginBottom: "1rem" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar dúvida: telemedicina, kit, plano..."
            />
          </div>
          <div className="faq-list">
            {(query ? filtered : faqItems).map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <div className="faq-body">{item.a}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Sequência de auxílio</h3>
          <div className="support-flow" style={{ marginBottom: "1rem" }}>
            {supportSteps.map((step, index) => (
              <div key={step} className="support-step" style={{ color: "var(--slate-600)" }}>
                <span className="num">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={askAi}>
            Consultar assistente de IA
          </button>
          {aiReply && (
            <p
              style={{
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: 12,
                background: "var(--cream)",
                color: "var(--slate-600)",
              }}
            >
              {aiReply}
            </p>
          )}
          <a
            href={contact.whatsappUrl}
            className="btn btn-outline"
            style={{ marginTop: "0.75rem" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <div className="video-grid">
        <div className="panel">
          <h3>Vídeo — experiência no app</h3>
          <AutoPlayVideo
            src={mediaAssets.app}
            title="Propaganda MundialCard — app"
            size="panel"
          />
        </div>
        <div className="panel">
          <h3>Vídeo institucional</h3>
          <AutoPlayVideo
            src={mediaAssets.institucional}
            title="Propaganda MundialCard — institucional"
            size="panel"
          />
        </div>
      </div>
    </AppShell>
  );
}
