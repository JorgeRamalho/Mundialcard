# Histórico de registros — MundialCard

Registro profissional das alterações realizadas no desenvolvimento do site e da plataforma digital, com base na linha do tempo do projeto.

## Visão do produto

Plataforma **MundialCard** (cartão de super benefícios / multibenefícios em saúde e bem-estar), alinhada ao conceito do site oficial [mundialcard.com.br](https://www.mundialcard.com.br/), com venda digital escalável, telemedicina, planos nacionais, atendimento em camadas, B2B e integração com WhatsApp.

---

## Linha do tempo das entregas

### 1. Fundação e identidade

- Scaffold do projeto com Vite + React + React Router
- Identidade visual: logo SVG, paleta bordô (`#8C1417E6`), tipografia Plus Jakarta Sans + DM Sans
- Renomeação da marca de VivaPay para **MundialCard**
- Cabeçalho branco; legenda/eyebrow em azul claro; rodapé alinhado à mesma identidade

### 2. Site institucional e conversão

- Home com carrossel, telemedicina em destaque, hero, benefícios, jornada digital, planos (Bronze → Platinum), FAQ com vídeos, suporte, B2B e formulário de lançamento
- Formulário de cupom (nome, nascimento, cidade, telefone, e-mail, endereço) com persistência em `localStorage`
- Páginas: dashboard, área do cliente, parceiros B2B, atendimento, agendamento, produtos, app

### 3. Mídia e vídeos

- Integração dos vídeos de propaganda (`mundialcard-app.mp4`, `mundialcard-institucional.mp4`)
- Componente `AutoPlayVideo` com autoplay, tela ampla, sem cortes e responsivo
- Remoção do mockup de celular no hero em favor de player em tela cheia

### 4. Carrossel

- Carrossel no topo da home com fotos de saúde/telemedicina
- Inclusão dos banners oficiais (família e colaboradores)
- Remoção do banner de cupons de inauguração do carrossel
- Restauração do comportamento visual original após testes de medida

### 5. Conceito oficial e parceiros

- Incorporação do discurso do site oficial (multibenefícios, sem carência, funeral, descontos)
- Seção **Parceiros** com logos oficiais (Otorrino MT, Hospital Militar, Ortopédico, São Judas, Odonto Medicina, Usmedic)
- Contato: endereço em Cuiabá-MT, telefone e WhatsApp

### 6. WhatsApp e atendimento

- Link oficial: `https://api.whatsapp.com/send?phone=5565992645537`
- Botão flutuante, menu, rodapé e central de atendimento

### 7. Documentação operacional

- `docs/venda-digital-escalavel.md` — jornada, métodos, B2B e KPIs
- Este arquivo — histórico de registros para a linha do tempo no GitHub

---

## Estrutura principal do repositório

```
index.html
public/style.css
public/script.js
public/media/           # vídeos
public/images/          # carrossel e parceiros
src/App.jsx
src/components/
src/pages/
src/data/content.js
docs/
```

## Branches

| Branch | Finalidade |
|--------|------------|
| `main` | Linha principal de produção / release inicial |
| `docs/historico-registros` | Atualização e manutenção do histórico de registros no GitHub |

## Publicação no GitHub

- Repositório: https://github.com/JorgeRamalho/Mundialcard
- Commit inicial na `main`: release da plataforma digital completa
- Branch `docs/historico-registros`: linha dedicada a evoluir este histórico de registros sem misturar com features de produto

## Contato operacional

- Site oficial: https://www.mundialcard.com.br/
- WhatsApp: https://api.whatsapp.com/send?phone=5565992645537
- Telefone: (65) 3365-1330
- Endereço: R. Barão de Melgaço, 2468 - Centro, Cuiabá - MT, 78005-300
