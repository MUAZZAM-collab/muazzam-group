import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceDirectory, EnquiryBand, HERO_IMG } from "@/components/site";
import { pageMeta } from "@/lib/services";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Nine service divisions",
      "Construction, property, IT, O/A-level tuition, catering, events, tailoring, legal consultancy, school partnerships and wholesale services.",
    ),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="hero-section">
        <div className="site-container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Muazzam Group · Nine divisions</p>
            <h1>
              One group.
              <br />
              <em>Nine ways</em>
              <br />
              to build.
            </h1>
            <p className="supporting-copy">
              Property, technology, education, catering, events, tailoring, legal counsel,
              school investment and wholesale — one group, one point of contact.
            </p>
            <div className="hero-actions">
              <Button variant="neon" asChild>
                <Link to="/divisions">
                  Explore divisions <ArrowRight size={15} />
                </Link>
              </Button>
              <Button variant="technical" asChild>
                <Link to="/contact" search={{ division: "" }}>
                  Request proposal
                </Link>
              </Button>
            </div>
          </div>

          <img
            className="hero-image"
            src={HERO_IMG}
            alt="Modern glass high-rise architecture at golden hour"
            width={1200}
            height={1500}
            fetchPriority="high"
          />
        </div>
      </section>

      <ServiceDirectory />
      <EnquiryBand />
    </>
  );
}