import { Link } from "../lib/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";
import { departures, expeditions, formatDate } from "../lib/site-data";

const description =
  "Upcoming Derivative Bharat group departures with dates, prices, seat status, and route details.";

export function DeparturesPage() {
  useDocumentMeta({
    title: "Departures",
    description,
    path: "/departures",
    image: expeditions[3].image,
  });

  return (
    <>
      <JsonLd data={webPageSchema("Departures", description, "/departures")} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="micro-label">Departures</p>
            <h1>Dates for travellers who like their history alive.</h1>
            <p>{description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container departure-list">
          {departures.map((departure) => (
            <Link key={departure.id} className="departure-row" to="/expeditions/$slug" params={{ slug: departure.slug }}>
              <span className="departure-date">
                <CalendarDays size={18} aria-hidden="true" />
                {formatDate(departure.date)}
              </span>
              <strong>{departure.expedition}</strong>
              <span>{departure.region}</span>
              <span>{departure.duration}</span>
              <span>{departure.price}</span>
              <small>{departure.seats}</small>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
