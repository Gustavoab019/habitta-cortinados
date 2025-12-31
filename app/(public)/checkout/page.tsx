'use client';

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Ruler } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface CheckoutFormState {
  name: string;
  email: string;
  phone: string;
  line1: string;
  city: string;
  postalCode: string;
  needsMeasurement: boolean;
  notes: string;
}

const initialState: CheckoutFormState = {
  name: "",
  email: "",
  phone: "",
  line1: "",
  city: "",
  postalCode: "",
  needsMeasurement: true,
  notes: ""
};

export default function CheckoutPage() {
  const [form, setForm] = useState<CheckoutFormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const measurementFee = useMemo(() => Number(process.env.NEXT_PUBLIC_MEASUREMENT_FEE ?? 25), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--habitta-cream)]">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-10">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-600">Checkout</p>
          <h1 className="text-2xl font-semibold text-[var(--habitta-forest)]">Finalize o pedido</h1>
          <p className="text-sm text-slate-700">
            Capture dados do cliente e endereço. A integração com /api/orders será conectada ao catálogo e ao configurador.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
            <h2 className="text-lg font-semibold text-[var(--habitta-forest)]">Dados do cliente</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                Nome
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 focus-within:border-[var(--habitta-emerald)]">
                  <CheckCircle2 className="h-4 w-4 text-slate-400" />
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm outline-none"
                    placeholder="Cliente Habitta"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                Email
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 focus-within:border-[var(--habitta-emerald)]">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm outline-none"
                    placeholder="email@cliente.pt"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                Telefone
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 focus-within:border-[var(--habitta-emerald)]">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <input
                    required
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm outline-none"
                    placeholder="+351 ..."
                  />
                </div>
              </label>
            </div>

            <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Endereço de instalação</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800 md:col-span-2">
                Morada
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 focus-within:border-[var(--habitta-emerald)]">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <input
                    required
                    value={form.line1}
                    onChange={(event) => setForm((prev) => ({ ...prev, line1: event.target.value }))}
                    className="w-full border-none bg-transparent text-sm outline-none"
                    placeholder="Rua e nº"
                  />
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                Cidade
                <input
                  required
                  value={form.city}
                  onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  placeholder="Lisboa"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                Código Postal
                <input
                  required
                  value={form.postalCode}
                  onChange={(event) => setForm((prev) => ({ ...prev, postalCode: event.target.value }))}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  placeholder="0000-000"
                />
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-[var(--habitta-emerald)]/30 bg-[var(--habitta-emerald)]/5 p-4">
              <label className="flex items-center gap-3 text-sm font-medium text-[var(--habitta-forest)]">
                <input
                  type="checkbox"
                  checked={form.needsMeasurement}
                  onChange={(event) => setForm((prev) => ({ ...prev, needsMeasurement: event.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                Adicionar Medição Técnica (cobra sinal no ato)
              </label>
              <p className="mt-2 text-sm text-slate-700">
                Valor da medição: €{measurementFee}. O restante será calculado após aprovação de orçamento.
              </p>
            </div>

            <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-slate-800">
              Observações
              <textarea
                value={form.notes}
                onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
                rows={3}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                placeholder="Disponibilidade para medição, preferências, etc."
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Continuar para pagamento do sinal
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Resumo</h3>
              <div className="mt-3 space-y-2 text-sm text-[var(--habitta-ink)]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>€0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Medição Técnica
                  </span>
                  <span>{form.needsMeasurement ? `€${measurementFee}` : "—"}</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-[var(--habitta-forest)]">
                  <span>Total agora</span>
                  <span>{form.needsMeasurement ? `€${measurementFee}` : "€0"}</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-600">
                Integração com /api/orders enviará os itens e medidas do configurador assim que disponíveis.
              </p>
            </div>
            {submitted ? (
              <div className="rounded-xl border border-[var(--habitta-emerald)]/40 bg-[var(--habitta-emerald)]/10 p-4 text-sm text-[var(--habitta-forest)]">
                Dados coletados. Conecte este formulário ao endpoint /api/orders quando a configuração de produto estiver pronta.
              </div>
            ) : null}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
