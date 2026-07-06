const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");

const required = [
  "index.html",
  "style.css",
  "logo.svg",
  "logo-white.svg",
  "favicon.svg",
  "assets",
  "images/carousel/familia-planos.png",
  "images/carousel/colaboradores-planos.png",
  "images/parceiros/parceiro-1.png",
  "images/parceiros/mundial-card-cartao.png",
  "media/mundialcard-app.mp4",
  "media/mundialcard-institucional.mp4",
];

const missing = required.filter((file) => !fs.existsSync(path.join(distDir, file)));

if (missing.length) {
  console.error("\nBuild incompleto. Arquivos ausentes em dist/:");
  missing.forEach((file) => console.error(`  - ${file}`));
  console.error("\nExecute: npm run build:live\n");
  process.exit(1);
}

const html = fs.readFileSync(path.join(distDir, "index.html"), "utf8");

if (html.includes("main.jsx") || html.includes("live-server-redirect")) {
  console.error("\nErro: dist/index.html ainda contém código de desenvolvimento.\n");
  process.exit(1);
}

if (!html.includes('id="root"') || !html.includes("./assets/")) {
  console.error("\nErro: dist/index.html não parece um build válido do React.\n");
  process.exit(1);
}

console.log("Build Live Server OK — pasta dist/ pronta para visualização.");
