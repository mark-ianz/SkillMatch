import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Role IDs
const ROLE_ADMIN = 1;
const ROLE_APPLICANT = 3;
const ROLE_COMPANY = 4;

// Status IDs
const STATUS_ACTIVE = 1;
const STATUS_PENDING = 2;
const STATUS_ONBOARDING = 7;

// Route definitions
const PUBLIC_ROUTES = [
  "/", 
  "/company", 
  "/explore", 
  "/faqs",
  "/about",
  "/terms-of-service",
  "/privacy-policy"
];
const ADMIN_REDIRECT = "/admin";
const UNAUTHORIZED_REDIRECT = "/unauthorized";
const FORBIDDEN_REDIRECT = "/forbidden";

// Helper functions
function redirect(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname === route);
}

function isAuthRoute(pathname: string): boolean {
  return pathname.startsWith("/signin") || pathname.startsWith("/signup");
}

function isOnboardingRoute(pathname: string): boolean {
  return pathname.startsWith("/onboarding");
}

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith("/admin");
}

function isProtectedRoute(pathname: string): boolean {
  return ["/feed", "/profile", "/explore", "/test"].some((route) => 
    pathname.startsWith(route)
  );
}

function isApplicantRoute(pathname: string): boolean {
  return pathname.match(/^\/(profile|applications)/) !== null;
}

function isCompanyProtectedRoute(pathname: string): boolean {
  return pathname.startsWith("/company/") || 
    (pathname.startsWith("/company") && pathname !== "/company");
}

function getOnboardingPath(roleId: number | undefined): string {
  if (roleId === ROLE_APPLICANT) return "/onboarding/applicant";
  if (roleId === ROLE_COMPANY) return "/onboarding/company";
  return "/onboarding/applicant";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role_id = token?.role_id as number | undefined;
  const status_id = token?.status_id as number | undefined;
  const isAuthenticated = !!token;
  const isAdmin = role_id === ROLE_ADMIN;

  // ========== PUBLIC ROUTES ==========
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // ========== AUTH ROUTES (/signin, /signup) ==========
  if (isAuthRoute(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.next();
    }

    // Redirect admins to admin dashboard
    if (isAdmin) {
      return redirect(request, ADMIN_REDIRECT);
    }

    // Redirect onboarding users to their onboarding page
    if (status_id === STATUS_ONBOARDING) {
      return redirect(request, getOnboardingPath(role_id));
    }

    // Redirect active users to feed
    if (status_id === STATUS_ACTIVE || status_id === STATUS_PENDING) {
      return redirect(request, "/feed");
    }

    return NextResponse.next();
  }

  // ========== ONBOARDING ROUTES ==========
  if (isOnboardingRoute(pathname)) {
    if (!isAuthenticated) {
      return redirect(request, "/signup");
    }

    if (isAdmin) {
      return redirect(request, ADMIN_REDIRECT);
    }

    if (status_id !== STATUS_ONBOARDING) {
      return redirect(request, "/feed");
    }

    // Check role-specific onboarding access
    if (pathname.startsWith("/onboarding/applicant") && role_id !== ROLE_APPLICANT) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    if (pathname.startsWith("/onboarding/company") && role_id !== ROLE_COMPANY) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    return NextResponse.next();
  }

  // ========== ADMIN ROUTES ==========
  if (isAdminRoute(pathname)) {
    if (!isAuthenticated) {
      return redirect(request, UNAUTHORIZED_REDIRECT);
    }

    if (!isAdmin) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    return NextResponse.next();
  }

  // ========== PROTECTED ROUTES (/feed, /profile, /explore, /test) ==========
  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      return redirect(request, UNAUTHORIZED_REDIRECT);
    }

    if (isAdmin) {
      return redirect(request, ADMIN_REDIRECT);
    }

    // Pending users can only access /feed
    if (status_id === STATUS_PENDING) {
      if (pathname.startsWith("/feed")) {
        return NextResponse.next();
      }
      return redirect(request, "/feed");
    }

    // Onboarding users should complete onboarding
    if (status_id === STATUS_ONBOARDING) {
      return redirect(request, getOnboardingPath(role_id));
    }

    // Other non-active statuses are forbidden
    if (status_id !== STATUS_ACTIVE) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    return NextResponse.next();
  }

  // ========== APPLICANT-ONLY ROUTES ==========
  if (isApplicantRoute(pathname)) {
    if (!isAuthenticated) {
      return redirect(request, UNAUTHORIZED_REDIRECT);
    }

    if (isAdmin) {
      return redirect(request, ADMIN_REDIRECT);
    }

    if (role_id !== ROLE_APPLICANT) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    if (status_id === STATUS_ONBOARDING) {
      return redirect(request, "/onboarding/applicant");
    }

    if (status_id !== STATUS_ACTIVE) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    return NextResponse.next();
  }

  // ========== COMPANY PROTECTED ROUTES ==========
  if (isCompanyProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      return redirect(request, UNAUTHORIZED_REDIRECT);
    }

    if (isAdmin) {
      return redirect(request, ADMIN_REDIRECT);
    }

    if (role_id !== ROLE_COMPANY) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    // Allow both active and pending companies
    if (status_id === STATUS_ONBOARDING) {
      return redirect(request, "/onboarding/company");
    }

    if (status_id !== STATUS_ACTIVE && status_id !== STATUS_PENDING) {
      return redirect(request, FORBIDDEN_REDIRECT);
    }

    return NextResponse.next();
  }

  // ========== DEFAULT: ALLOW ==========
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images|logo|uploads).*)",
  ],
};
