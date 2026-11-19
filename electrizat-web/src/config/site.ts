/**
 * Configuración central del negocio.
 * Todo el contenido editable vive aquí. Los campos marcados con "PENDIENTE"
 * no están verificados: confírmalos con el cliente antes de publicar.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tu-dominio.es").replace(/\/$/, "");

export const business = {
  name: "ELECTRIZAT",
  tagline: "Servicios eléctricos en Madrid",
  phoneDisplay: "612 46 62 28",
  phoneE164: "+34612466228",
  /** Formato internacional sin "+" para wa.me */
  whatsappNumber: "34612466228",
  whatsappMessage: "Hola, vengo desde la web de ELECTRIZAT y me gustaría pedir presupuesto.",
  instagramUrl: "https://www.instagram.com/electrizat/",
  instagramHandle: "@electrizat",
  address: {
    street: "Calle de Tembleque, 70",
    district: "Latina",
    postalCode: "28024",
    city: "Madrid",
    country: "ES",
  },
  /**
   * Enlace a la ficha de Google Maps.
   * PENDIENTE: sustituir por el enlace exacto de la ficha (botón "Compartir" en Google Maps).
   */
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=ELECTRIZAT+Calle+de+Tembleque+70+28024+Madrid",
  /** Datos facilitados por el negocio. Se muestran en la web, NO se envían a datos estructurados. */
  googleRating: { score: "5,0", outOf: "5", reviews: 65 },
  /** PENDIENTE: horario no verificado, por eso no se muestra. */
  openingHours: null as string | null,
} as const;

export const fullAddress = `${business.address.street}, ${business.address.district}, ${business.address.postalCode} ${business.address.city}`;

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
] as const;

export type ServiceIcon = "install" | "repair" | "light" | "plug" | "maintenance";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  /** Texto de la opción en el selector del formulario */
  formLabel: string;
}

/**
 * PENDIENTE: confirmar con el cliente la lista exacta de servicios y sus descripciones.
 * Las descripciones son deliberadamente genéricas para no atribuir capacidades no verificadas.
 */
export const services: Service[] = [
  {
    id: "instalaciones",
    title: "Instalaciones eléctricas",
    description:
      "Instalación y renovación eléctrica para viviendas, locales y negocios. Cuéntanos tu caso y te orientamos.",
    icon: "install",
    formLabel: "Instalación eléctrica",
  },
  {
    id: "reparaciones",
    title: "Reparaciones y averías",
    description:
      "Revisión y reparación de problemas eléctricos: cortes de luz, saltos del diferencial o enchufes que no funcionan.",
    icon: "repair",
    formLabel: "Reparación o avería",
  },
  {
    id: "iluminacion",
    title: "Iluminación y LED",
    description:
      "Puntos de luz e iluminación LED para el hogar y el negocio, adaptados a lo que necesites.",
    icon: "light",
    formLabel: "Iluminación y LED",
  },
  {
    id: "enchufes",
    title: "Enchufes e interruptores",
    description:
      "Instalación y sustitución de enchufes, interruptores y mecanismos eléctricos.",
    icon: "plug",
    formLabel: "Enchufes e interruptores",
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento eléctrico",
    description:
      "Revisiones y mantenimiento de instalaciones eléctricas en viviendas, comunidades, locales y oficinas.",
    icon: "maintenance",
    formLabel: "Mantenimiento eléctrico",
  },
];

export const otherServiceOption = { id: "otro", formLabel: "Otro trabajo eléctrico" } as const;

export const benefits = [
  { icon: "user", title: "Atención cercana", text: "Trato directo y asesoramiento según lo que realmente necesitas." },
  { icon: "chat", title: "Contacto fácil", text: "Llámanos o escríbenos por WhatsApp, con fotos si te ayudan a explicar el problema." },
  { icon: "quote", title: "Presupuesto claro", text: "Solicita tu presupuesto y consulta los detalles con nosotros antes de empezar." },
  { icon: "pin", title: "En tu barrio", text: "Estamos en Latina (Madrid) y atendemos Madrid y alrededores." },
] as const;

export interface Review {
  author: string;
  text: string;
  /** Etiqueta corta opcional, p. ej. "Rapidez" */
  tag?: string;
}

/**
 * Reseñas reales de Google. Se deja vacío a propósito: NO inventar reseñas.
 * Cuando el cliente autorice copiar reseñas concretas, añádelas aquí y se mostrarán solas.
 */
export const reviews: Review[] = [];

export const images = {
  /** Sustituye por una foto real: copia el archivo en /public/images y cambia la ruta. */
  hero: { src: "/images/hero-placeholder.svg", width: 1000, height: 1100, alt: "Electricista revisando un cuadro eléctrico (imagen de ejemplo, sustituir por foto real)" },
  about: { src: "/images/about-placeholder.svg", width: 1200, height: 900, alt: "Instalación eléctrica en una vivienda (imagen de ejemplo, sustituir por foto real)" },
} as const;

export const seo = {
  title: "Electricistas en Madrid | ELECTRIZAT – Servicios eléctricos en Latina",
  description:
    "ELECTRIZAT: electricistas en Madrid (Latina). Instalaciones eléctricas, reparaciones, iluminación LED y mantenimiento. Pide presupuesto por teléfono, WhatsApp o formulario.",
};
