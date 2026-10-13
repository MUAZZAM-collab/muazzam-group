import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, pageMeta } from "@/lib/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.title ?? "Division unavailable",
      loaderData?.short ?? "The requested service division could not be found.",
    ),
  component: ServicePage,
});

function ServicePage() {
  const service = Route.useLoaderData();
  const hasGallery = Array.isArray(service.gallery) && service.gallery.length > 0;

  return (
    <>
      <div className="site-container page-intro">
        <Link className="back-link" to="/divisions">
          <ArrowLeft size={14} />
          All divisions
        </Link>
        <p className="eyebrow" style={{ marginTop: 32, color: service.accent }}>
          Division
        </p>
        <h1>{service.title}</h1>
        <p className="supporting-copy">{service.intro}</p>
      </div>

      <section
        className="site-container detail-layout"
        style={{
          "--detail-accent": service.accent,
          "--accent": service.accent,
        }}
      >
        {hasGallery ? (
          <div className="tailor-gallery">
            {service.gallery.map((g, i) => (
              <figure key={i}>
                <img src={g.src} alt={g.alt} loading="lazy" />
                {g.caption && <figcaption>{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
        ) : (
          <img
            className="detail-photo"
            src={service.image}
            width={1200}
            height={1500}
            alt={`${service.title} — illustrative professional imagery`}
          />
        )}

        <div>
          <p className="eyebrow" style={{ color: service.accent }}>
            What we offer
          </p>
          <h2>A service shaped around your needs.</h2>

          <ul className="service-list">
            {service.items.map((item) => (
              <li key={item}>
                <Check size={20} style={{ color: service.accent }} />
                {item}
              </li>
            ))}
          </ul>

          <p className="supporting-copy">{service.brief}</p>

          <div className="hero-actions">
            <Button
              variant="neon"
              asChild
              style={{ background: service.accent, borderColor: service.accent }}
            >
              <Link to="/contact" search={{ division: service.slug }}>
                Enquire about this service <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}