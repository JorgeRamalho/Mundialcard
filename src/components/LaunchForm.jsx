import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createLead } from "../lib/api/leads.js";

const initial = {
  nome: "",
  nascimento: "",
  cidade: "",
  telefone: "",
  email: "",
  endereco: "",
};

function validate(values) {
  const errors = {};
  if (!values.nome.trim() || values.nome.trim().length < 3) errors.nome = "Informe seu nome completo.";
  if (!values.nascimento) errors.nascimento = "Informe a data de nascimento.";
  if (!values.cidade.trim()) errors.cidade = "Informe a cidade.";
  if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(values.telefone.replace(/\s/g, ""))) {
    errors.telefone = "Telefone inválido. Ex: (11) 99999-9999";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "E-mail inválido.";
  if (!values.endereco.trim() || values.endereco.trim().length < 8) {
    errors.endereco = "Informe o endereço completo.";
  }
  return errors;
}

export default function LaunchForm({ compact = false }) {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("ref") || "";
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [coupon, setCoupon] = useState("");
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSaving(true);
    setSubmitError("");

    try {
      const result = await createLead(values, { referralCode });
      if (!result.ok) {
        setSubmitError("Não foi possível salvar o cadastro. Tente novamente.");
        return;
      }
      setCoupon(result.coupon);
    } catch {
      setSubmitError("Erro de conexão. Tente novamente em instantes.");
    } finally {
      setSaving(false);
    }
  };

  if (coupon) {
    return (
      <div className="form-card form-success">
        <div className="emoji">🎉</div>
        <h3>Cadastro confirmado!</h3>
        <p>Seu cupom de desconto na inauguração da MundialCard está pronto.</p>
        <div className="coupon-code">{coupon}</div>
        <p style={{ marginTop: "1rem", color: "var(--slate-500)" }}>
          Guarde este código. Em breve você receberá o kit digital e orientações de ativação.
        </p>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      {!compact && (
        <>
          <span className="eyebrow">Lançamento</span>
          <h3 className="section-title" style={{ fontSize: "1.6rem" }}>
            Cadastre-se e garanta seu cupom
          </h3>
          <p className="section-lead" style={{ marginBottom: "1.25rem" }}>
            Preencha os dados para ter acesso aos cupons de desconto na inauguração da MundialCard.
          </p>
        </>
      )}

      {referralCode ? (
        <p className="db-status db-status--online" style={{ marginBottom: "1rem" }} role="status">
          Indicação do parceiro <strong>{referralCode.toUpperCase()}</strong> registrada neste cadastro.
        </p>
      ) : null}

      <div className="form-grid">
        <div className="form-field full">
          <label htmlFor="nome">Nome completo</label>
          <input id="nome" name="nome" value={values.nome} onChange={onChange} placeholder="Seu nome" />
          {errors.nome && <span className="error">{errors.nome}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="nascimento">Data de nascimento</label>
          <input id="nascimento" type="date" name="nascimento" value={values.nascimento} onChange={onChange} />
          {errors.nascimento && <span className="error">{errors.nascimento}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="cidade">Cidade</label>
          <input id="cidade" name="cidade" value={values.cidade} onChange={onChange} placeholder="Sua cidade" />
          {errors.cidade && <span className="error">{errors.cidade}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            value={values.telefone}
            onChange={onChange}
            placeholder="(11) 99999-9999"
          />
          {errors.telefone && <span className="error">{errors.telefone}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            placeholder="voce@email.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-field full">
          <label htmlFor="endereco">Endereço</label>
          <input
            id="endereco"
            name="endereco"
            value={values.endereco}
            onChange={onChange}
            placeholder="Rua, número, bairro, CEP"
          />
          {errors.endereco && <span className="error">{errors.endereco}</span>}
        </div>
      </div>

      {submitError ? (
        <p className="error" style={{ marginTop: "0.75rem" }} role="alert">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary btn-block"
        style={{ marginTop: "1.25rem" }}
        disabled={saving}
      >
        {saving ? "Salvando..." : "Quero meu cupom de inauguração"}
      </button>
    </form>
  );
}
