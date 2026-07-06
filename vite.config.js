import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

export default defineConfig({
  plugins: [react(), stripDevOnlyHtml(), verifyLiveBuild()],
  base: "./",
});
