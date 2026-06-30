import { Clock, MessageSquare, UserPlus, Shuffle, Zap, TrendingUp } from "lucide-react";
import { Reveal } from "./Reveal";

const benefits = [
  { icon: Clock, title: "Respuesta automática 24/7", text: "Tu negocio contesta a cualquier hora, todos los días." },
  { icon: MessageSquare, title: "Cero mensajes esperando", text: "Cada consulta recibe una respuesta inmediata." },
  { icon: UserPlus, title: "Captura datos del cliente", text: "Nombre, contacto y motivo de la consulta, organizado." },
  { icon: Shuffle, title: "Derivación inteligente", text: "Pasa la conversación a una persona cuando hace falta." },
  { icon: Zap, title: "Menos tareas repetitivas", text: "Precios, horarios y ubicación contestados solos." },
  { icon: TrendingUp, title: "Escala sin contratar más", text: "Atendé el doble de consultas con el mismo equipo." },
];

export function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-20 border-y border-primary-foreground/10 bg-primary">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">Beneficios</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Lo que cambia cuando Blister atiende tu WhatsApp.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 50}>
              <div className="h-full bg-primary-foreground/5 p-7 transition-colors hover:bg-primary-foreground/10">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <b.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-primary-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
