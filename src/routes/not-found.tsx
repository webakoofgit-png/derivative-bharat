import { Link } from "../lib/navigation";
import { ArrowLeft } from "lucide-react";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";

export function NotFoundPage() {
  useDocumentMeta({
    title: "Page not found",
    description: "This Derivative Bharat route could not be found.",
    path: "/404",
  });

  return (
    <>
      <JsonLd data={webPageSchema("Page not found", "This Derivative Bharat route could not be found.", "/404")} />
      <section className="page-hero not-found">
        <div className="container page-hero__inner">
          <p className="micro-label">404</p>
          <h1>This path fades into scrubland.</h1>
          <p>The map still has good routes nearby.</p>
          <Link className="button button-primary" to="/expeditions">
            <ArrowLeft size={18} aria-hidden="true" />
            Back to expeditions
          </Link>
        </div>
      </section>
    </>
  );
}
