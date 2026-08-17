document.addEventListener("DOMContentLoaded", () => {

  // --- COOKIES (opt-in de GA4, Ley 18.331) ---
  // GA4 no se carga solo: index.html deja `gtag`/`dataLayer` definidos pero
  // sin insertar el script real ni llamar a `gtag('config', ...)`. Acá se
  // decide si corresponde cargarlo, según la eleccion guardada del visitante.
  // "Rechazar" no borra cookies que ya se hayan puesto en una visita anterior
  // donde se aceptó — solo evita que se carguen de nuevo a partir de ahora.
  const COOKIE_CONSENT_KEY = "blister_cookie_consent";
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAccept = document.getElementById("cookie-accept");
  const cookieReject = document.getElementById("cookie-reject");
  const cookiePrefsLink = document.getElementById("cookie-preferences-link");

  const cargarGA4 = () => {
    if (document.getElementById("ga4-script")) return;
    const s = document.createElement("script");
    s.id = "ga4-script";
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-MTSM3406NZ";
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", "G-MTSM3406NZ");
  };

  const mostrarCookieBanner = () => { if (cookieBanner) cookieBanner.hidden = false; };
  const ocultarCookieBanner = () => { if (cookieBanner) cookieBanner.hidden = true; };

  let consentimientoGuardado = null;
  try { consentimientoGuardado = localStorage.getItem(COOKIE_CONSENT_KEY); } catch (e) {}

  if (consentimientoGuardado === "accepted") {
    cargarGA4();
  } else if (consentimientoGuardado !== "rejected") {
    mostrarCookieBanner();
  }

  if (cookieAccept) {
    cookieAccept.addEventListener("click", () => {
      try { localStorage.setItem(COOKIE_CONSENT_KEY, "accepted"); } catch (e) {}
      ocultarCookieBanner();
      cargarGA4();
    });
  }
  if (cookieReject) {
    cookieReject.addEventListener("click", () => {
      try { localStorage.setItem(COOKIE_CONSENT_KEY, "rejected"); } catch (e) {}
      ocultarCookieBanner();
    });
  }
  if (cookiePrefsLink) {
    cookiePrefsLink.addEventListener("click", (e) => {
      e.preventDefault();
      mostrarCookieBanner();
    });
  }

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

  // --- CLOUDFLARE TURNSTILE (render explícito, fábrica reutilizable) ---
  // api.js se carga async, así que esperamos a que window.turnstile exista en vez
  // de asumir que ya corrió. El render implícito por clase no se usa a propósito:
  // el sitekey viene de config.js y no está en el HTML.
  //
  // El widget de Turnstile es un iframe de 300px de ancho fijo y la API no
  // ofrece un tamaño fluido ("flexible" también tiene mínimo 300px). En un
  // teléfono ese ancho puede ser mayor que el hueco disponible, así que lo
  // escalamos para que entre. Se escala solo cuando falta lugar: en escritorio
  // queda a tamaño real y sin transform.
  //
  // Esta fábrica crea un controlador independiente por instancia: el form de
  // #contacto y el chat de L08 tienen cada uno su propio contenedor, su propio
  // widgetId y su propio `action` (Cloudflare distingue métricas por action).
  // NO comparten nada — un widgetId reusado en dos formularios reventaria la
  // logica de "token de un solo uso" del lado de n8n.
  const ANCHO_TURNSTILE = 300;

  function crearControladorTurnstile(container, action, opciones) {
    opciones = opciones || {};
    let widgetId = null;
    let observer = null; // Hay que guardar la referencia: un ResizeObserver
                          // sin dueño se puede recolectar.
    const wrap = container && container.parentElement;

    const ajustar = () => {
      if (!wrap) return;
      const disponible = wrap.clientWidth;
      const alto = container.offsetHeight;
      // Sin ancho (wrapper oculto) o sin alto (el widget todavía no pintó) no
      // hay nada que medir. Salir sin tocar nada: fijar `height:0` acá dejaba
      // el wrapper colapsado para siempre y el widget invisible.
      if (!disponible || !alto) return;

      const escala = Math.min(1, disponible / ANCHO_TURNSTILE);
      if (escala === 1) {
        container.style.transform = "";
        wrap.style.height = "";
        return;
      }
      container.style.transform = `scale(${escala})`;
      // `transform` no reserva espacio en el layout: sin fijar la altura del
      // wrapper, lo que venga después se le montaría encima al widget.
      wrap.style.height = `${Math.ceil(alto * escala)}px`;
    };

    const render = () => {
      const sitekey = window.ENV && window.ENV.TURNSTILE_SITEKEY;
      if (!container || !sitekey || !window.turnstile) return false;
      if (widgetId !== null) return true; // ya renderizado, no duplicar

      widgetId = window.turnstile.render(container, {
        sitekey: sitekey,
        theme: "auto",
        action: action,
        callback: opciones.callback,
        "expired-callback": opciones.expiredCallback,
        "error-callback": opciones.errorCallback
      });

      // El widget pinta asincrónicamente, así que en el momento del render
      // todavía mide 0 de alto y no hay nada que escalar: esperamos a que
      // tenga alto.
      let intentosAlto = 0;
      const esperaAlto = setInterval(() => {
        if (container.offsetHeight > 0) {
          ajustar();
          clearInterval(esperaAlto);
        } else if (++intentosAlto > 100) {
          clearInterval(esperaAlto);
        }
      }, 100);

      // Después el alto sigue cambiando según el estado del widget
      // (verificando, resuelto, error, expirado) y hay que re-medir.
      if (window.ResizeObserver && !observer) {
        observer = new ResizeObserver(ajustar);
        observer.observe(container);
      }
      window.addEventListener("resize", ajustar);
      return true;
    };

    // Reintenta hasta que api.js termine de cargar (máx ~10s). Se llama recién
    // cuando hace falta (ej. al abrir el panel del chat), no siempre al cargar
    // la página.
    const asegurarRenderizado = () => {
      if (render()) return;
      let intentos = 0;
      const espera = setInterval(() => {
        if (render() || ++intentos > 100) clearInterval(espera);
      }, 100);
    };

    return {
      asegurarRenderizado,
      getResponse: () => (widgetId !== null && window.turnstile ? window.turnstile.getResponse(widgetId) : ""),
      reset: () => { if (widgetId !== null && window.turnstile) window.turnstile.reset(widgetId); }
    };
  }

  const turnstileContacto = crearControladorTurnstile(cfTurnstileContainer, "contacto");
  if (cfTurnstileContainer && window.ENV && window.ENV.TURNSTILE_SITEKEY) {
    turnstileContacto.asegurarRenderizado();
  }
  // Alias para no tocar el resto del handler de envío del formulario, que ya
  // usaba `turnstileWidgetId !== null` como señal de "hay Turnstile activo".
  const turnstileWidgetId = cfTurnstileContainer ? "activo" : null;

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Hide previous messages
      formError.style.display = "none";
      
      const formData = new FormData(contactForm);

      // Payload explícito: no dejamos que campos extra del form (ni el input
      // oculto de Turnstile) se filtren al body por accidente. El honeypot es
      // la excepción: se envía a propósito para que n8n lo valide server-side.
      const data = {
        name: (formData.get("name") || "").toString().trim(),
        email: (formData.get("email") || "").toString().trim(),
        phone: (formData.get("phone") || "").toString().trim(),
        company: (formData.get("company") || "").toString().trim(),
        message: (formData.get("message") || "").toString().trim(),
        website: (formData.get("website") || "").toString().trim()
      };

      // Validación simple adicional (HTML5 ya hace gran parte)
      if (!data.name || !data.email || !data.phone || !data.message) {
        showError("Por favor completa todos los campos requeridos.");
        return;
      }

      // Token de Turnstile: obligatorio solo si el widget está configurado.
      if (turnstileWidgetId !== null) {
        const token = turnstileContacto.getResponse();
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
        if (turnstileWidgetId !== null) turnstileContacto.reset();
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


  // --- CHAT IA (L08) ---
  // Contrato con n8n (workflow "Blister · Chat IA Landing (L08)"):
  //   primer mensaje  -> POST { message, turnstileToken }
  //   siguientes      -> POST { message, sessionId }
  //   respuesta OK    -> { reply, sessionId }
  //   errores         -> { error, message } con status 400/401/403/429/502
  //
  // El historial de la charla vive en Redis del lado del servidor: acá NUNCA
  // se junta ni se manda un historial, solo el mensaje nuevo y el sessionId.
  // sessionId vive únicamente en memoria de esta pestaña (variable JS, no
  // localStorage/cookie): recargar la página fuerza una verificación nueva,
  // a propósito — evita tener que pensar en expiración de sesión guardada.
  const chatFab = document.getElementById("chat-fab");
  const chatPanel = document.getElementById("chat-panel");
  const chatClose = document.getElementById("chat-close");
  const chatMessages = document.getElementById("chat-messages");
  const chatTurnstileWrap = document.getElementById("chat-turnstile-wrap");
  const chatStatus = document.getElementById("chat-status");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");
  const cfTurnstileChatContainer = document.getElementById("cf-turnstile-chat");

  if (chatFab && chatPanel && chatForm && chatInput && chatSend) {
    let chatSessionId = null;
    let chatSending = false;
    let chatTurnstileVerified = false;

    // Turnstile propio del chat: contenedor, widgetId y action ("chat", para
    // distinguirlo de "contacto" en las métricas de Cloudflare) distintos del
    // form de #contacto. Se renderiza recién al abrir el panel la primera vez
    // -no en DOMContentLoaded- para que el token no llegue vencido al primer
    // mensaje si el visitante tarda en abrir el chat.
    const turnstileChat = crearControladorTurnstile(cfTurnstileChatContainer, "chat", {
      callback: () => {
        chatTurnstileVerified = true;
        chatTurnstileWrap.style.display = "none";
        chatInput.disabled = false;
        chatSend.disabled = false;
        setChatStatus("");
        chatInput.focus();
      },
      expiredCallback: () => {
        chatTurnstileVerified = false;
        // Si ya hay sessionId, el servidor ya usó ese token para crear la
        // sesión: que venza en el navegador después no afecta nada.
        if (!chatSessionId) {
          chatInput.disabled = true;
          chatSend.disabled = true;
          chatTurnstileWrap.style.display = "block";
          setChatStatus("La verificación venció. Resolvela de nuevo para seguir.");
        }
      },
      errorCallback: () => {
        setChatStatus("No pudimos cargar la verificación anti-spam. Recargá la página.");
      }
    });

    function setChatStatus(msg) {
      chatStatus.textContent = msg || "";
    }

    function addBubble(text, kind) {
      // textContent siempre, nunca innerHTML: ni el mensaje del visitante ni
      // la respuesta del modelo se interpretan como HTML. El system prompt ya
      // le pide texto plano al modelo (ver nota del workflow L08); esto es la
      // segunda capa, del lado del cliente.
      const bubble = document.createElement("p");
      bubble.className = "chat-bubble chat-bubble-" + kind;
      bubble.textContent = text;
      chatMessages.appendChild(bubble);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return bubble;
    }

    function showTyping() {
      const typing = document.createElement("div");
      typing.className = "chat-typing";
      typing.id = "chat-typing-indicator";
      const s1 = document.createElement("span");
      const s2 = document.createElement("span");
      const s3 = document.createElement("span");
      typing.append(s1, s2, s3);
      chatMessages.appendChild(typing);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
      const typing = document.getElementById("chat-typing-indicator");
      if (typing) typing.remove();
    }

    function openChat() {
      chatPanel.hidden = false;
      chatFab.setAttribute("aria-expanded", "true");
      if (chatMessages.childElementCount === 0) {
        addBubble("Hola. Contanos qué proceso te está consumiendo más tiempo y vemos cómo ayudarte. Si preferís hablar con una persona, escribinos por WhatsApp.", "bot");
      }
      if (!chatSessionId && !chatTurnstileVerified) {
        turnstileChat.asegurarRenderizado();
      }
      chatInput.focus();
    }

    function closeChat() {
      chatPanel.hidden = true;
      chatFab.setAttribute("aria-expanded", "false");
      chatFab.focus();
    }

    chatFab.addEventListener("click", openChat);
    chatClose.addEventListener("click", closeChat);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !chatPanel.hidden) closeChat();
    });

    // Autoexpandir el textarea (hasta el max-height fijado en CSS).
    chatInput.addEventListener("input", () => {
      chatInput.style.height = "auto";
      chatInput.style.height = chatInput.scrollHeight + "px";
    });

    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (chatSending) return;

      const texto = chatInput.value.trim();
      if (!texto) return;
      if (texto.length > 500) {
        setChatStatus("Tu mensaje es muy largo (máximo 500 caracteres).");
        return;
      }

      const webhookUrl = window.ENV ? window.ENV.N8N_CHAT_WEBHOOK_URL : null;
      if (!webhookUrl) {
        setChatStatus("El chat no está disponible por ahora. Escribinos por WhatsApp.");
        return;
      }

      const payload = { message: texto };
      if (chatSessionId) {
        payload.sessionId = chatSessionId;
      } else {
        const token = turnstileChat.getResponse();
        if (!token) {
          setChatStatus("Verificá que no sos un robot para empezar.");
          return;
        }
        payload.turnstileToken = token;
      }

      addBubble(texto, "user");
      chatInput.value = "";
      chatInput.style.height = "auto";
      setChatStatus("");
      chatSending = true;
      chatSend.disabled = true;
      chatInput.disabled = true;
      showTyping();

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        });

        let data = null;
        try { data = await response.json(); } catch (parseErr) { data = null; }

        hideTyping();

        if (response.ok && data && data.reply) {
          chatSessionId = data.sessionId || chatSessionId;
          addBubble(data.reply, "bot");
        } else if (response.status === 401 || response.status === 403) {
          // Sesión vencida o token de Turnstile inválido: en los dos casos el
          // arreglo es el mismo, pedir una verificación nueva (el token de
          // Turnstile es de un solo uso y expira solo, así que un 403 en el
          // primer mensaje casi siempre es eso, no un ataque).
          chatSessionId = null;
          chatTurnstileVerified = false;
          turnstileChat.reset();
          chatTurnstileWrap.style.display = "block";
          setChatStatus(response.status === 401
            ? "Tu sesión venció. Verificá de nuevo para seguir la charla."
            : "La verificación anti-spam no fue válida. Verificá de nuevo.");
        } else if (response.status === 429) {
          setChatStatus((data && data.message) || "Alcanzaste el límite de mensajes por ahora. Escribinos por WhatsApp si querés seguir.");
        } else if (response.status === 400) {
          setChatStatus((data && data.message) || "Revisá tu mensaje e intentá de nuevo.");
        } else {
          setChatStatus("No pudimos procesar tu consulta. Intentá de nuevo en unos minutos o escribinos por WhatsApp.");
        }
      } catch (error) {
        console.error("Error en el chat:", error);
        hideTyping();
        setChatStatus("Error de conexión. Revisá tu internet e intentá de nuevo.");
      } finally {
        chatSending = false;
        // Si estamos esperando una verificación de Turnstile nueva (sesión
        // vencida / token inválido) el input sigue deshabilitado; si no, se
        // reactiva para que el visitante pueda seguir escribiendo.
        const esperandoVerificacion = !chatSessionId && !chatTurnstileVerified;
        chatInput.disabled = esperandoVerificacion;
        chatSend.disabled = esperandoVerificacion;
        if (!esperandoVerificacion) chatInput.focus();
      }
    });
  }

});
