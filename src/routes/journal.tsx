import { BookOpenText } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { JsonLd, articleSchema, useDocumentMeta, webPageSchema } from "../lib/seo";
import { formatDate, journalArticles } from "../lib/site-data";

const description =
  "Field notes from Derivative Bharat on forts, temples, bazaars, rainforests, route design, and heritage travel.";

export function JournalPage() {
  useDocumentMeta({
    title: "Journal",
    description,
    path: "/journal",
    image: journalArticles[0].image,
  });

  return (
    <>
      <JsonLd data={[webPageSchema("Journal", description, "/journal"), ...journalArticles.map(articleSchema)]} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="micro-label">Journal</p>
            <h1>Notes from routes, archives, kitchens, and thresholds.</h1>
            <p>{description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container journal-grid journal-grid--large">
          {journalArticles.map((article) => (
            <article key={article.slug} className="journal-card journal-card--large">
              <img src={article.image} alt="" loading="lazy" />
              <small>
                <BookOpenText size={14} aria-hidden="true" />
                {article.category} / {formatDate(article.date)} / {article.readTime}
              </small>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
