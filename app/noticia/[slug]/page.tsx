{ createClient } from "@/lib/supabase/server";
import Link from "next/link";

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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface NoticiaPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  const { slug } = await params;

  let news: {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string | null;
    published_at: string;
    categories?: { name: string; slug: string } | null;
    cities?: { name: string; slug: string } | null;
  } | null = null;

  let relatedNews: Array<{
    id: string;
    title: string;
    excerpt: string;
    image_url: string | null;
    published_at: string;
    categories?: { name: string } | null;
  }> = [];

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await createClient();

      // Busca notícia por ID
      const { data } = await supabase
        .from("news")
        .select("*, categories(name, slug), cities(name, slug)")
        .eq("id", slug)
        .maybeSingle();

      if (data) {
        news = data;

        // Busca notícias relacionadas (mesma categoria ou cidade)
        const { data: related } = await supabase
          .from("news")
          .select("id, title, excerpt, image_url, published_at, categories(name)")
          .neq("id", slug)
          .eq("category_id", data.category_id)
          .order("published_at", { ascending: false })
          .limit(3);

        if (related) relatedNews = related;
      }
    }
  } catch {
    // fallback
  }

  // Fallback estático
  if (!news) {
    news = {
      id: slug,
      title: "Notícia de exemplo",
      excerpt: "Esta é uma notícia de exemplo. Configure o Supabase para ver notícias reais.",
      content: "<p>Esta é uma notícia de exemplo. Configure o Supabase para ver notícias reais.</p><p>Adicione notícias pelo Table Editor do Supabase e elas aparecerão aqui automaticamente.</p>",
      image_url: null,
      published_at: new Date().toISOString(),
      categories: { name: "Geral", slug: "geral" },
      cities: { name: "Itaqui", slug: "itaqui" },
    };
  }

  const cat = Array.isArray(news.categories) ? news.categories[0] : news.categories;
  const city = Array.isArray(news.cities) ? news.cities[0] : news.cities;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm flex-wrap">
        <Link href="/" className="text-ciano hover:underline">Início</Link>
        <span className="text-cinza-texto">/</span>
        {city && (
          <>
            <Link href={`/${city.slug}`} className="text-ciano hover:underline">{city.name}</Link>
            <span className="text-cinza-texto">/</span>
          </>
        )}
        <span className="text-texto font-semibold truncate">{cat?.name || "Notícia"}</span>
      </div>

      {/* Categoria */}
      {cat && (
        <span className="inline-block bg-ciano text-azul text-[10px] sm:text-xs font-extrabold py-1 px-3 rounded-full uppercase mb-3">
          {cat.name}
        </span>
      )}

      {/* Título */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-texto leading-tight mb-3">
        {news.title}
      </h1>

      {/* Excerpt */}
      <p className="text-base sm:text-lg text-cinza-texto leading-relaxed mb-4">
        {news.excerpt}
      </p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-cinza-texto mb-6 pb-6 border-b border-cinza-borda">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
          </svg>
          {formatDate(news.published_at)}
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
          </svg>
          {formatTimeAgo(news.published_at)}
        </div>
      </div>

      {/* Imagem */}
      <div className="aspect-video bg-gradient-to-br from-azul to-ciano-dark rounded-xl overflow-hidden mb-6 flex items-center justify-center">
        {news.image_url ? (
          <img src={news.image_url} alt={news.title} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-24 h-24 fill-white opacity-20" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
        )}
      </div>

      {/* Conteúdo */}
      <div
        className="prose prose-sm sm:prose-base max-w-none text-texto leading-relaxed"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />

      {/* Tags */}
      <div className="mt-8 pt-6 border-t border-cinza-borda">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-texto">Tags:</span>
          {city && (
            <Link href={`/${city.slug}`} className="text-xs bg-cinza-bg text-cinza-texto px-3 py-1 rounded-full hover:bg-ciano hover:text-white transition-colors">
              {city.name}
            </Link>
          )}
          {cat && (
            <Link href={`/busca?q=${cat.slug}`} className="text-xs bg-cinza-bg text-cinza-texto px-3 py-1 rounded-full hover:bg-ciano hover:text-white transition-colors">
              {cat.name}
            </Link>
          )}
        </div>
      </div>

      {/* Compartilhamento */}
      <div className="mt-6 p-4 bg-cinza-bg rounded-xl">
        <p className="text-xs sm:text-sm font-semibold text-texto mb-3">Compartilhe esta notícia:</p>
        <div className="flex gap-2">
          <button className="flex-1 bg-[#1877F2] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
            Facebook
          </button>
          <button className="flex-1 bg-[#25D366] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
            WhatsApp
          </button>
        </div>
      </div>

      {/* Notícias relacionadas */}
      {relatedNews.length > 0 && (
        <div className="mt-10 pt-8 border-t border-cinza-borda">
          <h2 className="text-lg sm:text-xl font-bold text-azul mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ciano shrink-0" />
            Notícias Relacionadas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedNews.map((item) => {
              const relCat = Array.isArray(item.categories) ? item.categories[0] : item.categories;
              return (
                <Link
                  key={item.id}
                  href={`/noticia/${item.id}`}
                  className="bg-white rounded-xl overflow-hidden border border-cinza-borda hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-gradient-to-br from-azul to-ciano-dark flex items-center justify-center relative">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 fill-white opacity-20" viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {relCat && (
                      <span className="absolute top-2 left-2 bg-ciano text-azul text-[8px] font-extrabold py-0.5 px-2 rounded-full uppercase">
                        {relCat.name}
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs sm:text-sm font-bold text-texto line-clamp-2">{item.title}</h3>
                    <div className="text-[10px] text-cinza-texto mt-2">{formatTimeAgo(item.published_at)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data } = await supabase.from("news").select("id").limit(20);
      if (data) return data.map((n) => ({ slug: n.id }));
    }
  } catch {
    // fallback
  }
  return [{ slug: "exemplo-noticia-1" }];
}