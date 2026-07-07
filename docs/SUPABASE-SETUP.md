# MundialCard — Configuração do Banco de Dados (Supabase)

## 1. Criar projeto

1. Acesse [https://supabase.com](https://supabase.com) e crie uma conta gratuita.
2. **New project** → nome: `mundialcard` → região: **South America (São Paulo)**.
3. Aguarde o provisionamento (~2 minutos).

## 2. Executar o schema

1. No painel Supabase: **SQL Editor** → **New query**.
2. Cole o conteúdo de `supabase/schema.sql` e execute (**Run**).
3. Cole o conteúdo de `supabase/seed.sql` e execute.

## 3. Configurar variáveis no projeto

1. Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

2. Em **Settings → API**, copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

3. Reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 4. Criar usuários

### Cliente / operação (Auth)

1. **Authentication → Users → Add user**
2. Exemplo operador:
   - E-mail: `operador@mundialcard.com.br`
   - Senha: (sua escolha)
3. No **SQL Editor**, promova a role:

```sql
update public.profiles
set role = 'operator'
where id = (select id from auth.users where email = 'operador@mundialcard.com.br');
```

### Parceiro B2B

```sql
-- Após criar usuário parceiro@mundialcard.com.br no Auth:
update public.profiles set role = 'partner' where id = (
  select id from auth.users where email = 'parceiro@mundialcard.com.br'
);

update public.partners
set profile_id = (select id from auth.users where email = 'parceiro@mundialcard.com.br')
where referral_code = 'REP-2048';
```

## 5. Netlify (produção)

Em **Site settings → Environment variables**, adicione:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Faça um novo deploy após salvar.

## 6. Tabelas criadas

| Tabela | Uso |
|--------|-----|
| `profiles` | Perfis e papéis (client, partner, admin, operator) |
| `plans` | Planos Bronze a Platinum |
| `partners` | Representantes B2B |
| `leads` | Cupons e cadastros da landing |
| `clients` | Clientes ativos |
| `appointments` | Agendamentos telemedicina |
| `partner_pipeline` | Funil B2B |
| `support_ratings` | Avaliações de atendimento |
| `triage_sessions` | Sessões Dr. Digital |

## 7. Modo sem Supabase

Se `.env.local` não estiver configurado, o site continua funcionando em **modo demonstração** com `localStorage` e dados mock — ideal para apresentações offline.

## 8. LGPD

- Dados sensíveis protegidos por **Row Level Security (RLS)**.
- Leads públicos: apenas **insert** anônimo (formulário de cupom).
- Leitura de clientes/parceiros: apenas usuários autenticados com permissão.
- Configure política de privacidade e retenção de dados com o jurídico da MundialCard.
