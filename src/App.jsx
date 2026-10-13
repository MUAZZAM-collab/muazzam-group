import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Send, Download, CheckCircle2, AlertCircle, RefreshCw, LogOut, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter, ServiceDirectory, EnquiryBand, HERO_IMG } from "@/components/site";
import { services } from "@/lib/services";
import {
  submitEnquiry,
  adminLogin,
  listEnquiries,
  updateEnquiryStatus,
  removeEnquiry,
} from "@/lib/api";

function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = `${title} — Muazzam Group`;
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.name = "description";
    meta.content = description;
    if (!meta.parentNode) document.head.appendChild(meta);
  }, [title, description]);

  return null;
}

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <>
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/divisions" element={<DivisionsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/admin/enquiries" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}

function HomePage() {
  return (
    <>
      <PageMeta
        title="Nine service divisions"
        description="Construction, property, IT, O/A-level tuition, catering, events, tailoring, legal consultancy, school partnerships and wholesale services."
      />
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
                <Link to="/contact?division=">
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

function DivisionsPage() {
  return (
    <>
      <PageMeta
        title="Divisions"
        description="Browse Muazzam Group's nine service divisions across property, construction, legal, education, catering, events and more."
      />
      <div className="site-container page-intro">
        <p className="eyebrow">What we do</p>
        <h1>One group. Nine divisions.</h1>
      </div>

      <section className="site-container directory-section">
        <div className="service-grid">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className={`service-card ${service.variant ?? ""}`}
              style={{
                "--card-accent": service.accent,
                "--card-soft": service.soft,
              }}
            >
              <div className="service-card-media">
                <span className="service-card-num">{String(index + 1).padStart(2, "0")}</span>
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
    </>
  );
}

function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(searchParams.get("division") || "");
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    setSelected(searchParams.get("division") || "");
  }, [searchParams]);

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerError("");

    const form = new FormData(event.currentTarget);
    const divisionSlug = selected;
    const divisionTitle = services.find((s) => s.slug === divisionSlug)?.title ?? divisionSlug;

    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      division: divisionSlug,
      divisionTitle,
      message: String(form.get("message") ?? "").trim(),
    };

    try {
      const result = await submitEnquiry(payload);
      setReference(result.reference || String(result.id || "").slice(0, 8).toUpperCase());
      setStatus("success");
      formRef.current?.reset();
      setSelected("");
      setSearchParams({ division: "" });
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setServerError(err.message || "Something went wrong. Please try again.");
      }
      setStatus("error");
    }
  }

  function downloadBrief() {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const title = services.find((s) => s.slug === selected)?.title ?? selected;
    const brief = `MOAZUM GROUP — ENQUIRY

Name: ${fd.get("name") || ""}
Email: ${fd.get("email") || ""}
Phone: ${fd.get("phone") || "Not provided"}
Division: ${title || "(not selected)"}

${fd.get("message") || ""}
`;
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "moazum-enquiry.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  const activeBrief = services.find((s) => s.slug === selected)?.brief;

  return (
    <>
      <PageMeta
        title="Start an enquiry"
        description="Prepare an enquiry for property, IT, tuition, catering, events, tailoring, legal consultancy, school partnerships or wholesale."
      />
      <div className="site-container page-intro">
        <p className="eyebrow">Let's start a conversation</p>
        <h1>
          Your next step
          <br />
          starts here.
        </h1>
      </div>

      <section className="site-container detail-layout">
        <div>
          <h2>Tell us which division you need.</h2>
          <p className="supporting-copy">
            Share your requirements and we'll route your enquiry to the right team.
          </p>
          <p className="supporting-copy">
            {activeBrief ??
              "Choose a division and describe what you have in mind, including your preferred timeline."}
          </p>
          <p className="supporting-copy">
            Your enquiry is stored securely and never shared with third parties.
          </p>
        </div>

        {status === "success" ? (
          <div className="form-success" role="status">
            <CheckCircle2 style={{ color: "var(--primary)" }} />
            <h3>Enquiry received.</h3>
            <p>Thank you — we've recorded your enquiry and will reply to your email shortly.</p>
            <p className="eyebrow" style={{ marginTop: 4 }}>
              Reference: {reference}
            </p>
            <Button variant="technical" type="button" onClick={() => setStatus("idle")}>
              Send another enquiry
            </Button>
          </div>
        ) : (
          <form
            ref={formRef}
            className="enquiry-form"
            onSubmit={onSubmit}
            onChange={() => {
              if (status === "error") setStatus("idle");
            }}
            noValidate
          >
            <label>
              Your name
              <input name="name" placeholder="Full name" required maxLength={100} autoComplete="name" />
              {errors.name && <span className="form-error-text">{errors.name}</span>}
            </label>

            <label>
              Email address
              <input name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
              {errors.email && <span className="form-error-text">{errors.email}</span>}
            </label>

            <label>
              Phone number (optional)
              <input name="phone" type="tel" placeholder="Your contact number" autoComplete="tel" />
              {errors.phone && <span className="form-error-text">{errors.phone}</span>}
            </label>

            <label>
              Division
              <select
                required
                value={selected}
                onChange={(event) => {
                  const next = event.target.value;
                  setSelected(next);
                  setSearchParams({ division: next });
                }}
              >
                <option value="">Select a division</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              {errors.division && <span className="form-error-text">{errors.division}</span>}
            </label>

            <label>
              Your requirements
              <textarea
                name="message"
                placeholder="Tell us about your project or occasion…"
                required
                maxLength={5000}
              />
              {errors.message && <span className="form-error-text">{errors.message}</span>}
            </label>

            <p className="form-notice">
              Please do not include sensitive personal details or confidential legal documents.
            </p>

            {serverError && (
              <p className="form-error-box" role="alert">
                <AlertCircle size={14} /> {serverError}
              </p>
            )}

            <div className="form-actions">
              <Button variant="neon" type="submit" disabled={status === "submitting"}>
                <Send />
                {status === "submitting" ? "Sending…" : "Send enquiry"}
              </Button>
              <Button variant="ghost" type="button" onClick={downloadBrief}>
                <Download /> Download brief
              </Button>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

function ServicePage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/divisions" replace />;
  }

  const hasGallery = Array.isArray(service.gallery) && service.gallery.length > 0;

  return (
    <>
      <PageMeta
        title={service.title}
        description={service.short}
      />
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
              <Link to={`/contact?division=${service.slug}`}>
                Enquire about this service <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function AdminPage() {
  const STORAGE_KEY = "moazum:admin";
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ new: 0, read: 0, archived: 0 });
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved) setToken(saved);
  }, []);

  const load = useCallback(async (t, filters = {}) => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.q) params.q = filters.q;
      const data = await listEnquiries(t, params);
      setEnquiries(data.items || []);
      setStats(data.stats || { new: 0, read: 0, archived: 0 });
      setAuthed(true);
      setLoginError("");
    } catch (err) {
      setAuthed(false);
      setLoginError(err?.message || "Unauthorized");
      window.sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      load(token, { status: filterStatus, q: searchQuery });
    }
  }, [token, load, filterStatus, searchQuery]);

  async function handleLogin(event) {
    event.preventDefault();
    const input = event.currentTarget.elements.token.value.trim();
    if (!input) return;
    setLoginError("");
    try {
      await adminLogin(input);
      window.sessionStorage.setItem(STORAGE_KEY, input);
      setToken(input);
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setAuthed(false);
    setEnquiries([]);
  }

  async function changeStatus(id, next) {
    const updated = await updateEnquiryStatus(token, id, next);
    setEnquiries((prev) => prev.map((x) => (x.id === id ? updated.enquiry : x)));
    setStats((s) => {
      const old = enquiries.find((e) => e.id === id)?.status;
      if (!old || old === next) return s;
      return { ...s, [old]: Math.max(0, s[old] - 1), [next]: s[next] + 1 };
    });
  }

  async function remove(id, name) {
    if (!window.confirm(`Delete enquiry from ${name}?`)) return;
    await removeEnquiry(token, id);
    setEnquiries((prev) => prev.filter((x) => x.id !== id));
  }

  if (!authed) {
    return (
      <div className="site-container admin-login">
        <p className="eyebrow">Admin</p>
        <h1>Enquiries login</h1>
        <p className="supporting-copy">Enter the admin token from your backend .env</p>
        <form className="enquiry-form" onSubmit={handleLogin}>
          <label>
            Admin token
            <input name="token" type="password" required autoFocus />
          </label>
          <Button variant="neon" type="submit">
            Sign in
          </Button>
          {loginError && <p className="form-error-box">{loginError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="site-container admin-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 style={{ marginTop: 12, fontSize: 36 }}>Enquiries</h1>
          <p className="supporting-copy" style={{ marginTop: 8 }}>
            {enquiries.length} shown · {stats.new} new · {stats.read} read · {stats.archived} archived
          </p>
        </div>
        <div className="admin-actions">
          <Button variant="technical" onClick={() => load(token, { status: filterStatus, q: searchQuery })} type="button" disabled={loading}>
            <RefreshCw /> {loading ? "Loading…" : "Refresh"}
          </Button>
          <Button variant="ghost" onClick={handleLogout} type="button">
            <LogOut /> Sign out
          </Button>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search name, email or message…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="admin-status-tabs">
          {[["", "All"], ["new", "New"], ["read", "Read"], ["archived", "Archived"]].map(([val, label]) => (
            <button
              key={val}
              type="button"
              className={`status-btn ${filterStatus === val ? "active" : ""}`}
              onClick={() => setFilterStatus(val)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {enquiries.length === 0 && !loading && (
        <p className="supporting-copy" style={{ paddingTop: 24 }}>No enquiries match.</p>
      )}

      <div className="admin-grid">
        {enquiries.map((e) => (
          <article key={e.id} className="enquiry-card">
            <header>
              <div>
                <h2>{e.name}</h2>
                <p className="eyebrow" style={{ marginTop: 6 }}>
                  {e.divisionTitle} · {new Date(e.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`status-badge status-${e.status}`}>{e.status}</span>
            </header>

            <dl className="enquiry-meta">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${e.email}`}>{e.email}</a>
                </dd>
              </div>
              {e.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${e.phone}`}>{e.phone}</a>
                  </dd>
                </div>
              )}
              <div>
                <dt>Reference</dt>
                <dd style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                  {e.id.slice(-8).toUpperCase()}
                </dd>
              </div>
            </dl>

            <p className="enquiry-message">{e.message}</p>

            <footer>
              {["new", "read", "archived"].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`status-btn ${e.status === s ? "active" : ""}`}
                  onClick={() => changeStatus(e.id, s)}
                >
                  {s}
                </button>
              ))}
              <button type="button" className="status-btn danger" onClick={() => remove(e.id, e.name)}>
                <Trash2 size={14} /> Delete
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="site-container page-intro">
      <p className="eyebrow">404</p>
      <h1>This page doesn't exist</h1>
      <p className="supporting-copy">It may have been moved, removed, or never existed.</p>
      <div style={{ marginTop: 24 }}>
        <Button asChild variant="neon">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}

function App() {
  return <RootLayout />;
}

export default App;
