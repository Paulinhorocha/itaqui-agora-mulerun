"use client";

import { useState } from "react";
import { useBreakingNews } from "@/hooks/useBreakingNews";
import Link from "next/link";

const navItems = [
  { label: "Notícias", href: "/", active: true },
  { label: "Itaqui", href: "/itaqui" },
  { label: "Maçambará", href: "/macambara" },
  { label: "São Borja", href: "/sao-borja" },
  { label: "Uruguaiana", href: "/uruguaiana" },
  { label: "Alegrete", href: "/alegrete" },
  { label: "Estado", href: "/estado" },
  { label: "Geral", href: "/geral" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { news, currentIndex, isAnimating, goToNews } = useBreakingNews(4000);

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      window.location.href = `/busca?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* UTIL BAR */}
      <div className="bg-azul px-4 sm:px-8 lg:px-12 xl:px-16 py-2 flex items-center justify-between gap-3">
        <span className="text-[10px] sm:text-[11.5px] text-white/55 font-normal tracking-wide capitalize truncate min-w-0">
          {today}
        </span>

        {/* Desktop: busca inline */}
        <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-white/8 border border-white/12 rounded-md overflow-hidden focus-within:border-ciano focus-within:bg-white/12 transition-colors shrink-0">
          <input
            type="text"
            placeholder="Buscar notícias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none px-3.5 py-1.5 text-xs text-white placeholder:text-white/40 font-sans w-[180px] lg:w-[220px]"
          />
          <button type="submit" className="bg-transparent border-none border-l border-white/10 px-3 py-1.5 flex items-center text-white/50 hover:text-ciano transition-colors cursor-pointer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>

        {/* Mobile: botão busca + sandwich lado a lado */}
        <div className="flex sm:hidden items-center gap-1 shrink-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Buscar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </div>
      </div>

      {/* HEADER: logo + ad */}
      <div className="bg-white px-4 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-2.5 border-b border-cinza-borda">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[11px] bg-azul flex items-center justify-center shrink-0 relative overflow-hidden">
              <div className="absolute bottom-[-8px] right-[-8px] w-[30px] h-[30px] rounded-full bg-ciano opacity-25" />
              <svg className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="var(--color-ciano)" strokeWidth="1.5" opacity="0.6" />
                <path d="M8.5 12h7M12 8.5v7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black text-azul tracking-[-1px] leading-none">
                Itaqui<span className="text-ciano">Agora</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-cinza-texto font-medium tracking-[1.2px] uppercase mt-0.5">
                Fronteira Oeste em tempo real
              </div>
            </div>
          </Link>

          {/* Ad banner - apenas desktop */}
          <div className="hidden lg:flex flex-1 max-w-[600px] ml-6 h-[62px] rounded-[10px] bg-gradient-to-r from-azul via-[#005a80] to-ciano-dark items-center justify-between px-5 overflow-hidden relative cursor-pointer hover:opacity-95 transition-opacity">
            <div className="absolute right-[-40px] top-[-40px] w-[160px] h-[160px] rounded-full bg-ciano/18" />
            <div className="absolute right-[60px] bottom-[-50px] w-[100px] h-[100px] rounded-full bg-white/5" />
            <div className="relative z-10">
              <div className="text-[9px] font-semibold text-white/50 uppercase tracking-[2px] mb-1">
                Espaço publicitário
              </div>
              <div className="text-[17px] font-black text-white tracking-[-0.5px] leading-none">
                Sua marca em <span className="text-ciano">DESTAQUE</span>
              </div>
              <div className="text-[11px] text-white/55 mt-1">
                Alcance toda a Fronteira Oeste
              </div>
            </div>
            <button className="relative z-10 bg-ciano text-azul text-[11px] font-extrabold py-2.5 px-5 rounded-lg uppercase tracking-wide border-none cursor-pointer font-sans whitespace-nowrap hover:bg-[#02c4d0] transition-colors">
              Anuncie Aqui
            </button>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div className="bg-white border-b border-cinza-borda shadow-[0_1px_0_var(--color-cinza-borda)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between h-11">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item, i) => (
              <div key={i} className="flex items-center">
                {i === 1 && <div className="w-px h-3.5 bg-cinza-borda mx-1 shrink-0" />}
                {i === 6 && <div className="w-px h-3.5 bg-cinza-borda mx-1 shrink-0" />}
                <Link
                  href={item.href}
                  className={`text-[12.5px] font-medium px-3.5 py-3 rounded-md whitespace-nowrap transition-colors flex items-center gap-1 relative ${
                    item.active
                      ? "text-ciano font-semibold"
                      : "text-texto-leve hover:text-ciano hover:bg-ciano-light"
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-ciano rounded-t-sm" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile: sandwich à direita */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto md:hidden p-2 -mr-2 text-texto-leve hover:text-ciano transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-cinza-borda bg-white">
            <div className="px-4 py-2 flex flex-col">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={`px-3 py-3 text-sm font-medium border-b border-cinza-borda last:border-0 ${
                    item.active ? "text-ciano font-semibold" : "text-texto-leve"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BREAKING NEWS TICKER */}
      <div className="bg-ciano px-4 sm:px-8 lg:px-12 xl:px-16 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-4 overflow-hidden">
        <div className="ticker-badge bg-azul text-white text-[9px] sm:text-[10px] font-extrabold py-1 sm:py-1.5 px-2 sm:px-3 rounded-md uppercase tracking-wider whitespace-nowrap shrink-0 flex items-center gap-1 sm:gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" />
          AGORA
        </div>

        <div className="overflow-hidden flex-1 relative h-4 sm:h-5">
          <div
            className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out ${
              isAnimating
                ? "-translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <span className="text-xs sm:text-sm font-semibold text-white truncate">
              {news[currentIndex]}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => goToNews(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-white w-4"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Notícia ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="bg-white h-full sm:h-auto sm:max-w-2xl sm:mx-auto sm:mt-20 sm:rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-azul px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(false)}
                className="text-white/70 hover:text-white transition-colors shrink-0"
                aria-label="Fechar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <form onSubmit={handleSearch} className="flex-1 flex items-center bg-white/10 rounded-lg overflow-hidden focus-within:bg-white/15 transition-colors">
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none px-4 py-2.5 text-sm text-white placeholder:text-white/50 font-sans min-w-0"
                />
                <button type="submit" className="px-4 text-white/70 hover:text-white transition-colors shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="p-6">
              {searchQuery ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-cinza-texto/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-sm text-cinza-texto">
                    Buscando por &quot;<strong className="text-texto">{searchQuery}</strong>&quot;
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-cinza-texto/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-sm text-cinza-texto">Digite para buscar notícias</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}