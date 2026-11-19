# ELECTRIZAT – Web de servicios eléctricos en Madrid

Sitio web (landing) de **ELECTRIZAT**, Calle de Tembleque, 70, Latina, 28024 Madrid.
Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · Lucide · React Hook Form + Zod.

## 1. Instalar dependencias

Requiere Node.js 18.18 o superior.

```bash
npm install
```

## 2. Ejecutar en local

```bash
npm run dev          # http://localhost:3000
npm run typecheck    # comprobación de TypeScript
npm run lint         # ESLint
npm run build && npm start   # versión de producción
```

## 3. Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores. **Nunca subas `.env.local` a GitHub** (ya está en `.gitignore`).

| Variable | Para qué sirve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (canonical, sitemap, Open Graph, JSON-LD). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Código de verificación de Google Search Console (opcional). |
| `RESEND_API_KEY` | Clave de API de [Resend](https://resend.com). Solo se usa en el servidor. |
| `CONTACT_TO_EMAIL` | Correo que recibe las solicitudes del formulario. |
| `CONTACT_FROM_EMAIL` | Remitente (dominio verificado en Resend; en pruebas `onboarding@resend.dev`). |

## 4. Probar el formulario de contacto

- **Sin credenciales, en desarrollo (`npm run dev`)**: el formulario valida y la API responde correctamente, pero **no se envía ningún email**. Los datos se muestran en la consola del servidor y la web avisa de que está en "modo de desarrollo".
- **Sin credenciales, en producción**: la API devuelve un error 503 y el formulario muestra un mensaje de error con el teléfono. No se simula un envío.
- **Con credenciales**: rellena `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`, reinicia el servidor y envía una solicitud de prueba. Con `onboarding@resend.dev` Resend solo entrega al correo con el que te registraste.
- Protección anti-spam: campo *honeypot* oculto, validación en servidor con Zod y límite básico de 5 envíos por IP cada 10 minutos (en memoria; para más protección añade un limitador persistente o CAPTCHA).

## 5. Subir a GitHub

```bash
git init
git add .
git commit -m "Web ELECTRIZAT"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/electrizat-web.git
git push -u origin main
```

## 6. Desplegar en Vercel

1. En [vercel.com](https://vercel.com) pulsa **Add New → Project** e importa el repositorio.
2. Framework: Next.js (se detecta solo). No cambies los comandos de build.
3. En **Settings → Environment Variables** añade las variables de la tabla anterior (Production y Preview).
4. Pulsa **Deploy**. Cada `git push` a `main` desplegará de nuevo.

## 7. Conectar un dominio propio

1. En Vercel: **Project → Settings → Domains → Add** y escribe tu dominio.
2. Añade en tu proveedor de DNS lo que Vercel indique (normalmente un registro `A` a `76.76.21.21` para el dominio raíz y un `CNAME` a `cname.vercel-dns.com` para `www`; usa los valores exactos que muestre Vercel).
3. Actualiza `NEXT_PUBLIC_SITE_URL` con el dominio final y vuelve a desplegar.
4. Search Console: añade la propiedad, copia el código de la meta etiqueta en `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redespliega, verifica y envía `https://tu-dominio.es/sitemap.xml`.

## Contenido editable y datos pendientes de confirmar

Todo el contenido está en `src/config/site.ts`.

- **Imágenes**: `public/images/*-placeholder.svg` son marcadores. Sustitúyelos por fotos reales (JPG/WebP) y cambia las rutas en `images` dentro de `site.ts`.
- **Servicios y descripciones**: genéricos; confirmar lista exacta con el cliente.
- **Valoración 5,0 / 65 reseñas**: datos facilitados; verificar y actualizar periódicamente. No se incluyen en el JSON-LD.
- **Reseñas**: array `reviews` vacío a propósito. Si se añaden reseñas reales, aparecen solas.
- **Enlace de Google Maps** (`googleMapsUrl`): sustituir por el enlace exacto de la ficha.
- **Horario, certificaciones, garantías, años de experiencia**: no se muestran porque no están verificados.
- **Textos legales** (`src/app/aviso-legal`, `politica-privacidad`, `politica-cookies`): marcadores `[COMPLETAR]`; están en `noindex` hasta completarlos (cambiar a `index: true` y añadir al sitemap).
- **Cookies**: no hay analítica ni cookies no esenciales, por tanto no hay banner. Si se añade analítica, hay que incluir consentimiento previo.
- **Logotipo**: provisional en texto/SVG (`src/components/logo.tsx`).

## Estructura

```
src/
  app/            layout, page, rutas legales, sitemap, robots, OG image, API (api/contact)
  components/     header, footer, botón flotante, motion, ui/
    sections/     hero, trust-bar, services, about, reviews, contact, contact-form
  config/site.ts  datos del negocio, servicios, SEO
  lib/            validación (Zod), JSON-LD, utilidades
```
