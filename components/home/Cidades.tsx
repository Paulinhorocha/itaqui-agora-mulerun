import type { CityCard } from "@/lib/types";

// Dados estáticos como fallback
const DEFAULT_ITEMS: CityCard[] = [
  {
    id: "1",
    name: "Itaqui",
    title: "Novo posto de saúde no bairro São João",
    gradient_from: "#003250",
    gradient_to: "#004e7a",
    icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    time_ago: "há 20 min",
  },
  {
    id: "2",
    name: "Maçambará",
    title: "Festival movimenta o turismo local no inverno",
    gradient_from: "#014a30",
    gradient_to: "#026848",
    icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    time_ago: "há 1h",
  },
  {
    id: "3",
    name: "São Borja",
    title: "Câmara vota projeto de mobilidade urbana",
    gradient_from: "#3a0a5a",
    gradient_to: "#5a1a80",
    icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    time_ago: "há 2h",
  },
  {
    id: "4",
    name: "Uruguaiana",
    title: "Porto seco bate recorde de exportações em maio",
    gradient_from: "#5a2e00",
    gradient_to: "#804400",
    icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    time_ago: "há 3h",
  },
  {
    id: "5",
    name: "Alegrete",
    title: "Novos investimentos em infraestrutura rural",
    gradient_from: "#00285a",
    gradient_to: "#003e8a",
    icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    time_ago: "há 4h",
  },
  {
    id: "6",
    name: "Estado",
    title: "Governo do RS anuncia obras para a Fronteira",
    gradient_from: "#4a1000",
    gradient_to: "#701800",
    icon_path: "M12 2l3 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
    time_ago: "há 5h",
  },
  {
    id: "7",
    name: "Geral",
    title: "Brasil sobe no ranking de liberdade de imprensa",
    gradient_from: "#1e2a36",
    gradient_to: "#2d3e50",
    icon_path: "",
    time_ago: "há 6h",
  },
];

interface CidadesProps {
  items?: CityCard[];
}

export default function Cidades({ items }: CidadesProps) {
  const data = items && items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-6 sm:pb-8 lg:pb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
        <h2 className="text-[11px] sm:text-[13px] font-bold text-azul uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ciano shrink-0" />
          Cidades da Fronteira Oeste
        </h2>
      </div>

      {/* Grid - cards com mesma altura */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 lg:gap-5">
        {data.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-lg sm:rounded-xl overflow-hidden border border-cinza-borda cursor-pointer hover:border-ciano hover:-translate-y-1 hover:shadow-[0_6px_18px_rgba(0,50,80,0.08)] transition-all flex flex-col"
          >
            {/* Imagem quadrada */}
            <div className="relative aspect-square w-full overflow-hidden">
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(145deg, ${item.gradient_from} 0%, ${item.gradient_to} 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,20,40,0.65)] to-transparent" />
                {item.icon_path && (
                  <svg className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 fill-white opacity-25" viewBox="0 0 24 24">
                    <path d={item.icon_path} />
                  </svg>
                )}
              </div>
              <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-[9px] sm:text-[10px] font-extrabold text-white uppercase tracking-wide z-10 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]">
                {item.name}
              </span>
            </div>

            {/* Conteúdo abaixo da imagem */}
            <div className="p-2 sm:p-3 flex flex-col flex-1">
              <h3 className="text-[10px] sm:text-[11px] font-semibold text-texto leading-[1.35] sm:leading-[1.42] line-clamp-2 flex-1">
                {item.title}
              </h3>
              <div className="text-[9px] sm:text-[10px] text-cinza-texto mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-cinza-borda/50 flex items-center gap-1">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
                </svg>
                {item.time_ago}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
