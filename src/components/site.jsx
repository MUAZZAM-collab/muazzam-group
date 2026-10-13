import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services";

const HERO_IMG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop";

const ENQUIRY_IMG =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80&auto=format&fit=crop";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="header-topbar">
        <div className="site-container header-topbar-inner">
          <span className="live-dot">Nine divisions · one group</span>
          <span style={{ display: "inline-flex", gap: 24, alignItems: "center" }}>
            <a href="mailto:hello@Muazzam.group">
              <Mail size={12} style={{ display: "inline", marginRight: 6, verticalAlign: -1 }} />
              hello@Muazzam.group
            </a>
            <a href="tel:+920000000000">
              <Phone size={12} style={{ display: "inline", marginRight: 6, verticalAlign: -1 }} />
              +92 000 000 0000
            </a>
          </span>
        </div>
      </div>

      <div className="site-container header-inner">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">M</span>
          <span className="brand-text">
            Muazzam Group
            <small>Established · Trusted</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/divisions" activeProps={{ className: "active" }}>
            Divisions
          </Link>
          <Link
            to="/services/$slug"
            params={{ slug: "property-construction" }}
            activeProps={{ className: "active" }}
          >
            Property
          </Link>
          <Link
            to="/services/$slug"
            params={{ slug: "technology" }}
            activeProps={{ className: "active" }}
          >
            Technology
          </Link>
          <Link
            to="/services/$slug"
            params={{ slug: "tailoring" }}
            activeProps={{ className: "active" }}
          >
            Tailoring
          </Link>
          <Link
            to="/services/$slug"
            params={{ slug: "events-media" }}
            activeProps={{ className: "active" }}
          >
            Events
          </Link>
          <Link
            to="/services/$slug"
            params={{ slug: "legal-consultancy" }}
            activeProps={{ className: "active" }}
          >
            Legal
          </Link>
        </nav>

        <div className="header-actions">
          <Button asChild variant="neon">
            <Link to="/contact" search={{ division: "" }}>
              Enquire <ArrowRight size={15} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu-control"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav site-container" aria-label="Mobile navigation">
          <Link to="/divisions" onClick={close}>
            All divisions
          </Link>
          {services.map((service) => (
            <Link
              key={service.slug}
              to="/services/$slug"
              params={{ slug: service.slug }}
              onClick={close}
            >
              {service.title}
            </Link>
          ))}
          <Link to="/contact" search={{ division: "" }} onClick={close}>
            Start an enquiry
          </Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <Link to="/">Muazzam Group</Link>
        <span className="status">
          <span className="status-dot" />
          Nine divisions · one group
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export function ServiceDirectory() {
  return (
    <section className="site-container directory-section">
      <div className="section-heading">
        <h2>Service directory</h2>
        <span className="eyebrow">09 divisions</span>
      </div>

      <div className="service-grid">
        {services.map((service, index) => (
          <Link
            key={service.slug}
            to="/services/$slug"
            params={{ slug: service.slug }}
            className={`service-card ${service.variant ?? ""}`}
            style={{
              "--card-accent": service.accent,
              "--card-soft": service.soft,
            }}
          >
            <div className="service-card-media">
              <span className="service-card-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <img src={service.image} alt={service.title} loading="lazy" />
            </div>
            <div className="service-card-body">
              <h3>{service.title}</h3>
              <p>{service.short}</p>
              <span className="card-link">
                Open division <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function EnquiryBand() {
  return (
    <section className="enquiry-band">
      <div className="site-container enquiry-inner">
        <img
          src={ENQUIRY_IMG}
          width={1200}
          height={900}
          loading="lazy"
          alt="Bespoke occasion wear and celebration photography"
        />
        <div>
          <p className="eyebrow">Enquiry</p>
          <h2>Tell us which division you need.</h2>
          <p className="supporting-copy">
            A property project, a business idea or a special occasion — start with the service
            that matters to you.
          </p>
          <Button asChild variant="neon">
            <Link to="/contact" search={{ division: "" }}>
              Start an enquiry <ArrowRight size={15} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { HERO_IMG };