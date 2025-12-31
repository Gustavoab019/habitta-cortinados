const placeholders = [
  "/habitta-room.jpg",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1000&q=80"
];

export function Portfolio() {
  return (
    <section id="projetos" className="py-14 scroll-mt-24">
      <div className="container-premium">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Projetos</p>
            <h2 className="text-3xl font-semibold text-slate-900">Portfólio (em breve)</h2>
            <p className="text-sm text-slate-600">Seleção de projetos reais Habitta para inspirar seu espaço.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {placeholders.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.2),transparent_55%)]" />
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(18,51,44,0.7)] text-center text-sm font-semibold uppercase tracking-[0.18em] text-white opacity-0 transition group-hover:opacity-100">
                Em breve: projetos reais Habitta
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
