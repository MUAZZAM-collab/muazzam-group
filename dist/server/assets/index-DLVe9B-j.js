import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { B as Button, H as HERO_IMG, S as ServiceDirectory, E as EnquiryBand } from "./router-BzLY27a1.js";
import "@tanstack/react-query";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "hero-section", children: /* @__PURE__ */ jsxs("div", { className: "site-container hero-inner", children: [
      /* @__PURE__ */ jsxs("div", { className: "hero-copy", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Muazzam Group · Nine divisions" }),
        /* @__PURE__ */ jsxs("h1", { children: [
          "One group.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("em", { children: "Nine ways" }),
          /* @__PURE__ */ jsx("br", {}),
          "to build."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: "Property, technology, education, catering, events, tailoring, legal counsel, school investment and wholesale — one group, one point of contact." }),
        /* @__PURE__ */ jsxs("div", { className: "hero-actions", children: [
          /* @__PURE__ */ jsx(Button, { variant: "neon", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/divisions", children: [
            "Explore divisions ",
            /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { variant: "technical", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/contact", search: {
            division: ""
          }, children: "Request proposal" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "hero-image", src: HERO_IMG, alt: "Modern glass high-rise architecture at golden hour", width: 1200, height: 1500, fetchPriority: "high" })
    ] }) }),
    /* @__PURE__ */ jsx(ServiceDirectory, {}),
    /* @__PURE__ */ jsx(EnquiryBand, {})
  ] });
}
export {
  Index as component
};
