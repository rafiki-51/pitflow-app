import Link from "next/link";

export function PublicNavbar() {
  return (
    <header className="border-b border-border bg-background/95">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          PitFlow
        </Link>

        <nav className="flex items-center gap-2" aria-label="Public navigation">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Registrarse
          </Link>
        </nav>
      </div>
    </header>
  );
}
