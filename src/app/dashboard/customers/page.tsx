import { redirect } from "next/navigation";
import { CustomersPage } from "@/components/dashboard/customers/customers-page";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import type { Customer } from "@/types/customer";
import type { UserProfile } from "@/types/profile";

export default async function CustomersRoutePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .is("deleted_at", null)
    .single();

  if (profileError || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
        <div className="max-w-md rounded-lg border border-border bg-surface p-6">
          <p className="text-sm font-medium text-muted">PitFlow</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">
            No hay un perfil activo asociado a esta sesión.
          </h1>
        </div>
      </main>
    );
  }

  const { data: customers, error: customersError } = await supabase
    .from("customers")
    .select("id, full_name, email, phone, created_at")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  return (
    <DashboardShell profile={profile as UserProfile}>
      <CustomersPage
        customers={(customers ?? []) as Customer[]}
        error={customersError ? "customers_load_failed" : undefined}
      />
    </DashboardShell>
  );
}
