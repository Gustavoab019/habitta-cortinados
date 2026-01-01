'use client';

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Palette, Ruler, Sofa, Workflow } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Stepper } from "@/components/Stepper";

const steps = ["Produto", "Tecido", "Calha", "Medidas"];

const productOptions = [
  { value: "curtain_wave", label: "Ondas" },
  { value: "curtain_pleats", label: "Pregas" },
  { value: "pillow", label: "Almofada" },
  { value: "blind", label: "Estore" }
] as const;

export default function ConfiguradorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selection, setSelection] = useState<Record<string, string>>({});

  const currentTitle = useMemo(() => steps[currentStep], [currentStep]);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex min-h-screen flex-col bg-[var(--habitta-cream)]">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-600">Configuração</p>
            <h1 className="text-2xl font-semibold text-[var(--habitta-forest)]">Monte seu cortinado</h1>
          </div>
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3 text-[var(--habitta-forest)]">
            {currentStep === 0 && <Workflow className="h-5 w-5" />}
            {currentStep === 1 && <Palette className="h-5 w-5" />}
            {currentStep === 2 && <Sofa className="h-5 w-5" />}
            {currentStep === 3 && <Ruler className="h-5 w-5" />}
            <h2 className="text-xl font-semibold">{currentTitle}</h2>
          </div>

          {currentStep === 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {productOptions.map((option) => {
                const isSelected = selection.product === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelection((prev) => ({ ...prev, product: option.value }))}
                    className={`rounded-xl border px-4 py-3 text-left transition ${
                      isSelected
                        ? "border-[var(--habitta-emerald)] bg-[var(--habitta-emerald)] text-white"
                        : "border-slate-200 hover:border-[var(--habitta-emerald)]/50"
                    }`}
                  >
                    <div className="text-sm font-semibold">{option.label}</div>
                    <p className={`text-xs ${isSelected ? "text-slate-100" : "text-slate-600"}`}>Cortina sob medida</p>
                  </button>
                );
              })}
            </div>
          ) : null}

          {currentStep === 1 ? (
            <div className="mt-4 rounded-lg border border-dashed border-[var(--habitta-emerald)]/30 p-6 text-sm text-slate-700">
              Catálogo de tecidos ficará aqui. Integração via /api/catalog.
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="mt-4 rounded-lg border border-dashed border-[var(--habitta-emerald)]/30 p-6 text-sm text-slate-700">
              Escolha de calhas ficará aqui. Integração via /api/catalog.
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                Largura (cm)
                <input
                  type="number"
                  min={0}
                  value={selection.width ?? ""}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  placeholder="250"
                  onChange={(event) => setSelection((prev) => ({ ...prev, width: event.target.value }))}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-800">
                Altura (cm)
                <input
                  type="number"
                  min={0}
                  value={selection.height ?? ""}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[var(--habitta-emerald)] focus:outline-none"
                  placeholder="270"
                  onChange={(event) => setSelection((prev) => ({ ...prev, height: event.target.value }))}
                />
              </label>
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-[var(--habitta-forest)] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Seleção atual:</span>
              <code className="rounded bg-slate-100 px-2 py-1 text-xs">{JSON.stringify(selection)}</code>
            </div>
            <button
              type="button"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
            >
              Avançar
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
