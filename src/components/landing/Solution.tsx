import { User, MessageCircle, Sparkles, Send, UserCheck, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  { icon: User, label: "Cliente", sub: "Escribe una consulta" },
  { icon: MessageCircle, label: "WhatsApp", sub: "Recibe el mensaje" },
  { icon: Sparkles, label: "Blister", sub: "Entiende y responde" },
  { icon: Send, label: "Respuesta", sub: "En segundos, 24/7" },
  { icon: UserCheck, label: "Humano", sub: "Solo cuando hace falta" },
];

export function Solution() {
  return (
    <section id="solucion" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">La solución</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Un asistente que responde por vos, con criterio.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Blister atiende cada conversación, resuelve lo que puede y deriva a una persona cuando corresponde.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 rounded-3xl border border-border bg-surface p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2 lg:items-stretch">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-stretch">
                  <div className="flex-1 rounded-2xl border border-border bg-card p-5 text-center">
                    <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-primary/5 text-primary">
                      <s.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">{s.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden items-center justify-center px-1 lg:flex">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
