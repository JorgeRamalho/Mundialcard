import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js");

spawn(process.execPath, [viteBin, "--host", "0.0.0.0", "--port", "5174", "--strictPort"], {
  cwd: root,
  env: { ...process.env, VITE_DEV_HTTPS: "1", VITE_DEV_PORT: "5174" },
  stdio: "inherit",
});
