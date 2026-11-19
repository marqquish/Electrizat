import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Las páginas legales son marcadores sin contenido final: no se incluyen hasta completarlas.
  return [{ url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 }];
}
