import type { CSSProperties } from "react";
import { CalendarDays, Clock3, MapPin, MoveUpRight, Users } from "lucide-react";
import { Link } from "../lib/navigation";
import { Expedition, formatDate } from "../lib/site-data";
import BorderGlow from "./BorderGlow";

export function ExpeditionCard({
  expedition,
  index = 0,
  interactive = false,
}: {
  expedition: Expedition;
  index?: number;
  interactive?: boolean;
}) {
  const card = (
    <article
      className={`expedition-card ${interactive ? "magic-bento-card magic-bento-card--border-glow" : ""}`.trim()}
      style={{ "--delay": `${index * 80}ms` } as CSSProperties}
    >
      <Link to="/expeditions/$slug" params={{ slug: expedition.slug }} data-cursor="VIEW">
        <figure>
          <img src={expedition.image} alt={expedition.title} loading="lazy" />
          <figcaption>{expedition.coordinates}</figcaption>
        </figure>
        <div className="expedition-card__body">
          <div className="card-kicker">
            <span>{expedition.category}</span>
            <MoveUpRight size={16} aria-hidden="true" />
          </div>
          <h3>{expedition.title}</h3>
          <p>{expedition.description}</p>
          <dl>
            <div>
              <MapPin size={16} aria-hidden="true" />
              <span>{expedition.region}</span>
            </div>
            <div>
              <Clock3 size={16} aria-hidden="true" />
              <span>{expedition.duration}</span>
            </div>
            <div>
              <Users size={16} aria-hidden="true" />
              <span>{expedition.groupSize}</span>
            </div>
            <div>
              <CalendarDays size={16} aria-hidden="true" />
              <span>{formatDate(expedition.nextDeparture)}</span>
            </div>
          </dl>
        </div>
      </Link>
    </article>
  );

  return (
    <BorderGlow
      className="expedition-card-glow"
      edgeSensitivity={28}
      glowColor="42 76 63"
      backgroundColor="#201b13"
      borderRadius={8}
      glowRadius={24}
      glowIntensity={0.85}
      coneSpread={25}
      colors={["#e7b94f", "#b86c2e", "#64856d"]}
      fillOpacity={0.22}
    >
      {card}
    </BorderGlow>
  );
}
