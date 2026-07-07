import { useEffect, useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import AutoPlayVideo from "../components/AutoPlayVideo";
import MedicalDocumentsGuide from "../components/triage/MedicalDocumentsGuide.jsx";
import { AppShell } from "./Dashboard";
import { mediaAssets } from "../data/content";
import { getTriageSessions } from "../lib/triageSession.js";

export default function ClientArea() {
  const [lastTriage, setLastTriage] = useState(null);

  useEffect(() => {
    let active = true;
    getTriageSessions().then((sessions) => {
      if (active) setLastTriage(sessions[0] ?? null);
    });
    return () => {
      active = false;
    };
  }, []);
  return (
    <AppShell title="Área do cliente">
      <div className="grid-2">
        <div className="panel">
          <h3>Meu cartão MundialCard</h3>
          <div
            style={{
              borderRadius: 20,
              padding: "1.5rem",
              background: "var(--grad-card)",
              color: "#fff",
              minHeight: 180,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>MundialCard</strong>
              <span>Plano Ouro</span>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: "0.85rem" }}>Titular</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>Cliente Mundial Card</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span>**** 4821</span>
              <span>Ativo</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <AppLink to="/consulta-digital" className="btn btn-primary btn-sm">
              Dr. Digital
            </AppLink>
            <AppLink to="/agendamento" className="btn btn-primary btn-sm">
              Agendar consulta
            </AppLink>
            <AppLink to="/atendimento" className="btn btn-outline btn-sm">
              Suporte
            </AppLink>
          </div>
        </div>

        <div className="panel">
          <h3>Kit de boas-vindas digital</h3>
          <ul style={{ display: "grid", gap: "0.55rem", color: "var(--slate-600)" }}>
            <li>✅ Carteirinha digital com QR Code</li>
            <li>✅ Contrato em PDF</li>
            <li>✅ Vídeo e áudio explicativos</li>
            <li>✅ Link da telemedicina</li>
            <li>✅ Contatos de emergência 24h</li>
          </ul>
          <AutoPlayVideo
            src={mediaAssets.app}
            title="Propaganda MundialCard — como usar seu plano"
            size="panel"
            style={{ marginTop: "1rem" }}
          />
        </div>
      </div>

      <div className="panel">
        <h3>Benefícios disponíveis</h3>
        <div className="grid-4">
          {["Saúde", "Funeral", "Alimentação", "Telemedicina"].map((item) => (
            <div key={item} className="kpi">
              <span>Categoria</span>
              <strong style={{ fontSize: "1.1rem" }}>{item}</strong>
            </div>
          ))}
        </div>
      </div>

      {lastTriage ? (
        <div className="panel">
          <h3>Última triagem — Dr. Digital</h3>
          <p style={{ color: "var(--slate-600)", fontSize: "0.92rem", marginBottom: "0.5rem" }}>
            Protocolo <strong>{lastTriage.id}</strong> —{" "}
            {new Date(lastTriage.createdAt).toLocaleString("pt-BR")}
          </p>
          <p style={{ color: "var(--slate-600)", fontSize: "0.92rem" }}>
            Resultado:{" "}
            <strong>
              {lastTriage.result?.blocked
                ? "Bloqueado — revisão humana"
                : lastTriage.result?.channel === "ai"
                  ? "Atendimento IA"
                  : lastTriage.result?.channel === "human_urgent"
                    ? "Humano prioritário"
                    : "Médico humano"}
            </strong>
            {lastTriage.temperature != null ? ` · ${lastTriage.temperature.toFixed(1)} °C` : ""}
          </p>
          {!lastTriage.complianceBlocked && lastTriage.result && !lastTriage.result.blocked ? (
            <div style={{ marginTop: "1rem" }}>
              <MedicalDocumentsGuide
                sessionData={lastTriage}
                result={lastTriage.result}
                sessionId={lastTriage.id}
              />
            </div>
          ) : null}
          <AppLink to="/consulta-digital" className="btn btn-outline btn-sm" style={{ marginTop: "0.75rem" }}>
            Nova triagem
          </AppLink>
        </div>
      ) : null}
    </AppShell>
  );
}
