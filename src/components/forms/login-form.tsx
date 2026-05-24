"use client";

import { FormEvent, useState } from "react";
import {
  getProfileByUserId,
  signInWithPassword,
  signOut,
} from "@/services/auth-service";
import type { UserRole } from "@/types/auth";

type AuthenticatedProfile = {
  full_name: string;
  role: UserRole;
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<AuthenticatedProfile | null>(null);

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
      const currentProfile = await getProfileByUserId(data.user.id);
      setProfile({
        full_name: currentProfile.full_name,
        role: currentProfile.role,
      });
    } catch (profileError) {
      await signOut();
      setError(
        profileError instanceof Error
          ? profileError.message
          : "La sesión existe, pero no hay un perfil activo asociado.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setLoading(true);
    setError("");
    await signOut();
    setProfile(null);
    setPassword("");
    setLoading(false);
  }

  if (profile) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="space-y-3">
          <p className="text-sm font-medium text-accent">Sesión iniciada</p>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {profile.full_name}
            </p>
            <p className="text-sm text-muted">Rol: {profile.role}</p>
          </div>
          <p className="text-sm leading-6 text-muted">
            El acceso privado se habilitará en el siguiente paso.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={loading}
          className="mt-6 w-full rounded-md border border-border bg-surface-muted px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cerrar sesión
        </button>
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
