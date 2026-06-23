import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-azul py-10 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-xl sm:text-[22px] font-black text-white tracking-[-0.8px]">
              Itaqui<span className="text-ciano">Agora</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/50 mt-3 sm:mt-4 leading-relaxed max-w-[270px]">
              Portal de notícias da Fronteira Oeste do Rio Grande do Sul. Cobertura completa de Itaqui, Maçambará, São Borja, Uruguaiana, Alegrete e toda a região.
            </p>
          </div>

          <div>
            <h4 className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-[1.5px] mb-3 sm:mb-4">
              Cidades
            </h4>
            <Link href="/itaqui" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Itaqui</Link>
            <Link href="/macambara" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Maçambará</Link>
            <Link href="/sao-borja" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">São Borja</Link>
            <Link href="/uruguaiana" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Uruguaiana</Link>
            <Link href="/alegrete" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Alegrete</Link>
          </div>

          <div>
            <h4 className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-[1.5px] mb-3 sm:mb-4">
              Editorias
            </h4>
            <Link href="/busca?q=policia" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Polícia</Link>
            <Link href="/busca?q=politica" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Política</Link>
            <Link href="/busca?q=esporte" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Esporte</Link>
            <Link href="/busca?q=agro" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Agro</Link>
            <Link href="/busca?q=cultura" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Cultura</Link>
          </div>

          <div>
            <h4 className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-[1.5px] mb-3 sm:mb-4">
              Portal
            </h4>
            <Link href="/admin" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Admin</Link>
            <Link href="/contato" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Anuncie conosco</Link>
            <Link href="/contato" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Fale conosco</Link>
            <Link href="/privacidade" className="block text-[11px] sm:text-[12.5px] text-white/62 mb-2 sm:mb-2.5 hover:text-ciano transition-colors">Privacidade</Link>
          </div>
        </div>

        <div className="border-t border-white/8 pt-4 sm:pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-[11px] text-white/35">
          <span>© 2025 Itaqui Agora · Todos os direitos reservados</span>
          <span>Desenvolvido para a Fronteira Oeste</span>
        </div>
      </div>
    </footer>
  );
}