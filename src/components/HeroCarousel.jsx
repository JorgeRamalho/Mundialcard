import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../lib/assetUrl.js";

const slides = [
  {
    src: assetUrl("/images/carousel/familia-planos.png"),
    alt: "A qualidade de vida da sua família está em nossos planos",
    label: "Planos para sua família",
    eyebrow: "MundialCard",
    isBanner: true,
    to: "/",
    scrollTo: "planos",
  },
  {
    src: assetUrl("/images/carousel/colaboradores-planos.png"),
    alt: "A qualidade de vida dos seus colaboradores está em nossos planos",
    label: "Planos para colaboradores",
    eyebrow: "MundialCard B2B",
    isBanner: true,
    to: "/",
    scrollTo: "planos",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    alt: "Consulta de telemedicina no celular",
    label: "Consulta online em minutos",
    eyebrow: "Telemedicina inclusa",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    alt: "Médico em atendimento por vídeo",
    label: "Médicos de verdade, na sua tela",
    eyebrow: "Telemedicina inclusa",
  },
  {
    src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=80",
    alt: "Médica em teleconsulta",
    label: "Telemedicina inclusa no plano",
    eyebrow: "Telemedicina inclusa",
  },
  {
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80",
    alt: "Profissional de saúde orientando paciente",
    label: "Orientação médica sem sair de casa",
    eyebrow: "Telemedicina inclusa",
  },
  {
    src: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1600&q=80",
    alt: "Equipe médica disponível",
    label: "Cuidado quando você mais precisa",
    eyebrow: "Telemedicina inclusa",
  },
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80",
    alt: "Apoio clínico e exames",
    label: "Saúde completa no MundialCard",
    eyebrow: "Telemedicina inclusa",
  },
  {
    src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
    alt: "Paciente usando telemedicina",
    label: "Aderir agora e consultar hoje",
    eyebrow: "Telemedicina inclusa",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (next) => setIndex((next + slides.length) % slides.length);

  return (
    <section className="hero-carousel" aria-label="MundialCard em destaque">
      <div className="carousel-track">
        {slides.map((slide, i) => {
          const content = (
            <>
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
              />
              {!slide.isBanner && (
                <figcaption>
                  <span className="carousel-eyebrow">{slide.eyebrow}</span>
                  <strong>{slide.label}</strong>
                </figcaption>
              )}
            </>
          );

          return (
            <figure
              key={slide.src}
              className={`carousel-slide ${slide.isBanner ? "carousel-slide--banner" : ""} ${i === index ? "is-active" : ""}`}
              aria-hidden={i !== index}
            >
              {slide.to ? (
                <Link
                  to={slide.to}
                  className="carousel-slide-link"
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => {
                    if (slide.scrollTo) {
                      setTimeout(() => {
                        document.getElementById(slide.scrollTo)?.scrollIntoView({ behavior: "smooth" });
                      }, 50);
                    }
                  }}
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </figure>
          );
        })}
      </div>

      <button
        type="button"
        className="carousel-btn carousel-btn-prev"
        aria-label="Imagem anterior"
        onClick={() => goTo(index - 1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="carousel-btn carousel-btn-next"
        aria-label="Próxima imagem"
        onClick={() => goTo(index + 1)}
      >
        ›
      </button>

      <div className="carousel-dots" role="tablist" aria-label="Selecionar imagem">
        {slides.map((slide, i) => (
          <button
            key={`${slide.label}-${i}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={slide.label}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
