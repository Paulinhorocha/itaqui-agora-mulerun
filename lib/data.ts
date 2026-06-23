import { createClient } from "./supabase/server";
import type {
  News,
  LatestNewsItem,
  FeaturedCard,
  CityCard,
  SpecialistCard,
  ColumnCard,
  SocialLink,
  Columnist,
} from "./types";

// ─── VERIFICA SE SUPABASE ESTÁ CONFIGURADO ───────────────────
function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// ═══════════════════════════════════════════════════════════════
// BREAKING NEWS (Ticker "AGORA")
// ═══════════════════════════════════════════════════════════════

export async function getBreakingNews(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return [
      "Acidente na BR-290 deixa duas pessoas feridas entre Itaqui e Uruguaiana",
      "BM apreende carga de cigarros contrabandeados na fronteira",
      "Prefeito anuncia novo posto de saúde no bairro São João",
      "Câmara de Itaqui aprova orçamento municipal para 2026",
      "Time de Uruguaiana vence final do Regional de Futebol",
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select("title")
      .eq("is_breaking", true)
      .order("published_at", { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) {
      return [
        "Acidente na BR-290 deixa duas pessoas feridas entre Itaqui e Uruguaiana",
        "BM apreende carga de cigarros contrabandeados na fronteira",
        "Prefeito anuncia novo posto de saúde no bairro São João",
      ];
    }

    return data.map((n) => n.title);
  } catch {
    return [
      "Acidente na BR-290 deixa duas pessoas feridas entre Itaqui e Uruguaiana",
      "BM apreende carga de cigarros contrabandeados na fronteira",
      "Prefeito anuncia novo posto de saúde no bairro São João",
    ];
  }
}

// ═══════════════════════════════════════════════════════════════
// HERO (NOTÍCIA PRINCIPAL)
// ═══════════════════════════════════════════════════════════════

export async function getHeroNews(): Promise<News | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select(`
        *,
        categories(name, slug, color),
        cities(name, slug)
      `)
      .eq("is_hero", true)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════
// ÚLTIMAS NOTÍCIAS (Widget lateral)
// ═══════════════════════════════════════════════════════════════

export async function getLatestNews(): Promise<LatestNewsItem[]> {
  if (!isSupabaseConfigured()) {
    return [
      { id: "1", title: "Acidente na BR-290 deixa duas pessoas feridas", category_name: "Trânsito", category_color: "#b02020", emoji: "🚗", gradient_from: "#b02020", gradient_to: "#7a1010", time_ago: "há 18 min" },
      { id: "2", title: "BM apreende cigarros contrabandeados na fronteira", category_name: "Polícia", category_color: "#20208a", emoji: "🚔", gradient_from: "#20208a", gradient_to: "#10106a", time_ago: "há 45 min" },
      { id: "3", title: "Câmara de Itaqui aprova orçamento municipal 2026", category_name: "Política", category_color: "#003250", emoji: "🏛", gradient_from: "#003250", gradient_to: "#00456e", time_ago: "há 1h" },
      { id: "4", title: "Time de Uruguaiana vence final do Regional", category_name: "Esporte", category_color: "#0a6030", emoji: "⚽", gradient_from: "#0a6030", gradient_to: "#084520", time_ago: "há 2h" },
      { id: "5", title: "Safra de soja supera expectativas na Fronteira Oeste", category_name: "Agro", category_color: "#705010", emoji: "🌾", gradient_from: "#705010", gradient_to: "#503808", time_ago: "há 3h" },
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select(`
        id,
        title,
        published_at,
        categories(name, color, slug),
        cities(name, slug)
      `)
      .order("published_at", { ascending: false })
      .limit(5);

    if (error || !data) return [];

    const emojiMap: Record<string, string> = {
      policia: "🚔", transito: "🚗", politica: "🏛",
      esporte: "⚽", agro: "🌾", educacao: "📚",
      regiao: "📍", saude: "🏥", cultura: "🎭", economia: "💰",
    };

    const gradientMap: Record<string, { from: string; to: string }> = {
      policia: { from: "#b02020", to: "#7a1010" },
      transito: { from: "#b02020", to: "#7a1010" },
      politica: { from: "#003250", to: "#00456e" },
      esporte: { from: "#0a6030", to: "#084520" },
      agro: { from: "#705010", to: "#503808" },
      educacao: { from: "#505000", to: "#383800" },
      regiao: { from: "#003250", to: "#005070" },
      saude: { from: "#01a6b1", to: "#018a94" },
      cultura: { from: "#5a1a6a", to: "#3a0a5a" },
      economia: { from: "#6a3a10", to: "#4a2808" },
    };

    return data.map((n) => {
      const category = Array.isArray(n.categories) ? n.categories[0] : n.categories;
      const slug = category?.slug || "geral";
      const gradients = gradientMap[slug] || { from: "#003250", to: "#00456e" };
      return {
        id: n.id,
        title: n.title,
        category_name: category?.name || "Geral",
        category_color: category?.color || "#01a6b1",
        emoji: emojiMap[slug] || "📰",
        gradient_from: gradients.from,
        gradient_to: gradients.to,
        time_ago: formatTimeAgo(n.published_at),
      };
    });
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════
// DESTAQUES
// ═══════════════════════════════════════════════════════════════

export async function getFeaturedNews(): Promise<FeaturedCard[]> {
  if (!isSupabaseConfigured()) {
    return [
      { id: "1", title: "Homem é preso após perseguição policial no centro de Itaqui", excerpt: "Ocorrência foi registrada na noite desta quinta-feira.", category_name: "Polícia", image_url: null, gradient_from: "#8a1010", gradient_to: "#5a0808", icon_path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", time_ago: "há 45 min" },
      { id: "2", title: "Chuvas intensas causam estragos em estradas do interior", excerpt: "Produtores rurais relatam dificuldades de acesso.", category_name: "Região", image_url: null, gradient_from: "#003250", gradient_to: "#005070", icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", time_ago: "há 1h" },
      { id: "3", title: "Escola de São Borja conquista prêmio educacional estadual", excerpt: "Projeto de alunos do ensino médio foi reconhecido pelo Governo do RS.", category_name: "Educação", image_url: null, gradient_from: "#505000", gradient_to: "#383800", icon_path: "M22 10v6M2 10l10-5 10 5-10 5z", time_ago: "há 2h" },
      { id: "4", title: "Safra 2025/26 com as melhores perspectivas da última década", excerpt: "Produtores esperam aumento significativo na produtividade.", category_name: "Agro", image_url: null, gradient_from: "#0a5028", gradient_to: "#063818", icon_path: "M12 22V8M5 12H2a10 10 0 0020 0h-3", time_ago: "há 3h" },
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select(`
        id,
        title,
        excerpt,
        image_url,
        published_at,
        categories(name, slug)
      `)
      .eq("is_featured", true)
      .order("published_at", { ascending: false })
      .limit(4);

    if (error || !data) return [];

    const gradientMap: Record<string, { from: string; to: string }> = {
      policia: { from: "#8a1010", to: "#5a0808" },
      transito: { from: "#8a1010", to: "#5a0808" },
      politica: { from: "#003250", to: "#005070" },
      regiao: { from: "#003250", to: "#005070" },
      esporte: { from: "#0a5028", to: "#063818" },
      agro: { from: "#0a5028", to: "#063818" },
      educacao: { from: "#505000", to: "#383800" },
      saude: { from: "#018a94", to: "#016a74" },
      cultura: { from: "#5a1a6a", to: "#3a0a5a" },
      economia: { from: "#6a3a10", to: "#4a2808" },
    };

    const iconMap: Record<string, string> = {
      policia: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      transito: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      politica: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
      regiao: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
      esporte: "M12 22V8M5 12H2a10 10 0 0020 0h-3",
      agro: "M12 22V8M5 12H2a10 10 0 0020 0h-3",
      educacao: "M22 10v6M2 10l10-5 10 5-10 5z",
      saude: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    };

    return data.map((n) => {
      const category = Array.isArray(n.categories) ? n.categories[0] : n.categories;
      const slug = category?.slug || "geral";
      const gradients = gradientMap[slug] || { from: "#003250", to: "#005070" };
      return {
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        category_name: category?.name || "Geral",
        image_url: n.image_url,
        gradient_from: gradients.from,
        gradient_to: gradients.to,
        icon_path: iconMap[slug] || "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
        time_ago: formatTimeAgo(n.published_at),
      };
    });
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════
// CIDADES
// ═══════════════════════════════════════════════════════════════

export async function getCityCards(): Promise<CityCard[]> {
  if (!isSupabaseConfigured()) {
    return [
      { id: "1", name: "Itaqui", title: "Novo posto de saúde no bairro São João", gradient_from: "#003250", gradient_to: "#004e7a", icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", time_ago: "há 20 min" },
      { id: "2", name: "Maçambará", title: "Festival movimenta o turismo local no inverno", gradient_from: "#014a30", gradient_to: "#026848", icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", time_ago: "há 1h" },
      { id: "3", name: "São Borja", title: "Câmara vota projeto de mobilidade urbana", gradient_from: "#3a0a5a", gradient_to: "#5a1a80", icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", time_ago: "há 2h" },
      { id: "4", name: "Uruguaiana", title: "Porto seco bate recorde de exportações em maio", gradient_from: "#5a2e00", gradient_to: "#804400", icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", time_ago: "há 3h" },
      { id: "5", name: "Alegrete", title: "Novos investimentos em infraestrutura rural", gradient_from: "#00285a", gradient_to: "#003e8a", icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", time_ago: "há 4h" },
      { id: "6", name: "Estado", title: "Governo do RS anuncia obras para a Fronteira", gradient_from: "#4a1000", gradient_to: "#701800", icon_path: "M12 2l3 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z", time_ago: "há 5h" },
      { id: "7", name: "Geral", title: "Brasil sobe no ranking de liberdade de imprensa", gradient_from: "#1e2a36", gradient_to: "#2d3e50", icon_path: "", time_ago: "há 6h" },
    ];
  }

  try {
    const supabase = await createClient();

    // Busca cidades
    const { data: cities } = await supabase
      .from("cities")
      .select("*")
      .order("name");

    if (!cities || cities.length === 0) return [];

    // Busca última notícia de cada cidade
    const cityCards: CityCard[] = [];
    for (const city of cities) {
      const { data: news } = await supabase
        .from("news")
        .select("title, published_at")
        .eq("city_id", city.id)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      cityCards.push({
        id: city.id,
        name: city.name,
        title: news?.title || "Sem notícias recentes",
        gradient_from: city.gradient_from,
        gradient_to: city.gradient_to,
        icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
        time_ago: news ? formatTimeAgo(news.published_at) : "—",
      });
    }

    return cityCards;
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════
// ESPECIALISTAS / COLUNISTAS
// ═══════════════════════════════════════════════════════════════

export async function getSpecialists(): Promise<SpecialistCard[]> {
  if (!isSupabaseConfigured()) {
    return [
      { id: "1", name: "Dr. Marcelo Petrini", initials: "MP", avatar_bg: "#003250", area: "Direito", description: "Direito Previdenciário e Trabalhista" },
      { id: "2", name: "Dra. Ana Costa", initials: "AC", avatar_bg: "#01a6b1", area: "Saúde", description: "Medicina Preventiva e Bem-estar" },
      { id: "3", name: "Roberto Souza", initials: "RS", avatar_bg: "#1a6040", area: "Agronegócio", description: "Mercado de Commodities e Safra" },
      { id: "4", name: "Carla Ferreira", initials: "CF", avatar_bg: "#5a1a6a", area: "Educação", description: "Pedagogia, Família e Desenvolvimento" },
      { id: "5", name: "João Lima", initials: "JL", avatar_bg: "#6a3a10", area: "Economia", description: "Finanças Pessoais e Investimentos" },
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("columnists")
      .select("*")
      .eq("active", true)
      .order("name");

    if (error || !data) return [];

    return data.map((c: Columnist) => ({
      id: c.id,
      name: c.name,
      initials: c.initials,
      avatar_bg: c.avatar_bg,
      area: c.area,
      description: c.description,
    }));
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════
// COLUNAS EM DESTAQUE
// ═══════════════════════════════════════════════════════════════

export async function getFeaturedColumns(): Promise<ColumnCard[]> {
  if (!isSupabaseConfigured()) {
    return [
      { id: "1", columnist_name: "Dr. Marcelo Petrini", columnist_initials: "MP", columnist_bg: "#003250", area: "Direito Previdenciário", title: "O que muda na aposentadoria em 2025" },
      { id: "2", columnist_name: "Roberto Souza", columnist_initials: "RS", columnist_bg: "#1a6040", area: "Agronegócio", title: "Perspectivas da soja para o segundo semestre" },
      { id: "3", columnist_name: "Dra. Ana Costa", columnist_initials: "AC", columnist_bg: "#01a6b1", area: "Saúde", title: "Como se proteger das gripes de inverno" },
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("columns")
      .select(`
        id,
        title,
        columnists(name, initials, avatar_bg, area)
      `)
      .order("published_at", { ascending: false })
      .limit(3);

    if (error || !data) return [];

    return data.map((c) => {
      const columnist = Array.isArray(c.columnists) ? c.columnists[0] : c.columnists;
      return {
        id: c.id,
        columnist_name: columnist?.name || "",
        columnist_initials: columnist?.initials || "",
        columnist_bg: columnist?.avatar_bg || "#003250",
        area: columnist?.area || "",
        title: c.title,
      };
    });
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════
// REDES SOCIAIS
// ═══════════════════════════════════════════════════════════════

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (!isSupabaseConfigured()) {
    return [
      { id: "1", platform: "Facebook", url: "#", icon: "f", bg_color: "#1877F2", followers: 42300, label: "curtidas", created_at: "" },
      { id: "2", platform: "Instagram", url: "#", icon: "✦", bg_color: "#E4405F", followers: 18700, label: "seguidores", created_at: "" },
      { id: "3", platform: "TikTok", url: "#", icon: "♪", bg_color: "#111", followers: 15200, label: "seguidores", created_at: "" },
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("platform");

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════
// WHATSAPP
// ═══════════════════════════════════════════════════════════════

export async function getWhatsAppUrl(): Promise<string> {
  if (!isSupabaseConfigured()) return "#";

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_config")
      .select("value")
      .eq("key", "whatsapp_channel")
      .maybeSingle();

    return data?.value || "#";
  } catch {
    return "#";
  }
}

// ═══════════════════════════════════════════════════════════════
// UTILITÁRIO: formatar tempo relativo
// ═══════════════════════════════════════════════════════════════

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return "agora";
  if (diffMin < 60) return `há ${diffMin} min`;
  if (diffHours < 24) return `há ${diffHours}h`;
  if (diffDays < 7) return `há ${diffDays} dias`;
  return date.toLocaleDateString("pt-BR");
}
