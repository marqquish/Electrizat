import { MapPin, MessageSquareText, Star } from "lucide-react";
import { business } from "@/config/site";
import { Stagger, StaggerItem } from "../motion";

export function TrustBar() {
  const { score, outOf, reviews } = business.googleRating;
  const items = [
    {
      icon: <Star className="h-6 w-6" fill="currentColor" aria-hidden="true" />,
      title: `${score} / ${outOf}`,
      text: "Valoración media en Google",
    },
    {
      icon: <MessageSquareText className="h-6 w-6" aria-hidden="true" />,
      title: `${reviews} reseñas`,
      text: "En Google Maps",
    },
    {
      icon: <MapPin className="h-6 w-6" aria-hidden="true" />,
      title: "Servicio en Madrid",
      text: `${business.address.street}, ${business.address.district}`,
    },
  ];

  return (
    <section aria-label="Valoración y ubicación" className="bg-surface pb-4">
      <Stagger className="container-page grid gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <StaggerItem key={item.title}>
            <div className="flex items-center gap-4 rounded-card border border-line bg-white p-5 shadow-card">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-mid text-amber-600">
                {item.icon}
              </span>
              <div>
                <p className="font-display text-xl font-bold text-navy">{item.title}</p>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
