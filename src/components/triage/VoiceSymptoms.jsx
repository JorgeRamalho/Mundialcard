import { useEffect, useRef, useState } from "react";

export default function VoiceSymptoms({ onTranscript }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef(null);
  const onTranscriptRef = useRef(onTranscript);

  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i += 1) {
        text += event.results[i][0].transcript;
      }
      const value = text.trim();
      setTranscript(value);
      onTranscriptRef.current?.(value);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    return () => recognition.abort();
  }, []);

  const toggle = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }
    setTranscript("");
    recognitionRef.current.start();
    setListening(true);
  };

  return (
    <div className="triage-voice">
        <div className="triage-voice__head">
        <span className="triage-voice__emoji" aria-hidden="true">
          🎙️
        </span>
        <span className={`triage-voice__pulse${listening ? " is-active" : ""}`} aria-hidden="true" />
        <div>
          <strong>Ouvir sintomas na CALL (áudio)</strong>
          <p>Fale como se estivesse em teleconsulta: o que sente, há quanto tempo e intensidade.</p>
        </div>
      </div>

      {supported ? (
        <button type="button" className={`btn ${listening ? "btn-outline" : "btn-primary"} btn-sm`} onClick={toggle}>
          {listening ? "Parar gravação de voz" : "Iniciar captura de voz"}
        </button>
      ) : (
        <p className="triage-voice__fallback">
          Reconhecimento de voz não disponível neste navegador. Use o campo de texto abaixo.
        </p>
      )}

      {transcript ? (
        <blockquote className="triage-voice__transcript">“{transcript}”</blockquote>
      ) : null}
    </div>
  );
}
