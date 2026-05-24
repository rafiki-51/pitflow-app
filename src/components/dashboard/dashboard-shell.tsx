import { LogoutButton } from "@/components/dashboard/logout-button";
import type { UserProfile } from "@/types/profile";

type DashboardShellProps = {
  profile: UserProfile;
};

export function DashboardShell({ profile }: DashboardShellProps) {
  return (
    <main className="flex min-h-screen bg-background px-6 py-10 text-foreground">
      <section className="mx-auto flex w-full max-w-4xl flex-col justify-center">
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted">PitFlow</p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Sesión activa
            </h1>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-surface-muted p-5">
              <p className="text-sm text-muted">Nombre</p>
              <p className="mt-2 text-base font-medium text-foreground">
                {profile.full_name}
              </p>
            </div>
            <div className="rounded-md bg-surface-muted p-5">
              <p className="text-sm text-muted">Rol</p>
              <p className="mt-2 text-base font-medium text-foreground">
                {profile.role}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
            El dashboard operativo se habilitará en el siguiente paso.
          </p>

          <div className="mt-8">
            <LogoutButton />
          </div>
        </div>
      </section>
    </main>
  );
}
