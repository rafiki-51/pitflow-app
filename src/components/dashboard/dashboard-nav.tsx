"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV_ITEMS } from "@/constants/dashboard-nav";

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard navigation" className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`min-w-max rounded-md border px-4 py-3 transition-colors lg:min-w-0 ${
                isActive
                  ? "border-accent bg-surface-muted"
                  : "border-border bg-surface hover:bg-surface-muted"
              }`}
            >
              <span className="block text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="mt-1 hidden text-xs leading-5 text-muted lg:block">
                {item.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
