import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Footprints, MapPinned } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";
import { destinations, site } from "../lib/site-data";

const description =
  "Commission short-format Derivative Bharat heritage walks for cities, institutions, private groups, and culture-led teams.";

const walks = [
  {
    title: "Old City Bazaar Walk",
    duration: "3 hours",
    place: "Delhi, Jaipur, Pune",
    copy: "Guild streets, food memory, merchant architecture, and the choreography of trade.",
  },
  {
    title: "Temple Town Field Salon",
    duration: "1 day",
    place: "Tamil Nadu and Karnataka",
    copy: "Iconography, ritual movement, inscriptions, and the daily life around sacred architecture.",
  },
  {
    title: "Fort at First Light",
    duration: "4 hours",
    place: "Maharashtra and Rajasthan",
    copy: "A rampart-led reading of water, siegecraft, gates, storage, and political theatre.",
  },
  {
    title: "Rainforest Listening Walk",
    duration: "Half day",
    place: "Western Ghats",
    copy: "Ecology, oral caution, plant names, weather behaviour, and ethical movement through forest.",
  },
];

export function HeritageWalksPage() {
  useDocumentMeta({
    title: "Heritage Walks",
    description,
    path: "/heritage-walks",
    image: destinations[5].image,
  });

  return (
    <>
      <JsonLd data={webPageSchema("Heritage Walks", description, "/heritage-walks")} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="micro-label">Heritage walks</p>
            <h1>Short routes, deep readings.</h1>
            <p>{description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container walk-grid">
          {walks.map((walk) => (
            <article key={walk.title} className="walk-tile">
              <Footprints size={24} aria-hidden="true" />
              <h2>{walk.title}</h2>
              <p>{walk.copy}</p>
              <dl>
                <div>
                  <Clock3 size={16} aria-hidden="true" />
                  <span>{walk.duration}</span>
                </div>
                <div>
                  <MapPinned size={16} aria-hidden="true" />
                  <span>{walk.place}</span>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <Reveal>
            <p className="micro-label">{site.coordinates}</p>
            <h2>Build a private walk around a question.</h2>
            <p>
              Architecture, food, ecology, inscriptions, trade, craft, battlefields, riverfronts, or a family memory
              that deserves a route.
            </p>
            <Link className="button button-primary" to="/contact">
              Commission a walk
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
