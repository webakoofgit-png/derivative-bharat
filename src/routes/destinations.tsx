import { Link } from "../lib/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";
import { destinations, expeditions } from "../lib/site-data";

const description =
  "Explore Derivative Bharat destinations across Hampi, Mewar, Thanjavur, the Konkan, Agumbe, and old bazaar routes.";

export function DestinationsPage() {
  useDocumentMeta({
    title: "Destinations",
    description,
    path: "/destinations",
    image: destinations[0].image,
  });

  return (
    <>
      <JsonLd data={webPageSchema("Destinations", description, "/destinations")} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="micro-label">Destinations</p>
            <h1>Landscapes with a memory system.</h1>
            <p>{description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container destination-grid destination-grid--large">
          {destinations.map((destination) => {
            const count = expeditions.filter((item) => item.destinationSlug === destination.slug).length;
            return (
              <Link
                className="destination-card destination-card--large"
                key={destination.slug}
                to="/destinations/$slug"
                params={{ slug: destination.slug }}
                data-cursor="VIEW"
              >
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <span>{destination.coordinates}</span>
                <h2>{destination.name}</h2>
                <p>{destination.description}</p>
                <small>
                  {count} route{count === 1 ? "" : "s"} <ArrowRight size={14} aria-hidden="true" />
                </small>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
