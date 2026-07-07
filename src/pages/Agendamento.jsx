import { useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import { AppShell } from "./Dashboard";
import { createAppointment } from "../lib/api/appointments.js";
import { getProfileId } from "../lib/clientSession.js";

const initial = { especialidade: "Clínico geral", data: "", horario: "", observacao: "" };

export default function Agendamento() {
  const [form, setForm] = useState(initial);
  const [ok, setOk] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.data || !form.horario) return;

    setSaving(true);
    await createAppointment(form, getProfileId());
    setSaving(false);
    setOk(true);
  };

  return (
    <AppShell title="Agendamento de consultas">
      <div className="grid-2">
        <form className="panel" onSubmit={onSubmit}>
          <h3>Telemedicina MundialCard</h3>
          {ok ? (
            <div className="form-success">
              <div className="emoji">📅</div>
              <p>Consulta agendada com sucesso. Você receberá a confirmação na área do cliente.</p>
            </div>
          ) : (
            <>
              <div className="form-field" style={{ marginBottom: "0.85rem" }}>
                <label>Especialidade</label>
                <select
                  value={form.especialidade}
                  onChange={(e) => setForm({ ...form, especialidade: e.target.value })}
                >
                  <option>Clínico geral</option>
                  <option>Orientação em saúde</option>
                  <option>Psicologia online</option>
                  <option>Retorno</option>
                </select>
              </div>
              <div className="form-field" style={{ marginBottom: "0.85rem" }}>
                <label>Data</label>
                <input
                  type="date"
                  value={form.data}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                  required
                />
              </div>
              <div className="form-field" style={{ marginBottom: "0.85rem" }}>
                <label>Horário</label>
                <input
                  type="time"
                  value={form.horario}
                  onChange={(e) => setForm({ ...form, horario: e.target.value })}
                  required
                />
              </div>
              <div className="form-field" style={{ marginBottom: "0.85rem" }}>
                <label>Observação</label>
                <textarea
                  rows={3}
                  value={form.observacao}
                  onChange={(e) => setForm({ ...form, observacao: e.target.value })}
                  placeholder="Descreva brevemente o motivo"
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Salvando..." : "Confirmar agendamento"}
              </button>
            </>
          )}
        </form>

        <div className="panel">
          <h3>Como funciona</h3>
          <ol style={{ display: "grid", gap: "0.65rem", color: "var(--slate-600)", paddingLeft: "1.1rem" }}>
            <li>
              Faça triagem com o <AppLink to="/consulta-digital">Dr. Digital</AppLink> (opcional)
            </li>
            <li>Escolha especialidade e horário</li>
            <li>Confirme na plataforma</li>
            <li>Receba o link da consulta</li>
            <li>Histórico fica no sistema interno do cliente ativo</li>
          </ol>
        </div>
      </div>
    </AppShell>
  );
}
