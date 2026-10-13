import { createFileRoute } from "@tanstack/react-router";
import { ServiceDirectory, EnquiryBand } from "@/components/site";
import { pageMeta } from "@/lib/services";

export const Route = createFileRoute("/divisions")({
  head: () =>
    pageMeta(
      "Our divisions",
      "Explore nine specialised divisions, from construction and technology to education, events and professional consultancy.",
    ),
  component: Divisions,
});

function Divisions() {
  return (
    <>
      <div className="site-container page-intro">
        <p className="eyebrow">Our expertise</p>
        <h1>
          Nine divisions.
          <br />
          One point of contact.
        </h1>
        <p className="supporting-copy">
          Find the right service for your next project, investment or celebration.
        </p>
      </div>
      <ServiceDirectory />
      <EnquiryBand />
    </>
  );
}   