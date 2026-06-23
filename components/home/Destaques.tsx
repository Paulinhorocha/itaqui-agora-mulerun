import type { FeaturedCard } from "@/lib/types";
import Link from "next/link";

const DEFAULT_ITEMS: FeaturedCard[] = [
  {
    id: "1",
    title: "Homem é preso após perseguição policial no centro de Itaqui",
    excerpt: "Ocorrência foi registrada na noite desta quinta-feira. Suspeito tentou fugir de motocicleta.",
    category_name: "Polícia",
    image_url: null,
    gradient_from: "#8a1010",
    gradient_to: "#5a0808",
    icon_path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    time_ago: "há 45 min",
  },
  {
    id: "2",
    title: "Chuvas intensas causam estragos em estradas do interior",
    excerpt: "Produtores rurais relatam dificuldades de acesso em várias localidades da região.",
    category_name: "Região",
    image_url: null,
    gradient_from: "#003250",
    gradient_to: "#005070",
    icon_path: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
    time_ago: "há 1h",
  },
  {
    id: "3",
    title: "Escola de São Borja conquista prêmio educacional estadual",
    excerpt: "Projeto de alunos do ensino médio foi reconhecido pelo Governo do RS.",
    category_name: "Educação",
    image_url: null,
    gradient_from: "#505000",
    gradient_to: "#383800",
    icon_path: "M22 10v6M2 10l10-5 10 5-10 5z",
    time_ago: "há 2h",
  },
  {
    id: "4",
    title: "Safra 2025/26 com as melhores perspectivas da última década",
    excerpt: "Produtores esperam aumento significativo na produtividade de soja e arroz.",
    category_name: "Agro",
    image_url: null,
    gradient_from: "#0a5028",
    gradient_to: "#063818",
    icon_path: "M12 22V8M5 12H2a10 10 0 0020 0h-3",
    time_ago: "há 3h",
  },
];

interface DestaquesProps {
  items?: FeaturedCard[];
}

export default function Destaques({ items }: DestaquesProps) {
  const data = items && items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-10">
      <div className="flex items-center justify-between mb-4 sm:mb-5 lg:mb-6">
        <h2 className="text-[11px] sm:text-[13px] font-bold text-azul uppercase tracking-wide flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-ciano shrink-0" />
          Destaques
        </h2>
        <Link href="/busca" className="text-[10px] sm:text-[11.5px] text-ciano font-semibold hover:underline">
          Ver todos ›
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/noticia/${item.id}`}
            className="bg-white rounded-lg sm:rounded-xl overflow-hidden border border-cinza-borda cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,50,80,0.09)] transition-all flex flex-col"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${item.gradient_from}, ${item.gradient_to})`,
                }}
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 fill-white opacity-30" viewBox="0 0 24 24">
                    <path d={item.icon_path} />
                  </svg>
                )}
              </div>
              <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-ciano text-azul text-[8px] sm:text-[9px] font-extrabold py-1 px-2 sm:px-2.5 rounded-full uppercase tracking-wide">
                {item.category_name}
              </span>
            </div>

            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h3 className="text-[12px] sm:text-[13px] font-bold text-texto leading-[1.4] mb-1.5 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-[10.5px] sm:text-[11.5px] text-cinza-texto leading-relaxed line-clamp-2 flex-1">
                {item.excerpt}
              </p>
              <div className="text-[9px] sm:text-[10px] text-cinza-texto mt-2 flex items-center gap-1 pt-2 border-t border-cinza-borda/50">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" />
                </svg>
                {item.time_ago}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}