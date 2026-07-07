import { useMemo } from "react";
import { pharmacyNetwork } from "../../data/pharmacyNetwork.js";
import {
  buildTriageDocuments,
  downloadMedicalDocument,
} from "../../lib/triageDocuments.js";

export default function MedicalDocumentsGuide({ sessionData, result, sessionId }) {
  const documents = useMemo(
    () => buildTriageDocuments(sessionData, result, sessionId),
    [sessionData, result, sessionId]
  );

  const { prescription, certificate } = documents;

  return (
    <div className="med-docs-guide">
      <div className="med-docs-guide__header">
        <span className="med-docs-guide__emoji" aria-hidden="true">
          💊
        </span>
        <div>
          <h3>Guias de receita e atestado médico</h3>
          <p>
            Documentos orientativos gerados após o diagnóstico clínico. Use na rede de farmácias
            MundialCard com desconto de <strong>{pharmacyNetwork.discountRange}</strong>.
          </p>
        </div>
      </div>

      <div className="med-docs-guide__grid">
        <article className="med-doc-card med-doc-card--rx">
          <div className="med-doc-card__head">
            <span aria-hidden="true">📋</span>
            <h4>{prescription.title}</h4>
          </div>
          <dl className="med-doc-card__fields">
            <div>
              <dt>Protocolo</dt>
              <dd>{prescription.protocol}</dd>
            </div>
            <div>
              <dt>Diagnóstico</dt>
              <dd>{prescription.diagnosis}</dd>
            </div>
            <div>
              <dt>CID-10</dt>
              <dd>{prescription.cid}</dd>
            </div>
            <div>
              <dt>Medicamentos</dt>
              <dd>{prescription.medications.length} item(ns) sugerido(s)</dd>
            </div>
          </dl>
          <ul className="med-doc-card__meds">
            {prescription.medications.map((med) => (
              <li key={med.name}>
                <strong>{med.name}</strong> — {med.posology}
                <span className="med-doc-card__discount">−{med.discount} MC</span>
              </li>
            ))}
          </ul>
          {prescription.requiresValidation ? (
            <p className="med-doc-card__warn">{prescription.validationNote}</p>
          ) : null}
          <div className="med-doc-card__actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => downloadMedicalDocument("receita", documents, sessionId)}
            >
              Baixar receita
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => downloadMedicalDocument("guia", documents, sessionId)}
            >
              Baixar guia
            </button>
          </div>
        </article>

        <article className="med-doc-card med-doc-card--cert">
          <div className="med-doc-card__head">
            <span aria-hidden="true">📄</span>
            <h4>{certificate.title}</h4>
          </div>
          <dl className="med-doc-card__fields">
            <div>
              <dt>Protocolo</dt>
              <dd>{certificate.protocol}</dd>
            </div>
            <div>
              <dt>CID-10</dt>
              <dd>
                {certificate.cid} — {certificate.cidDescription}
              </dd>
            </div>
            <div>
              <dt>Afastamento sugerido</dt>
              <dd>
                {certificate.restDays !== "—"
                  ? `${certificate.restDays} dia(s) · ${certificate.restPeriod}`
                  : certificate.restPeriod}
              </dd>
            </div>
          </dl>
          {certificate.requiresValidation ? (
            <p className="med-doc-card__warn">{certificate.validationNote}</p>
          ) : null}
          <div className="med-doc-card__actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => downloadMedicalDocument("atestado", documents, sessionId)}
            >
              Baixar atestado
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => downloadMedicalDocument("guia", documents, sessionId)}
            >
              Baixar guia
            </button>
          </div>
        </article>
      </div>

      <div className="med-docs-pharmacy">
        <h4>🏪 Rede de farmácias credenciadas</h4>
        <p>{pharmacyNetwork.discountNote}</p>
        <ul className="med-docs-pharmacy__list">
          {pharmacyNetwork.partners.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>
                {item.discount} · {item.region}
              </span>
            </li>
          ))}
        </ul>
        <ol className="med-docs-pharmacy__steps">
          {pharmacyNetwork.howToUse.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="med-docs-pharmacy__legal">{pharmacyNetwork.legalNote}</p>
      </div>
    </div>
  );
}
