import { LoginForm } from "@/components/forms/login-form";
import { PublicLayout } from "@/components/layout/public-layout";

export default function LoginPage() {
  return (
    <PublicLayout>
      <section className="mx-auto flex w-full max-w-md flex-col justify-center px-6 py-16 sm:py-24">
        <div className="mb-8 space-y-3 text-center">
          <p className="text-sm font-medium text-muted">PitFlow</p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Iniciar sesión
          </h1>
        </div>

        <LoginForm />
      </section>
    </PublicLayout>
  );
}
