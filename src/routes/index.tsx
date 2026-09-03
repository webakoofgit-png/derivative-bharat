import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  Compass,
  Landmark,
  Map,
  Quote,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "../lib/navigation";
import { ExpeditionCard } from "../components/ExpeditionCard";
import MagicBento from "../components/MagicBento";
import { MaskedLines, Reveal } from "../components/Reveal";
import { JsonLd, webPageSchema, useDocumentMeta } from "../lib/seo";
import {
  departures,
  destinations,
  expeditions,
  formatDate,
  journalArticles,
  site,
  storytellers,
  storyCategories,
  travellerQuotes,
} from "../lib/site-data";
import homeHeroVideo from "../../From Klickpin.com- Use these 20 Dreamy side hustle ideas that instantly upgrade your space style or celebration without much effort for beginners.mp4";

const homeDescription =
  "Derivative Bharat designs premium small-group heritage expeditions and private culture walks across India with historians, naturalists, and local storytellers.";

const rituals = [
  "Field brief",
  "Slow walk",
  "Source reading",
  "Shared table",
  "Route map",
  "Departure notes",
];

const sortedDepartures = [...departures].sort((a, b) => a.date.localeCompare(b.date));

const heroProof = [
  { value: "6", label: "Curated expedition routes" },
  { value: "14", label: "Traveller group cap" },
  { value: "28", label: "Guided field sessions" },
];

const qualityStandards = [
  {
    icon: BadgeCheck,
    title: "Specialist Led",
    copy: "Historians, naturalists, conservation voices, and local researchers shape every route.",
  },
  {
    icon: ShieldCheck,
    title: "Carefully Hosted",
    copy: "Days are planned around access windows, weather, comfort, pacing, and responsible movement.",
  },
  {
    icon: Landmark,
    title: "Context First",
    copy: "You leave with maps, source notes, and a sharper way to read the landscape.",
  },
  {
    icon: UsersRound,
    title: "Small By Design",
    copy: "Groups stay intimate so the journey can hold better questions and quieter places.",
  },
];

const homeFaqs = [
  {
    question: "How is this different from a regular tour?",
    answer:
      "The route is designed around story, source, place, and pace. You travel with specialists and local voices, not only a checklist.",
  },
  {
    question: "Do I need historical knowledge before joining?",
    answer:
      "No. Curiosity is enough. We build context on the move with maps, site readings, and field notes.",
  },
  {
    question: "Are private groups available?",
    answer:
      "Yes. Families, institutions, and small teams can commission private departures around a theme or region.",
  },
];

const galleryTours = [
  ...expeditions.map((expedition) => ({
    id: `expedition-${expedition.slug}`,
    title: expedition.shortTitle,
    image: expedition.image,
    alt: expedition.title,
  })),
  ...destinations.map((destination) => ({
    id: `destination-${destination.slug}`,
    title: destination.name,
    image: destination.image,
    alt: `${destination.name}: ${destination.mood}`,
  })),
  {
    id: "field-salon",
    title: "Field Salons",
    image: expeditions[0].image,
    alt: "Field salon heritage journey",
  },
  {
    id: "fort-lines",
    title: "Fort Lines",
    image: expeditions[3].image,
    alt: "Fort landscape heritage journey",
  },
  {
    id: "market-walks",
    title: "Market Walks",
    image: expeditions[5].image,
    alt: "Market walk heritage journey",
  },
];

