import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildCameraSecureUrl,
  isCameraApiAvailable,
  isLocalHost,
  needsHttpsForCamera,
} from "../../lib/cameraAccess.js";
import { simulateThermalReading } from "../../lib/triageEngine.js";

function buildSecurityErrorMessage() {
  const secureUrl = buildCameraSecureUrl();
  if (isLocalHost()) {
    return "Não foi possível acessar a câmera. Verifique a permissão no navegador ou use a simulação abaixo.";
  }
  if (location.protocol === "http:") {
    return "No celular, a câmera só funciona em HTTPS. Toque no botão abaixo para abrir o link correto.";
  }
  return "A câmera requer HTTPS. Aceite o certificado no navegador ou acesse https://mundialcard.netlify.app";
}

function mapCameraError(err) {
  const name = err?.name || "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return "Permissão da câmera negada. Autorize o acesso nas configurações do navegador e tente novamente.";
  }
  if (name === "NotFoundError" || name === "DevicesNotFoundError") {
    return "Nenhuma câmera encontrada neste dispositivo.";
  }
  if (name === "NotReadableError" || name === "TrackStartError") {
    return "A câmera está em uso por outro aplicativo. Feche-o e tente novamente.";
  }
  if (name === "OverconstrainedError") {
    return "Configuração da câmera não suportada neste dispositivo.";
  }
  if (name === "SecurityError") {
    return buildSecurityErrorMessage();
  }
  if (name === "unsupported") {
    if (!isCameraApiAvailable()) {
      return buildSecurityErrorMessage();
    }
    return "Seu navegador não suporta acesso à câmera. Use Chrome, Safari, Firefox ou Edge atualizado.";
  }
  return "Não foi possível acessar a câmera. Verifique permissões ou use a simulação abaixo.";
}

async function requestCameraStream() {
  if (!isCameraApiAvailable()) {
    throw Object.assign(new Error("Insecure context"), { name: "SecurityError" });
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    const legacy = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!legacy) {
      throw Object.assign(new Error("unsupported"), { name: "unsupported" });
    }
    return new Promise((resolve, reject) => {
      legacy.call(navigator, { video: true, audio: false }, resolve, reject);
    });
  }

  const constraintSets = [
    {
      video: {
        facingMode: { ideal: "user" },
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
      },
      audio: false,
    },
    { video: { facingMode: "user" }, audio: false },
    { video: true, audio: false },
  ];

  let lastError = null;
  for (const constraints of constraintSets) {
    try {
      return await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      lastError = err;
      if (err.name === "NotAllowedError" || err.name === "NotFoundError") {
        throw err;
      }
    }
  }
  throw lastError || new Error("Camera unavailable");
}

async function bindStreamToVideo(video, stream) {
  video.srcObject = stream;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.autoplay = true;

  await new Promise((resolve, reject) => {
    const onReady = () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("error", onFail);
      resolve();
    };
    const onFail = () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("error", onFail);
      reject(new Error("Video failed"));
    };
    if (video.readyState >= 1) {
      resolve();
      return;
    }
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("error", onFail);
  });

  await video.play();
}

