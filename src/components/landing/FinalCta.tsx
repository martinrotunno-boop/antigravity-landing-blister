import { WHATSAPP_URL } from "@/lib/contact";
import { WhatsappIcon } from "./WhatsappIcon";
import { DemoForm } from "./DemoForm";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="demo" className="scroll-mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:py-32 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              No pierdas más consultas.
            </h2>
            <p className="mt-4 max-w-md text-base text-primary-foreground/75">
              Probá cómo responder clientes incluso cuando tu negocio está cerrado.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-whatsapp px-5 py-3 text-sm font-medium text-whatsapp-foreground transition-opacity hover:opacity-90"
              >
                <WhatsappIcon className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
              <a
                href="#demoform"
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Solicitar demo
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div id="demoform" className="scroll-mt-20 text-foreground">
            <DemoForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
