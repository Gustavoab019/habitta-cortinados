import { PackageCheck, Ruler } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import type { OrderDto } from "@/schemas/order";

async function fetchOrders(): Promise<OrderDto[]> {
  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN ?? process.env.ADMIN_TOKEN;
  if (!token) {
    return [];
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/orders`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function AdminPedidosPage() {
  const orders = await fetchOrders();

  return (
    <div className="flex min-h-screen bg-[var(--habitta-cream)]">
      <Sidebar activePath="/admin/pedidos" />
      <main className="flex-1 bg-transparent p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-600">Admin</p>
            <h1 className="text-2xl font-semibold text-[var(--habitta-forest)]">Pedidos</h1>
            <p className="text-sm text-slate-700">Listagem protegida por token simples via Authorization: Bearer.</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[var(--habitta-emerald)]/30 bg-white/90 p-6 text-sm text-slate-700">
            Nenhum pedido encontrado ou token ausente. Defina NEXT_PUBLIC_ADMIN_TOKEN e crie pedidos via /api/orders.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-600">{order.status}</p>
                    <h3 className="text-lg font-semibold text-[var(--habitta-forest)]">{order.customer.name}</h3>
                    <p className="text-sm text-slate-700">{order.customer.email}</p>
                  </div>
                  <PackageCheck className="h-5 w-5 text-[var(--habitta-emerald)]" />
                </div>
                <div className="mt-3 space-y-1 text-sm text-slate-700">
                  <p>
                    Itens: <span className="font-semibold">{order.items.length}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-[var(--habitta-emerald)]" />
                    Medição: {order.pricing.measurementFee > 0 ? `€${order.pricing.measurementFee}` : "Não aplicável"}
                  </p>
                  <p>Depositado: €{order.pricing.deposit}</p>
                  <p>Atualizado: {new Date(order.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
