/* eslint-disable */
// @ts-nocheck
// Auto-generated route tree.

import { Route as rootRouteImport } from "./routes/__root";
import { Route as IndexRouteImport } from "./routes/index";
import { Route as ContactRouteImport } from "./routes/contact";
import { Route as DivisionsRouteImport } from "./routes/divisions";
import { Route as ServicesSlugRouteImport } from "./routes/services.$slug";

const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport,
});
const ContactRoute = ContactRouteImport.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => rootRouteImport,
});
const DivisionsRoute = DivisionsRouteImport.update({
  id: "/divisions",
  path: "/divisions",
  getParentRoute: () => rootRouteImport,
});
const ServicesSlugRoute = ServicesSlugRouteImport.update({
  id: "/services/$slug",
  path: "/services/$slug",
  getParentRoute: () => rootRouteImport,
});

const rootRouteChildren = {
  IndexRoute,
  ContactRoute,
  DivisionsRoute,
  ServicesSlugRoute,
};

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes(); 