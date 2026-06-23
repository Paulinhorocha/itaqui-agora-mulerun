"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { News } from "@/lib/types";

export function useLatestNews(limit = 5) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("news")
          .select(`
            *,
            categories(name, slug, color),
            cities(name, slug)
          `)
          .order("published_at", { ascending: false })
          .limit(limit);

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setNews(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar notícias");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [limit]);

  return { news, loading, error };
}

export function useFeaturedNews(limit = 4) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("news")
          .select(`
            *,
            categories(name, slug, color),
            cities(name, slug)
          `)
          .eq("is_featured", true)
          .order("published_at", { ascending: false })
          .limit(limit);

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setNews(data || []);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar notícias");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [limit]);

  return { news, loading, error };
}

export function useHeroNews() {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from("news")
          .select(`
            *,
            categories(name, slug, color),
            cities(name, slug)
          `)
          .eq("is_hero", true)
          .order("published_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setNews(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar notícia");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return { news, loading, error };
}
