document.addEventListener("DOMContentLoaded", () => {

  // --- CTA DE CONTACTO ---
  // El HTML trae WhatsApp hardcodeado y el texto que le corresponde ("Hablemos
  // por WhatsApp"), así que funciona sin JS y no promete lo que no hace. Si algún
  // día se define CALENDAR_URL en config.js, acá cambian destino Y texto juntos:
  // un botón que dice "agendar" y abre un chat —o al revés— es la contradicción
  // más visible que puede tener un estudio de automatización.
  const calendarUrl = (window.ENV && window.ENV.CALENDAR_URL || "").trim();
  if (calendarUrl) {
    document.querySelectorAll('[data-cta="agendar"]').forEach(el => {
      el.href = calendarUrl;
      el.target = "_blank";
      el.rel = "noopener";
      el.textContent = el.dataset.ctaCorto || "Agendar una llamada";
    });
  }


  // --- THEME TOGGLE ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlRoot = document.documentElement;
  
  let currentTheme = htmlRoot.getAttribute("data-theme") || "oscuro";
  
  const updateThemeUI = () => {
    htmlRoot.setAttribute("data-theme", currentTheme);
    themeToggleBtn.textContent = currentTheme === "claro" ? "☽" : "☀";
  };
  
  updateThemeUI();

  themeToggleBtn.addEventListener("click", () => {
    currentTheme = currentTheme === "claro" ? "oscuro" : "claro";
    updateThemeUI();
  });


  // --- TASKS ANIMATION ---
  const tasksContainer = document.getElementById("tasks-container");
  
  const taskDefs = [
    'Consulta nueva respondida',
    'Lead cargado al CRM desde el formulario',
    'Reunión agendada y recordatorio enviado',
    'Factura recibida, leída y clasificada',
    'Seguimiento enviado a consultas sin respuesta'
  ];
  
  let taskIdx = 0;
  
  const renderTasks = () => {
    if (!tasksContainer) return;
    const footerHtml = `
      <div style="display:flex;justify-content:space-between;padding:14px 20px;font-size:12px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted)">
        <span>Hoy</span><span id="tasks-count">${27 + taskIdx} tareas resueltas sin intervención</span>
      </div>
    `;

    const tasksHtml = taskDefs.map((label, i) => {
      const active = i === taskIdx;
      const opacity = active ? 1 : 0.92;
      const dotColor = active ? 'var(--cta)' : 'var(--border)';
      const stateText = active ? 'Procesando' : 'Resuelto';
      const stateColor = active ? 'var(--accent)' : 'var(--muted)';
      
      return `
        <div style="display:flex;align-items:center;gap:14px;padding:15px 20px;border-bottom:1px solid var(--border);opacity:${opacity};transition:opacity .4s">
          <span style="width:8px;height:8px;border-radius:50%;flex:none;background:${dotColor};transition:background .4s"></span>
          <span style="flex:1;font-size:14.5px;font-weight:500;color:var(--text)">${label}</span>
          <span style="font-size:11.5px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:${stateColor}">${stateText}</span>
        </div>
      `;
    }).join("");

    tasksContainer.innerHTML = tasksHtml + footerHtml;
  };

  renderTasks();
  setInterval(() => {
    taskIdx = (taskIdx + 1) % taskDefs.length;
    renderTasks();
  }, 1900);


  // --- GLOBAL SCROLL ANIMATIONS ---
  const scrollAnimElements = document.querySelectorAll(".scroll-anim");
  const scrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  scrollAnimElements.forEach(el => scrollObserver.observe(el));


  // --- METRICS ANIMATION ---
  const metricsSection = document.getElementById("metrics-section");
  const m1 = document.getElementById("m1");
  const m2 = document.getElementById("m2");
  const m4 = document.getElementById("m4");
  // m3 ("1–4 sem") ya no se anima: es un rango, no un número, y tiene que
  // coincidir con la respuesta de la FAQ sobre plazos de implementación.

  let metricsStarted = false;

  const metricsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !metricsStarted) {
      metricsStarted = true;
      const t0 = performance.now();
      const dur = 1400;
      
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const prog = 1 - Math.pow(1 - p, 3);
        
        if(m1) m1.textContent = Math.round(12 * prog);
        if(m2) m2.textContent = Math.round(180 * prog);
        if(m4) m4.textContent = prog >= 1 ? '0' : Math.round((1 - prog) * 9);

        if (p < 1) requestAnimationFrame(step);
      };
      
      requestAnimationFrame(step);
    }
  }, { threshold: 0.4 });

  if (metricsSection) {
    metricsObserver.observe(metricsSection);
  }


  // --- SAVINGS CALCULATOR ---
  const calcHoras = document.getElementById("calc-horas");
  const calcTarifa = document.getElementById("calc-tarifa");
  const displayHoras = document.getElementById("display-horas");
  const displayTarifa = document.getElementById("display-tarifa");
  const calcHorasMes = document.getElementById("calc-horas-mes");
  const calcAhorro = document.getElementById("calc-ahorro");
  
  const updateCalculator = () => {
    if(!calcHoras || !calcTarifa) return;
    const horas = parseInt(calcHoras.value, 10);
    const tarifa = parseInt(calcTarifa.value, 10);
    
    displayHoras.textContent = `${horas} h`;
    displayTarifa.textContent = `$ ${tarifa}`;
    
    const horasMes = Math.round(horas * 4.3 * 0.7);
    const ahorroMes = horasMes * tarifa;
    
    calcHorasMes.textContent = horasMes;
    calcAhorro.textContent = ahorroMes.toLocaleString('es-UY');
  };
  
  if (calcHoras && calcTarifa) {
    calcHoras.addEventListener("input", updateCalculator);
    calcTarifa.addEventListener("input", updateCalculator);
    updateCalculator();
  }


  // --- FAQ ACCORDION ---
  const faqBtns = document.querySelectorAll(".faq-btn");
  faqBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      
      if (content.classList.contains("open")) {
        content.classList.remove("open");
        icon.textContent = "+";
      } else {
        document.querySelectorAll(".faq-content.open").forEach(openContent => {
          openContent.classList.remove("open");
          openContent.previousElementSibling.querySelector(".faq-icon").textContent = "+";
        });
        
        content.classList.add("open");
        icon.textContent = "−";
      }
    });
  });


  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");
  const formErrorMsg = document.getElementById("form-error-msg");
  const submitBtn = document.getElementById("form-submit");
  const btnText = document.getElementById("btn-text");
  const btnLoader = document.getElementById("btn-loader");
  const cfTurnstileContainer = document.getElementById("cf-turnstile");

  // --- CLOUDFLARE TURNSTILE (render explícito) ---
  // api.js se carga async, así que esperamos a que window.turnstile exista en vez
  // de asumir que ya corrió. El render implícito por clase no se usa a propósito:
  // el sitekey viene de config.js y no está en el HTML.
  let turnstileWidgetId = null;

  // El widget de Turnstile es un iframe de 300px de ancho fijo y la API no
  // ofrece un tamaño fluido ("flexible" también tiene mínimo 300px). En un
  // teléfono ese ancho es mayor que el hueco del formulario dentro de la tarjeta
  // del CTA, así que lo escalamos para que entre. Se escala solo cuando falta
  // lugar: en escritorio queda a tamaño real y sin transform.
  const ANCHO_TURNSTILE = 300;
  const turnstileWrap = cfTurnstileContainer && cfTurnstileContainer.parentElement;

  let turnstileObserver = null; // Hay que guardar la referencia: un
                                // ResizeObserver sin dueño se puede recolectar.

  const ajustarTurnstile = () => {
    if (!turnstileWrap) return;
    const disponible = turnstileWrap.clientWidth;
    const alto = cfTurnstileContainer.offsetHeight;
    // Sin ancho (wrapper oculto) o sin alto (el widget todavía no pintó) no hay
    // nada que medir. Salir sin tocar nada: fijar `height:0` acá dejaba el
    // wrapper colapsado para siempre y el widget invisible.
    if (!disponible || !alto) return;

    const escala = Math.min(1, disponible / ANCHO_TURNSTILE);
    if (escala === 1) {
      cfTurnstileContainer.style.transform = "";
      turnstileWrap.style.height = "";
      return;
    }
    cfTurnstileContainer.style.transform = `scale(${escala})`;
    // `transform` no reserva espacio en el layout: sin fijar la altura del
    // wrapper, el botón de enviar se le montaría encima al widget.
    turnstileWrap.style.height = `${Math.ceil(alto * escala)}px`;
  };

  const renderTurnstile = () => {
    const sitekey = window.ENV && window.ENV.TURNSTILE_SITEKEY;
    if (!cfTurnstileContainer || !sitekey || !window.turnstile) return false;

    turnstileWidgetId = window.turnstile.render(cfTurnstileContainer, {
      sitekey: sitekey,
      theme: "auto",
      action: "contacto"
    });
    // El widget pinta asincrónicamente, así que en el momento del render todavía
    // mide 0 de alto y no hay nada que escalar: esperamos a que tenga alto.
    let intentosAlto = 0;
    const esperaAlto = setInterval(() => {
      if (cfTurnstileContainer.offsetHeight > 0) {
        ajustarTurnstile();
        clearInterval(esperaAlto);
      } else if (++intentosAlto > 100) {
        clearInterval(esperaAlto);
      }
    }, 100);

    // Después el alto sigue cambiando según el estado del widget (verificando,
    // resuelto, error, expirado) y hay que re-medir.
    if (window.ResizeObserver && !turnstileObserver) {
      turnstileObserver = new ResizeObserver(ajustarTurnstile);
      turnstileObserver.observe(cfTurnstileContainer);
    }
    window.addEventListener("resize", ajustarTurnstile);
    return true;
  };

  if (cfTurnstileContainer && window.ENV && window.ENV.TURNSTILE_SITEKEY) {
    if (!renderTurnstile()) {
      // Reintentar hasta que api.js termine de cargar (máx ~10s).
      let intentos = 0;
      const esperaTurnstile = setInterval(() => {
        if (renderTurnstile() || ++intentos > 100) clearInterval(esperaTurnstile);
      }, 100);
    }
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Hide previous messages
      formError.style.display = "none";
      
      const formData = new FormData(contactForm);

      // Payload explícito: no dejamos que campos extra del form (ni el input
      // oculto de Turnstile) se filtren al body por accidente.
      const data = {
        name: (formData.get("name") || "").toString().trim(),
        email: (formData.get("email") || "").toString().trim(),
        phone: (formData.get("phone") || "").toString().trim(),
        company: (formData.get("company") || "").toString().trim(),
        message: (formData.get("message") || "").toString().trim()
      };

      // Validación simple adicional (HTML5 ya hace gran parte)
      if (!data.name || !data.email || !data.phone || !data.message) {
        showError("Por favor completa todos los campos requeridos.");
        return;
      }

      // Token de Turnstile: obligatorio solo si el widget está configurado.
      if (turnstileWidgetId !== null) {
        const token = window.turnstile.getResponse(turnstileWidgetId);
        if (!token) {
          showError("Por favor completá la verificación anti-spam.");
          return;
        }
        data.turnstileToken = token;
      }

      // Validar endpoint
      const webhookUrl = window.ENV ? window.ENV.N8N_WEBHOOK_URL : null;
      if (!webhookUrl) {
        showError("Error de configuración: Webhook no definido.");
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      btnText.style.display = "none";
      btnLoader.style.display = "inline-block";

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Éxito
        contactForm.style.display = "none";
        formSuccess.style.display = "block";
        
      } catch (error) {
        console.error("Error submitting form:", error);
        showError("Ocurrió un error al enviar tu mensaje. Verifica tu conexión o intenta más tarde.");
        // El token de Turnstile es de un solo uso: sin reset, el reintento
        // siempre falla la validación en n8n.
        if (turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
      } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        btnText.style.display = "inline-block";
        btnLoader.style.display = "none";
      }
    });
  }

  function showError(msg) {
    formErrorMsg.textContent = msg;
    formError.style.display = "block";
  }

});
