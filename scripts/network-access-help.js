import os from "node:os";

export function getLanAddresses() {
  const nets = os.networkInterfaces();
  const addresses = [];

  for (const entries of Object.values(nets)) {
    for (const entry of entries || []) {
      if (entry.family !== "IPv4" || entry.internal) continue;
      addresses.push(entry.address);
    }
  }

  return [...new Set(addresses)];
}

const HTTPS_CAMERA_PORT = 5174;

export function printNetworkAccessHelp(server) {
  const address = server.httpServer?.address?.();
  const port = typeof address === "object" && address ? address.port : server.config.server.port || 5173;
  const isHttps = Boolean(server.config.server?.https);
  const protocol = isHttps ? "https" : "http";
  const ips = getLanAddresses();

  console.log("\n  ═══ MundialCard — base de testes ═══\n");

  if (isHttps) {
    console.log(`  🔒 Servidor HTTPS (porta ${port}) — câmera no celular/tablet\n`);
  } else {
    console.log(`  🌐 Servidor HTTP (porta ${port}) — testes rápidos na rede\n`);
  }

  console.log("  PC (este computador):");
  console.log(`     ${protocol}://localhost:${port}/`);
  console.log(`     ${protocol}://127.0.0.1:${port}/\n`);

  console.log("  Celular/tablet (mesma Wi-Fi):");
  if (ips.length === 0) {
    console.log(`     ${protocol}://SEU-IP-LOCAL:${port}/`);
  } else {
    for (const ip of ips) {
      console.log(`     ${protocol}://${ip}:${port}/`);
      console.log(`     ${protocol}://${ip}:${port}/#/consulta-digital`);
    }
  }

  if (!isHttps) {
    console.log("\n  📷 Câmera no celular → use HTTPS na porta 5174:");
    console.log("     Execute: npm run dev:test  (sobe HTTP + HTTPS juntos)");
    for (const ip of ips.length ? ips : ["SEU-IP"]) {
      console.log(`     https://${ip}:${HTTPS_CAMERA_PORT}/#/consulta-digital`);
    }
  }

  console.log("\n  Produção (sempre acessível): https://mundialcard.netlify.app/\n");
}

export function printDualServerBanner() {
  const ips = getLanAddresses();
  console.log("\n  ✅ Dois servidores ativos para testes:\n");
  console.log("  HTTP  5173 → navegação e testes gerais (PC e celular)");
  console.log("  HTTPS 5174 → Dr. Digital com câmera no celular\n");
  for (const ip of ips) {
    console.log(`  http://${ip}:5173/`);
    console.log(`  https://${ip}:5174/#/consulta-digital\n`);
  }
}
