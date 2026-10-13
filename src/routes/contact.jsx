import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Send, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, pageMeta } from "@/lib/services";
import { submitEnquiry } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  validateSearch: (search) => ({
    division: typeof search.division === "string" ? search.division : "",
  }),
  head: () =>
    pageMeta(
      "Start an enquiry",
      "Prepare an enquiry for property, IT, tuition, catering, events, tailoring, legal consultancy, school partnerships or wholesale.",
    ),
  component: Contact,
});

function Contact() {
  const { division } = Route.useSearch();
  const formRef = useRef(null);
  const [selected, setSelected] = useState(
    services.some((s) => s.slug === division) ? division : "",
  );
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerError("");

    const form = new FormData(event.currentTarget);
    const divisionSlug = selected;
    const divisionTitle =
      services.find((s) => s.slug === divisionSlug)?.title ?? divisionSlug;

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
              <input
                name="name"
                placeholder="Full name"
                required
                maxLength={100}
                autoComplete="name"
              />
              {errors.name && <span className="form-error-text">{errors.name}</span>}
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
              {errors.email && <span className="form-error-text">{errors.email}</span>}
            </label>

            <label>
              Phone number (optional)
              <input
                name="phone"
                type="tel"
                placeholder="Your contact number"
                autoComplete="tel"
              />
              {errors.phone && <span className="form-error-text">{errors.phone}</span>}
            </label>

            <label>
              Division
              <select
                required
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
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