interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="flex flex-wrap items-center gap-4">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;
        return (
          <li key={step} className="flex items-center gap-2 text-sm">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                isActive
                  ? "border-[var(--habitta-emerald)] bg-[var(--habitta-emerald)] text-white"
                  : isComplete
                    ? "border-[var(--habitta-emerald)]/40 bg-[var(--habitta-emerald)]/10 text-[var(--habitta-forest)]"
                    : "border-slate-200"
              }`}
            >
              {index + 1}
            </span>
            <span className={isActive ? "font-semibold text-[var(--habitta-forest)]" : "text-slate-600"}>{step}</span>
            {index < steps.length - 1 ? <span className="text-slate-300">/</span> : null}
          </li>
        );
      })}
    </ol>
  );
}
