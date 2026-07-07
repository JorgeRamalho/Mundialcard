# Execute como Administrador no PowerShell:
#   Set-ExecutionPolicy -Scope Process Bypass; .\scripts\allow-firewall.ps1

$ports = @(5173, 5174, 5500)

foreach ($port in $ports) {
  $name = "MundialCard Dev Port $port"
  $existing = Get-NetFirewallRule -DisplayName $name -ErrorAction SilentlyContinue
  if ($existing) {
    Write-Host "Regra já existe: $name"
    continue
  }
  New-NetFirewallRule -DisplayName $name -Direction Inbound -Action Allow -Protocol TCP -LocalPort $port | Out-Null
  Write-Host "Firewall liberado: porta $port"
}

Write-Host "`nPronto. Reinicie npm run dev:network e acesse pelo IP exibido no terminal."
