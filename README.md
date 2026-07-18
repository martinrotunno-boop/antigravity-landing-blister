# Landing de Blister — blister.cloud

Sitio estatico: HTML, CSS y JS a mano. Sin build, sin dependencias, sin framework.
Se sirve con nginx dentro de un contenedor.

## Estructura

```
index.html    la landing entera (una sola pagina)
style.css     estilos, con temas claro y oscuro
script.js     animaciones, calculadora, FAQ, Turnstile y envio del formulario
config.js     configuracion publica (ver abajo)
assets/       tipografia Satoshi, favicons y logos
Dockerfile    nginx alpine
nginx.conf    server block
```

## config.js

Lo descarga el navegador, asi que **todo lo que tenga es publico**:

- `N8N_WEBHOOK_URL` — endpoint del workflow `Blister · Leads Landing (L01)` en n8n.
- `TURNSTILE_SITEKEY` — sitekey de Cloudflare Turnstile. Publico por diseno.

El **secret** de Turnstile no esta aca ni puede estarlo: vive cifrado en una
credencial de n8n. Lo que protege el endpoint es que n8n valida el token contra
Cloudflare del lado del servidor, no que la URL sea secreta.

## Por que nginx escucha en 80 y 3000

El servicio de Easypanel (`blister-landing-v104`) viene de la version React, que
a lo largo de su historia uso los dos puertos (ver `git log`). Como no se puede
saber desde el repo en cual quedo configurado el proxy del panel, el contenedor
atiende ambos. Cuesta nada y evita un deploy fallido por un numero.

## Historial

Hasta julio de 2026 esto era una app Vite + React + TypeScript exportada de
Lovable. Se reemplazo por esta version estatica: cubre el mismo contenido, agrega
la calculadora de ahorro, integra el formulario con n8n, y elimina el build y las
dependencias que habia que mantener para servir una sola pagina.

La version anterior quedo etiquetada:

```bash
git checkout landing-v1-react
```

## Probar local

```bash
docker build -t blister-landing .
docker run --rm -p 3000:3000 blister-landing
# http://localhost:3000
```
