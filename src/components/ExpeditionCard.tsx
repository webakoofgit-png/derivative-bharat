import type { CSSProperties } from "react";
import { CalendarDays, Clock3, MapPin, MoveUpRight, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Expedition, formatDate } from "../lib/site-data";

export function ExpeditionCard({ expedition, index = 0 }: { expedition: Expedition; index?: number }) {
  return (
    <article className="expedition-card" style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
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
}
