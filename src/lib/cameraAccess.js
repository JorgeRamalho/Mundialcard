const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);
const HTTPS_CAMERA_PORT = "5174";

export function isLocalHost() {
  return LOCAL_HOSTS.has(location.hostname);
}

export function isLanHttp() {
  return location.protocol === "http:" && !isLocalHost();
}

export function isCameraApiAvailable() {
  if (window.isSecureContext || isLocalHost()) return true;
  return Boolean(navigator.mediaDevices?.getUserMedia);
}

/** URL HTTPS para câmera no celular (HTTP 5173 → HTTPS 5174). */
export function buildCameraSecureUrl() {
  const { hostname, port, hash } = location;
  const httpsPort = port === "5173" || !port ? HTTPS_CAMERA_PORT : port;
  const route = hash?.startsWith("#/") ? hash : "#/consulta-digital";
  return `https://${hostname}:${httpsPort}/${route}`;
}

export function needsHttpsForCamera() {
  return isLanHttp() && !isCameraApiAvailable();
}
