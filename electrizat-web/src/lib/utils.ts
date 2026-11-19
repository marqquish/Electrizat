import { business } from "@/config/site";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function whatsappUrl(message: string = business.whatsappMessage): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telUrl = `tel:${business.phoneE164}`;
