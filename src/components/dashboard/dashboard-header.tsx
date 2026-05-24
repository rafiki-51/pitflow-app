import type { UserProfile } from "@/types/profile";

type DashboardHeaderProps = {
  profile: UserProfile;
};

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  return (
    <header className="rounded-lg border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-accent">Sesión activa</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            PitFlow
          </h1>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-surface-muted px-4 py-3">
            <p className="text-xs text-muted">Nombre</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {profile.full_name}
            </p>
          </div>
          <div className="rounded-md bg-surface-muted px-4 py-3">
            <p className="text-xs text-muted">Rol</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {profile.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
