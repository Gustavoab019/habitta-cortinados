const models = [
  {
    name: "Blackout Total",
    description: "Escuridão real e conforto térmico.",
    image: "/blackout-room.jpg"
  },
  {
    name: "Linho Natural",
    description: "Leve, moderno e sofisticado.",
    image: "/linho-natural.jpg"
  },
  {
    name: "Voil Translúcido",
    description: "Privacidade com luz natural.",
    image: "/habitta-room.jpg"
  },
  {
    name: "Estor de Rolo",
    description: "Prático e minimalista.",
    image: "/estor-wc.jpg"
  },
  {
    name: "Estor Madeira",
    description: "Estética natural, ideal para espaços com textura.",
    image: "/estor-madeira.jpg"
  },
  {
    name: "Blackout",
    description: "Blackout em ondas com acabamento de hotel.",
    image: "/onda-perfeita.jpg"
  }
];

export function Models() {
  return (
    <section id="modelos" className="py-14 scroll-mt-24">
      <div className="container-premium">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-600">Modelos campeões</p>
            <h2 className="text-3xl font-semibold text-[var(--habitta-forest)]">Os 6 preferidos (sem complicar)</h2>
            <p className="text-sm text-slate-700">Vende o resultado, não a ficha técnica.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {models.map((model) => (
            <div
              key={model.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="h-44 w-full bg-cover bg-center transition group-hover:scale-105"
                style={{ backgroundImage: `url(${model.image})` }}
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-[var(--habitta-forest)]">{model.name}</p>
                <p className="text-sm text-slate-700">{model.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href="#simulador"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Escolher modelo
          </a>
        </div>
      </div>
    </section>
  );
}
