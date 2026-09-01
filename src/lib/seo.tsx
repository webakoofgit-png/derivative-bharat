import { useEffect } from "react";
import { Expedition, JournalArticle, site } from "./site-data";

type MetaConfig = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
};

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
}

function ensureLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.href = href;
}

export function useDocumentMeta(config: MetaConfig) {
  useEffect(() => {
    const title = config.title.includes(site.name) ? config.title : `${config.title} | ${site.name}`;
    const canonical = `${site.url}${config.path ?? window.location.pathname}`;
    const image = config.image ? new URL(config.image, window.location.origin).toString() : `${site.url}/og.jpg`;

    document.title = title;
    ensureMeta('meta[name="description"]', { name: "description", content: config.description });
    ensureMeta('meta[name="theme-color"]', { name: "theme-color", content: "#171311" });
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: title });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: config.description,
    });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: config.type ?? "website" });
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    ensureMeta('meta[property="og:image"]', { property: "og:image", content: image });
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: config.description,
    });
    ensureLink("canonical", canonical);
  }, [config.description, config.image, config.path, config.title, config.type]);
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: site.sameAs,
  };
}

export function webPageSchema(title: string, description: string, path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${site.url}${path}`,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };
}

export function expeditionSchema(expedition: Expedition) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: expedition.title,
    description: expedition.description,
    image: expedition.image,
    touristType: "Cultural heritage travellers",
    itinerary: expedition.route.join(" - "),
    provider: {
      "@type": "TravelAgency",
      name: site.name,
      url: site.url,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: expedition.price.replace(/\D/g, ""),
      availability: "https://schema.org/InStock",
      validFrom: expedition.nextDeparture,
    },
  };
}

export function articleSchema(article: JournalArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };
}
