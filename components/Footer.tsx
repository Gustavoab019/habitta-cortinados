export function Footer() {
  return (
    <footer id="contato" className="border-t border-slate-200 bg-[var(--habitta-sand)]">
      <div className="container-premium grid gap-8 py-10 md:grid-cols-4">
        <div className="space-y-2">
          <div className="relative h-12 w-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/habitta-logo.png" alt="Habitta" className="h-12 w-auto" />
          </div>
          <p className="text-sm text-[var(--habitta-ink)]">
            Cortinados e estores sob medida com acompanhamento humano e padrão premium.
          </p>
          <p className="text-xs text-slate-600">Atendimento: Portugal inteiro</p>
          <p className="text-xs text-slate-600">Garantia de ajuste: validamos medidas e sistemas antes de produzir.</p>
        </div>
        <div className="space-y-2 text-sm text-[var(--habitta-ink)]">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Contato</p>
          <p>suporte@habitta.pt</p>
          <p>+351 920 478 466</p>
          <p>WhatsApp: após simular orçamento</p>
          <p className="text-xs text-slate-600">R. Vale Flores Pav. E, 2710-632 Sintra</p>
        </div>
        <div className="space-y-2 text-sm text-[var(--habitta-ink)]">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Social</p>
          <a className="hover:text-[var(--habitta-emerald)]" href="https://www.instagram.com/habitta_cortinados" target="_blank" rel="noreferrer">
            Instagram @habitta_cortinados
          </a>
        </div>
        <div className="space-y-2 text-sm text-[var(--habitta-ink)]">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Confiança</p>
          <p>Sem pagamento imediato: enviamos o orçamento, ajustamos e só então avançamos.</p>
          <p>Suporte técnico para medição e escolha de sistemas.</p>
          <a className="text-xs text-[var(--habitta-emerald)] underline" href="/politica-privacidade">
            Política de Privacidade & Cookies
          </a>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-[var(--habitta-cream)] py-4 text-center text-xs text-slate-500 space-y-2">
        <p>© {new Date().getFullYear()} Habitta. Sob medida, sem erro, acabamento impecável.</p>
        <a
          href={`https://wa.me/351913542470?text=${encodeURIComponent("Olá! Quero um website novo.")}`}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-[var(--habitta-emerald)] hover:text-[var(--habitta-forest)]"
        >
          quero um website
        </a>
      </div>
    </footer>
  );
}
