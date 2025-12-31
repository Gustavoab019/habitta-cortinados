import { ClipboardList, Ruler, Truck } from "lucide-react";

const steps = [
  {
    title: "Escolha o estilo",
    description: "Selecione o tecido ou envie uma foto de referência. Ajudamos a acertar o visual.",
    icon: ClipboardList
  },
  {
    title: "Diga as medidas (ou peça ajuda)",
    description: "Pode colocar valores aproximados. Validamos tudo com você antes de confeccionar.",
    icon: Ruler
  },
  {
    title: "Receba o orçamento no WhatsApp",
    description: "Ajustamos juntos até ficar perfeito. Sem compromisso.",
    icon: Truck
  }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-slate-50 py-14 scroll-mt-24">
      <div className="container-premium">
        <div className="flex items-center gap-3 text-[var(--habitta-forest)]">
          <span className="h-10 w-10 rounded-2xl bg-[var(--habitta-emerald)]/15" />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-600">Como funciona</p>
            <h2 className="text-3xl font-semibold">3 passos para um cortinado perfeito</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--habitta-emerald)] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--habitta-ink)]">{title}</h3>
              </div>
              <p className="relative mt-3 text-sm text-slate-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
