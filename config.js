// Configuración pública de la landing.
// OJO: este archivo lo descarga el navegador — todo lo que esté acá es PÚBLICO.
// El secret de Turnstile NUNCA va aca: vive cifrado en una credencial de n8n.

window.ENV = {
  // Webhook de producción del workflow "Blister · Leads Landing (L01)"
  // URL de PRODUCCION (sin "-test"). Solo responde con el workflow activo.
  N8N_WEBHOOK_URL: "https://nivoria-n8n.tn7jy5.easypanel.host/webhook/contacto-blister",

  // Sitekey de Cloudflare Turnstile (público, empieza con 0x...)
  TURNSTILE_SITEKEY: "0x4AAAAAAD4VRxRE6mLPSsop",

  // Link de agendamiento real (Cal.com / Calendly / Google Appointments).
  // VACÍO A PROPÓSITO (2026-07-28): con el volumen actual, atajar al prospecto
  // en WhatsApp convierte mejor que mandarlo a un calendario. Mientras esté
  // vacío, los CTA dicen "Hablemos por WhatsApp" y van al chat.
  // Si algún día se pega una URL acá, script.js le cambia destino Y texto a los
  // botones (pasan a decir "Agendar una llamada"). No hay que tocar el HTML.
  CALENDAR_URL: ""
};
