import { Moon, Users, Clock, Inbox } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: Moon,
    title: "Sábado, 22:48",
    text: "Un cliente pregunta por un servicio. No hay nadie disponible.",
  },
  {
    icon: Users,
    title: "Martes, 11:20",
    text: "Estás atendiendo en el local. Tres mensajes nuevos sin leer.",
  },
  {
    icon: Clock,
    title: "Domingo, 09:15",
    text: "Alguien pide un precio fuera de horario. Espera respuesta.",
  },
  {
    icon: Inbox,
    title: "Jueves, 19:40",
    text: "Acumulás 12 conversaciones del día. No diste abasto.",
  },
];

export function Problem() {
  return (
    <section className="border-y border-primary-foreground/10 bg-primary">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">El problema</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Cada mensaje sin responder puede ser un cliente menos.
            </h2>
            <p className="mt-4 text-base text-primary-foreground/70">
              No se trata de recibir más consultas. Se trata de no perder las que ya te llegan.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm">
                <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-primary-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-primary-foreground/70">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
