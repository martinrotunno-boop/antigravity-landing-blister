import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Configuramos tu asistente",
    text: "Cargamos tus precios, horarios, servicios y respuestas clave. Lo entrenamos con tu información real.",
  },
  {
    n: "02",
    title: "Lo conectamos con WhatsApp",
    text: "Usamos tu número actual. No cambia nada para tus clientes.",
  },
  {
    n: "03",
    title: "Empieza a responder solo",
    text: "Atiende 24/7, captura datos y te avisa cuando una conversación necesita una persona.",
  },
];

export function HowItWorks() {
  return (
    <section className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-accent">Cómo funciona</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tres pasos. Sin complicaciones técnicas.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-7">
                <span className="text-xs font-semibold tracking-widest text-accent">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
