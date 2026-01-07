import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_LINK } from "@/lib/whatsapp";

export function WhatsappCTA() {
  return (
    <section id="whatsapp" className="py-14 scroll-mt-24">
      <div className="container-premium">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--habitta-emerald)]/30 bg-white/90 px-6 py-10 text-center shadow-lg backdrop-blur">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-600">WhatsApp como oferta</p>
        <h2 className="mt-2 text-3xl font-semibold text-[var(--habitta-forest)]">Orçamento rápido, com validação das medidas</h2>
        <p className="mt-3 text-sm text-slate-700">
          Envie uma foto do ambiente e diga as medidas aproximadas. Nós indicamos o melhor tecido e a calha certa para o seu espaço.
        </p>
        <a
          href={DEFAULT_WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
          Pedir orçamento no WhatsApp
        </a>
        <p className="mt-2 text-xs text-slate-600">
          Orçamento sem compromisso. Ajustamos tudo antes de produzir.
        </p>
        </div>
      </div>
    </section>
  );
}
