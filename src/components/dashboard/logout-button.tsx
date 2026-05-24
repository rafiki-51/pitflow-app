"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@/services/auth-service";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md border border-border bg-surface-muted px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
