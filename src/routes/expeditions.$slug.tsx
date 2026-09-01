import { Link, useParams } from "../lib/navigation";
import { ArrowRight, Check, HelpCircle, MapPin, X } from "lucide-react";
import { ExpeditionCard } from "../components/ExpeditionCard";
import { Reveal } from "../components/Reveal";
import { JsonLd, expeditionSchema, useDocumentMeta } from "../lib/seo";
import { expeditions, formatDate, getExpedition } from "../lib/site-data";
import { NotFoundPage } from "./not-found";

export function ExpeditionDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const expedition = getExpedition(slug);
  const related = expeditions.filter((item) => item.slug !== expedition?.slug).slice(0, 3);

  useDocumentMeta({
    title: expedition?.title ?? "Expedition not found",
    description: expedition?.description ?? "This Derivative Bharat expedition could not be found.",
    path: expedition ? `/expeditions/${expedition.slug}` : "/expeditions",
    image: expedition?.image,
    type: "product",
  });

  if (!expedition) {
    return <NotFoundPage />;
  }

  return (
    <>
      <JsonLd data={expeditionSchema(expedition)} />
      <section className="detail-hero">
        <img src={expedition.image} alt={expedition.title} />
        <div className="hero-scrim" />
        <div className="container detail-hero__content">
          <Reveal>
            <p className="micro-label">{expedition.category}</p>
            <h1>{expedition.title}</h1>
            <p>{expedition.story}</p>
          </Reveal>
          <div className="detail-stats">
            <span>{expedition.duration}</span>
            <span>{expedition.price}</span>
            <span>{expedition.groupSize}</span>
            <span>{formatDate(expedition.nextDeparture)}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <Reveal className="detail-main">
            <p className="micro-label">Route</p>
            <h2>{expedition.route.join(" / ")}</h2>
            <p className="large-copy">{expedition.description}</p>
            <div className="highlight-grid">
              {expedition.highlights.map((highlight) => (
                <span key={highlight}>
                  <MapPin size={16} aria-hidden="true" />
                  {highlight}
                </span>
              ))}
            </div>
          </Reveal>

          <aside className="booking-panel">
            <p className="micro-label">Next batch</p>
            <h3>{formatDate(expedition.nextDeparture)}</h3>
            <p>{expedition.season}</p>
            <Link className="button button-primary" to="/contact" data-cursor="EXPLORE">
              Enquire now
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section itinerary-section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Day by day</p>
            <h2>Itinerary</h2>
          </Reveal>
        </div>
        <div className="container itinerary-list">
          {expedition.itinerary.map((day) => (
            <Reveal key={day.day}>
              <article>
                <span>Day {day.day}</span>
                <div>
                  <small>{day.location}</small>
                  <h3>{day.title}</h3>
                  <p>{day.summary}</p>
                  <ul>
                    {day.cues.map((cue) => (
                      <li key={cue}>{cue}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container included-grid">
          <Reveal>
            <h2>Included</h2>
            <ul>
              {expedition.inclusions.map((item) => (
                <li key={item}>
                  <Check size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2>Not included</h2>
            <ul>
              {expedition.exclusions.map((item) => (
                <li key={item}>
                  <X size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h2>FAQs</h2>
            <div className="faq-list">
              {expedition.faqs.map((item) => (
                <details key={item.question}>
                  <summary>
                    <HelpCircle size={16} aria-hidden="true" />
                    {item.question}
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Continue the map</p>
            <h2>Related expeditions</h2>
          </Reveal>
        </div>
        <div className="container expedition-grid">
          {related.map((item, index) => (
            <ExpeditionCard key={item.slug} expedition={item} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
