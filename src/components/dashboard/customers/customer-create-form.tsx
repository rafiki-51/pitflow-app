"use client";

import { useActionState } from "react";
import { createCustomerAction } from "@/actions/customers";
import type { CreateCustomerFormState } from "@/types/customer";

type CustomerCreateFormProps = {
  onCancel: () => void;
};

const initialState: CreateCustomerFormState = {
  success: false,
  message: "",
};

export function CustomerCreateForm({ onCancel }: CustomerCreateFormProps) {
  const [state, formAction, pending] = useActionState(
    createCustomerAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-surface p-5 sm:p-6"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground">Crear cliente</h3>
        <p className="text-sm leading-6 text-muted">
          Agrega la información básica del cliente. Los detalles operativos
          vendrán después.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-foreground">
            Nombre completo
          </span>
          <input
            name="full_name"
            type="text"
            required
            minLength={2}
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
            placeholder="Nombre del cliente"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            name="email"
            type="email"
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
            placeholder="cliente@correo.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-foreground">Teléfono</span>
          <input
            name="phone"
            type="tel"
            className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
            placeholder="+506 8888-8888"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-foreground">Notas</span>
          <textarea
            name="notes"
            rows={4}
            className="mt-2 w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
            placeholder="Notas internas opcionales"
          />
        </label>
      </div>

      {state.message ? (
        <p
          className={`mt-4 text-sm ${
            state.success ? "text-accent" : "text-red-400"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={pending}
          className="rounded-md border border-border bg-surface-muted px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Guardando..." : "Guardar cliente"}
        </button>
      </div>
    </form>
  );
}
