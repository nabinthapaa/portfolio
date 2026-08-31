import type { Config, Context } from "@netlify/edge-functions";

// Netlify enforces the rateLimit below before this runs, so the body only has
// to hand the request onward to the Next.js server handler.
export default async (_request: Request, context: Context) => context.next();

// Rate limits cannot be declared in netlify.toml; they must live in a function
// file's config export. The Next.js runtime serves /api/contact from its own
// catch-all handler, so the limit is attached to this edge function guarding
// the same path. Requests over the limit are rejected at the edge and never
// invoke the function.
export const config: Config = {
  path: "/api/contact",
  method: "POST",
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
