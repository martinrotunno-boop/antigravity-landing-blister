import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "¿Reemplaza a una persona?",
    a: "No. Blister responde lo que puede resolver automáticamente y deriva la conversación a una persona cuando corresponde. Tu equipo sigue siendo el que cierra los casos importantes.",
  },
  {
    q: "¿Puede responder fuera de horario?",
    a: "Sí. Atiende 24 horas, todos los días, incluidos fines de semana y feriados.",
  },
  {
    q: "¿Se conecta con mi WhatsApp actual?",
    a: "Sí. Usamos tu número actual. Tus clientes te siguen escribiendo al mismo lugar de siempre.",
  },
  {
    q: "¿Se puede personalizar?",
    a: "Sí. Configuramos el tono, las respuestas, los precios, los horarios y las reglas de derivación según tu negocio.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "En general entre 3 y 7 días, dependiendo de la cantidad de información a cargar y las integraciones necesarias.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:py-32 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <div>
            <p className="text-sm font-medium text-accent">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Preguntas frecuentes.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              ¿Te queda otra duda? Escribinos por WhatsApp y la resolvemos.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
