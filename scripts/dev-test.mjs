import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { printDualServerBanner } from "./network-access-help.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js");

function runServer(label, env, port) {
  const child = spawn(process.execPath, [viteBin, "--host", "0.0.0.0", "--port", String(port), "--strictPort"], {
    cwd: root,
    env: { ...process.env, ...env },
    stdio: "inherit",
    shell: false,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`\n[dev:test] Servidor ${label} encerrou com código ${code}`);
    }
  });

  return child;
}

printDualServerBanner();

const httpServer = runServer("HTTP", { VITE_DEV_HTTPS: "0", VITE_DEV_PORT: "5173" }, 5173);
const httpsServer = runServer("HTTPS", { VITE_DEV_HTTPS: "1", VITE_DEV_PORT: "5174" }, 5174);

function shutdown() {
  httpServer.kill("SIGTERM");
  httpsServer.kill("SIGTERM");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
