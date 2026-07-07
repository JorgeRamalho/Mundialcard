import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getLanAddresses, printNetworkAccessHelp } from "./scripts/network-access-help.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const useHttps = process.env.VITE_DEV_HTTPS === "1";
const devPort = Number(process.env.VITE_DEV_PORT || 5173);

function stripDevOnlyHtml() {
  return {
    name: "strip-dev-only-html",
    apply: "build",
    transformIndexHtml(html) {
      return html
        .replace(
          /<!-- live-server-redirect -->[\s\S]*?<!-- \/live-server-redirect -->\s*/g,
          ""
        )
        .replace(/<div[^>]*id="site-access-hint"[\s\S]*?<\/div>\s*/g, "")
        .replace(
          /<script>\s*setTimeout\(function \(\) \{[\s\S]*?\}, 2500\);\s*<\/script>\s*/g,
          ""
        );
    },
  };
}

function verifyLiveBuild() {
  return {
    name: "verify-live-build",
    apply: "build",
    closeBundle() {
      execSync("node scripts/verify-live.cjs", {
        cwd: __dirname,
        stdio: "inherit",
      });
    },
  };
}

function networkAccessHelp() {
  return {
    name: "network-access-help",
    configureServer(server) {
      server.httpServer?.once("listening", () => printNetworkAccessHelp(server));
    },
    configurePreviewServer(server) {
      server.httpServer?.once("listening", () => printNetworkAccessHelp(server));
    },
  };
}

function devAccessInject() {
  return {
    name: "dev-access-inject",
    apply: "serve",
    transformIndexHtml(html) {
      const ips = getLanAddresses();
      const payload = JSON.stringify({
        ips,
        httpPort: 5173,
        httpsPort: 5174,
      });
      return html.replace(
        "</head>",
        `<script>window.__MUNDIALCARD_DEV_ACCESS__=${payload};</script></head>`
      );
    },
  };
}

function pdfDownloadHeaders() {
  return {
    name: "pdf-download-headers",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.includes(".pdf")) {
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            'attachment; filename="Contrato-MundialCard-PF-2024.pdf"'
          );
          res.setHeader("X-Content-Type-Options", "nosniff");
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    ...(useHttps ? [basicSsl()] : []),
    networkAccessHelp(),
    devAccessInject(),
    stripDevOnlyHtml(),
    verifyLiveBuild(),
    pdfDownloadHeaders(),
  ],
  base: "./",
  server: {
    https: useHttps,
    host: "0.0.0.0",
    port: devPort,
    strictPort: Boolean(process.env.VITE_DEV_STRICT_PORT),
    headers: {
      "X-Content-Type-Options": "nosniff",
    },
  },
  preview: {
    https: false,
    host: "0.0.0.0",
    port: 5500,
  },
});
