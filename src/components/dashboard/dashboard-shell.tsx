import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { LogoutButton } from "@/components/dashboard/logout-button";
import type { UserProfile } from "@/types/profile";

type DashboardShellProps = {
  profile: UserProfile;
  children: React.ReactNode;
};

export function DashboardShell({ profile, children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[280px_1fr] lg:py-8">
        <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
          <div className="flex h-full flex-col gap-4 rounded-lg border border-border bg-background lg:bg-surface lg:p-4">
            <div className="hidden px-2 pt-2 lg:block">
              <p className="text-lg font-semibold tracking-tight text-foreground">
                PitFlow
              </p>
              <p className="mt-1 text-sm text-muted">Workspace privado</p>
            </div>

            <DashboardNav />

            <div className="hidden flex-1 lg:block" />

            <div className="hidden lg:block">
              <LogoutButton />
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <DashboardHeader profile={profile} />

          {children}

          <div className="rounded-lg border border-border bg-surface p-5 lg:hidden">
            <LogoutButton />
          </div>
        </section>
      </div>
    </main>
  );
}
