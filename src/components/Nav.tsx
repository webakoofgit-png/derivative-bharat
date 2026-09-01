import type { CSSProperties } from "react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "../lib/navigation";
import { Menu, Search, X } from "lucide-react";
import { destinations, expeditions, journalArticles } from "../lib/site-data";
import GooeyNav from "./GooeyNav";

const navItems = [
  { label: "Expeditions", to: "/expeditions" },
  { label: "Destinations", to: "/destinations" },
  { label: "Walks", to: "/heritage-walks" },
  { label: "Departures", to: "/departures" },
  { label: "Journal", to: "/journal" },
];

type SearchResult = {
  label: string;
  eyebrow: string;
  href: string;
  image: string;
};

export function Nav() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const isHeroRoute = pathname === "/";

  const searchResults = useMemo<SearchResult[]>(() => {
    const source = [
      ...expeditions.map((item) => ({
        label: item.title,
        eyebrow: `${item.category} / ${item.region}`,
        href: `/expeditions/${item.slug}`,
        image: item.image,
      })),
      ...destinations.map((item) => ({
        label: item.name,
        eyebrow: `Destination / ${item.region}`,
        href: `/destinations/${item.slug}`,
        image: item.image,
      })),
      ...journalArticles.map((item) => ({
        label: item.title,
        eyebrow: `${item.category} / ${item.readTime}`,
        href: "/journal",
        image: item.image,
      })),
    ];

    if (!query.trim()) {
      return source.slice(0, 6);
    }

    const normalized = query.toLowerCase();
    return source.filter((item) => `${item.label} ${item.eyebrow}`.toLowerCase().includes(normalized)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("has-overlay", menuOpen || searchOpen);
  }, [menuOpen, searchOpen]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstResult = searchResults[0];
    if (firstResult) {
      navigate(firstResult.href);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header className={`site-nav ${isHeroRoute && !isScrolled ? "is-over-hero" : "is-solid"}`}>
        <Link className="brand-mark" to="/" data-cursor="EXPLORE">
          <span className="brand-mark__seal">DB</span>
          <span>
            <strong>Derivative Bharat</strong>
            <small>Heritage Storytelling Journeys</small>
          </span>
        </Link>

        <GooeyNav
          className="site-gooey-nav"
          items={navItems.map((item) => ({ label: item.label, href: item.to }))}
          activeIndex={navItems.findIndex((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))}
          onNavigate={navigate}
          particleCount={12}
          particleDistances={[76, 12]}
          particleR={86}
          animationTime={560}
          timeVariance={240}
          colors={[1, 2, 3, 1, 4]}
        />

        <div className="nav-actions">
          <button
            className="icon-button"
            type="button"
            aria-label="Search"
            title="Search"
            data-cursor="PLAY"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={19} aria-hidden="true" />
          </button>
          <Link className="nav-cta" to="/contact" data-cursor="EXPLORE">
            Plan
          </Link>
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label="Open menu"
            title="Menu"
            data-cursor="PLAY"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={21} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <button
          className="icon-button overlay-close"
          type="button"
          aria-label="Close menu"
          title="Close"
          onClick={() => setMenuOpen(false)}
        >
          <X size={24} aria-hidden="true" />
        </button>
        <nav>
          {[{ label: "Home", to: "/" }, ...navItems, { label: "About", to: "/about" }, { label: "Contact", to: "/contact" }].map(
            (item, index) => (
              <Link key={item.to} to={item.to} style={{ "--i": index } as CSSProperties}>
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>

      <div className={`search-overlay ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
        <button
          className="icon-button overlay-close"
          type="button"
          aria-label="Close search"
          title="Close"
          onClick={() => setSearchOpen(false)}
        >
          <X size={24} aria-hidden="true" />
        </button>
        <form className="search-panel" onSubmit={submitSearch}>
          <label htmlFor="site-search">Search the archive</label>
          <div className="search-input">
            <Search size={24} aria-hidden="true" />
            <input
              id="site-search"
              type="search"
              value={query}
              autoComplete="off"
              placeholder="Hampi, forts, rainforest..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="search-results">
            {searchResults.map((item) => (
              <Link key={`${item.href}-${item.label}`} to={item.href} data-cursor="VIEW">
                <img src={item.image} alt="" loading="lazy" />
                <span>
                  <small>{item.eyebrow}</small>
                  <strong>{item.label}</strong>
                </span>
              </Link>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}
