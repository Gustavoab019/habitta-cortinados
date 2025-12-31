import Link from "next/link";
import { ClipboardCheck, Map, Ruler, Shield } from "lucide-react";

export function Measurement() {
  return (
    <section id="medicao" className="bg-gradient-to-br from-[var(--habitta-forest)] via-[#1b4a3f] to-[var(--habitta-emerald)] py-14 text-white scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-8 shadow-2xl md:flex-row md:items-center md:gap-10">
          <div className="md:w-1/2">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Medição técnica</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight">
              O vendedor silencioso que evita erros e garante encaixe perfeito.
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              Inclui levantamento de medidas, validação do sistema e observações de obra. Ideal para janelas grandes, pé-direito alto ou
              múltiplas peças no mesmo ambiente.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-200">
              {[
                { label: "Medição e folgas", icon: Ruler },
                { label: "Validação de sistema", icon: Shield },
                { label: "Observações de obra", icon: ClipboardCheck },
                { label: "Área: Grande Lisboa / Sintra", icon: Map }
              ].map(({ label, icon: Icon }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={{ pathname: "/checkout", query: { medicao: "1" } }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Adicionar medição no checkout
              </Link>
              <Link
                href="/configurador"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Simular sem medição
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <p className="uppercase tracking-[0.18em] text-slate-300">Checklist</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Incluído</span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-100">
                <div className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                  <Ruler className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="font-semibold">Medição on-site</p>
                    <p className="text-slate-200">Largura, altura, folgas e checagem de interferências.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                  <Shield className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="font-semibold">Sistema correto</p>
                    <p className="text-slate-200">Validação de calha simples, dupla ou motorizada conforme peso/tecido.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                  <ClipboardCheck className="mt-0.5 h-4 w-4" />
                  <div>
                    <p className="font-semibold">Observações</p>
                    <p className="text-slate-200">Fixação, altura de instalação e apontamentos para produção.</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-300">Medição técnica opcional, mas recomendada para projetos com múltiplas peças.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
