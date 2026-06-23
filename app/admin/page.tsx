export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-3xl font-bold text-azul">Painel Admin</h1>
      <p className="mt-4 text-cinza-texto">Página de administração em construção.</p>
      <div className="mt-8 p-6 bg-white rounded-xl border border-cinza-borda">
        <p className="text-sm">Acesse o Supabase para gerenciar notícias:</p>
        <a 
          href="https://supabase.com/dashboard/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block mt-3 px-6 py-2 bg-ciano text-white rounded-lg hover:bg-ciano-dark transition-colors"
        >
          Abrir Supabase
        </a>
      </div>
    </div>
  );
}