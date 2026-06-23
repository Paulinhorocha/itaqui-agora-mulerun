export default function HeroNews() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 sm:pt-6 pb-3 sm:pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_295px_220px] gap-4 sm:gap-5 lg:gap-6 items-stretch">
        {/* MAIN HERO */}
        <div className="rounded-xl sm:rounded-[14px] overflow-hidden relative min-h-[220px] sm:min-h-[270px] flex flex-col justify-end cursor-pointer bg-gradient-to-br from-[#001a2c] via-[#003250] to-[#005070]">
          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Placeholder icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-20 h-20 sm:w-[110px] sm:h-[110px] opacity-[0.07] fill-white" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,20,40,0.92)] via-[rgba(0,20,40,0.3)] to-transparent" />
          {/* Content */}
          <div className="relative z-10 p-4 sm:p-6">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-ciano text-azul text-[9px] sm:text-[9.5px] font-extrabold py-1 px-2 sm:px-3 rounded-full uppercase tracking-wide mb-2 sm:mb-3">
              📍 Itaqui
            </div>
            <h1 className="text-lg sm:text-[22px] font-extrabold text-white leading-[1.22] mb-2 tracking-[-0.5px]">
              Prefeito anuncia construção de<br className="hidden sm:block" />
              novo Posto de Saúde no Bairro<br className="hidden sm:block" />
              São João
            </h1>
            <p className="text-[11px] sm:text-[12.5px] text-white/72 leading-relaxed mb-2 sm:mb-3 max-w-[500px] line-clamp-2 sm:line-clamp-none">
              Obra promete atender mais de 8 mil moradores da região oeste da cidade com serviços completos de saúde básica e atendimento especializado.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1 sm:gap-[7px]">
                <span className="w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] rounded-full bg-ciano scale-120" />
                <span className="w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] rounded-full bg-white/30" />
                <span className="w-1.5 h-1.5 sm:w-[7px] sm:h-[7px] rounded-full bg-white/30" />
              </div>
              <span className="text-[10px] sm:text-[11px] text-white/42">Redação · há 20 min</span>
            </div>
          </div>
        </div>

        {/* ÚLTIMAS NOTÍCIAS */}
        <div className="bg-white rounded-xl sm:rounded-[14px] border border-cinza-borda overflow-hidden flex flex-col">
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 border-azul flex justify-between items-center">
            <span className="text-[10px] sm:text-[10.5px] font-extrabold text-azul uppercase tracking-[1.2px]">
              Últimas Notícias
            </span>
            <a href="#" className="text-[10px] sm:text-[11px] text-ciano font-semibold hover:underline">
              Ver todas ›
            </a>
          </div>

          {[
            { emoji: "🚗", bg: "linear-gradient(135deg,#b02020,#7a1010)", cat: "Trânsito", time: "há 18 min", title: "Acidente na BR-290 deixa duas pessoas feridas" },
            { emoji: "🚔", bg: "linear-gradient(135deg,#20208a,#10106a)", cat: "Polícia", time: "há 45 min", title: "BM apreende cigarros contrabandeados na fronteira" },
            { emoji: "🏛", bg: "linear-gradient(135deg,#003250,#00456e)", cat: "Política", time: "há 1h", title: "Câmara de Itaqui aprova orçamento municipal 2026" },
            { emoji: "⚽", bg: "linear-gradient(135deg,#0a6030,#084520)", cat: "Esporte", time: "há 2h", title: "Time de Uruguaiana vence final do Regional" },
            { emoji: "🌾", bg: "linear-gradient(135deg,#705010,#503808)", cat: "Agro", time: "há 3h", title: "Safra de soja supera expectativas na Fronteira Oeste" },
          ].map((item, i) => (
            <div key={i} className="flex gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2 sm:py-2.5 border-b border-cinza-borda last:border-0 cursor-pointer hover:bg-ciano-light transition-colors">
              <div
                className="w-12 h-10 sm:w-[58px] sm:h-[44px] rounded-md shrink-0 flex items-center justify-center text-base sm:text-lg overflow-hidden"
                style={{ background: item.bg }}
              >
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5">
                  <span className="text-[9px] sm:text-[9.5px] font-bold text-ciano uppercase tracking-wide">{item.cat}</span>
                  <span className="text-[9px] sm:text-[9.5px] text-cinza-texto">· {item.time}</span>
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-texto leading-[1.4] line-clamp-2">{item.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* AD SIDEBAR - escondido em mobile, visível em tablet+ */}
        <div className="hidden lg:flex flex-col gap-2 sm:gap-2.5">
          {/* Ad 1 - Blue */}
          <a href="#" className="flex-1 block rounded-xl sm:rounded-[14px] overflow-hidden border border-cinza-borda cursor-pointer hover:opacity-92 hover:-translate-y-0.5 transition-all">
            <div className="h-full bg-gradient-to-br from-azul to-[#004e7a] flex flex-col items-center justify-center gap-2 p-3 sm:p-4 text-center relative overflow-hidden">
              <div className="absolute top-[-30px] right-[-30px] w-[100px] h-[100px] rounded-full bg-ciano/15" />
              <div className="absolute bottom-[-20px] left-[-20px] w-[70px] h-[70px] rounded-full bg-white/4" />
              <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[11px] bg-ciano/18 border-[1.5px] border-ciano/40 flex items-center justify-center relative z-10">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="var(--color-ciano)" strokeWidth="1.5" opacity="0.7" />
                  <path d="M8.5 12h7M12 8.5v7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="text-sm sm:text-[17px] font-black text-white tracking-[-0.5px] relative z-10">
                Itaqui<span className="text-ciano">Agora</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-white/60 relative z-10 leading-tight">
                SEU <strong className="text-ciano text-sm sm:text-[15px] block">ANÚNCIO AQUI!</strong>
              </div>
              <div className="bg-ciano text-azul text-[9px] sm:text-[10px] font-extrabold py-1 sm:py-1.5 px-3 sm:px-4 rounded-full uppercase tracking-wide relative z-10 hover:bg-[#02c4d0] transition-colors">
                Anuncie Conosco
              </div>
            </div>
          </a>

          {/* Ad 2 - Light */}
          <a href="#" className="flex-1 block rounded-xl sm:rounded-[14px] overflow-hidden border border-cinza-borda cursor-pointer hover:opacity-92 hover:-translate-y-0.5 transition-all">
            <div className="h-full bg-gradient-to-br from-[#e8f4f8] to-[#d0eaf2] flex flex-col items-center justify-center gap-2 p-3 sm:p-4 text-center relative overflow-hidden">
              <div className="absolute top-[-25px] right-[-25px] w-[90px] h-[90px] rounded-full bg-ciano/10" />
              <div className="absolute bottom-[-15px] left-[-15px] w-[60px] h-[60px] rounded-full bg-azul/6" />
              <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[11px] bg-azul flex items-center justify-center relative z-10 shadow-[0_4px_14px_rgba(0,50,80,0.18)]">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--color-ciano)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                </svg>
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-ciano-dark uppercase tracking-[1.5px] relative z-10">
                Publicidade
              </div>
              <div className="text-[11px] sm:text-[13px] font-extrabold text-azul leading-tight relative z-10">
                Sua empresa<br />no <span className="text-ciano">topo</span> da<br />Fronteira Oeste
              </div>
              <div className="text-[9px] sm:text-[10.5px] text-cinza-texto leading-snug relative z-10">
                Banners, patrocínio de seção e destaque
              </div>
              <div className="bg-azul text-white text-[9px] sm:text-[10px] font-bold py-1 sm:py-1.5 px-3 sm:px-4 rounded-full relative z-10 shadow-[0_3px_10px_rgba(0,50,80,0.18)] hover:bg-azul-light transition-colors">
                Saiba mais →
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
