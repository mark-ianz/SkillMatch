Middleware & Session Notes

Goal

- Use a central middleware to enforce authentication/authorization for all API routes and app routes.
- Avoid relying on `company_id` or other user identifiers passed in request params or body. Instead, derive identity from the session (token) inside middleware or in the route handler.

Why

- Hardening: prevents clients from impersonating other accounts by changing params.
- Consistency: all route handlers can assume a verified session is present.
- Simplicity: route handlers no longer need to re-implement session checks; middleware can attach relevant context.

Recommended approach (Next.js App Router)

1) Create a top-level middleware: `src/middleware.ts`

Example (NextAuth / next-auth/jwt):

```ts
// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // getToken reads and verifies the next-auth JWT cookie
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // redirect to sign-in, or return 401 for API routes
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/signin";
    return NextResponse.redirect(url);
  }

  // Optionally attach user information to the request headers for downstream handlers
  // NOTE: Next.js Request object is immutable; to pass data to route handlers we can
  // set custom headers on the response or use cookies. For App Router route handlers
  // you can call getToken/getSession again server-side, or use a helper in the server
  // function to re-derive the session.

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/company/:path*",
    "/api/ojt/:path*",
    "/company/:path*",
    "/ojt/:path*",
    // add other paths that need protection
  ],
};
```

2) Use getToken / getServerSession inside server route handlers when you need session data

- If a route needs both session identity and database access, call `getToken` or `getServerSession` within the route (server side) and use the returned user id/company id.

Example in a route handler (server):

```ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const company_id = (token as any).company_id || (token as any).sub; // depends on what you store in token
  // proceed to use company_id from session instead of body params
}
```

3) Avoid relying on client-provided `company_id` or `user_id`

- Remove checks that read `params` or `body.company_id` to authorize the request. Instead, use the session-derived id.
- If a route currently uses `context.params` (e.g., route: `/api/ojt/skills/[user_id]`), prefer not to rely on the passed `user_id` for authorization — confirm that the session user matches that `user_id` or simply use the session identity and consider making the route `/api/ojt/skills/me` or `/api/ojt/skills`.

4) Migrate routes gradually

- Start with sensitive routes: creating job posts (`/api/company/job-post/create`), updating company data, deleting documents, etc.
- For each route:
  - Remove `company_id` requirement in the request body.
  - Derive identity from `getToken`/`getServerSession`.
  - If ownership must be checked (e.g., user editing a specific resource), fetch the resource and compare its owner id with session id.

5) Examples & checklist for converting a route

- Current route pattern (problematic):
  - Accepts `company_id` in body or params and trusts it.
- New pattern (recommended):
  - Middleware enforces session presence for the route.
  - Route handler calls `getToken` (or `getServerSession`) and derives `company_id` from the token/session.
  - Route uses `company_id` from session to perform DB operations.
  - Return 401/403 if session missing or not authorized.

6) Notes about serverless / edge environments

- `getToken` is compatible with serverless environments and reads the NextAuth JWT cookie.
- `getServerSession` may require extra setup in the App Router — check your NextAuth config.

7) Example: update `src/app/api/company/job-post/create/route.ts`

- Replace the temporary `company_id` body requirement with token-based identity:

```ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: Request) {
  const token = await getToken({ req: request as any, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const company_id = (token as any).company_id;
  // continue using company_id
}
```

Where to find this note

- This file: `docs/MIDDLEWARE_NOTES.md` in the repository root. Keep it in the repo so you can consult it anytime and iterate on the plan.

If you want, I can:

- Update `src/app/api/company/job-post/create/route.ts` now to derive `company_id` from the session token instead of requiring it in the body (I can implement that if your NextAuth token includes company_id or if we can map user -> company server-side).
- Add more examples showing how to attach session-derived data to requests or how to structure `matcher` patterns.

Tell me if you want me to automatically update the job-post create route to use session-derived company id (I'll add a safe fallback and comments explaining assumptions).