import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect } from "react";
import { Mail, Phone, ArrowRight, X, Menu } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const appCss = "/assets/styles-uf5D5rwD.css";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neon: "button-neon",
        technical: "button-technical",
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const img = (id, w = 1400) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;
const services = [
  {
    slug: "property-construction",
    title: "Property & Construction",
    short: "High-rise builds, land acquisition and property sale or purchase.",
    intro: "From the first foundation to your next property investment.",
    image: img("photo-1541888946425-d81bb19240f5"),
    accent: "#d97706",
    soft: "#fef3c7",
    variant: "is-hero is-dark",
    items: [
      "Residential & commercial construction",
      "High-rise building projects",
      "Property sale & purchase",
      "Land acquisition & development"
    ],
    brief: "Tell us the location, property type, approximate budget and project timeline."
  },
  {
    slug: "technology",
    title: "Technology",
    short: "Software, web platforms and mobile application design.",
    intro: "Digital experiences built around your business.",
    image: img("photo-1550751827-4bd374c3f58b"),
    accent: "#2563eb",
    soft: "#dbeafe",
    variant: "is-tall",
    items: [
      "Custom software development",
      "Website design & development",
      "Mobile application design",
      "Business software & digital platforms"
    ],
    brief: "Describe your idea, intended users, essential features and target launch date."
  },
  {
    slug: "education",
    title: "Education",
    short: "O/A-level tuition and teachers across all subjects.",
    intro: "A stronger foundation for every student.",
    image: img("photo-1544716278-ca5e3f4abd8c"),
    accent: "#059669",
    soft: "#d1fae5",
    variant: "is-accent",
    items: [
      "O-level tuition — all subjects",
      "A-level tuition — all subjects",
      "Subject-specific teachers",
      "Exam preparation & academic support"
    ],
    brief: "Share the student's level, subjects, exam board and preferred tuition schedule."
  },
  {
    slug: "catering",
    title: "Catering",
    short: "Wedding feasts, birthday menus and event food service.",
    intro: "Memorable celebrations begin with exceptional food.",
    image: img("photo-1414235077428-338989a2e8c0"),
    accent: "#dc2626",
    soft: "#fee2e2",
    variant: "is-half",
    items: [
      "Wedding & reception catering",
      "Birthday party food",
      "Family celebration menus",
      "Event food service & buffet planning"
    ],
    brief: "Share the event date, venue, guest count, menu preferences and dietary requirements."
  },
  {
    slug: "events-media",
    title: "Events & Media",
    short: "Celebrations, stage shows, filmmaking and live entertainment.",
    intro: "Your occasion, thoughtfully planned and beautifully captured.",
    image: img("photo-1492684223066-81342ee5ff30"),
    accent: "#9333ea",
    soft: "#f3e8ff",
    variant: "is-half is-dark",
    items: [
      "Wedding, birthday & celebration planning",
      "Filmmaking & family event coverage",
      "Stage shows & live singing",
      "Evening entertainment & quality night events"
    ],
    brief: "Tell us the occasion, date, location, guest count and entertainment or filming requirements."
  },
  {
    slug: "tailoring",
    title: "Tailoring",
    short: "Bridal and groom wear, party and occasion clothing.",
    intro: "Made for your moment. Tailored to you.",
    image: img("photo-1594633312681-425c7b97ccd1"),
    gallery: [
      {
        src: img("photo-1595777457583-95e059d581b8"),
        alt: "Bride wearing a bespoke embroidered wedding gown",
        caption: "Bridal · Made to measure"
      },
      {
        src: img("photo-1617137968427-85924c800a22"),
        alt: "Groom wearing a tailored formal suit",
        caption: "Groom · Tailored fit"
      }
    ],
    accent: "#db2777",
    soft: "#fce7f3",
    variant: "is-split",
    items: [
      "Bridal tailoring — gowns & veils",
      "Groom wear & formal suits",
      "Party & celebration clothing",
      "Custom fitting & occasion styling"
    ],
    brief: "Share your occasion date, outfit preferences and fitting requirements."
  },
  {
    slug: "legal-consultancy",
    title: "Legal Consultancy",
    short: "Guidance for police, court and civil matters.",
    intro: "Clarity when your next step matters most.",
    image: img("photo-1589829545856-d10d557cf95f"),
    accent: "#ca8a04",
    soft: "#fef9c3",
    variant: "is-tall is-dark",
    items: [
      "Professional legal consultation",
      "Legal advisor services",
      "Police matter guidance",
      "Court & civil matter advice"
    ],
    brief: "Provide a general description of your matter. Do not include confidential documents or sensitive personal information in an initial enquiry."
  },
  {
    slug: "school-investment",
    title: "School Investment",
    short: "Partnerships, campus building and school opening.",
    intro: "Build a place where the next generation can grow.",
    image: img("photo-1562774053-701939374585"),
    accent: "#0891b2",
    soft: "#cffafe",
    variant: "is-tall",
    items: [
      "School opening & establishment services",
      "School investment partnerships",
      "Campus building & construction",
      "School venture planning"
    ],
    brief: "Tell us the proposed location, campus requirements and whether you need services or an investment partnership."
  },
  {
    slug: "wholesale",
    title: "Wholesale",
    short: "Bulk purchasing across categories on request.",
    intro: "The right supplies, at the scale you need.",
    image: img("photo-1553413077-190dd305871c"),
    accent: "#65a30d",
    soft: "#ecfccb",
    variant: "is-split is-accent",
    items: [
      "Wholesale purchasing & sourcing",
      "Construction materials & supplies",
      "Business goods & bulk orders",
      "Category-specific procurement enquiries"
    ],
    brief: "Specify the product category, quantities, specifications and delivery location."
  }
];
function pageMeta(title, description) {
  return {
    meta: [
      { title: `${title} — Muazzam Group` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — Muazzam Group` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  };
}
const HERO_IMG = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop";
const ENQUIRY_IMG = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80&auto=format&fit=crop";
function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return /* @__PURE__ */ jsxs("header", { className: "site-header", children: [
    /* @__PURE__ */ jsx("div", { className: "header-topbar", children: /* @__PURE__ */ jsxs("div", { className: "site-container header-topbar-inner", children: [
      /* @__PURE__ */ jsx("span", { className: "live-dot", children: "Nine divisions · one group" }),
      /* @__PURE__ */ jsxs("span", { style: { display: "inline-flex", gap: 24, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxs("a", { href: "mailto:hello@Muazzam.group", children: [
          /* @__PURE__ */ jsx(Mail, { size: 12, style: { display: "inline", marginRight: 6, verticalAlign: -1 } }),
          "hello@Muazzam.group"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:+920000000000", children: [
          /* @__PURE__ */ jsx(Phone, { size: 12, style: { display: "inline", marginRight: 6, verticalAlign: -1 } }),
          "+92 000 000 0000"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "site-container header-inner", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "brand", onClick: close, children: [
        /* @__PURE__ */ jsx("span", { className: "brand-mark", children: "M" }),
        /* @__PURE__ */ jsxs("span", { className: "brand-text", children: [
          "Muazzam Group",
          /* @__PURE__ */ jsx("small", { children: "Established · Trusted" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "desktop-nav", "aria-label": "Main navigation", children: [
        /* @__PURE__ */ jsx(Link, { to: "/divisions", activeProps: { className: "active" }, children: "Divisions" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/services/$slug",
            params: { slug: "property-construction" },
            activeProps: { className: "active" },
            children: "Property"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/services/$slug",
            params: { slug: "technology" },
            activeProps: { className: "active" },
            children: "Technology"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/services/$slug",
            params: { slug: "tailoring" },
            activeProps: { className: "active" },
            children: "Tailoring"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/services/$slug",
            params: { slug: "events-media" },
            activeProps: { className: "active" },
            children: "Events"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/services/$slug",
            params: { slug: "legal-consultancy" },
            activeProps: { className: "active" },
            children: "Legal"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "neon", children: /* @__PURE__ */ jsxs(Link, { to: "/contact", search: { division: "" }, children: [
          "Enquire ",
          /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
        ] }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "mobile-menu-control",
            "aria-label": open ? "Close menu" : "Open menu",
            onClick: () => setOpen((v) => !v),
            children: open ? /* @__PURE__ */ jsx(X, {}) : /* @__PURE__ */ jsx(Menu, {})
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsxs("nav", { className: "mobile-nav site-container", "aria-label": "Mobile navigation", children: [
      /* @__PURE__ */ jsx(Link, { to: "/divisions", onClick: close, children: "All divisions" }),
      services.map((service) => /* @__PURE__ */ jsx(
        Link,
        {
          to: "/services/$slug",
          params: { slug: service.slug },
          onClick: close,
          children: service.title
        },
        service.slug
      )),
      /* @__PURE__ */ jsx(Link, { to: "/contact", search: { division: "" }, onClick: close, children: "Start an enquiry" })
    ] })
  ] });
}
function SiteFooter() {
  return /* @__PURE__ */ jsx("footer", { className: "site-footer", children: /* @__PURE__ */ jsxs("div", { className: "site-container footer-inner", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", children: "Muazzam Group" }),
    /* @__PURE__ */ jsxs("span", { className: "status", children: [
      /* @__PURE__ */ jsx("span", { className: "status-dot" }),
      "Nine divisions · one group"
    ] }),
    /* @__PURE__ */ jsxs("span", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] })
  ] }) });
}
function ServiceDirectory() {
  return /* @__PURE__ */ jsxs("section", { className: "site-container directory-section", children: [
    /* @__PURE__ */ jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ jsx("h2", { children: "Service directory" }),
      /* @__PURE__ */ jsx("span", { className: "eyebrow", children: "09 divisions" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "service-grid", children: services.map((service, index) => /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/services/$slug",
        params: { slug: service.slug },
        className: `service-card ${service.variant ?? ""}`,
        style: {
          "--card-accent": service.accent,
          "--card-soft": service.soft
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "service-card-media", children: [
            /* @__PURE__ */ jsx("span", { className: "service-card-num", children: String(index + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsx("img", { src: service.image, alt: service.title, loading: "lazy" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "service-card-body", children: [
            /* @__PURE__ */ jsx("h3", { children: service.title }),
            /* @__PURE__ */ jsx("p", { children: service.short }),
            /* @__PURE__ */ jsxs("span", { className: "card-link", children: [
              "Open division ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
            ] })
          ] })
        ]
      },
      service.slug
    )) })
  ] });
}
function EnquiryBand() {
  return /* @__PURE__ */ jsx("section", { className: "enquiry-band", children: /* @__PURE__ */ jsxs("div", { className: "site-container enquiry-inner", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: ENQUIRY_IMG,
        width: 1200,
        height: 900,
        loading: "lazy",
        alt: "Bespoke occasion wear and celebration photography"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Enquiry" }),
      /* @__PURE__ */ jsx("h2", { children: "Tell us which division you need." }),
      /* @__PURE__ */ jsx("p", { className: "supporting-copy", children: "A property project, a business idea or a special occasion — start with the service that matters to you." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "neon", children: /* @__PURE__ */ jsxs(Link, { to: "/contact", search: { division: "" }, children: [
        "Start an enquiry ",
        /* @__PURE__ */ jsx(ArrowRight, { size: 15 })
      ] }) })
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$4.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(SiteHeader, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
}
const $$splitComponentImporter$3 = () => import("./index-DLVe9B-j.js");
const Route$3 = createFileRoute("/")({
  head: () => pageMeta("Nine service divisions", "Construction, property, IT, O/A-level tuition, catering, events, tailoring, legal consultancy, school partnerships and wholesale services."),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./contact-D2Lmv4QG.js");
const Route$2 = createFileRoute("/contact")({
  validateSearch: (search) => ({
    division: typeof search.division === "string" ? search.division : ""
  }),
  head: () => pageMeta("Start an enquiry", "Prepare an enquiry for property, IT, tuition, catering, events, tailoring, legal consultancy, school partnerships or wholesale."),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./divisions-EC7tCepu.js");
const Route$1 = createFileRoute("/divisions")({
  head: () => pageMeta("Our divisions", "Explore nine specialised divisions, from construction and technology to education, events and professional consultancy."),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./services._slug-lB4q_juV.js");
const Route = createFileRoute("/services/$slug")({
  loader: ({
    params
  }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({
    loaderData
  }) => pageMeta((loaderData == null ? void 0 : loaderData.title) ?? "Division unavailable", (loaderData == null ? void 0 : loaderData.short) ?? "The requested service division could not be found."),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const ContactRoute = Route$2.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$4
});
const DivisionsRoute = Route$1.update({
  id: "/divisions",
  path: "/divisions",
  getParentRoute: () => Route$4
});
const ServicesSlugRoute = Route.update({
  id: "/services/$slug",
  path: "/services/$slug",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  ContactRoute,
  DivisionsRoute,
  ServicesSlugRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  EnquiryBand as E,
  HERO_IMG as H,
  Route$2 as R,
  ServiceDirectory as S,
  Route as a,
  router as r,
  services as s
};
