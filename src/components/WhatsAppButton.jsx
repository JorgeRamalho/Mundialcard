import { contact } from "../data/content";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={contact.whatsappLabel}
      title={contact.whatsappLabel}
    >
      <span className="whatsapp-float-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
          <path d="M16.01 3C9.39 3 4 8.39 4 15.01c0 2.11.55 4.09 1.52 5.82L4 29l8.36-1.49A11.9 11.9 0 0 0 16.01 27C22.63 27 28 21.61 28 15.01 28 8.39 22.63 3 16.01 3zm0 21.82c-1.83 0-3.53-.5-5-1.37l-.36-.21-4.96.88.9-4.83-.23-.38A9.7 9.7 0 0 1 6.2 15c0-5.41 4.4-9.81 9.81-9.81 5.41 0 9.81 4.4 9.81 9.81 0 5.41-4.4 9.82-9.81 9.82zm5.38-7.35c-.29-.15-1.73-.85-2-.95-.27-.1-.46-.15-.66.15-.19.29-.76.95-.93 1.14-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.59-.9-2.18-.24-.58-.48-.5-.66-.51h-.56c-.19 0-.51.07-.77.36-.27.29-1.01.99-1.01 2.41s1.04 2.79 1.18 2.98c.15.19 2.04 3.12 4.94 4.37.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.55-.08 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
        </svg>
      </span>
      <span className="whatsapp-float-text">WhatsApp</span>
    </a>
  );
}
