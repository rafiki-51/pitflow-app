"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProfileByUserId,
  signInWithPassword,
  signOut,
} from "@/services/auth-service";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: signInError } = await signInWithPassword(
      email,
      password,
    );

    if (signInError) {
      setLoading(false);
      setError("No se pudo iniciar sesión. Revisa tus credenciales.");
      return;
    }

    if (!data.user) {
      setLoading(false);
      setError("La sesión fue creada, pero no se recibió un usuario válido.");
      return;
    }

    try {
      await getProfileByUserId(data.user.id);
      setRedirecting(true);
      router.push("/dashboard");
      router.refresh();
    } catch (profileError) {
      await signOut();
      setLoading(false);
      setError(
        profileError instanceof Error
          ? profileError.message
          : "La sesión existe, pero no hay un perfil activo asociado.",
      );
    }
  }

  if (redirecting) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-sm font-medium text-accent">Redirigiendo...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-surface p-6"
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
            placeholder="nombre@taller.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">
            Contraseña
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
            placeholder="Tu contraseña"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-md bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
