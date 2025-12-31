import { HandHeart, Layers, ShieldCheck, Sparkles, Users, Wrench } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Produção sob medida", description: "Sem peças prontas. Cada cortinado segue suas medidas e briefing." },
  { icon: HandHeart, title: "Acompanhamento humano", description: "Nada de robô: falamos pelo WhatsApp para acertar cada detalhe." },
  { icon: Wrench, title: "Ajustes antes de confeccionar", description: "Validamos medidas, tecido e sistema antes de produzir." },
  { icon: Sparkles, title: "Acabamento profissional", description: "Padrão consistente, ideal para casas e alojamentos." },
  { icon: Layers, title: "Tecidos e sistemas curados", description: "Seleção premium para cortinados e estores." },
  { icon: Users, title: "Experiência real no segmento", description: "Foco em projetos com múltiplas peças e zero erro." }
];

export function Reasons() {
  return (
    <section id="motivos" className="py-14 scroll-mt-24 bg-slate-50">
      <div className="container-premium">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-600">Por que falar com a gente</p>
          <h2 className="text-3xl font-semibold text-[var(--habitta-forest)]">Confiança para não errar</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--habitta-emerald)] text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-[var(--habitta-forest)]">{title}</p>
              </div>
              <p className="mt-2 text-sm text-slate-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
