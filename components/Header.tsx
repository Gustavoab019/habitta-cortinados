import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DEFAULT_WHATSAPP_LINK } from "@/lib/whatsapp";

export function Header() {
  const navItems = [
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Modelos", href: "/#modelos" },
    { label: "Simulador", href: "/#simulador" },
    { label: "Motivos", href: "/#motivos" },
    { label: "WhatsApp", href: DEFAULT_WHATSAPP_LINK, external: true }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-200/60 bg-[var(--habitta-cream)] backdrop-blur">
      <div className="container-premium flex items-center justify-between py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/habitta-logo.png" alt="Habitta" width={162} height={41} priority />
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-[var(--habitta-ink)] lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--habitta-emerald)]"
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/#simulador"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--habitta-emerald)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Simular orçamento
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
