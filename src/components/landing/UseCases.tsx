import { Home, Stethoscope, Smile, Car, Scissors, Briefcase } from "lucide-react";
import { Reveal } from "./Reveal";

const cases = [
  { icon: Home, title: "Inmobiliarias", text: "Consultas por propiedades, precios y visitas." },
  { icon: Stethoscope, title: "Clínicas estéticas", text: "Tratamientos, valores y reserva de turnos." },
  { icon: Smile, title: "Odontólogos", text: "Horarios, presupuestos y obras sociales." },
  { icon: Car, title: "Automotoras", text: "Stock, financiación y test drives." },
  { icon: Scissors, title: "Barberías", text: "Disponibilidad, precios y reservas." },
  { icon: Briefcase, title: "Estudios profesionales", text: "Consultas iniciales, honorarios y agenda." },
];

export function UseCases() {
  return (
    <section id="casos" className="scroll-mt-20 border-y border-primary-foreground/10 bg-primary">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">Casos de uso</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Pensado para negocios que viven del WhatsApp.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 50}>
              <div className="group h-full rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-foreground/10 text-primary-foreground transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-primary-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
