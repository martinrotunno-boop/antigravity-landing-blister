import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

type FormState = {
  nombre: string;
  empresa: string;
  whatsapp: string;
  rubro: string;
  mensaje: string;
};

const initial: FormState = {
  nombre: "",
  empresa: "",
  whatsapp: "",
  rubro: "",
  mensaje: "",
};

export function DemoForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.nombre || !form.whatsapp) {
      toast.error("Completá al menos nombre y WhatsApp.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setSent(true);
    toast.success("Solicitud enviada. Te contactamos en breve.");
    setForm(initial);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">Recibimos tu solicitud.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Te contactamos por WhatsApp en las próximas horas para coordinar la demo.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-accent hover:underline"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8" noValidate>
      <h3 className="text-lg font-semibold text-foreground">Solicitar demo</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Te mostramos cómo respondería tu asistente.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" required>
          <input
            type="text"
            required
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            className={inputCls}
            placeholder="Tu nombre"
          />
        </Field>
        <Field label="Empresa">
          <input
            type="text"
            value={form.empresa}
            onChange={(e) => update("empresa", e.target.value)}
            className={inputCls}
            placeholder="Nombre del negocio"
          />
        </Field>
        <Field label="WhatsApp" required>
          <input
            type="tel"
            required
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            className={inputCls}
            placeholder="+598 9X XXX XXX"
          />
        </Field>
        <Field label="Rubro">
          <input
            type="text"
            value={form.rubro}
            onChange={(e) => update("rubro", e.target.value)}
            className={inputCls}
            placeholder="Ej: inmobiliaria"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Mensaje (opcional)">
            <textarea
              rows={3}
              value={form.mensaje}
              onChange={(e) => update("mensaje", e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder="Contanos brevemente qué necesitás"
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? "Enviando..." : "Solicitar demo"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Te contactamos por WhatsApp. Sin spam.
      </p>
    </form>
  );
}

const inputCls =
  "block w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
