import { Link, useParams } from "../lib/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { ExpeditionCard } from "../components/ExpeditionCard";
import { Reveal } from "../components/Reveal";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";
import { getDestination, getExpeditionsForDestination } from "../lib/site-data";
import { NotFoundPage } from "./not-found";

export function DestinationDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const destination = getDestination(slug);
  const destinationExpeditions = getExpeditionsForDestination(slug);

  useDocumentMeta({
    title: destination?.name ?? "Destination not found",
    description: destination?.description ?? "This Derivative Bharat destination could not be found.",
    path: destination ? `/destinations/${destination.slug}` : "/destinations",
    image: destination?.image,
  });

  if (!destination) {
    return <NotFoundPage />;
  }

  return (
    <>
      <JsonLd data={webPageSchema(destination.name, destination.description, `/destinations/${destination.slug}`)} />
      <section className="detail-hero detail-hero--destination">
        <img src={destination.image} alt={destination.name} />
        <div className="hero-scrim" />
        <div className="container detail-hero__content">
          <Reveal>
            <p className="micro-label">{destination.region}</p>
            <h1>{destination.name}</h1>
            <p>{destination.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <Reveal className="detail-main">
            <p className="micro-label">Signature reads</p>
            <h2>{destination.mood}</h2>
            <div className="highlight-grid">
              {destination.signature.map((item) => (
                <span key={item}>
                  <MapPin size={16} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
          <aside className="booking-panel">
            <p className="micro-label">Coordinates</p>
            <h3>{destination.coordinates}</h3>
            <Link className="button button-primary" to="/contact">
              Plan this route
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Available journeys</p>
            <h2>Expeditions in {destination.name}</h2>
          </Reveal>
        </div>
        <div className="container expedition-grid">
          {destinationExpeditions.map((expedition, index) => (
            <ExpeditionCard key={expedition.slug} expedition={expedition} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
