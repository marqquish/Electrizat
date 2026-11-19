import { business, SITE_URL } from "@/config/site";

/**
 * JSON-LD tipo Electrician. Solo incluye datos verificados:
 * NO se añaden aggregateRating, reseñas, horarios ni coordenadas sin confirmar.
 */
export function electricianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    url: SITE_URL,
    telephone: business.phoneE164,
    image: `${SITE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      postalCode: business.address.postalCode,
      addressRegion: "Madrid",
      addressCountry: business.address.country,
    },
    areaServed: { "@type": "City", name: "Madrid" },
    sameAs: [business.instagramUrl],
    hasMap: business.googleMapsUrl,
  };
}