export default function CameraCapture({
  mode = "identity",
  onCapture,
  onThermalReading,
  feeling = "normal",
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [thermalValue, setThermalValue] = useState(null);
  const [liveness, setLiveness] = useState(0);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    stopStream();
    setStatus("idle");
    setError("");
  }, [stopStream]);

  const startCamera = async () => {
    setError("");
    setStatus("starting");

    try {
      stopStream();
      const stream = await requestCameraStream();
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) {
        stream.getTracks().forEach((track) => track.stop());
        throw new Error("Video element missing");
      }
      await bindStreamToVideo(video, stream);
      setStatus("live");
    } catch (err) {
      stopStream();
      setError(mapCameraError(err));
      setStatus("fallback");
    }
  };

  useEffect(() => () => stopStream(), [stopStream]);

  const hasLiveFeed = () => {
    const video = videoRef.current;
    return Boolean(streamRef.current && video && video.readyState >= 2 && video.videoWidth > 0);
  };

  const drawThermalOverlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !hasLiveFeed()) return null;

    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.38;
    const rx = w * 0.18;
    const ry = h * 0.22;
    const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(rx, ry));
    gradient.addColorStop(0, "rgba(255, 80, 40, 0.55)");
    gradient.addColorStop(0.5, "rgba(255, 200, 0, 0.25)");
    gradient.addColorStop(1, "rgba(0, 120, 255, 0.05)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();

    return canvas;
  };

  const runIdentityCapture = () => {
    setScanning(true);
    let progress = 0;
    const timer = setInterval(() => {
      progress += 20;
      setLiveness(Math.min(100, progress + 15));
      if (progress >= 100) {
        clearInterval(timer);
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (hasLiveFeed() && video && canvas) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
          onCapture?.({
            photoDataUrl: canvas.toDataURL("image/jpeg", 0.85),
            livenessScore: 92,
            biometryVerified: true,
          });
        } else {
          onCapture?.({ photoDataUrl: null, livenessScore: 78, biometryVerified: true });
        }
        setScanning(false);
      }
    }, 400);
  };

  const runThermalScan = () => {
    setScanning(true);
    setThermalValue(null);
    setTimeout(() => {
      const canvas = hasLiveFeed() ? drawThermalOverlay() : null;
      const temp = simulateThermalReading(canvas, feeling);
      setThermalValue(temp);
      onThermalReading?.(temp);
      setScanning(false);
    }, 2200);
  };

  const isLive = status === "live";
  const isStarting = status === "starting";
  const requiresHttps = needsHttpsForCamera();
  const secureUrl = buildCameraSecureUrl();

  return (
    <div className="triage-camera">
      <div className={`triage-camera__viewport${mode === "thermal" ? " triage-camera__viewport--thermal" : ""}`}>
        <video
          ref={videoRef}
          className={`triage-camera__video${isLive ? " is-active" : ""}`}
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="triage-camera__canvas"
          hidden={mode !== "thermal" || !scanning}
          aria-hidden="true"
        />

        {!isLive ? (
          <div className="triage-camera__placeholder">
            {isStarting ? (
              <span>Solicitando acesso à câmera… Autorize no navegador se aparecer o aviso.</span>
            ) : (
              <span>{error || "Toque em “Ativar câmera” para usar a câmera frontal do seu dispositivo."}</span>
            )}
          </div>
        ) : null}

        {mode === "identity" && scanning && isLive ? (
          <div className="triage-camera__scan-ring" aria-hidden="true" />
        ) : null}

        {mode === "thermal" && thermalValue != null ? (
          <div className="triage-camera__temp-badge">{thermalValue.toFixed(1)} °C</div>
        ) : null}

        {isLive ? (
          <span className="triage-camera__live-badge" aria-live="polite">
            ● Ao vivo
          </span>
        ) : null}
      </div>

      {error ? <p className="triage-camera__error">{error}</p> : null}

      {requiresHttps ? (
        <div className="triage-camera__https-card">
          <a href={secureUrl} className="btn btn-primary btn-sm">
            Abrir câmera (HTTPS · porta 5174)
          </a>
          <p className="triage-camera__https-url">
            <a href={secureUrl}>{secureUrl}</a>
          </p>
        </div>
      ) : null}

      <div className="triage-camera__actions">
        {!isLive && !requiresHttps ? (
          <button type="button" className="btn btn-primary btn-sm" onClick={startCamera} disabled={isStarting}>
            {isStarting ? "Ativando câmera…" : "Ativar câmera"}
          </button>
        ) : !isLive && requiresHttps ? null : (
          <button type="button" className="btn btn-outline btn-sm" onClick={stopCamera}>
            Desligar câmera
          </button>
        )}

        {mode === "identity" ? (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={scanning || !isLive}
            onClick={runIdentityCapture}
          >
            {scanning ? `Verificando rosto… ${liveness}%` : "Capturar selfie + liveness"}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            disabled={scanning || !isLive}
            onClick={runThermalScan}
          >
            {scanning ? "Lendo temperatura…" : "Escanear temperatura (térmica simulada)"}
          </button>
        )}

        {status === "fallback" || status === "idle" ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              if (mode === "identity") {
                onCapture?.({ photoDataUrl: null, livenessScore: 75, biometryVerified: true });
              } else {
                const temp = simulateThermalReading(null, feeling);
                setThermalValue(temp);
                onThermalReading?.(temp);
              }
            }}
          >
            Usar simulação sem câmera
          </button>
        ) : null}
      </div>
    </div>
  );
}
