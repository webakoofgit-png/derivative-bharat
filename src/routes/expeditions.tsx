import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ExpeditionCard } from "../components/ExpeditionCard";
import { Reveal } from "../components/Reveal";
import { JsonLd, useDocumentMeta, webPageSchema } from "../lib/seo";
import { expeditions, filterSets } from "../lib/site-data";

const description =
  "Browse Derivative Bharat's small-group heritage expeditions across forts, temple towns, rainforests, markets, and empire landscapes.";

export function ExpeditionsPage() {
  const [region, setRegion] = useState("All");
  const [pace, setPace] = useState("All");

  useDocumentMeta({
    title: "Expeditions",
    description,
    path: "/expeditions",
    image: expeditions[0].image,
  });

  const filteredExpeditions = useMemo(
    () =>
      expeditions.filter((expedition) => {
        const regionMatch = region === "All" || expedition.region === region;
        const paceMatch = pace === "All" || expedition.pace === pace;
        return regionMatch && paceMatch;
      }),
    [pace, region]
  );

  return (
    <>
      <JsonLd data={webPageSchema("Expeditions", description, "/expeditions")} />
      <section className="page-hero">
        <div className="container page-hero__inner">
          <Reveal>
            <p className="micro-label">Expeditions</p>
            <h1>Routes that hold a story from first step to last light.</h1>
            <p>{description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container filter-panel">
          <div className="filter-title">
            <SlidersHorizontal size={18} aria-hidden="true" />
            <span>Filter routes</span>
          </div>
          <div className="segmented-control" aria-label="Filter by region">
            {["All", ...filterSets.regions].map((item) => (
              <button key={item} type="button" className={region === item ? "is-active" : ""} onClick={() => setRegion(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="segmented-control" aria-label="Filter by pace">
            {["All", ...filterSets.pace].map((item) => (
              <button key={item} type="button" className={pace === item ? "is-active" : ""} onClick={() => setPace(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="container expedition-grid expedition-grid--wide">
          {filteredExpeditions.map((expedition, index) => (
            <Reveal key={expedition.slug} delay={index * 0.05}>
              <ExpeditionCard expedition={expedition} index={index} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
