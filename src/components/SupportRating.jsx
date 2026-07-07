import { useEffect, useState } from "react";
import { supportRating as ratingConfig } from "../data/content.js";
import { saveSupportRating } from "../lib/supportRating.js";

const SCORE_LABELS = ["Péssimo", "Ruim", "Regular", "Bom", "Excelente"];

export default function SupportRating({
  defaultChannel = "ia",
  highlight = false,
  onSubmitted,
}) {
  const [channel, setChannel] = useState(defaultChannel);
  const [score, setScore] = useState(0);
  const [hoverScore, setHoverScore] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setChannel(defaultChannel);
  }, [defaultChannel]);

  const activeScore = hoverScore || score;
  const activeLabel = activeScore ? SCORE_LABELS[activeScore - 1] : null;

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!score) {
      setError("Selecione uma nota de 1 a 5 estrelas.");
      return;
    }

    await saveSupportRating({ channel, score, comment, context: "atendimento" });
    setSubmitted(true);
    setError("");
    onSubmitted?.({ channel, score });
  };

  if (submitted) {
    return (
      <div className={`support-rating${highlight ? " support-rating--highlight" : ""}`}>
        <div className="support-rating__thanks" role="status">
          <strong>Obrigado pela sua avaliação!</strong>
          <p>Sua opinião ajuda a MundialCard a melhorar o suporte ao cliente.</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={`support-rating${highlight ? " support-rating--highlight" : ""}`}
      onSubmit={onSubmit}
      aria-labelledby="support-rating-title"
    >
      <div className="support-rating__head">
        <h3 id="support-rating-title">{ratingConfig.title}</h3>
        <p>{ratingConfig.subtitle}</p>
      </div>

      <fieldset className="support-rating__channels">
        <legend>Tipo de atendimento</legend>
        {ratingConfig.channels.map((item) => (
          <label key={item.id} className="support-rating__channel">
            <input
              type="radio"
              name="support-channel"
              value={item.id}
              checked={channel === item.id}
              onChange={() => setChannel(item.id)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <div className="support-rating__stars-wrap">
        <span className="support-rating__stars-label">Nota do atendimento</span>
        <div
          className="support-rating__stars"
          role="radiogroup"
          aria-label="Nota de 1 a 5 estrelas"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={`support-rating__star${value <= activeScore ? " is-active" : ""}`}
              aria-label={`${value} estrela${value > 1 ? "s" : ""} — ${SCORE_LABELS[value - 1]}`}
              aria-pressed={score === value}
              onMouseEnter={() => setHoverScore(value)}
              onMouseLeave={() => setHoverScore(0)}
              onFocus={() => setHoverScore(value)}
              onBlur={() => setHoverScore(0)}
              onClick={() => {
                setScore(value);
                setError("");
              }}
            >
              ★
            </button>
          ))}
        </div>
        {activeLabel ? <span className="support-rating__score-text">{activeLabel}</span> : null}
      </div>

      <div className="form-field">
        <label htmlFor="support-rating-comment">Comentário (opcional)</label>
        <textarea
          id="support-rating-comment"
          rows={3}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Conte como foi sua experiência com o suporte..."
        />
      </div>

      {error ? (
        <p className="support-rating__error" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary">
        Enviar avaliação
      </button>
    </form>
  );
}
