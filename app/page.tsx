import {
  getLatestNews,
  getFeaturedNews,
  getCityCards,
  getSpecialists,
  getFeaturedColumns,
  getSocialLinks,
  getWhatsAppUrl,
} from "@/lib/data";
import HeroNews from "@/components/home/HeroNews";
import Destaques from "@/components/home/Destaques";
import Cidades from "@/components/home/Cidades";
import Especialistas from "@/components/home/Especialistas";
import BottomRow from "@/components/home/BottomRow";

export default async function Home() {
  // Busca dados do Supabase (ou usa fallback estático)
  const [latestNews, featuredNews, cityCards, specialists, featuredColumns, socialLinks, whatsappUrl] =
    await Promise.all([
      getLatestNews(),
      getFeaturedNews(),
      getCityCards(),
      getSpecialists(),
      getFeaturedColumns(),
      getSocialLinks(),
      getWhatsAppUrl(),
    ]);

  return (
    <>
      <HeroNews />
      <Destaques items={featuredNews} />
      <Cidades items={cityCards} />
      <Especialistas items={specialists} />
      <BottomRow
        socialLinks={socialLinks}
        featuredColumns={featuredColumns}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}
