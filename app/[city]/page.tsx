import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const citySlugs: Record<string, string> = {
  itaqui: "Itaqui",
  macambara: "Maçambará",
  "sao-borja": "São Borja",
  uruguaiana: "Uruguaiana",
  alegrete: "Alegrete",
  estado: "Estado",
  geral: "Geral",
};

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

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityName = citySlugs[city];

  if (!cityName) {
    notFound();
  }

  let newsList: Array<{
    id: string;
    title: string;
    excerpt: string;
    image_url: string | null;
    published_at: string;
    categories?: { name: string; slug: string }[] | null;
  }> = [];

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = await createClient();

      const { data: cityRow } = await supabase
        .from("cities")
        .select("id")
        .eq("slug", city)
        .maybeSingle();

      if (cityRow) {
        const { data } = await supabase
          .from("news")
          .select("id, title, excerpt, image_url, published_at, categories(name, slug)")
          .eq("city_id", cityRow.id)
          .order("published_at", { ascending: false })
          .limit(12);

        if (data) newsList = data;
      }
    }
  } catch {
    // fallback estático
  }

  if (newsList.length === 0) {
    newsList = [
      {
        id: "fb1",
        title: `${cityName}: novidades em breve`,
        excerpt: "Esta página será preenchida com notícias reais assim que o Supabase for configurado.",
        image_url: null,
        published_at: new Date().toISOString(),
        categories: { name: "Geral", slug: "geral" },
      },
    ];
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12">
      <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm">
        <Link href="/" className="text-ciano hover:underline">Início</Link>
        <span className="text-cinza-texto">/</span>
        <span className="text-texto font-semibold">{cityName}</span>
      </div>

      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-azul mb-2">{cityName}</h1>
        <p className="text-sm sm:text-base text-cinza-texto">
          Últimas notícias de {cityName} e região
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {newsList.map((item) => {
          const cat = Array.isArray(item.categories) ? item.categories[0] : item.categories;
          return (
            <Link
              key={item.id}
              href={`/noticia/${item.id}`}
              className="bg-white rounded-xl overflow-hidden border border-cinza-borda hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="aspect-square bg-gradient-to-br from-azul to-ciano-dark flex items-center justify-center relative">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 fill-white opacity-20" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                )}
                {cat && (
                  <span className="absolute top-3 left-3 bg-ciano text-azul text-[9px] font-extrabold py-1 px-2.5 rounded-full uppercase tracking-wide">
                    {cat.name}
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-sm sm:text-base font-bold text-texto mb-2 line-clamp-2 flex-1">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-cinza-texto line-clamp-2 mb-3">
                  {item.excerpt}
                </p>
                <div className="text-[10px] text-cinza-texto flex items-center gap-1 pt-2 border-t border-cinza-borda/50">
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
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(citySlugs).map((city) => ({ city }));
}