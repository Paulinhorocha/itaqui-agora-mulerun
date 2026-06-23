import { notFound } from "next/navigation";

// Dados estáticos de fallback
const mockNews = {
  "exemplo-noticia-1": {
    title: "Prefeito anuncia construção de novo Posto de Saúde no Bairro São João",
    excerpt: "Obra promete atender mais de 8 mil moradores da região oeste da cidade.",
    content: `
      <p>A prefeitura de Itaqui anunciou nesta segunda-feira a construção de um novo Posto de Saúde no bairro São João. A obra, que tem investimento previsto de R$ 2,5 milhões, deve atender mais de 8 mil moradores da região oeste da cidade.</p>
      
      <p>O novo posto contará com consultórios médicos, sala de vacinação, atendimento odontológico e espaço para realização de exames básicos. Segundo a secretaria de saúde, a previsão é que as obras iniciem no próximo mês e sejam concluídas em até 8 meses.</p>
      
      <p>"Esta é uma demanda antiga da população do São João e bairros vizinhos. Com esta nova unidade, vamos descentralizar o atendimento e oferecer saúde de qualidade mais perto de casa", afirmou o prefeito em entrevista coletiva.</p>
      
      <p>O posto funcionará em um terreno de 1.200m² doado pela prefeitura e terá área construída de 450m². A unidade deverá funcionar de segunda a sexta-feira, das 7h às 19h, e aos sábados das 8h às 12h.</p>
    `,
    category: "Política",
    city: "Itaqui",
    author: "Redação",
    publishedAt: "22 de junho de 2025",
    readTime: "3 min",
  },
};

interface NoticiaPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  const { slug } = await params;
  const news = mockNews[slug as keyof typeof mockNews];

  if (!news) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm">
        <a href="/" className="text-ciano hover:underline">
          Início
        </a>
        <span className="text-cinza-texto">/</span>
        <a href={`/${news.city.toLowerCase()}`} className="text-ciano hover:underline">
          {news.city}
        </a>
        <span className="text-cinza-texto">/</span>
        <span className="text-texto font-semibold truncate">{news.category}</span>
      </div>

      {/* Categoria */}
      <span className="inline-block bg-ciano text-azul text-[10px] sm:text-xs font-extrabold py-1 px-3 rounded-full uppercase mb-3">
        {news.category}
      </span>

      {/* Título */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-texto leading-tight mb-3">
        {news.title}
      </h1>

      {/* Excerpt */}
      <p className="text-base sm:text-lg text-cinza-texto leading-relaxed mb-4">
        {news.excerpt}
      </p>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-cinza-texto mb-6 pb-6 border-b border-cinza-borda">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {news.author}
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
          </svg>
          {news.publishedAt}
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {news.readTime} de leitura
        </div>
      </div>

      {/* Imagem de destaque */}
      <div className="aspect-video bg-gradient-to-br from-azul to-ciano-dark rounded-xl overflow-hidden mb-6 flex items-center justify-center">
        <svg className="w-24 h-24 fill-white opacity-20" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
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
          <a href="#" className="text-xs bg-cinza-bg text-cinza-texto px-3 py-1 rounded-full hover:bg-ciano hover:text-white transition-colors">
            {news.city}
          </a>
          <a href="#" className="text-xs bg-cinza-bg text-cinza-texto px-3 py-1 rounded-full hover:bg-ciano hover:text-white transition-colors">
            {news.category}
          </a>
          <a href="#" className="text-xs bg-cinza-bg text-cinza-texto px-3 py-1 rounded-full hover:bg-ciano hover:text-white transition-colors">
            Saúde
          </a>
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
          <button className="flex-1 bg-[#E4405F] text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
            Instagram
          </button>
        </div>
      </div>

      {/* Aviso sobre Supabase */}
      <div className="mt-6 p-4 bg-ciano-light border border-ciano/20 rounded-lg">
        <p className="text-xs sm:text-sm text-ciano-dark">
          <strong>Nota:</strong> Esta página usa dados estáticos de exemplo. Configure o Supabase para ver notícias reais.
        </p>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return Object.keys(mockNews).map((slug) => ({
    slug,
  }));
}
