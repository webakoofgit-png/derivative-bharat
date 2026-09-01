import { FormEvent, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";
import { expeditions, site } from "../lib/site-data";

const description =
  "Contact Derivative Bharat to plan a heritage expedition, private walk, institutional field salon, or custom cultural journey.";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  useDocumentMeta({
    title: "Contact",
    description,
    path: "/contact",
    image: expeditions[5].image,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <JsonLd data={webPageSchema("Contact Derivative Bharat", description, "/contact")} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="micro-label">Contact</p>
            <h1>Start with the place that will not leave you alone.</h1>
            <p>{description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-card">
              <h2>Plan a route</h2>
              <p>
                Share a region, theme, date window, and group size. The team will respond with the right route shape.
              </p>
              <a href={`mailto:${site.email}`}>
                <Mail size={18} aria-hidden="true" />
                {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <Phone size={18} aria-hidden="true" />
                {site.phone}
              </a>
              <span>
                <MapPin size={18} aria-hidden="true" />
                {site.address}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input name="name" type="text" required />
              </label>
              <label>
                Email
                <input name="email" type="email" required />
              </label>
              <label>
                Interested in
                <select name="interest" defaultValue="Expedition">
                  <option>Expedition</option>
                  <option>Private walk</option>
                  <option>Institutional field salon</option>
                  <option>Custom route</option>
                </select>
              </label>
              <label>
                Notes
                <textarea name="notes" rows={6} required />
              </label>
              <button className="button button-primary" type="submit">
                Send enquiry
                <Send size={18} aria-hidden="true" />
              </button>
              {sent ? <p className="form-note">Enquiry noted. We will respond from {site.email}.</p> : null}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
