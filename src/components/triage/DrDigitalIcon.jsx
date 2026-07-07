import { useId } from "react";

/** Ícone Dr. Digital — plano de saúde (estetoscópio + cartão + cruz). */
export default function DrDigitalIcon({ size = 72, className = "", title = "Dr. Digital MundialCard" }) {
  const uid = useId().replace(/:/g, "");
  const bgId = `drd-bg-${uid}`;
  const cardId = `drd-card-${uid}`;

  return (
    <svg
      className={`dr-digital-icon${className ? ` ${className}` : ""}`}
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={bgId} x1="12" y1="8" x2="84" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14b8a6" />
          <stop offset="0.55" stopColor="#d4a017" />
          <stop offset="1" stopColor="#8c1417" />
        </linearGradient>
        <linearGradient id={cardId} x1="24" y1="28" x2="72" y2="68" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#f7f4ee" />
        </linearGradient>
      </defs>
      <circle cx="48" cy="48" r="44" fill={`url(#${bgId})`} opacity="0.18" />
      <circle cx="48" cy="48" r="40" stroke={`url(#${bgId})`} strokeWidth="2.5" fill="#fff" />
      <rect x="26" y="30" width="44" height="30" rx="8" fill={`url(#${cardId})`} stroke="#8c1417" strokeWidth="1.75" />
      <rect x="32" y="38" width="14" height="10" rx="3" fill="#8c1417" opacity="0.12" />
      <circle cx="39" cy="43" r="2.5" fill="#14b8a6" />
      <path
        d="M58 38h8M58 44h6"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 24v8M44 28h8"
        stroke="#ef4444"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M62 52c8 0 14 5 14 12 0 6-4 10-10 10h-2"
        stroke="#0a1628"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="64" cy="74" r="7" fill="#14b8a6" stroke="#0a1628" strokeWidth="2" />
      <circle cx="64" cy="74" r="3" fill="#fff" />
      <path
        d="M34 60c0-8 6-14 14-14s14 6 14 14"
        stroke="#0a1628"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 60h8"
        stroke="#0a1628"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
