import { Map as MapIcon, Star } from "lucide-react";
import { business, reviews } from "@/config/site";
import { ButtonLink } from "../ui/button";
import { Reveal, Stagger, StaggerItem } from "../motion";

function Stars() {
  return (
    <span className="flex gap-0.5 text-amber" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" fill="currentColor" />
      ))}
    </span>
  );
}

export function Reviews() {
  const { score, outOf, reviews: count } = business.googleRating;
  return (
    <section id="opiniones" aria-labelledby="opiniones-title" className="bg-surface-low py-14 md:py-20">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Opiniones en Google</p>
          <h2 id="opiniones-title" className="mt-2 text-[1.65rem] font-bold leading-8 sm:text-4xl sm:leading-[44px]">
            La valoración de nuestros clientes
          </h2>
          <p className="mt-3 text-slate-600">
            ELECTRIZAT tiene una valoración media de {score} sobre {outOf} en Google, basada en {count} reseñas.
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow-card">
            <Stars />
            <span>
              {score} / {outOf} · {count} reseñas
            </span>
          </p>
        </Reveal>

        {reviews.length > 0 && (
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <StaggerItem key={review.author + review.text.slice(0, 12)} className="h-full">
                <figure className="flex h-full flex-col rounded-card border border-line bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <Stars />
                    {review.tag && (
                      <span className="rounded-full bg-surface-mid px-2.5 py-1 text-[11px] font-bold text-navy-700">{review.tag}</span>
                    )}
                  </div>
                  <blockquote className="mt-4 text-sm leading-6 text-slate-700">“{review.text}”</blockquote>
                  <figcaption className="mt-auto pt-5 text-sm font-semibold text-navy">{review.author} · Reseña en Google</figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-8 flex justify-center">
          <ButtonLink href={business.googleMapsUrl} variant="outline" external>
            <MapIcon className="h-4 w-4" aria-hidden="true" />
            Leer las reseñas en Google Maps
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
