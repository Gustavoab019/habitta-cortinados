import { Bed, Blend, Waves } from "lucide-react";

const services = [
  {
    title: "Cortinados por medida",
    description: "Wave ou pregas, forrados ou não, alinhados ao estilo do espaço. Acabamento de hotel.",
    tag: "Principal",
    icon: Waves
  },
  {
    title: "Calhas e sistemas",
    description: "Simples, duplas, discretas ou motorizadas sob consulta. Seleção premium pronta para instalar.",
    tag: "Sistemas",
    icon: Blend
  },
  {
    title: "Almofadas decorativas",
    description: "Combine tecidos do cortinado para almofadas sob medida e coerência visual.",
    tag: "Complemento",
    icon: Bed
  },
  {
    title: "Estores (em breve)",
    description: "Linha de estores enroláveis e screen. Integração com o mesmo atendimento premium.",
    tag: "Em breve",
    icon: Bed
  }
];

export function Services() {
  return (
    <section id="produtos" className="py-14 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-600">O que fazemos</p>
            <h2 className="text-3xl font-semibold text-[var(--habitta-forest)]">Serviço completo, com visual premium</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map(({ title, description, tag, icon: Icon }) => (
            <div
              key={title}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-transparent opacity-0 transition hover:opacity-100" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--habitta-emerald)] text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{tag}</p>
                    <h3 className="text-lg font-semibold text-[var(--habitta-ink)]">{title}</h3>
                  </div>
                </div>
              </div>
              <p className="relative mt-3 text-sm text-slate-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
