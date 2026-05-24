import { CustomerList } from "@/components/dashboard/customers/customer-list";
import { EmptyState } from "@/components/dashboard/empty-state";
import type { Customer } from "@/types/customer";

type CustomersPageProps = {
  customers: Customer[];
  error?: string;
};

export function CustomersPage({ customers, error }: CustomersPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted">Sección</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Clientes
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted">
            Gestiona las personas y empresas asociadas al taller.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="w-full rounded-md border border-border bg-surface-muted px-4 py-3 text-sm font-medium text-muted sm:w-auto"
        >
          Nuevo cliente
        </button>
      </div>

      {error ? (
        <EmptyState
          title="No se pudieron cargar los clientes"
          description="Intenta nuevamente más tarde."
        />
      ) : customers.length > 0 ? (
        <CustomerList customers={customers} />
      ) : (
        <EmptyState
          title="Todavía no hay clientes para mostrar"
          description="Cuando registres clientes, aparecerán aquí con su información básica."
        />
      )}
    </div>
  );
}
