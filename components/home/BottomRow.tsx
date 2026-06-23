import type { SocialLink, ColumnCard } from "@/lib/types";

// Dados estáticos como fallback
const DEFAULT_SOCIAL: SocialLink[] = [
  { id: "1", platform: "Facebook", url: "#", icon: "f", bg_color: "#1877F2", followers: 42300, label: "curtidas", created_at: "" },
  { id: "2", platform: "Instagram", url: "#", icon: "✦", bg_color: "#E4405F", followers: 18700, label: "seguidores", created_at: "" },
  { id: "3", platform: "TikTok", url: "#", icon: "♪", bg_color: "#111", followers: 15200, label: "seguidores", created_at: "" },
];

const DEFAULT_COLUMNS: ColumnCard[] = [
  { id: "1", columnist_name: "Dr. Marcelo Petrini", columnist_initials: "MP", columnist_bg: "#003250", area: "Direito Previdenciário", title: "O que muda na aposentadoria em 2025" },
  { id: "2", columnist_name: "Roberto Souza", columnist_initials: "RS", columnist_bg: "#1a6040", area: "Agronegócio", title: "Perspectivas da soja para o segundo semestre" },
  { id: "3", columnist_name: "Dra. Ana Costa", columnist_initials: "AC", columnist_bg: "#01a6b1", area: "Saúde", title: "Como se proteger das gripes de inverno" },
];

function formatFollowers(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "K";
  }
  return num.toString();
}

interface BottomRowProps {
  socialLinks?: SocialLink[];
  featuredColumns?: ColumnCard[];
  whatsappUrl?: string;
}

export default function BottomRow({
  socialLinks,
  featuredColumns,
  whatsappUrl,
}: BottomRowProps) {
  const social = socialLinks && socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIAL;
  const columns = featuredColumns && featuredColumns.length > 0 ? featuredColumns : DEFAULT_COLUMNS;
  const whatsapp = whatsappUrl || "#";

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-10 lg:pb-12">
      {/* Grid - 1 col mobile, 2 md, 3 lg */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_260px] gap-4 sm:gap-5 lg:gap-6">
        {/* SOCIAL MEDIA */}
        <div className="bg-white rounded-xl sm:rounded-[14px] border border-cinza-borda overflow-hidden">
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-azul flex justify-between items-center">
            <span className="text-[10px] sm:text-[10.5px] font-extrabold text-azul uppercase tracking-[1.2px]">
              Siga o Itaqui Agora
            </span>
          </div>

          {social.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-cinza-borda last:border-0 hover:bg-cinza-card transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-[9px] flex items-center justify-center text-[11px] sm:text-xs font-extrabold text-white shrink-0"
                  style={{ background: item.bg_color }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-[12px] sm:text-[13px] font-semibold text-texto">{item.platform}</div>
                  <div className="text-[9px] sm:text-[10px] text-cinza-texto">{item.label}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm sm:text-base font-extrabold text-azul">{formatFollowers(item.followers)}</div>
                <div className="text-[9px] sm:text-[10.5px] text-ciano font-semibold whitespace-nowrap">Seguir</div>
              </div>
            </a>
          ))}
        </div>

        {/* COLUNAS EM DESTAQUE */}
        <div className="bg-white rounded-xl sm:rounded-[14px] border border-cinza-borda overflow-hidden">
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-azul flex justify-between items-center">
            <span className="text-[10px] sm:text-[10.5px] font-extrabold text-azul uppercase tracking-[1.2px]">
              Colunas em Destaque
            </span>
            <a href="#" className="text-[10px] sm:text-[11px] text-ciano font-semibold hover:underline">
              Ver todas ›
            </a>
          </div>

          {columns.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-cinza-borda last:border-0 hover:bg-cinza-card transition-colors cursor-pointer"
            >
              <div
                className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-full shrink-0 flex items-center justify-center text-[11px] sm:text-[13px] font-extrabold text-white border-2 border-ciano/30"
                style={{ background: item.columnist_bg }}
              >
                {item.columnist_initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-[12.5px] font-bold text-azul truncate">{item.columnist_name}</div>
                <div className="text-[9px] sm:text-[10px] font-semibold text-ciano uppercase tracking-wide">{item.area}</div>
                <div className="text-[10px] sm:text-[11px] text-cinza-texto mt-0.5 leading-snug line-clamp-1">{item.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* WHATSAPP */}
        <div className="bg-azul rounded-xl sm:rounded-[14px] py-5 sm:py-6 px-4 sm:px-5 text-center text-white flex flex-col items-center gap-3 sm:gap-3.5">
          <div className="w-12 h-12 sm:w-[58px] sm:h-[58px] rounded-full bg-[#25D366] flex items-center justify-center text-xl sm:text-[28px] shadow-[0_6px_20px_rgba(37,211,102,0.35)]">
            💬
          </div>
          <div className="text-base sm:text-[17px] font-extrabold">Receba Notícias</div>
          <div className="text-[11px] sm:text-xs text-white/65 leading-relaxed">
            Entre no canal do WhatsApp e receba as principais notícias da Fronteira Oeste em primeira mão.
          </div>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white border-none py-2.5 sm:py-3 px-0 rounded-lg text-[12px] sm:text-[13px] font-bold cursor-pointer w-full text-center block hover:bg-[#1db954] transition-colors"
          >
            Entrar no Canal
          </a>
        </div>
      </div>
    </section>
  );
}
