import { WHATSAPP_URL } from "@/lib/contact";
import { WhatsappIcon } from "./WhatsappIcon";
import { WhatsappMockup } from "./WhatsappMockup";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* secondary gradient accent */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--color-secondary)_0%,_transparent_60%)] opacity-20" aria-hidden="true" />
      
      {/* subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.92 0.012 250) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at top, black 40%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-24 md:pt-28 md:pb-32 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Asistentes de WhatsApp con IA
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[56px]">
              Respondé cada consulta de WhatsApp, incluso cuando tu negocio está cerrado.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Blister crea asistentes con inteligencia artificial que responden automáticamente
              a tus clientes, capturan oportunidades y derivan los casos importantes a una persona.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Solicitar una demo
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <WhatsappIcon className="h-4 w-4 text-whatsapp" />
                Hablar por WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-6 text-xs text-muted-foreground">
              Sin instalar nada. Funciona con tu número actual.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:justify-self-end">
          <WhatsappMockup />
        </Reveal>
      </div>
    </section>
  );
}
