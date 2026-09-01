import { Compass, Layers3, UsersRound } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";
import { expeditions, site, storytellers } from "../lib/site-data";

const description =
  "Derivative Bharat is a heritage travel studio designing small-group journeys that combine rigorous context with cinematic place-based storytelling.";

export function AboutPage() {
  useDocumentMeta({
    title: "About",
    description,
    path: "/about",
    image: expeditions[0].image,
  });

  return (
    <>
      <JsonLd data={webPageSchema("About Derivative Bharat", description, "/about")} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="micro-label">About</p>
            <h1>A travel studio for people who want context with wonder.</h1>
            <p>{description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container icon-grid">
          {[
            {
              icon: Compass,
              title: "Route intelligence",
              copy: "Every journey begins with maps, access windows, seasonality, and a central question.",
            },
            {
              icon: Layers3,
              title: "Layered sources",
              copy: "We put archaeology, ecology, architecture, oral history, food, and craft into conversation.",
            },
            {
              icon: UsersRound,
              title: "Small groups",
              copy: "The point is attention: fewer people, better pauses, sharper questions, more humane days.",
            },
          ].map((item) => (
            <article key={item.title}>
              <item.icon size={24} aria-hidden="true" />
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <Reveal>
            <p className="micro-label">{site.legalName}</p>
            <h2>We do not flatten India into a single story.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="large-copy">
              The work is to let each place keep its complexity while making it readable. A fort can be military,
              ecological, culinary, poetic, and bureaucratic all at once. A market can be a sensory delight and a
              credit system. A temple can be devotion, labour, math, music, and public administration.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section storytellers-section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">People</p>
            <h2>Our field circle</h2>
          </Reveal>
        </div>
        <div className="container storyteller-rail">
          {storytellers.map((storyteller) => (
            <article key={storyteller.name}>
              <img src={storyteller.image} alt="" loading="lazy" />
              <h3>{storyteller.name}</h3>
              <p>{storyteller.role}</p>
              <small>{storyteller.bio}</small>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
