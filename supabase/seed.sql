-- MundialCard — Dados iniciais de demonstração
-- Execute APÓS schema.sql no SQL Editor do Supabase

insert into public.plans (slug, name, price_monthly, tier_order) values
  ('bronze', 'Bronze', 29.90, 1),
  ('prata', 'Prata', 49.90, 2),
  ('ouro', 'Ouro', 79.90, 3),
  ('diamante', 'Diamante', 119.90, 4),
  ('premium', 'Premium', 159.90, 5),
  ('platinum', 'Platinum', 199.90, 6)
on conflict (slug) do nothing;

insert into public.partners (company_name, contact_name, region, referral_code, commission_rate, status) values
  ('MundialCard Representações MT', 'Carlos Representante', 'Centro-Oeste', 'REP-2048', 12.5, 'active'),
  ('Rede Saúde Parceiros', 'Ana B2B', 'Sudeste', 'REP-3012', 10.0, 'active')
on conflict (referral_code) do nothing;

insert into public.clients (full_name, email, phone, city, state, status, plan_id) values
  (
    'Ana Souza',
    'ana.souza@email.com',
    '(11) 98888-1111',
    'São Paulo',
    'SP',
    'ativo',
    (select id from public.plans where slug = 'ouro' limit 1)
  ),
  (
    'Carlos Lima',
    'carlos.lima@email.com',
    '(81) 97777-2222',
    'Recife',
    'PE',
    'ativo',
    (select id from public.plans where slug = 'prata' limit 1)
  ),
  (
    'Empresa Norte Ltda',
    'contato@norteltda.com.br',
    '(92) 96666-3333',
    'Manaus',
    'AM',
    'onboarding',
    (select id from public.plans where slug = 'platinum' limit 1)
  );

insert into public.leads (nome, nascimento, cidade, telefone, email, endereco, coupon, source, status) values
  (
    'Maria Oliveira',
    '1990-05-12',
    'Cuiabá',
    '(65) 99111-0001',
    'maria@email.com',
    'Rua das Flores, 100',
    'MUND-MARI8X2K',
    'site',
    'interesse'
  ),
  (
    'João Pereira',
    '1985-11-20',
    'Várzea Grande',
    '(65) 99222-0002',
    'joao@email.com',
    'Av. Central, 500',
    'MUND-JOAO9Y3L',
    'whatsapp',
    'educacao'
  ),
  (
    'Empresa Tech Sul',
    '1980-01-01',
    'Campo Grande',
    '(67) 99333-0003',
    'rh@techsul.com',
    'Centro Empresarial, 42',
    'MUND-TECH1A4M',
    'b2b',
    'contratacao'
  ),
  (
    'Fernanda Kit',
    '1992-03-08',
    'Sinop',
    '(66) 99444-0004',
    'fernanda@email.com',
    'Rua B, 22',
    'MUND-FERN2B5N',
    'site',
    'kit'
  )
on conflict (coupon) do nothing;

insert into public.partner_pipeline (partner_id, company_name, stage, plan_name, status)
select
  p.id,
  v.company_name,
  v.stage,
  v.plan_name,
  v.status
from public.partners p
cross join (
  values
    ('Tech Sul RH', 'Educação', 'Premium', 'em_andamento'),
    ('Mercado Central', 'Fechamento', 'Ouro', 'proposta_enviada'),
    ('Associação Norte', 'Kit enviado', 'Platinum', 'ativo')
) as v(company_name, stage, plan_name, status)
where p.referral_code = 'REP-2048';

insert into public.appointments (specialty, appointment_date, appointment_time, notes, status)
values
  ('Clínico geral', current_date + 2, '09:00', 'Primeira consulta', 'agendado'),
  ('Psicologia online', current_date + 3, '14:30', 'Retorno', 'agendado');
