import Link from "next/link";
import { ArrowRight, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { DEFAULT_WHATSAPP_LINK } from "@/lib/whatsapp";

export function Hero() {
  const chips = ["Ajuda na medição", "Produção sob medida", "Acompanhamento humano pelo WhatsApp"];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--habitta-forest)] via-[#1b4a3f] to-[var(--habitta-emerald)] text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
      </div>
      <div className="relative container-premium flex min-h-[60vh] flex-col gap-10 py-14 md:min-h-[70vh] md:flex-row md:items-center md:gap-14">
        <div className="space-y-6 md:w-3/5">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
            <ShieldCheck className="h-4 w-4" />
            Sob medida. Sem erro. Acabamento impecável.
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Cortinados e Estores por Medida, do Seu Jeito.</h1>
            <p className="text-lg text-slate-200">
              Diga o tipo, a cidade e as medidas aproximadas. Você recebe a faixa de preço no WhatsApp em minutos.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={{ pathname: "/", hash: "simulador" }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--habitta-forest)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Receber faixa de preço no WhatsApp
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={DEFAULT_WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Falar no WhatsApp agora
              <Ruler className="h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100 backdrop-blur"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400">*Instalação sob consulta nas zonas de serviço.</p>
        </div>
        <div className="relative md:w-2/5">
          <div className="absolute -inset-4 rounded-[32px] bg-white/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/20 via-white/10 to-white/10 p-0 shadow-2xl backdrop-blur">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: "url('/habitta-room.jpg'), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
            <div className="relative p-6">
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <Sparkles className="h-5 w-5 text-white" />
              <span>Preview premium</span>
            </div>
            <div className="mt-4 aspect-[4/5] overflow-hidden rounded-2xl border border-white/20 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_40%)]">
              <div className="flex h-full flex-col justify-end bg-[linear-gradient(155deg,rgba(13,38,32,0.45),rgba(5,17,15,0.1))] p-5">
                <div className="space-y-2 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-200">Habitta</p>
                  <h3 className="text-xl font-semibold">Linho grafite + calha minimal</h3>
                  <p className="text-sm text-slate-100">
                    Produção sob medida, opção de medição técnica e montagem precisa. Pensado para residências e alojamentos que precisam de
                    consistência.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-200">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Tecido</p>
                <p className="font-semibold">Dimout / Sheer</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Sistema</p>
                <p className="font-semibold">Simples / Dupla</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">Suporte</p>
                <p className="font-semibold">Medição técnica</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
