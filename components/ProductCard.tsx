import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
  icon?: ReactNode;
}

export function ProductCard({ title, description, href, actionLabel = "Explorar", icon }: ProductCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--habitta-emerald)] text-white">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--habitta-forest)]">{title}</h3>
          <p className="mt-1 text-sm text-slate-700">{description}</p>
        </div>
      </div>
      {href ? (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--habitta-emerald)] hover:text-[var(--habitta-forest)]"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
