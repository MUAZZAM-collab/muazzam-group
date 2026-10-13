import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Send, Download } from "lucide-react";
import { R as Route, s as services, B as Button } from "./router-BzLY27a1.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const API_URL = "https://backend-production-bb8dc.up.railway.app";
async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers || {}
    }
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const err = new Error((data == null ? void 0 : data.error) || `Request failed (${res.status})`);
    err.status = res.status;
    err.errors = (data == null ? void 0 : data.errors) || null;
    throw err;
  }
  return data;
}
async function submitEnquiry(payload) {
  return request("/api/enquiries", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
function Contact() {
  var _a;
  const {
    division
  } = Route.useSearch();
  const formRef = useRef(null);
  const [selected, setSelected] = useState(services.some((s) => s.slug === division) ? division : "");
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [reference, setReference] = useState("");
  async function onSubmit(event) {
    var _a2, _b;
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerError("");
    const form = new FormData(event.currentTarget);
    const divisionSlug = selected;
    const divisionTitle = ((_a2 = services.find((s) => s.slug === divisionSlug)) == null ? void 0 : _a2.title) ?? divisionSlug;
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      division: divisionSlug,
      divisionTitle,
      message: String(form.get("message") ?? "").trim()
    };
    try {
      const result = await submitEnquiry(payload);
      setReference(result.reference || String(result.id || "").slice(0, 8).toUpperCase());
      setStatus("success");
      (_b = formRef.current) == null ? void 0 : _b.reset();
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
    var _a2;
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const title = ((_a2 = services.find((s) => s.slug === selected)) == null ? void 0 : _a2.title) ?? selected;
    const brief = `MOAZUM GROUP — ENQUIRY

Name: ${fd.get("name") || ""}
Email: ${fd.get("email") || ""}
Phone: ${fd.get("phone") || "Not provided"}
Division: ${title || "(not selected)"}

${fd.get("message") || ""}
`;
    const url = URL.createObjectURL(new Blob([brief], {
      type: "text/plain"
    }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "moazum-enquiry.txt";
    link.click();
    URL.revokeObjectURL(url);
  }
  const activeBrief = (_a = services.find((s) => s.slug === selected)) == null ? void 0 : _a.brief;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "site-container page-intro", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Let's start a conversation" }),
      /* @__PURE__ */ jsxs("h1", { children: [
        "Your next step",
        /* @__PURE__ */ jsx("br", {}),
        "starts here."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "site-container detail-layout", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Tell us which division you need." }),
        /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: "Share your requirements and we'll route your enquiry to the right team." }),
        /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: activeBrief ?? "Choose a division and describe what you have in mind, including your preferred timeline." }),
        /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: "Your enquiry is stored securely and never shared with third parties." })
      ] }),
      status === "success" ? /* @__PURE__ */ jsxs("div", { className: "form-success", role: "status", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { style: {
          color: "var(--primary)"
        } }),
        /* @__PURE__ */ jsx("h3", { children: "Enquiry received." }),
        /* @__PURE__ */ jsx("p", { children: "Thank you — we've recorded your enquiry and will reply to your email shortly." }),
        /* @__PURE__ */ jsxs("p", { className: "eyebrow", style: {
          marginTop: 4
        }, children: [
          "Reference: ",
          reference
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "technical", type: "button", onClick: () => setStatus("idle"), children: "Send another enquiry" })
      ] }) : /* @__PURE__ */ jsxs("form", { ref: formRef, className: "enquiry-form", onSubmit, onChange: () => {
        if (status === "error") setStatus("idle");
      }, noValidate: true, children: [
        /* @__PURE__ */ jsxs("label", { children: [
          "Your name",
          /* @__PURE__ */ jsx("input", { name: "name", placeholder: "Full name", required: true, maxLength: 100, autoComplete: "name" }),
          errors.name && /* @__PURE__ */ jsx("span", { className: "form-error-text", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          "Email address",
          /* @__PURE__ */ jsx("input", { name: "email", type: "email", placeholder: "you@example.com", required: true, autoComplete: "email" }),
          errors.email && /* @__PURE__ */ jsx("span", { className: "form-error-text", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          "Phone number (optional)",
          /* @__PURE__ */ jsx("input", { name: "phone", type: "tel", placeholder: "Your contact number", autoComplete: "tel" }),
          errors.phone && /* @__PURE__ */ jsx("span", { className: "form-error-text", children: errors.phone })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          "Division",
          /* @__PURE__ */ jsxs("select", { required: true, value: selected, onChange: (event) => setSelected(event.target.value), children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Select a division" }),
            services.map((s) => /* @__PURE__ */ jsx("option", { value: s.slug, children: s.title }, s.slug))
          ] }),
          errors.division && /* @__PURE__ */ jsx("span", { className: "form-error-text", children: errors.division })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          "Your requirements",
          /* @__PURE__ */ jsx("textarea", { name: "message", placeholder: "Tell us about your project or occasion…", required: true, maxLength: 5e3 }),
          errors.message && /* @__PURE__ */ jsx("span", { className: "form-error-text", children: errors.message })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "form-notice", children: "Please do not include sensitive personal details or confidential legal documents." }),
        serverError && /* @__PURE__ */ jsxs("p", { className: "form-error-box", role: "alert", children: [
          /* @__PURE__ */ jsx(AlertCircle, { size: 14 }),
          " ",
          serverError
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "form-actions", children: [
          /* @__PURE__ */ jsxs(Button, { variant: "neon", type: "submit", disabled: status === "submitting", children: [
            /* @__PURE__ */ jsx(Send, {}),
            status === "submitting" ? "Sending…" : "Send enquiry"
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "ghost", type: "button", onClick: downloadBrief, children: [
            /* @__PURE__ */ jsx(Download, {}),
            " Download brief"
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Contact as component
};
