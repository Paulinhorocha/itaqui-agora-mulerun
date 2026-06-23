"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface City {
  id: string;
  name: string;
  slug: string;
}

interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category_id: string;
  city_id: string;
  is_breaking: boolean;
  is_featured: boolean;
  is_hero: boolean;
}

const emptyForm: NewsFormData = {
  title: "",
  excerpt: "",
  content: "",
  image_url: null,
  category_id: "",
  city_id: "",
  is_breaking: false,
  is_featured: false,
  is_hero: false,
};

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [form, setForm] = useState<NewsFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [recentNews, setRecentNews] = useState<Array<{ id: string; title: string; published_at: string }>>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();

    const { data: cats } = await supabase.from("categories").select("*").order("name");
    if (cats) setCategories(cats);

    const { data: cits } = await supabase.from("cities").select("*").order("name");
    if (cits) setCities(cits);

    const { data: news } = await supabase
      .from("news")
      .select("id, title, published_at")
      .order("published_at", { ascending: false })
      .limit(10);
    if (news) setRecentNews(news);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const supabase = createClient();

      if (form.is_hero) {
        await supabase.from("news").update({ is_hero: false }).neq("is_hero", false);
      }

      const { error } = await supabase.from("news").insert({
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        image_url: form.image_url,
        category_id: form.category_id || null,
        city_id: form.city_id || null,
        is_breaking: form.is_breaking,
        is_featured: form.is_featured,
        is_hero: form.is_hero,
      });

      if (error) throw error;

      setMessage("Notícia publicada com sucesso!");
      setForm(emptyForm);
      loadData();
    } catch (error) {
      console.error(error);
      setMessage("Erro ao publicar notícia");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm">
          <Link href="/" className="text-ciano hover:underline">Início</Link>
          <span className="text-cinza-texto">/</span>
          <span className="text-texto font-semibold">Admin</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-azul">Painel Administrativo</h1>
        <p className="text-sm text-cinza-texto mt-1">Adicione e gerencie notícias do portal</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-cinza-borda p-6 space-y-5">
            <h2 className="text-lg font-bold text-azul mb-4">Nova Notícia</h2>

            <div>
              <label className="block text-sm font-semibold text-texto mb-1.5">Título *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-cinza-borda rounded-lg focus:outline-none focus:border-ciano transition-colors"
                placeholder="Título da notícia"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-texto mb-1.5">Resumo *</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                required
                rows={2}
                className="w-full px-4 py-2.5 border border-cinza-borda rounded-lg focus:outline-none focus:border-ciano transition-colors resize-none"
                placeholder="Resumo curto que aparece nos cards"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-texto mb-1.5">Conteúdo *</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                rows={8}
                className="w-full px-4 py-2.5 border border-cinza-borda rounded-lg focus:outline-none focus:border-ciano transition-colors resize-none font-mono text-sm"
                placeholder="Conteúdo completo em HTML (use <p> para parágrafos)"
              />
              <p className="text-xs text-cinza-texto mt-1">Use tags HTML: &lt;p&gt;texto&lt;/p&gt;, &lt;strong&gt;negrito&lt;/strong&gt;, &lt;em&gt;itálico&lt;/em&gt;</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-texto mb-1.5">Imagem</label>
              <ImageUpload
                value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-texto mb-1.5">Categoria</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  className="w-full px-4 py-2.5 border border-cinza-borda rounded-lg focus:outline-none focus:border-ciano transition-colors"
                >
                  <option value="">Selecione...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-texto mb-1.5">Cidade</label>
                <select
                  value={form.city_id}
                  onChange={(e) => setForm({ ...form, city_id: e.target.value })}
                  className="w-full px-4 py-2.5 border border-cinza-borda rounded-lg focus:outline-none focus:border-ciano transition-colors"
                >
                  <option value="">Selecione...</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_breaking}
                  onChange={(e) => setForm({ ...form, is_breaking: e.target.checked })}
                  className="w-4 h-4 rounded border-cinza-borda text-ciano focus:ring-ciano"
                />
                <span className="text-sm font-medium text-texto">Breaking News (aparece no ticker "AGORA")</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded border-cinza-borda text-ciano focus:ring-ciano"
                />
                <span className="text-sm font-medium text-texto">Destaque (aparece na seção "Destaques")</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_hero}
                  onChange={(e) => setForm({ ...form, is_hero: e.target.checked })}
                  className="w-4 h-4 rounded border-cinza-borda text-ciano focus:ring-ciano"
                />
                <span className="text-sm font-medium text-texto">Manchete Principal (aparece no Hero)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-ciano text-white font-bold py-3 px-6 rounded-lg hover:bg-ciano-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Publicando..." : "Publicar Notícia"}
            </button>

            {message && (
              <div className={`p-3 rounded-lg text-sm font-medium ${
                message.includes("sucesso") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-cinza-borda p-5">
            <h3 className="text-sm font-bold text-azul uppercase tracking-wide mb-4">Notícias Recentes</h3>
            {recentNews.length > 0 ? (
              <div className="space-y-3">
                {recentNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/noticia/${news.id}`}
                    className="block p-3 rounded-lg hover:bg-cinza-bg transition-colors"
                  >
                    <div className="text-sm font-semibold text-texto line-clamp-2 mb-1">
                      {news.title}
                    </div>
                    <div className="text-xs text-cinza-texto">
                      {new Date(news.published_at).toLocaleDateString("pt-BR")}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-cinza-texto text-center py-4">Nenhuma notícia ainda</p>
            )}
          </div>

          <div className="bg-ciano-light border border-ciano/20 rounded-xl p-5 mt-4">
            <h3 className="text-sm font-bold text-ciano-dark mb-2">Dicas</h3>
            <ul className="text-xs text-cinza-texto space-y-2">
              <li>• Use imagens de boa qualidade (mínimo 800x600)</li>
              <li>• Escreva títulos claros e objetivos</li>
              <li>• O resumo deve ter 1-2 frases</li>
              <li>• Marque apenas 1 notícia como "Manchete Principal"</li>
              <li>• Breaking News aparece no ticker do topo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}