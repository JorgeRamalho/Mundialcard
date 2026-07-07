import { useState } from "react";
import { AppLink } from "../components/AppLink.jsx";
import AutoPlayVideo from "../components/AutoPlayVideo";
import HeroCarousel from "../components/HeroCarousel";
import LaunchForm from "../components/LaunchForm";
import RegistrationFormDownload from "../components/RegistrationFormDownload";
import { homeSectionLink } from "../lib/scrollTo.js";
import PartnersSection from "../components/PartnersSection";
import {
  benefits,
  brand,
  contact,
  differentials,
  faqItems,
  highlights,
  journeySteps,
  mediaAssets,
  plans,
  supportSteps,
} from "../data/content";

export default function Home() {
  const [media, setMedia] = useState("app");

  return (
    <>
      <HeroCarousel />

      <section className="section tele-spotlight" id="telemedicina">
        <div className="container">
          <div className="tele-spotlight-head">
            <span className="eyebrow">Seu maior motivo para aderir</span>
            <h2 className="section-title">Telemedicina que faz o plano valer a pena todo mês</h2>
            <p className="section-lead">
              Chega de pagar e não usar. Com o MundialCard você fala com profissionais de saúde pelo
              celular, resolve dúvidas rápidas e cuida da família com praticidade — incluso no plano.
            </p>
          </div>

          <div className="tele-spotlight-grid">
            <article className="tele-feature-card tele-feature-main">
              <div className="tele-feature-media">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                  alt="Pessoa em consulta de telemedicina"
                />
                <span className="tele-live-badge">● Consulta online</span>
              </div>
              <div className="tele-feature-body">
                <h3>Médico na palma da mão</h3>
                <p>
                  Atendimento por vídeo, orientação clínica e acompanhamento sem filas, sem
                  deslocamento e sem custo extra de consulta avulsa.
                </p>
                <ul className="tele-checks">
                  <li>Consultas online inclusas no plano</li>
                  <li>Agendamento digital em poucos cliques</li>
                  <li>Ideal para sintomas leves, orientações e retornos</li>
                  <li>Disponível para você e sua família conforme o plano</li>
                </ul>
                <div className="tele-cta-row">
                  <AppLink to="/consulta-digital" className="btn btn-primary">
                    Iniciar Dr. Digital
                  </AppLink>
                  <AppLink to="/cadastro" className="btn btn-gold">
                    Quero aderir
                  </AppLink>
                  <AppLink to="/agendamento" className="btn btn-ghost">
                    Agendar consulta
                  </AppLink>
                </div>
              </div>
            </article>

            <div className="tele-side-cards">
              <article className="tele-mini-card">
                <span className="tele-mini-icon">⏱️</span>
                <h4>Economia de tempo</h4>
                <p>Sem deslocamento, sem sala de espera. Consulte no horário que cabe na sua rotina.</p>
              </article>
              <article className="tele-mini-card">
                <span className="tele-mini-icon">💰</span>
                <h4>Economia real</h4>
                <p>Evite consultas particulares avulsas. O benefício já está no valor do plano.</p>
              </article>
              <article className="tele-mini-card">
                <span className="tele-mini-icon">👨‍👩‍👧‍👦</span>
                <h4>Cuidado em família</h4>
                <p>Planos com mais vidas para proteger quem você ama com o mesmo acesso digital.</p>
              </article>
              <article className="tele-mini-card tele-mini-highlight">
                <span className="tele-mini-icon">🎁</span>
                <h4>Oferta de lançamento</h4>
                <p>Garanta cupom de inauguração e comece a usar a telemedicina no MundialCard.</p>
                <AppLink to="/cadastro" className="btn btn-gold btn-sm">
                  Pegar meu cupom
                </AppLink>
              </article>
            </div>
          </div>

          <div className="tele-proof-bar">
            <div>
              <strong>1.</strong>
              <span>Escolha o plano</span>
            </div>
            <div>
              <strong>2.</strong>
              <span>Ative em minutos</span>
            </div>
            <div>
              <strong>3.</strong>
              <span>Agende sua consulta</span>
            </div>
            <div>
              <strong>4.</strong>
              <span>Fale com o médico online</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hero hero-compact" id="hero">
        <div className="container hero-with-video">
          <div className="hero-copy">
            <div className="hero-badge">🩺 Telemedicina inclusa em todos os planos</div>
            <h1>
              Consulte um médico <span>agora, do seu celular</span> — sem fila e sem deslocamento
            </h1>
            <p className="hero-slogan">
              No MundialCard, a telemedicina não é extra: vem no plano. Consultas online, orientação
              clínica e agendamento digital para você usar todo mês — e ainda contar com proteção
              familiar e super benefícios.
            </p>
            <div className="hero-cta">
              <AppLink to="/cadastro" className="btn btn-primary">
                Quero telemedicina no meu plano
              </AppLink>
              <AppLink to={homeSectionLink("planos")} className="btn btn-secondary">
                Ver planos
              </AppLink>
              <AppLink to="/agendamento" className="btn btn-ghost">
                Agendar consulta
              </AppLink>
              <AppLink to="/app" className="btn btn-ghost">
                Baixar app
              </AppLink>
            </div>
            <div className="hero-stats">
              <div className="stat-card">
                <strong>Online</strong>
                <span>consulta na tela</span>
              </div>
              <div className="stat-card">
                <strong>Inclusa</strong>
                <span>em todos os planos</span>
              </div>
              <div className="stat-card">
                <strong>Rápido</strong>
                <span>sem sair de casa</span>
              </div>
            </div>
          </div>

          <AutoPlayVideo
            src={mediaAssets.app}
            title="Propaganda MundialCard"
            size="hero"
          />
        </div>
      </section>

      <section className="section section-soft" id="beneficios">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Cartão multibenefícios</span>
            <h2 className="section-title">Descontos e cuidados em saúde e bem-estar</h2>
            <p className="section-lead">
              {brand.description} {brand.tagline}
            </p>
          </div>

          <ul className="highlights-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="grid-4">
            {benefits.map((item) => (
              <article key={item.title} className="benefit-card">
                <div className="benefit-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="differentials-grid">
            {differentials.map((item) => (
              <article key={item.title} className="differential-card">
                <span className="differential-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="jornada">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Venda digital escalável</span>
            <h2 className="section-title">Da contratação ao kit de boas-vindas</h2>
            <p className="section-lead">
              Processo completo, automatizado e repetível — pronto para escalar B2C e B2B em todo o
              Brasil.
            </p>
          </div>
          <div className="journey">
            {journeySteps.map((step) => (
              <article key={step.title} className="journey-step">
                <div className="emoji">{step.emoji}</div>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="trust-bar">
            <div className="trust-item">🔐 Contrato digital</div>
            <div className="trust-item">⚙️ Ativação no sistema interno</div>
            <div className="trust-item">🎁 Kit digital automático</div>
            <div className="trust-item">🤝 Canal de representantes</div>
          </div>
        </div>
      </section>

      <PartnersSection />

      <section className="section" id="planos">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Planos com telemedicina</span>
            <h2 className="section-title">Escolha o plano e já saia consultando online</h2>
            <p className="section-lead">
              Do Bronze ao Platinum: telemedicina inclusa, proteção familiar e benefícios digitais
              para usar todo mês — não só no momento da necessidade.
            </p>
          </div>
          <div className="plans-grid">
            {plans.map((plan) => (
              <article key={plan.id} className={`plan-card ${plan.featured ? "featured" : ""}`}>
                <span className={`plan-tier ${plan.tier}`}>{plan.name}</span>
                <h3>Plano {plan.name}</h3>
                <div className="plan-price">
                  R$ {plan.price}
                  <small>/mês</small>
                </div>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <AppLink to="/cadastro" className={`btn ${plan.featured ? "btn-gold" : "btn-outline"}`}>
                  Quero este plano + telemedicina
                </AppLink>
              </article>
            ))}
          </div>

          <RegistrationFormDownload />
        </div>
      </section>

      <section className="section section-dark" id="suporte">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Segurança operacional</span>
            <h2 className="section-title">Sistema interno para clientes ativos</h2>
            <p className="section-lead">
              Manutenção e gestão centralizadas demonstram solidez: status, histórico, sinistros e
              suporte rastreável em um só lugar.
            </p>
          </div>
          <div className="grid-3">
            <article className="feature-card" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", borderColor: "rgba(255,255,255,0.08)" }}>
              <h3>Gestão de ativos</h3>
              <p style={{ color: "var(--slate-300)" }}>Cadastro, planos, dependentes e status em tempo real.</p>
            </article>
            <article className="feature-card" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", borderColor: "rgba(255,255,255,0.08)" }}>
              <h3>Atendimento omnichannel</h3>
              <p style={{ color: "var(--slate-300)" }}>WhatsApp, chat, telefone de sinistro e dashboard interno.</p>
            </article>
            <article className="feature-card" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", borderColor: "rgba(255,255,255,0.08)" }}>
              <h3>Confiança do usuário</h3>
              <p style={{ color: "var(--slate-300)" }}>Transparência operacional que reduz medo na hora de contratar.</p>
            </article>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <AppLink to="/dashboard" className="btn btn-primary">
              Ver dashboard
            </AppLink>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Base de informação</span>
            <h2 className="section-title">Tire dúvidas antes de acionar IA ou humano</h2>
            <p className="section-lead">
              FAQ com vídeos e áudios explicativos. O associado busca respostas primeiro; depois segue
              para IA e, se preciso, atendimento humano.
            </p>
          </div>

          <div className="faq-layout">
            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <div className="faq-body">{item.a}</div>
                </details>
              ))}
            </div>

            <aside className="media-panel">
              <h3 style={{ fontFamily: "var(--font-display)", marginBottom: "0.75rem" }}>
                Vídeos explicativos
              </h3>
              <div className="media-tabs">
                <button
                  type="button"
                  className={media === "app" ? "active" : ""}
                  onClick={() => setMedia("app")}
                >
                  App no celular
                </button>
                <button
                  type="button"
                  className={media === "institucional" ? "active" : ""}
                  onClick={() => setMedia("institucional")}
                >
                  Institucional
                </button>
              </div>
              <AutoPlayVideo
                src={media === "app" ? mediaAssets.app : mediaAssets.institucional}
                title={media === "app" ? "Propaganda MundialCard" : "Vídeo institucional MundialCard"}
                size="panel"
              />
              <p style={{ marginTop: "0.85rem", fontSize: "0.9rem", color: "var(--slate-300)" }}>
                {media === "app"
                  ? "Demonstração da experiência mobile — usabilidade de app no bolso."
                  : "Conteúdo institucional para educar o associado antes do fechamento."}
              </p>
              <div className="support-flow">
                {supportSteps.map((step, index) => (
                  <div key={step} className="support-step">
                    <span className="num">{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-cream" id="b2b">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Vendas B2B</span>
            <h2 className="section-title">Representantes que alavancam a marca</h2>
            <p className="section-lead">
              Captação de empresas, funil de leads e comissionamento com a mesma máquina digital do
              B2B.
            </p>
          </div>
          <div className="grid-3">
            <article className="info-card">
              <div className="benefit-icon">🧲</div>
              <h3>Captação de leads</h3>
              <p>Link exclusivo do representante, CRM e acompanhamento do funil.</p>
            </article>
            <article className="info-card">
              <div className="benefit-icon">📈</div>
              <h3>Funil de vendas</h3>
              <p>Interesse → educação (vídeo/áudio) → proposta → fechamento → kit digital.</p>
            </article>
            <article className="info-card">
              <div className="benefit-icon">🤝</div>
              <h3>Portal parceiro</h3>
              <p>Materiais oficiais, simulador, status de contratos e comissões.</p>
            </article>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <AppLink to="/parceiros" className="btn btn-primary">
              Área do parceiro
            </AppLink>
          </div>
        </div>
      </section>

      <section className="section" id="lancamento">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Inauguração</span>
            <h2 className="section-title">Garanta seu cupom de desconto</h2>
            <p className="section-lead">
              Cadastro completo para acesso antecipado aos benefícios de lançamento da MundialCard.
            </p>
          </div>
          <LaunchForm />
        </div>
      </section>
    </>
  );
}
