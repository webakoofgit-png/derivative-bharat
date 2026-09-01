import { FormEvent } from "react";
import { Link } from "../lib/navigation";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { destinations, site } from "../lib/site-data";
import TextLoop from "./TextLoop";

export function Footer() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
  };

  return (
    <footer className="site-footer">
      <TextLoop
        className="footer-text-loop"
        text="DERIVATIVE BHARAT"
        shape="wave"
        speed={54}
        direction="forward"
        separator="*"
        curviness={42}
        fontSize={54}
        fontWeight={800}
        letterSpacing={3}
        color="var(--gold)"
        ribbon={false}
        pauseOnHover
        preserveAspectRatio="none"
      />

      <div className="footer-grid">
        <div>
          <p className="micro-label">Coordinates</p>
          <h2>Journeys that make a country legible.</h2>
          <p>
            Small-group heritage expeditions across forts, temple towns, forests, markets, and river landscapes.
          </p>
        </div>

        <form className="newsletter" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email">Field notes by email</label>
          <div>
            <Mail size={18} aria-hidden="true" />
            <input id="newsletter-email" type="email" placeholder="you@example.com" required />
            <button type="submit" aria-label="Subscribe" title="Subscribe">
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        </form>

        <nav aria-label="Footer navigation">
          <Link to="/expeditions">Expeditions</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/heritage-walks">Heritage Walks</Link>
          <Link to="/departures">Departures</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-destinations">
          {destinations.slice(0, 4).map((destination) => (
            <Link key={destination.slug} to="/destinations/$slug" params={{ slug: destination.slug }}>
              <MapPin size={14} aria-hidden="true" />
              {destination.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-wordmark">
        <svg viewBox="0 0 1200 180" preserveAspectRatio="none" role="img" aria-label={site.name}>
          <text x="0" y="145" textLength="1200" lengthAdjust="spacingAndGlyphs">{site.name}</text>
        </svg>
      </div>
      <div className="footer-bottom">
        <span>{site.coordinates}</span>
        <span>{site.email}</span>
        <span>2026</span>
      </div>
    </footer>
  );
}
