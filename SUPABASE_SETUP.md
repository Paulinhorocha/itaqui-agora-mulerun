# Guia de Configuração — Supabase

## 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta
2. Clique em **New Project**
3. Preencha:
   - **Name**: `itaqui-agora` (ou outro nome)
   - **Database Password**: crie uma senha forte
   - **Region**: escolha a mais próxima (ex: `South America (São Paulo)`)
4. Aguarde a criação do projeto (~2 minutos)

## 2. Executar o Schema SQL

1. No dashboard do Supabase, vá em **SQL Editor** (ícone no menu lateral)
2. Clique em **New Query**
3. Copie todo o conteúdo de `supabase/schema.sql`
4. Cole no editor e clique em **Run** (ou Ctrl+Enter)
5. Verifique que todas as tabelas foram criadas em **Table Editor**

## 3. Obter Credenciais

1. Vá em **Settings** > **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Configurar Variáveis de Ambiente

```bash
# Na raiz do projeto
cp .env.local.example .env.local
```

Edite `.env.local` com suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

## 5. Rodar o Projeto

```bash
npm install
npm run dev
```

O site funcionará com dados estáticos caso o Supabase não esteja configurado.

## 6. Adicionar Conteúdo

### Via Dashboard do Supabase

1. **Table Editor** > selecione a tabela
2. Clique em **Insert** para adicionar registros

### Via SQL Editor

```sql
-- Exemplo: adicionar nova notícia
INSERT INTO news (title, excerpt, content, category_id, city_id, is_breaking, is_featured)
VALUES (
  'Título da notícia aqui',
  'Resumo curto da notícia',
  'Conteúdo completo da notícia...',
  (SELECT id FROM categories WHERE slug = 'policia'),
  (SELECT id FROM cities WHERE slug = 'itaqui'),
  true,
  false
);
```

## Tabelas Disponíveis

| Tabela | Descrição |
|---|---|
| `categories` | Categorias de notícias (Polícia, Política, Esporte, etc.) |
| `cities` | Cidades da cobertura (Itaqui, Uruguaiana, São Borja, etc.) |
| `news` | Notícias com título, conteúdo, imagem, flags (breaking, featured, hero) |
| `columnists` | Colunistas/especialistas |
| `columns` | Colunas escritas pelos colunistas |
| `social_links` | Links de redes sociais com contadores |
| `site_config` | Configurações do site (WhatsApp, email, etc.) |

## Flags de Notícias

| Flag | Descrição |
|---|---|
| `is_breaking` | Aparece no ticker "AGORA" |
| `is_featured` | Aparece na seção "Destaques" |
| `is_hero` | Aparece como manchete principal |

## Row Level Security (RLS)

O schema já configura RLS com política de leitura pública. Para adicionar autenticação de admin no futuro:

1. Vá em **Authentication** > **Providers**
2. Configure o provedor desejado (email, Google, etc.)
3. Crie políticas de escrita para usuários autenticados

## Estrutura do Projeto

```
lib/
├── supabase/
│   ├── client.ts      # Cliente para componentes client
│   └── server.ts      # Cliente para server components
├── types.ts           # Tipos TypeScript
└── data.ts            # Funções de busca com fallback estático

hooks/
├── useBreakingNews.ts # Hook para o ticker "AGORA"
└── useNews.ts         # Hooks para notícias

supabase/
└── schema.sql         # Schema completo do banco
```

## Deploy

Para deploy na Vercel:

1. Vá em **Settings** > **Environment Variables**
2. Adicione `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Faça deploy normalmente
