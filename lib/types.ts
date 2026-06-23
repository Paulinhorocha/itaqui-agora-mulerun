// ─── CATEGORIAS ──────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
}

// ─── CIDADES ─────────────────────────────────────────────────
export interface City {
  id: string;
  name: string;
  slug: string;
  gradient_from: string;
  gradient_to: string;
  created_at: string;
}

// ─── NOTÍCIAS ────────────────────────────────────────────────
export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category_id: string;
  city_id: string | null;
  is_breaking: boolean;
  is_featured: boolean;
  is_hero: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  // Relações
  categories?: Category;
  cities?: City;
}

// ─── COLUNISTAS / ESPECIALISTAS ──────────────────────────────
export interface Columnist {
  id: string;
  name: string;
  initials: string;
  avatar_bg: string;
  area: string;
  description: string;
  active: boolean;
  created_at: string;
}

// ─── COLUNAS ─────────────────────────────────────────────────
export interface Column {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  columnist_id: string;
  published_at: string;
  created_at: string;
  // Relação
  columnists?: Columnist;
}

// ─── REDES SOCIAIS ───────────────────────────────────────────
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  bg_color: string;
  followers: number;
  label: string;
  created_at: string;
}

// ─── CONFIGURAÇÕES DO SITE ───────────────────────────────────
export interface SiteConfig {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

// ─── TIPOS AUXILIARES PARA COMPONENTES ───────────────────────

// Dados para o widget "Últimas Notícias"
export interface LatestNewsItem {
  id: string;
  title: string;
  category_name: string;
  category_color: string;
  emoji: string;
  gradient_from: string;
  gradient_to: string;
  time_ago: string;
}

// Dados para cards de destaque
export interface FeaturedCard {
  id: string;
  title: string;
  excerpt: string;
  category_name: string;
  image_url: string | null;
  gradient_from: string;
  gradient_to: string;
  icon_path: string;
  time_ago: string;
}

// Dados para cards de cidades
export interface CityCard {
  id: string;
  name: string;
  title: string;
  gradient_from: string;
  gradient_to: string;
  icon_path: string;
  time_ago: string;
}

// Dados para especialistas
export interface SpecialistCard {
  id: string;
  name: string;
  initials: string;
  avatar_bg: string;
  area: string;
  description: string;
}

// Dados para colunas em destaque
export interface ColumnCard {
  id: string;
  columnist_name: string;
  columnist_initials: string;
  columnist_bg: string;
  area: string;
  title: string;
}
