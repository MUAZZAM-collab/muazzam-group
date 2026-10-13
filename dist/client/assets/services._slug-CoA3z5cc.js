import{c,a as l,j as e,L as i,B as n,A as o}from"./index-D0VXvbdQ.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=c("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=c("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);function p(){const s=l.useLoaderData(),r=Array.isArray(s.gallery)&&s.gallery.length>0;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"site-container page-intro",children:[e.jsxs(i,{className:"back-link",to:"/divisions",children:[e.jsx(d,{size:14}),"All divisions"]}),e.jsx("p",{className:"eyebrow",style:{marginTop:32,color:s.accent},children:"Division"}),e.jsx("h1",{children:s.title}),e.jsx("p",{className:"supporting-copy",children:s.intro})]}),e.jsxs("section",{className:"site-container detail-layout",style:{"--detail-accent":s.accent,"--accent":s.accent},children:[r?e.jsx("div",{className:"tailor-gallery",children:s.gallery.map((a,t)=>e.jsxs("figure",{children:[e.jsx("img",{src:a.src,alt:a.alt,loading:"lazy"}),a.caption&&e.jsx("figcaption",{children:a.caption})]},t))}):e.jsx("img",{className:"detail-photo",src:s.image,width:1200,height:1500,alt:`${s.title} — illustrative professional imagery`}),e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",style:{color:s.accent},children:"What we offer"}),e.jsx("h2",{children:"A service shaped around your needs."}),e.jsx("ul",{className:"service-list",children:s.items.map(a=>e.jsxs("li",{children:[e.jsx(h,{size:20,style:{color:s.accent}}),a]},a))}),e.jsx("p",{className:"supporting-copy",children:s.brief}),e.jsx("div",{className:"hero-actions",children:e.jsx(n,{variant:"neon",asChild:!0,style:{background:s.accent,borderColor:s.accent},children:e.jsxs(i,{to:"/contact",search:{division:s.slug},children:["Enquire about this service ",e.jsx(o,{size:15})]})})})]})]})]})}export{p as component};
