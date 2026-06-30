import { Instagram, Linkedin, Mail } from "lucide-react";
import { WhatsappIcon } from "./WhatsappIcon";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="border-t border-primary-foreground/10 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-foreground text-primary text-sm font-bold">B</span>
              <span className="text-base font-semibold tracking-tight">Blister</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
              Asistentes de WhatsApp con inteligencia artificial para negocios que no pueden perder consultas.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                  <WhatsappIcon className="h-4 w-4" /> {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground">Seguinos</p>
            <ul className="mt-4 flex gap-2">
              <li>
                <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-md border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Instagram className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-md border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Linkedin className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Blister. Todos los derechos reservados.</p>
          <p>Hecho para negocios que viven del WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
