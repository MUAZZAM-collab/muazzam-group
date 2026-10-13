import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { S as ServiceDirectory, E as EnquiryBand } from "./router-BzLY27a1.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "react";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function Divisions() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "site-container page-intro", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Our expertise" }),
      /* @__PURE__ */ jsxs("h1", { children: [
        "Nine divisions.",
        /* @__PURE__ */ jsx("br", {}),
        "One point of contact."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: "Find the right service for your next project, investment or celebration." })
    ] }),
    /* @__PURE__ */ jsx(ServiceDirectory, {}),
    /* @__PURE__ */ jsx(EnquiryBand, {})
  ] });
}
export {
  Divisions as component
};
