import { Check, CheckCheck } from "lucide-react";

export function WhatsappMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* soft background halo */}
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/10 via-transparent to-primary/5 blur-2xl" aria-hidden="true" />

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(10,37,64,0.18)]">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            B
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">Asistente Blister</p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" /> en línea
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-3 bg-[oklch(0.985_0.005_250)] px-5 py-6">
          <Bubble side="in">
            Hola, ¿atienden los sábados? Quería pasar a ver un departamento.
            <Meta time="22:47" />
          </Bubble>

          <Bubble side="out">
            ¡Hola! Sí, los sábados estamos de 10 a 14 h. ¿En qué zona estás buscando?
            <Meta time="22:47" sent />
          </Bubble>

          <Bubble side="in">
            En Pocitos, 2 dormitorios. ¿Cuál es el rango de precios?
            <Meta time="22:48" />
          </Bubble>

          <Bubble side="out">
            En Pocitos, 2 dormitorios va de USD 180.000 a 260.000. Te dejo tres opciones y agendamos visita.
            <Meta time="22:48" sent />
          </Bubble>

          <div className="self-center rounded-full bg-card px-3 py-1 text-[11px] text-muted-foreground shadow-sm border border-border">
            Derivado a Martín · agente
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-border bg-card px-4 py-3">
          <div className="flex-1 rounded-full bg-muted px-4 py-2 text-xs text-muted-foreground">
            Escribí un mensaje
          </div>
          <div className="h-9 w-9 rounded-full bg-whatsapp" aria-hidden="true" />
        </div>
      </div>

      {/* Floating tag */}
      <div className="absolute -left-4 top-10 hidden rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-sm md:flex md:items-center md:gap-2">
        <span className="h-2 w-2 rounded-full bg-whatsapp" />
        Respondido en 4 segundos
      </div>
      <div className="absolute -right-4 bottom-12 hidden rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium shadow-sm md:block">
        <span className="text-muted-foreground">Sábado · 22:48</span>
      </div>
    </div>
  );
}

function Bubble({ side, children }: { side: "in" | "out"; children: React.ReactNode }) {
  const isOut = side === "out";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug shadow-sm ${
          isOut
            ? "rounded-tr-md bg-[oklch(0.95_0.05_148)] text-foreground"
            : "rounded-tl-md bg-card text-foreground border border-border"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Meta({ time, sent }: { time: string; sent?: boolean }) {
  return (
    <span className="ml-2 inline-flex items-center gap-1 align-middle text-[10px] text-muted-foreground">
      {time}
      {sent && <CheckCheck className="h-3 w-3 text-accent" />}
      {sent === undefined && <Check className="hidden h-3 w-3" />}
    </span>
  );
}
