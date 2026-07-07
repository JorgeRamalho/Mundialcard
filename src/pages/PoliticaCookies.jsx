import { AppLink } from "../components/AppLink.jsx";
import { brand, contact } from "../data/content";

const sections = [
  {
    title: "O que são cookies?",
    body: [
      "Cookies são pequenos arquivos armazenados no seu navegador quando você visita um site. Eles ajudam a lembrar preferências, manter a navegação segura e entender como as páginas são utilizadas.",
      "Também usamos tecnologias semelhantes, como armazenamento local do navegador, para registrar suas escolhas de privacidade.",
    ],
  },
  {
    title: "Como a MundialCard usa cookies",
    body: [
      "Utilizamos cookies e dados semelhantes para garantir o funcionamento do site, melhorar a experiência de navegação e, somente com sua autorização, medir o uso das páginas e exibir conteúdos mais relevantes.",
      "Não vendemos seus dados pessoais. O tratamento segue a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018) e as boas práticas de transparência e controle pelo titular.",
    ],
  },
  {
    title: "Categorias de cookies",
    list: [
      {
        term: "Necessários",
        detail:
          "Essenciais para o site funcionar (segurança, carregamento e lembrar suas preferências de cookies). Não podem ser desativados.",
      },
      {
        term: "Estatísticas",
        detail:
          "Ajudam a entender, de forma agregada e anônima, quais páginas são mais visitadas para melhorar o conteúdo e a performance.",
      },
      {
        term: "Marketing",
        detail:
          "Permitem ofertas e comunicações mais alinhadas ao seu interesse em outros canais, somente se você autorizar.",
      },
    ],
  },
  {
    title: "Base legal e seus direitos",
    body: [
      "Cookies necessários são tratados com base no legítimo interesse e na execução de funcionalidades solicitadas por você. Cookies opcionais dependem do seu consentimento, que pode ser revogado a qualquer momento.",
      "Você tem direito de confirmar a existência de tratamento, acessar, corrigir, anonimizar ou solicitar a exclusão de dados, além de revogar o consentimento e apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
    ],
  },
  {
    title: "Como gerenciar suas preferências",
    body: [
      "Na primeira visita, exibimos um aviso com as opções Aceitar, Recusar e Configurar. Você pode alterar sua escolha quando quiser pelo link “Preferências de cookies” no rodapé do site.",
    ],
  },
  {
    title: "Contato",
    body: [
      `Responsável: ${brand.name}. Para dúvidas sobre privacidade e cookies, entre em contato pelo telefone ${contact.phone}, pelo WhatsApp ou pelo endereço ${contact.address}.`,
      "Última atualização: julho de 2026.",
    ],
  },
];

export default function PoliticaCookies() {
  const openPrefs = () => window.dispatchEvent(new Event("cookie-consent:open"));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Privacidade e LGPD</span>
          <h1>Política de cookies</h1>
          <p className="section-lead">
            Transparência sobre como usamos cookies e como você controla suas preferências no site
            {brand.name}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container legal-page">
          {sections.map((section) => (
            <article key={section.title} className="legal-block panel">
              <h2>{section.title}</h2>
              {section.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {section.list && (
                <dl className="legal-dl">
                  {section.list.map((item) => (
                    <div key={item.term}>
                      <dt>{item.term}</dt>
                      <dd>{item.detail}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          ))}

          <div className="legal-actions">
            <button type="button" className="btn btn-primary" onClick={openPrefs}>
              Gerenciar preferências de cookies
            </button>
            <AppLink to="/" className="btn btn-outline">
              Voltar ao início
            </AppLink>
          </div>
        </div>
      </section>
    </>
  );
}
