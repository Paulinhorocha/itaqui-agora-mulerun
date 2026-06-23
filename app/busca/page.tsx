import { createClient } from "@/lib/supabase/server";
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

interface BuscaPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  let results: Array<{
    id: string;
    title: string;
    excerpt: string;
    image_url: string | null;
    published_at: string;
    categories?: { name: string; slug: string } | null;
    cities?: { name: string; slug: string } | null;
  }> = [];

  let totalResults = 0;

  if (query) {
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        const supabase = await createClient();

        const searchTerm = `%${query}%`;

        const { data, count } = await supabase
          .from("news")
          .select("id, title, excerpt, image_url, published_at, categories(name, slug), cities(name, slug)", { count: "exact" })
          .or(`title.ilike.${searchTerm},excerpt.ilike.${searchTerm},content.ilike.${searchTerm}`)
          .order("published_at", { ascending: false })
          .limit(50);

        if (data) {
          results = data;
          totalResults = count || data.length;
        }
      }
    } catch {
      // fallback
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm">
        <Link href="/" className="text-ciano hover:underline">Início</Link>
        <span className="text-cinza-texto">/</span>
        <span className="text-texto font-semibold">Busca</span>
      </div>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-azul mb-2">Resultados da Busca</h1>
        {query && (
          <p className="text-sm sm:text-base text-cinza-texto">
            {totalResults > 0
              ? `${totalResults} resultado${totalResults !== 1 ? "s" : ""} para`
              : "Nenhum resultado para"}{" "}
            <strong className="text-texto">&quot;{query}&quot;</strong>
          </p>
        )}
      </div>

      {/* Resultados */}
      {query ? (
        results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item) => {
              const cat = Array.isArray(item.categories) ? item.categories[0] : item.categories;
              const city = Array.isArray(item.cities) ? item.cities[0] : item.cities;
              return (
                <Link
                  key={item.id}
                  href={`/noticia/${item.id}`}
                  className="bg-white rounded-xl overflow-hidden border border-cinza-borda hover:shadow-lg transition-all flex flex-col sm:flex-row"
                >
                  <div className="sm:w-48 aspect-square sm:aspect-auto bg-gradient-to-br from-azul to-ciano-dark flex items-center justify-center shrink-0">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 fill-white opacity-20" viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                    )}
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {cat && (
                        <span className="inline-block bg-ciano text-azul text-[9px] font-extrabold py-1 px-2 rounded-full uppercase">
                          {cat.name}
                        </span>
                      )}
                      {city && (
                        <span className="text-[10px] text-cinza-texto">{city.name}</span>
                      )}
                    </div>
                    <h2 className="text-sm sm:text-base font-bold text-texto mb-2">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-cinza-texto line-clamp-2 mb-3">
                      {item.excerpt}
                    </p>
                    <div className="text-[10px] text-cinza-texto flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
                      </svg>
                      {formatTimeAgo(item.published_at)}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="w-20 h-20 mx-auto text-cinza-texto/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-base sm:text-lg text-cinza-texto mb-2">
              Nenhum resultado encontrado
            </p>
            <p className="text-xs sm:text-sm text-cinza-texto/70">
              Tente buscar com outros termos
            </p>
          </div>
        )
      ) : (
        <div className="text-center py-16">
          <svg className="w-20 h-20 mx-auto text-cinza-texto/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-base sm:text-lg text-cinza-texto mb-2">
            Digite algo para buscar
          </p>
          <p className="text-xs sm:text-sm text-cinza-texto/70">
            Use a barra de busca no topo da página
          </p>
        </div>
      )}
    </div>
  );
}