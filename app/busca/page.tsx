import { Suspense } from "react";

// Dados estáticos de fallback
const mockResults = [
  {
    id: "1",
    title: "Acidente na BR-290 deixa duas pessoas feridas",
    excerpt: "Vítimas foram socorridas pelo SAMU e levadas ao hospital.",
    category: "Trânsito",
    city: "Itaqui",
    time: "há 1h",
  },
  {
    id: "2",
    title: "Prefeito anuncia investimentos em saúde",
    excerpt: "Novo posto de saúde será construído no bairro São João.",
    category: "Política",
    city: "Itaqui",
    time: "há 3h",
  },
  {
    id: "3",
    title: "Safra de soja supera expectativas na região",
    excerpt: "Produtores relatam aumento de 12% na produtividade.",
    category: "Agro",
    city: "Uruguaiana",
    time: "há 5h",
  },
];

interface BuscaPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-12">
      {/* Header da página */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <a href="/" className="text-ciano text-xs sm:text-sm hover:underline">
            Início
          </a>
          <span className="text-cinza-texto text-xs sm:text-sm">/</span>
          <span className="text-texto text-xs sm:text-sm font-semibold">Busca</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-azul mb-2">
          Resultados da Busca
        </h1>
        {query && (
          <p className="text-sm sm:text-base text-cinza-texto">
            Mostrando resultados para: <strong className="text-texto">"{query}"</strong>
          </p>
        )}
      </div>

      {/* Resultados */}
      <Suspense fallback={<div className="text-center py-12 text-cinza-texto">Carregando...</div>}>
        {query ? (
          <div className="space-y-4">
            {mockResults.map((result) => (
              <article
                key={result.id}
                className="bg-white rounded-xl overflow-hidden border border-cinza-borda hover:shadow-lg transition-all flex flex-col sm:flex-row"
              >
                <div className="sm:w-48 aspect-square sm:aspect-auto bg-gradient-to-br from-azul to-ciano-dark flex items-center justify-center shrink-0">
                  <svg className="w-12 h-12 fill-white opacity-20" viewBox="0 0 24 24">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-ciano text-azul text-[9px] font-extrabold py-1 px-2 rounded-full uppercase">
                      {result.category}
                    </span>
                    <span className="text-[10px] text-cinza-texto">{result.city}</span>
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-texto mb-2">
                    {result.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-cinza-texto line-clamp-2 mb-3">
                    {result.excerpt}
                  </p>
                  <div className="text-[10px] text-cinza-texto flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                      <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
                    </svg>
                    {result.time}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
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
      </Suspense>

      {/* Aviso sobre Supabase */}
      <div className="mt-8 p-4 bg-ciano-light border border-ciano/20 rounded-lg">
        <p className="text-xs sm:text-sm text-ciano-dark">
          <strong>Nota:</strong> Esta página usa dados estáticos de exemplo. Configure o Supabase para ver resultados reais de busca.
        </p>
      </div>
    </div>
  );
}
