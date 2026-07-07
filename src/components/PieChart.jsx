/**
 * Gráfico de pizza leve (CSS conic-gradient) — sem dependências externas.
 */
export default function PieChart({
  title,
  subtitle,
  segments,
  centerLabel = "Total",
  size = 148,
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let accumulated = 0;

  const gradientStops = segments
    .map((segment) => {
      const start = (accumulated / total) * 100;
      accumulated += segment.value;
      const end = (accumulated / total) * 100;
      return `${segment.color} ${start}% ${end}%`;
    })
    .join(", ");

  const ariaSummary = segments
    .map((segment) => `${segment.label}: ${Math.round((segment.value / total) * 100)}%`)
    .join(", ");

  return (
    <article className="pie-chart-card">
      <header className="pie-chart-card__head">
        <h4>{title}</h4>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>

      <div className="pie-chart-card__body">
        <div
          className="pie-chart__ring"
          style={{
            width: size,
            height: size,
            background: `conic-gradient(${gradientStops})`,
          }}
          role="img"
          aria-label={`${title}. ${ariaSummary}`}
        >
          <div className="pie-chart__center">
            <strong>{total.toLocaleString("pt-BR")}</strong>
            <span>{centerLabel}</span>
          </div>
        </div>

        <ul className="pie-chart__legend">
          {segments.map((segment) => {
            const percent = Math.round((segment.value / total) * 100);
            return (
              <li key={segment.label}>
                <span className="pie-chart__swatch" style={{ background: segment.color }} aria-hidden="true" />
                <span className="pie-chart__legend-label">{segment.label}</span>
                <span className="pie-chart__legend-value">
                  <strong>{percent}%</strong>
                  <small>{segment.value.toLocaleString("pt-BR")}</small>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
