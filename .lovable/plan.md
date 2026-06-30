# Plan: Landing page Blister

Landing single-page minimalista, profesional y rápida para Blister (asistentes de WhatsApp con IA). Toda la página en español rioplatense, optimizada para empujar al visitante hacia WhatsApp o un formulario de demo.

## Datos clave

- WhatsApp: `+598 099 508 432` → link `https://wa.me/598099508432?text=Hola%20Blister%2C%20quiero%20saber%20m%C3%A1s`
- Email: `estudio.blister@gmail.com`
- Formulario demo: solo UI (sin backend). Al enviar muestra un estado de éxito (toast + reset) y queda listo para conectar más adelante.
- Idioma: español rioplatense, una sola versión.
- Redes sociales: placeholders (Instagram, LinkedIn, X).

## Estructura de la página

Todo vive en `src/routes/index.tsx` apoyado en secciones componetizadas dentro de `src/components/landing/`.

1. **Nav** — logo "Blister" a la izquierda, links ancla (Solución, Beneficios, Casos, FAQ), botón secundario "WhatsApp" y primario "Solicitar demo".
2. **Hero** — H1, subtítulo, dos CTAs. A la derecha: ilustración SVG propia de un chat de WhatsApp con el asistente respondiendo (no stock, SVG hecho con divs/SVG inline).
3. **Problema** — título + 3-4 tarjetas con escenarios (sábado de noche, cliente mientras atendés, fuera de horario, varios a la vez).
4. **Solución** — diagrama horizontal Cliente → WhatsApp → Blister → Respuesta → Humano (solo cuando hace falta). SVG/flex con íconos lineales (lucide).
5. **Beneficios** — grid de 6 tarjetas (24/7, captura datos, deriva casos, reduce tareas repetitivas, mejora tiempo de respuesta, escala sin contratar).
6. **Cómo funciona** — 3 pasos numerados (Configuramos, Conectamos, Responde).
7. **Casos de uso** — grid de 6 tarjetas con ícono (Inmobiliarias, Clínicas, Odontólogos, Automotoras, Barberías, Estudios profesionales).
8. **FAQ** — acordeón con shadcn `Accordion` (4-5 preguntas).
9. **CTA final + formulario demo** — split: izquierda copy y botón WhatsApp grande; derecha card con formulario (nombre, empresa, WhatsApp, rubro, mensaje opcional) que en submit muestra confirmación.
10. **Footer** — logo, breve tagline, email, WhatsApp, redes (placeholders), copyright.

## Diseño visual

- **Paleta** (tokens semánticos en `src/styles.css`, formato `oklch`):
  - `background` blanco puro, `foreground` azul casi negro `#0A1628`.
  - `primary` azul oscuro `#0A2540` (botón principal, headings de acento).
  - `accent` celeste moderno `#3B82F6` / hover `#2563EB` para detalles, links, focus ring.
  - `muted` gris suave `#F5F7FA`, `muted-foreground` `#5B6B7F`, `border` `#E5EAF0`.
  - Verde WhatsApp `#25D366` solo para el botón de WhatsApp.
- **Tipografía**: Inter vía `@fontsource/inter` (weights 400/500/600/700), cargado desde `src/start.ts`/entrypoint client. Titulares grandes (clamp 40–64px), tracking ajustado, body 16–18px.
- **Espaciado**: secciones con `py-24 md:py-32`, contenedor `max-w-6xl mx-auto px-6`.
- **Estética**: bordes finos, radios `rounded-2xl`, sombras casi nulas (`shadow-sm` puntual), separadores sutiles, mucho aire.
- **Microanimaciones**: fade/slide-up al entrar en viewport vía `IntersectionObserver` + clases existentes `animate-fade-in`; hover suave en cards (`transition`, sutil translate-y); botones con transición de color. Nada exagerado.
- **Responsive**: mobile-first. Hero pasa a una sola columna en `<lg`, ilustración debajo. Grids 1/2/3 columnas según breakpoint. Nav colapsa a menú hamburguesa shadcn `Sheet` en mobile. Se siguen las reglas de `grid-cols-[minmax(0,1fr)_auto]` para headers.

## Copy (tono empresa seria, frases cortas)

- H1: "Respondé cada consulta de WhatsApp, incluso cuando tu negocio está cerrado."
- Sub: "Blister crea asistentes con inteligencia artificial que responden automáticamente a tus clientes, capturan oportunidades y derivan los casos importantes a una persona."
- CTA principal: "Solicitar demo" · Secundario: "Hablar por WhatsApp".
- Sin frases tipo "revolucioná", "transformá", "no solo... sino también".

## SEO y head

- `src/routes/index.tsx` define `head()` con:
  - title: "Blister · Asistentes de WhatsApp con IA para tu negocio" (<60).
  - description: "Blister responde automáticamente las consultas de WhatsApp de tu negocio las 24 horas, captura datos y deriva los casos importantes." (<160).
  - OG title/description/type=website, og:url relativo `/`, twitter card summary_large_image.
  - canonical relativo `/`.
  - JSON-LD `Organization` con nombre, email, sameAs vacíos.
- `__root.tsx`: actualizar title default y description a Blister, mantener viewport/charset.
- Favicon: generar uno simple (cuadro azul oscuro con "B" celeste) en `public/favicon.svg` y enlazar desde `__root.tsx`.
- HTML semántico: un solo `<h1>`, `<section>` con `aria-labelledby`, `<nav>`, `<footer>`, alt en imágenes, `aria-label` en botones de icon-only.

## Accesibilidad y rendimiento

- Contrastes AA (azul oscuro sobre blanco, celeste sobre blanco con peso 600+).
- Focus visible con `ring-accent`.
- Imágenes SVG inline (sin requests extra). No se cargan imágenes pesadas.
- Sin librerías de animación externas: solo CSS + Intersection Observer.
- Lighthouse objetivo: 95+ performance/SEO/accesibilidad.

## Detalles técnicos

- Stack actual (TanStack Start + Tailwind v4 + shadcn). Sin backend.
- Instalar: `@fontsource/inter`.
- Nuevos archivos:
  - `src/components/landing/Nav.tsx`
  - `src/components/landing/Hero.tsx` (incluye `WhatsappMockup.tsx` SVG)
  - `src/components/landing/Problem.tsx`
  - `src/components/landing/Solution.tsx`
  - `src/components/landing/Benefits.tsx`
  - `src/components/landing/HowItWorks.tsx`
  - `src/components/landing/UseCases.tsx`
  - `src/components/landing/Faq.tsx`
  - `src/components/landing/FinalCta.tsx` (incluye `DemoForm.tsx`)
  - `src/components/landing/Footer.tsx`
  - `src/components/landing/Reveal.tsx` (wrapper de fade-in on scroll)
  - `src/lib/contact.ts` (constantes WhatsApp/email/URL).
  - `public/favicon.svg`
- Editar: `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/styles.css` (tokens), entrypoint para importar Inter.
- Formulario demo: estado local con `useState`, validación simple (campos requeridos), `sonner` toast en submit; sin fetch.
