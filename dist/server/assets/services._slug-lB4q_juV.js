import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { a as Route, B as Button } from "./router-BzLY27a1.js";
import "@tanstack/react-query";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ServicePage() {
  const service = Route.useLoaderData();
  const hasGallery = Array.isArray(service.gallery) && service.gallery.length > 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "site-container page-intro", children: [
      /* @__PURE__ */ jsxs(Link, { className: "back-link", to: "/divisions", children: [
        /* @__PURE__ */ jsx(ArrowLeft, { size: 14 }),
        "All divisions"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "eyebrow", style: {
        marginTop: 32,
        color: service.accent
      }, children: "Division" }),
      /* @__PURE__ */ jsx("h1", { children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: service.intro })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "site-container detail-layout", style: {
      "--detail-accent": service.accent,
      "--accent": service.accent
    }, children: [
      hasGallery ? /* @__PURE__ */ jsx("div", { className: "tailor-gallery", children: service.gallery.map((g, i) => /* @__PURE__ */ jsxs("figure", { children: [
        /* @__PURE__ */ jsx("img", { src: g.src, alt: g.alt, loading: "lazy" }),
        g.caption && /* @__PURE__ */ jsx("figcaption", { children: g.caption })
      ] }, i)) }) : /* @__PURE__ */ jsx("img", { className: "detail-photo", src: service.image, width: 1200, height: 1500, alt: `${service.title} — illustrative professional imagery` }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", style: {
          color: service.accent
        }, children: "What we offer" }),
        /* @__PURE__ */ jsx("h2", { children: "A service shaped around your needs." }),
        /* @__PURE__ */ jsx("ul", { className: "service-list", children: service.items.map((item) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(Check, { size: 20, style: {
            color: service.accent
          } }),
          item
        ] }, item)) }),
        /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: service.brief }),
        /* @__PURE__ */ jsx("div", { className: "hero-actions", children: /* @__PURE__ */ jsx(Button, { variant: "neon", asChild: true, style: {
          background: service.accent,
          borderColor: service.accent
        }, children: /* @__PURE__ */ jsxs(Link, { to: "/contact", search: {
          division: service.slug
        }, children: [
          "Enquire about this service ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  ServicePage as component
};
