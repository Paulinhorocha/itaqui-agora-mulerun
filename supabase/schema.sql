-- ═══════════════════════════════════════════════════════════════
-- ITAQUI AGORA — Schema para Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase
-- ═══════════════════════════════════════════════════════════════

-- ─── CATEGORIAS ──────────────────────────────────────────────
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  color text not null default '#01a6b1',
  created_at timestamptz default now()
);

-- ─── CIDADES ─────────────────────────────────────────────────
create table if not exists cities (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  gradient_from text not null default '#003250',
  gradient_to text not null default '#004e7a',
  created_at timestamptz default now()
);

-- ─── NOTÍCIAS ────────────────────────────────────────────────
create table if not exists news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  image_url text,
  category_id uuid references categories(id) on delete set null,
  city_id uuid references cities(id) on delete set null,
  is_breaking boolean default false,
  is_featured boolean default false,
  is_hero boolean default false,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── COLUNISTAS ──────────────────────────────────────────────
create table if not exists columnists (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  initials text not null,
  avatar_bg text not null default '#003250',
  area text not null,
  description text not null default '',
  active boolean default true,
  created_at timestamptz default now()
);

-- ─── COLUNAS ─────────────────────────────────────────────────
create table if not exists columns (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  columnist_id uuid references columnists(id) on delete cascade,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ─── REDES SOCIAIS ───────────────────────────────────────────
create table if not exists social_links (
  id uuid default gen_random_uuid() primary key,
  platform text not null,
  url text not null,
  icon text not null default '',
  bg_color text not null default '#003250',
  followers numeric default 0,
  label text not null default '',
  created_at timestamptz default now()
);

-- ─── CONFIGURAÇÕES DO SITE ───────────────────────────────────
create table if not exists site_config (
  id uuid default gen_random_uuid() primary key,
  key text not null unique,
  value text not null default '',
  updated_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════════════════
-- ÍNDICES PARA PERFORMANCE
-- ═══════════════════════════════════════════════════════════════

create index if not exists idx_news_published_at on news(published_at desc);
create index if not exists idx_news_is_breaking on news(is_breaking) where is_breaking = true;
create index if not exists idx_news_is_featured on news(is_featured) where is_featured = true;
create index if not exists idx_news_is_hero on news(is_hero) where is_hero = true;
create index if not exists idx_news_category_id on news(category_id);
create index if not exists idx_news_city_id on news(city_id);
create index if not exists idx_columns_published_at on columns(published_at desc);
create index if not exists idx_columnists_active on columnists(active) where active = true;

-- ═══════════════════════════════════════════════════════════════
-- DADOS INICIAIS (SEED)
-- ═══════════════════════════════════════════════════════════════

-- Categorias
insert into categories (name, slug, color) values
  ('Polícia', 'policia', '#b02020'),
  ('Política', 'politica', '#003250'),
  ('Esporte', 'esporte', '#0a6030'),
  ('Agro', 'agro', '#705010'),
  ('Educação', 'educacao', '#505000'),
  ('Região', 'regiao', '#003250'),
  ('Trânsito', 'transito', '#8a1010'),
  ('Saúde', 'saude', '#01a6b1'),
  ('Cultura', 'cultura', '#5a1a6a'),
  ('Economia', 'economia', '#6a3a10')
on conflict (slug) do nothing;

-- Cidades
insert into cities (name, slug, gradient_from, gradient_to) values
  ('Itaqui',     'itaqui',     '#003250', '#004e7a'),
  ('Maçambará',  'macambara',  '#014a30', '#026848'),
  ('São Borja',  'sao-borja',  '#3a0a5a', '#5a1a80'),
  ('Uruguaiana', 'uruguaiana', '#5a2e00', '#804400'),
  ('Alegrete',   'alegrete',   '#00285a', '#003e8a'),
  ('Estado',     'estado',     '#4a1000', '#701800'),
  ('Geral',      'geral',      '#1e2a36', '#2d3e50')
on conflict (slug) do nothing;

-- Colunistas
insert into columnists (name, initials, avatar_bg, area, description) values
  ('Dr. Marcelo Petrini', 'MP', '#003250', 'Direito',          'Direito Previdenciário e Trabalhista'),
  ('Dra. Ana Costa',      'AC', '#01a6b1', 'Saúde',            'Medicina Preventiva e Bem-estar'),
  ('Roberto Souza',       'RS', '#1a6040', 'Agronegócio',      'Mercado de Commodities e Safra'),
  ('Carla Ferreira',      'CF', '#5a1a6a', 'Educação',         'Pedagogia, Família e Desenvolvimento'),
  ('João Lima',           'JL', '#6a3a10', 'Economia',         'Finanças Pessoais e Investimentos')
on conflict do nothing;

-- Redes sociais
insert into social_links (platform, url, icon, bg_color, followers, label) values
  ('Facebook',  'https://facebook.com/itaquiagora',  'f', '#1877F2', 42300, 'curtidas'),
  ('Instagram', 'https://instagram.com/itaquiagora', '✦', '#E4405F', 18700, 'seguidores'),
  ('TikTok',    'https://tiktok.com/@itaquiagora',   '♪', '#111111', 15200, 'seguidores')
on conflict do nothing;

-- Configurações do site
insert into site_config (key, value) values
  ('site_name',        'ItaquiAgora'),
  ('site_tagline',     'Fronteira Oeste em tempo real'),
  ('whatsapp_channel', 'https://chat.whatsapp.com/SEU_LINK_AQUI'),
  ('contact_email',    'redacao@itaquiagora.com.br'),
  ('contact_phone',    '(55) 3431-0000')
on conflict (key) do nothing;

-- ═══════════════════════════════════════════════════════════════
-- NOTÍCIAS DE EXEMPLO
-- ═══════════════════════════════════════════════════════════════

-- Pega IDs das categorias e cidades
-- (Use os IDs reais após inserir os dados acima)

insert into news (title, excerpt, content, category_id, city_id, is_breaking, is_featured, is_hero)
values
  (
    'Prefeito anuncia construção de novo Posto de Saúde no Bairro São João',
    'Obra promete atender mais de 8 mil moradores da região oeste da cidade com serviços completos de saúde básica e atendimento especializado.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'politica'),
    (select id from cities where slug = 'itaqui'),
    false, true, true
  ),
  (
    'Acidente na BR-290 deixa duas pessoas feridas entre Itaqui e Uruguaiana',
    'Vítimas foram socorridas pelo SAMU e levadas ao hospital mais próximo.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'transito'),
    (select id from cities where slug = 'itaqui'),
    true, false, false
  ),
  (
    'BM apreende carga de cigarros contrabandeados na fronteira',
    'Operação foi realizada na madrugada de sábado na ponte da Integração.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'policia'),
    (select id from cities where slug = 'uruguaiana'),
    true, false, false
  ),
  (
    'Câmara de Itaqui aprova orçamento municipal para 2026',
    'Projeto foi aprovado por unanimidade na sessão desta quinta-feira.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'politica'),
    (select id from cities where slug = 'itaqui'),
    true, false, false
  ),
  (
    'Time de Uruguaiana vence final do Regional de Futebol',
    'Partida decisiva aconteceu no estádio municipal com público recorde.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'esporte'),
    (select id from cities where slug = 'uruguaiana'),
    true, false, false
  ),
  (
    'Safra de soja supera expectativas na Fronteira Oeste',
    'Produtores relatam aumento de 12% na produtividade em relação ao ano anterior.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'agro'),
    null,
    true, false, false
  ),
  (
    'Homem é preso após perseguição policial no centro de Itaqui',
    'Ocorrência foi registrada na noite desta quinta-feira. Suspeito tentou fugir de motocicleta.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'policia'),
    (select id from cities where slug = 'itaqui'),
    false, true, false
  ),
  (
    'Chuvas intensas causam estragos em estradas do interior',
    'Produtores rurais relatam dificuldades de acesso em várias localidades da região.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'regiao'),
    null,
    false, true, false
  ),
  (
    'Escola de São Borja conquista prêmio educacional estadual',
    'Projeto de alunos do ensino médio foi reconhecido pelo Governo do RS.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'educacao'),
    (select id from cities where slug = 'sao-borja'),
    false, true, false
  ),
  (
    'Safra 2025/26 com as melhores perspectivas da última década',
    'Produtores esperam aumento significativo na produtividade de soja e arroz.',
    'Conteúdo completo da notícia aqui...',
    (select id from categories where slug = 'agro'),
    null,
    false, true, false
  );

-- ═══════════════════════════════════════════════════════════════
-- COLUNAS DE EXEMPLO
-- ═══════════════════════════════════════════════════════════════

insert into columns (title, excerpt, content, columnist_id)
values
  (
    'O que muda na aposentadoria em 2025',
    'Entenda as novas regras da reforma da previdência.',
    'Conteúdo completo da coluna aqui...',
    (select id from columnists where initials = 'MP')
  ),
  (
    'Perspectivas da soja para o segundo semestre',
    'Mercado aponta tendências para os próximos meses.',
    'Conteúdo completo da coluna aqui...',
    (select id from columnists where initials = 'RS')
  ),
  (
    'Como se proteger das gripes de inverno',
    'Dicas de prevenção para os meses mais frios.',
    'Conteúdo completo da coluna aqui...',
    (select id from columnists where initials = 'AC')
  );

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════

-- Habilita RLS em todas as tabelas
alter table categories enable row level security;
alter table cities enable row level security;
alter table news enable row level security;
alter table columnists enable row level security;
alter table columns enable row level security;
alter table social_links enable row level security;
alter table site_config enable row level security;

-- Política de leitura pública para todas as tabelas
create policy "Leitura pública" on categories for select using (true);
create policy "Leitura pública" on cities for select using (true);
create policy "Leitura pública" on news for select using (true);
create policy "Leitura pública" on columnists for select using (true);
create policy "Leitura pública" on columns for select using (true);
create policy "Leitura pública" on social_links for select using (true);
create policy "Leitura pública" on site_config for select using (true);

-- ═══════════════════════════════════════════════════════════════
-- FUNÇÃO AUXILIAR: tempo relativo
-- ═══════════════════════════════════════════════════════════════

create or replace function time_ago(timestamp timestamptz)
returns text as $$
declare
  diff interval;
  minutes integer;
  hours integer;
  days integer;
begin
  diff = now() - timestamp;
  minutes = extract(epoch from diff) / 60;
  hours = minutes / 60;
  days = hours / 24;

  if minutes < 1 then
    return 'agora';
  elsif minutes < 60 then
    return 'há ' || floor(minutes) || ' min';
  elsif hours < 24 then
    return 'há ' || floor(hours) || 'h';
  elsif days < 7 then
    return 'há ' || floor(days) || ' dias';
  else
    return to_char(timestamp, 'DD/MM/YYYY');
  end if;
end;
$$ language plpgsql;
