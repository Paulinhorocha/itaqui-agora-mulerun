"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const FALLBACK_NEWS = [
  "Acidente na BR-290 deixa duas pessoas feridas entre Itaqui e Uruguaiana",
  "BM apreende carga de cigarros contrabandeados na fronteira",
  "Prefeito anuncia novo posto de saúde no bairro São João",
  "Câmara de Itaqui aprova orçamento municipal para 2026",
  "Time de Uruguaiana vence final do Regional de Futebol",
];

export function useBreakingNews(intervalMs = 4000) {
  const [news, setNews] = useState<string[]>(FALLBACK_NEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Busca notícias do Supabase
  useEffect(() => {
    async function fetchBreakingNews() {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("news")
          .select("title")
          .eq("is_breaking", true)
          .order("published_at", { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          setNews(data.map((n) => n.title));
        }
      } catch {
        // Usa fallback
      } finally {
        setLoading(false);
      }
    }

    fetchBreakingNews();
  }, []);

  // Auto-play do ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
        setIsAnimating(false);
      }, 500);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [news.length, intervalMs]);

  const goToNews = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 500);
    },
    [currentIndex]
  );

  return {
    news,
    currentIndex,
    isAnimating,
    loading,
    goToNews,
  };
}