export function HomePage() {
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  useDocumentMeta({
    title: "Derivative Bharat",
    description: homeDescription,
    path: "/",
    image: expeditions[0].image,
  });

  return (
    <>
      <JsonLd data={webPageSchema(site.name, homeDescription, "/")} />

      <section className="hero home-hero">
        <div className="hero-media">
          <video
            className={heroVideoReady ? "is-ready" : ""}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setHeroVideoReady(true)}
            aria-label="Heritage travel video background"
          >
            <source src={homeHeroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-scrim" />
        <div className="container hero-content hero-shell">
          <div className="hero-main">
            <Reveal delay={0.05}>
              <p className="micro-label">Premium heritage expeditions across India</p>
            </Reveal>
            <MaskedLines as="h1" lines={["Derivative", "Bharat"]} immediate />
            <Reveal delay={0.2}>
              <p className="hero-copy">
                Private culture walks and small-group journeys through forts, temple towns, rainforests, markets,
                and river landscapes, led by specialists who know how to read a place.
              </p>
            </Reveal>
            <Reveal className="hero-actions" delay={0.3}>
              <Link className="button button-primary" to="/contact" data-cursor="EXPLORE">
                Plan a journey
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button-ghost" to="/expeditions" data-cursor="VIEW">
                Explore routes
              </Link>
            </Reveal>
            <Reveal delay={0.38}>
              <ul className="hero-proof" aria-label="Derivative Bharat at a glance">
                {heroProof.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="hero-planner" delay={0.26}>
            <span className="planner-kicker">Now booking</span>
            <h2>2026 field departures</h2>
            <p>Choose a hosted batch or commission a route around your dates.</p>
            <div className="planner-list">
              {sortedDepartures.slice(0, 3).map((departure) => (
                <Link key={departure.id} to="/expeditions/$slug" params={{ slug: departure.slug }} data-cursor="VIEW">
                  <span>{formatDate(departure.date)}</span>
                  <strong>{departure.expedition}</strong>
                  <small>{departure.seats}</small>
                </Link>
              ))}
            </div>
            <Link className="planner-link" to="/departures" data-cursor="VIEW">
              See all departures <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container split-grid">
          <Reveal className="intro-visual editorial-stack">
            <figure className="intro-figure intro-figure--editorial" data-cursor="VIEW">
              <img
                src={expeditions[0].image}
                alt="Sunrise over the Hampi heritage landscape"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Hampi / Empire in Stone</figcaption>
            </figure>
            <div className="editorial-note">
              <CheckCircle2 size={20} aria-hidden="true" />
              <span>
                <strong>Field-tested, not template-made</strong>
                <small>Routes are paced around access, weather, terrain, and the story each place can hold.</small>
              </span>
            </div>
          </Reveal>
          <Reveal className="intro-copy-panel" delay={0.1}>
            <p className="micro-label">The standard</p>
            <p className="large-copy">
              Serious context, beautiful days, and logistics that feel calm in the background. Every journey is
              designed to help travellers notice more, move better, and remember clearly.
            </p>
            <div className="standard-grid">
              {qualityStandards.map((item) => (
                <article key={item.title}>
                  <item.icon size={21} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Featured routes</p>
            <h2>Expeditions with a plot.</h2>
          </Reveal>
          <Link to="/expeditions" className="text-link" data-cursor="VIEW">
            All expeditions <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <MagicBento
          className="container expedition-grid"
          textAutoHide={false}
          enableStars
          enableSpotlight
          enableBorderGlow
          enableTilt
          enableMagnetism
          clickEffect
          spotlightRadius={280}
          particleCount={10}
          glowColor="214, 166, 67"
        >
          {expeditions.slice(0, 3).map((expedition, index) => (
            <Reveal key={expedition.slug} delay={index * 0.08}>
              <ExpeditionCard expedition={expedition} index={index} interactive />
            </Reveal>
          ))}
        </MagicBento>
      </section>

      <section className="section map-section">
        <div className="container map-layout">
          <Reveal>
            <p className="micro-label">Route grammar</p>
            <h2>A route should earn your time.</h2>
            <p>
              Each journey is built as a sequence of thresholds: entry, ascent, crossing, meal, archive, shrine,
              market, forest edge, and return. The result is structured enough to trust and spacious enough to feel alive.
            </p>
          </Reveal>
          <Reveal className="route-board" delay={0.15}>
            {expeditions.map((expedition) => (
              <Link key={expedition.slug} to="/expeditions/$slug" params={{ slug: expedition.slug }}>
                <span>
                  <strong>{expedition.shortTitle}</strong>
                  <em>{expedition.region} / {expedition.duration}</em>
                </span>
                <small>{expedition.price}</small>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section stories-section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Story categories</p>
            <h2>What we look for.</h2>
          </Reveal>
        </div>
        <div className="container story-grid">
          {storyCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.06}>
              <article className="story-tile">
                <Sparkles size={22} aria-hidden="true" />
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section gallery-section">
        <div className="gallery-strip" aria-label="Featured heritage tours carousel">
          {[...galleryTours, ...galleryTours].map((tour, index) => (
            <figure key={`${tour.id}-${index}`} data-cursor="VIEW" aria-hidden={index >= galleryTours.length ? true : undefined}>
              <img src={tour.image} alt={tour.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" />
              <figcaption>{tour.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section departures-band">
        <div className="container departure-ticker">
          <div className="departure-ticker__intro">
            <p className="micro-label">Next departures</p>
            <h2>Clear dates, small groups.</h2>
          </div>
          {sortedDepartures.slice(0, 4).map((departure) => (
            <Link key={departure.id} to="/expeditions/$slug" params={{ slug: departure.slug }}>
              <CalendarDays size={18} aria-hidden="true" />
              <span>{formatDate(departure.date)}</span>
              <strong>{departure.expedition}</strong>
              <small>{departure.seats}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section destination-section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Destinations</p>
            <h2>Six landscapes, six ways of reading.</h2>
          </Reveal>
        </div>
        <div className="container destination-grid">
          {destinations.map((destination, index) => (
            <Reveal key={destination.slug} delay={index * 0.05}>
              <Link className="destination-card" to="/destinations/$slug" params={{ slug: destination.slug }} data-cursor="VIEW">
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <span>{destination.coordinates}</span>
                <h3>{destination.name}</h3>
                <p>{destination.mood}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section ritual-section">
        <div className="container split-grid">
          <Reveal>
            <p className="micro-label">Method</p>
            <h2>Every day has a rhythm.</h2>
          </Reveal>
          <div className="ritual-list">
            {rituals.map((ritual, index) => (
              <Reveal key={ritual} delay={index * 0.05}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{ritual}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section storytellers-section">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Storytellers</p>
            <h2>Specialists with dust on their shoes.</h2>
          </Reveal>
        </div>
        <div className="container storyteller-rail">
          {storytellers.map((storyteller) => (
            <article key={storyteller.name}>
              <span className="storyteller-avatar" aria-hidden="true">
                {storyteller.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <h3>{storyteller.name}</h3>
              <p>{storyteller.role}</p>
              <small>{storyteller.base}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="section walks-preview">
        <div className="container walk-card">
          <Reveal>
            <p className="micro-label">Heritage walks</p>
            <h2>Shorter routes for cities with deep time.</h2>
            <p>
              Commission a three-hour walk, a full-day field salon, or a private weekend around architecture,
              markets, foodways, inscriptions, or ecology.
            </p>
            <Link className="button button-primary" to="/heritage-walks" data-cursor="EXPLORE">
              Open walks
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section journal-preview">
        <div className="container section-heading">
          <Reveal>
            <p className="micro-label">Journal</p>
            <h2>Field notes from the road.</h2>
          </Reveal>
          <Link to="/journal" className="text-link" data-cursor="VIEW">
            Read journal <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="container journal-grid">
          {journalArticles.slice(0, 3).map((article) => (
            <article key={article.slug} className="journal-card">
              <img src={article.image} alt="" loading="lazy" />
              <small>{article.category}</small>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section quote-section">
        <div className="container quote-grid">
          {travellerQuotes.map((item) => (
            <figure key={item.name}>
              <Quote size={26} aria-hidden="true" />
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                {item.name} / {item.trip}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section toolkit-section">
        <div className="container icon-grid">
          {[
            { icon: Compass, title: "Field-led", copy: "Routes are designed by people who have walked them slowly." },
            { icon: Map, title: "Mapped", copy: "Every traveller gets a route map and source packet." },
            { icon: BookOpenText, title: "Layered", copy: "Formal history sits beside oral memory and living practice." },
            { icon: RouteIcon, title: "Small", copy: "Groups stay small enough to ask real questions." },
          ].map((item) => (
            <article key={item.title}>
              <item.icon size={24} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq-section">
        <div className="container split-grid">
          <Reveal>
            <p className="micro-label">Questions</p>
            <h2>Before you join.</h2>
          </Reveal>
          <div className="faq-list">
            {homeFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <Reveal>
            <p className="micro-label">Private planning</p>
            <h2>Build a route around your dates.</h2>
            <p>
              Share the region, travel window, group size, and the story you want to follow. We will shape the
              right hosted departure, private walk, or custom cultural journey.
            </p>
            <Link className="button button-primary" to="/contact" data-cursor="EXPLORE">
              Start planning
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
