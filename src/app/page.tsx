import { PublicLayout } from "@/components/layout/public-layout";

export default function Home() {
  return (
    <PublicLayout>
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center sm:py-28">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium text-muted">
            Modern Workshop Management Platform
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            PitFlow
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Una plataforma moderna, simple y profesional para preparar la
            gestión digital de talleres mecánicos.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
