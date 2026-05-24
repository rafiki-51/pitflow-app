import Link from "next/link";
import { DASHBOARD_NAV_ITEMS } from "@/constants/dashboard-nav";

export function DashboardNav() {
  return (
    <nav aria-label="Dashboard navigation" className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {DASHBOARD_NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="min-w-max rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:bg-surface-muted lg:min-w-0"
          >
            <span className="block text-sm font-medium text-foreground">
              {item.label}
            </span>
            <span className="mt-1 hidden text-xs leading-5 text-muted lg:block">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
