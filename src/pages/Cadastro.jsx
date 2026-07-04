import LaunchForm from "../components/LaunchForm";

export default function Cadastro() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Lançamento MundialCard</span>
          <h1>Cadastro para cupons de inauguração</h1>
          <p className="section-lead">
            Preencha nome, data de nascimento, cidade, telefone, e-mail e endereço para liberar seu
            cupom de desconto.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <LaunchForm />
        </div>
      </section>
    </>
  );
}
