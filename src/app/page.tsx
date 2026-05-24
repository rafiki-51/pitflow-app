import { PublicLayout } from "@/components/layout/public-layout";

export default function Home() {
  return (
    <PublicLayout>
      <div className="w-full">
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center sm:py-28">
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

          <div className="mt-14 grid w-full max-w-4xl gap-3 rounded-lg border border-border bg-surface p-3 text-left sm:grid-cols-3">
            <div className="rounded-md bg-surface-muted p-5">
              <p className="text-sm font-medium text-foreground">
                Operación clara
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Un punto de partida ordenado para equipos que necesitan ver el
                trabajo sin ruido.
              </p>
            </div>
            <div className="rounded-md bg-surface-muted p-5">
              <p className="text-sm font-medium text-foreground">
                Flujo consistente
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Una experiencia pensada para recibir, organizar y avanzar con
                más claridad.
              </p>
            </div>
            <div className="rounded-md bg-surface-muted p-5">
              <p className="text-sm font-medium text-foreground">
                Presencia premium
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Interfaz sobria, rápida de entender y alineada con talleres
                modernos.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface/40">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 sm:grid-cols-[0.8fr_1.2fr] sm:py-20">
            <div>
              <p className="text-sm font-medium text-muted">Cómo funciona</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Menos fricción para operar mejor.
              </h2>
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg border border-border bg-surface p-5">
                <p className="text-sm font-medium text-foreground">
                  01. Recibe el vehículo
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Centraliza el inicio del trabajo con una experiencia clara
                  desde el primer contacto.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-5">
                <p className="text-sm font-medium text-foreground">
                  02. Organiza el trabajo
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Mantén una visión simple de lo que está pendiente, en curso y
                  listo para avanzar.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-5">
                <p className="text-sm font-medium text-foreground">
                  03. Entrega con claridad
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Cierra cada servicio con una comunicación más profesional y
                  ordenada.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 text-center sm:py-20">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Diseñado para talleres que quieren verse y operar mejor.
            </h2>
            <p className="text-base leading-7 text-muted">
              PitFlow comienza con una base simple, visual y profesional para
              construir una gestión moderna sin complejidad innecesaria.
            </p>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}
