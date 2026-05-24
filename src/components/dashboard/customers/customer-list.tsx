import type { Customer } from "@/types/customer";

type CustomerListProps = {
  customers: Customer[];
};

export function CustomerList({ customers }: CustomerListProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="divide-y divide-border">
        {customers.map((customer) => (
          <article
            key={customer.id}
            className="grid gap-4 p-5 transition-colors hover:bg-surface-muted sm:grid-cols-[1fr_auto]"
          >
            <div>
              <h3 className="text-base font-medium text-foreground">
                {customer.full_name}
              </h3>
              <div className="mt-2 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:gap-4">
                <span>{customer.email ?? "Sin email"}</span>
                <span>{customer.phone ?? "Sin teléfono"}</span>
              </div>
            </div>

            <p className="text-sm text-muted">
              {new Intl.DateTimeFormat("es-CR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }).format(new Date(customer.created_at))}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
