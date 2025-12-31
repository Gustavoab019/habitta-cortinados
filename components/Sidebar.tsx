import Link from "next/link";
import type { Route } from "next";
import type { LucideIcon } from "lucide-react";
import { ClipboardList, Home } from "lucide-react";

interface SidebarProps {
  activePath?: string;
}

export function Sidebar({ activePath }: SidebarProps) {
  const items = [
    { href: "/", label: "Início", icon: Home },
    { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardList }
  ] satisfies Array<{ href: Route; label: string; icon: LucideIcon }>;

  return (
    <aside className="w-full max-w-xs border-r border-slate-200 bg-[var(--habitta-sand)]">
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-slate-600">Painel</p>
      </div>
      <nav className="space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const isActive = activePath === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-3 text-sm ${
                isActive
                  ? "bg-[var(--habitta-emerald)] text-white"
                  : "text-[var(--habitta-ink)] hover:bg-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
