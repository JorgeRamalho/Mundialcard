# MundialCard — Seu cartão de super benefícios

Plataforma digital de benefícios (saúde, funeral, alimentação, refeição, lazer, academia, telemedicina) com experiência de app, venda escalável, atendimento em camadas e canal B2B.

## Identidade

| Item | Valor |
|------|--------|
| **Nome** | MundialCard |
| **Slogan** | Seu cartão de super benefícios |
| **Tagline** | Mais vida. Mais cuidado. Benefícios sem limites. |
| **Logo** | `public/logo.svg` e `public/logo-white.svg` |
| **Paleta** | Navy (#0A1628), teal (#14B8A6), sky (#0EA5E9), gold (#D4A017), cream (#F7F4EE) |
| **Fontes** | Plus Jakarta Sans (títulos) + DM Sans (texto) |

## Vídeos integrados

| Arquivo | Uso |
|---------|-----|
| `public/media/MundialCard-app.mp4` | Hero, app no celular, FAQ, área do cliente |
| `public/media/MundialCard-institucional.mp4` | FAQ, atendimento, educação pré-venda |

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço local indicado no terminal (geralmente `http://localhost:5173`).

## Estrutura principal

```
index.html              # Entrada HTML
public/style.css        # Design system e layout responsivo
public/script.js        # Utilitários JavaScript
public/media/           # Vídeos oficiais
src/App.jsx             # Rotas React
src/pages/              # Home, dashboard, cliente, parceiro, etc.
src/components/         # Navbar, Footer, formulário de lançamento
docs/venda-digital-escalavel.md
```

## Rotas

- `/` — Home (hero, benefícios, planos, telemedicina, FAQ, B2B, formulário)
- `/cadastro` — Cupom de inauguração
- `/dashboard` — Dashboard operacional
- `/area-cliente` — Área do cliente + kit digital
- `/parceiros` — Representantes B2B
- `/atendimento` — Base → IA → humano
- `/agendamento` — Telemedicina
- `/produtos` — Planos e categorias
- `/app` — Download do app

## Formulário de lançamento

Campos: nome, data de nascimento, cidade, telefone, e-mail e endereço.  
Os leads ficam em `localStorage` (`mundialcard_leads`) e geram cupom `MUND-XXXX`.

## Documentação de venda digital

Veja `docs/venda-digital-escalavel.md`.
