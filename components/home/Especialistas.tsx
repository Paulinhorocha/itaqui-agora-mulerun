import type { SpecialistCard } from "@/lib/types";

// Dados estáticos como fallback
const DEFAULT_ITEMS: SpecialistCard[] = [
  {
    id: "1",
    name: "Dr. Marcelo Petrini",
    initials: "MP",
    avatar_bg: "#003250",
    area: "Direito",
    description: "Direito Previdenciário e Trabalhista",
  },
  {
    id: "2",
    name: "Dra. Ana Costa",
    initials: "AC",
    avatar_bg: "#01a6b1",
    area: "Saúde",
    description: "Medicina Preventiva e Bem-estar",
  },
  {
    id: "3",
    name: "Roberto Souza",
    initials: "RS",
    avatar_bg: "#1a6040",
    area: "Agronegócio",
    description: "Mercado de Commodities e Safra",
  },
  {
    id: "4",
    name: "Carla Ferreira",
    initials: "CF",
    avatar_bg: "#5a1a6a",
    area: "Educação",
    description: "Pedagogia, Família e Desenvolvimento",
  },
  {
    id: "5",
    name: "João Lima",
    initials: "JL",
    avatar_bg: "#6a3a10",
    area: "Economia",
    description: "Finanças Pessoais e Investimentos",
  },
];

interface EspecialistasProps {
  items?: SpecialistCard[];
}

export default function Especialistas({ items }: EspecialistasProps) {
  const data = items && items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-2 pb-6 sm:pb-8 lg:pb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
        <h2 className="text-[11px] sm:text-[13px] font-bold text-azul uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ciano shrink-0" />
          <span className="hidden sm:inline">Especialistas & Colunistas</span>
          <span className="sm:hidden">Colunistas</span>
        </h2>
        <a href="#" className="text-[10px] sm:text-[11.5px] text-ciano font-semibold hover:underline">
          Ver todos ›
        </a>
      </div>

      {/* Grid - 2 col mobile, 3 sm, 4 md, 5 lg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg sm:rounded-[14px] border border-cinza-borda py-3 sm:py-5 px-2 sm:px-3.5 text-center cursor-pointer hover:border-ciano hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(0,50,80,0.07)] transition-all"
          >
            <div
              className="w-14 h-14 sm:w-[70px] sm:h-[70px] rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center text-base sm:text-xl font-extrabold text-white border-2 sm:border-[2.5px] border-ciano shadow-[0_0_0_3px_rgba(1,166,177,0.12)] sm:shadow-[0_0_0_4px_rgba(1,166,177,0.12)]"
              style={{ background: item.avatar_bg }}
            >
              {item.initials}
            </div>
            <div className="text-[11px] sm:text-[13px] font-bold text-azul mb-0.5 truncate">{item.name}</div>
            <div className="text-[8px] sm:text-[9.5px] text-ciano font-bold uppercase tracking-wide mb-1 sm:mb-1.5">
              {item.area}
            </div>
            <div className="text-[10px] sm:text-[11.5px] text-cinza-texto leading-snug line-clamp-2">{item.description}</div>
            <button className="inline-block mt-2 sm:mt-3 bg-ciano-light text-ciano-dark border border-ciano/25 text-[9px] sm:text-[10px] font-bold py-1 sm:py-1.5 px-3 sm:px-4 rounded-full cursor-pointer font-sans hover:bg-ciano hover:text-white transition-colors">
              Ver Colunas
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
