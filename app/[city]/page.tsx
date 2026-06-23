import { notFound } from "next/navigation";

// Cidades disponíveis
const cities = {
  itaqui: { name: "Itaqui", description: "Notícias de Itaqui e região" },
  macambara: { name: "Maçambará", description: "Notícias de Maçambará e região" },
  "sao-borja": { name: "São Borja", description: "Notícias de São Borja e região" },
  uruguaiana: { name: "Uruguaiana", description: "Notícias de Uruguaiana e região" },
  alegrete: { name: "Alegrete", description: "Notícias de Alegrete e região" },
};

// Dados estáticos de fallback
const mockNews = [
  {
    id: "1",
    title: "Prefeito anuncia novo projeto de infraestrutura",
    excerpt: "Investimento de R$ 5 milhões para pavimentação de ruas.",
    category: "Política",
    time: "há 2h",
  },
  {
    id: "2",
    title: "Escola municipal conquista prêmio estadual",
    excerpt: "Projeto de sustentabilidade foi reconhecido pelo governo.",
    category: "Educação",
    time: "há 4h",
  },
  {
    id: "3",
    title: "Campeonato municipal de futebol começa neste fim de semana",
    excerpt: "16 equipes disputam o título regional.",
    category: "Esporte",
    time: "há 6h",
  },
];

interface CityPageProps {
  params: Promise<{ city: string }>;
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const cityData = cities[city as keyof typeof cities];

  if (!cityData) {
    notFound();
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12">
      {/* Header da página */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <a href="/" className="text-ciano text-xs sm:text-sm hover:underline">
            Início
          </a>
          <span className="text-cinza-texto text-xs sm:text-sm">/</span>
          <span className="text-texto text-xs sm:text-sm font-semibold">{cityData.name}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-azul mb-2">
          {cityData.name}
        </h1>
        <p className="text-sm sm:text-base text-cinza-texto">{cityData.description}</p>
      </div>

      {/* Lista de notícias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {mockNews.map((news) => (
          <article
            key={news.id}
            className="bg-white rounded-xl overflow-hidden border border-cinza-borda hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div className="aspect-square bg-gradient-to-br from-azul to-ciano-dark flex items-center justify-center">
              <svg className="w-16 h-16 fill-white opacity-20" viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="p-4">
              <span className="inline-block bg-ciano text-azul text-[9px] font-extrabold py-1 px-2 rounded-full uppercase mb-2">
                {news.category}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-texto mb-2 line-clamp-2">
                {news.title}
              </h2>
              <p className="text-xs sm:text-sm text-cinza-texto line-clamp-2 mb-3">
                {news.excerpt}
              </p>
              <div className="text-[10px] text-cinza-texto flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
                </svg>
                {news.time}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Aviso sobre Supabase */}
      <div className="mt-8 p-4 bg-ciano-light border border-ciano/20 rounded-lg">
        <p className="text-xs sm:text-sm text-ciano-dark">
          <strong>Nota:</strong> Esta página usa dados estáticos de exemplo. Configure o Supabase para ver notícias reais desta cidade.
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(cities).map((city) => ({
    city,
  }));
}
