import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Role IDs
const ROLE_APPLICANT = 3;
const ROLE_COMPANY = 4;
const ROLE_ADMIN = 1;

// Status IDs
const STATUS_ACTIVE = 1;
const STATUS_ONBOARDING = 7;

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

  // ========== PUBLIC ROUTES (No authentication needed) ==========
  const publicRoutes = ["/", "/company", "/explore", "/faqs"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // ========== AUTH ROUTES (/signin, /signup) ==========
  const isAuthRoute = pathname.startsWith("/signin") || pathname.startsWith("/signup");

  if (isAuthRoute) {
    if (!isAuthenticated) {
      // Not logged in - allow access to signin/signup
      return NextResponse.next();
    }

    // User is authenticated - redirect based on status
    if (status_id === STATUS_ONBOARDING) {
      // Onboarding user trying to access signin/signup - redirect to onboarding
      const onboardingPath = role_id === ROLE_APPLICANT 
        ? "/onboarding/applicant" 
        : role_id === ROLE_COMPANY 
        ? "/onboarding/company"
        : "/onboarding/applicant"; // fallback

      return NextResponse.redirect(new URL(onboardingPath, request.url));
    }

    if (status_id === STATUS_ACTIVE) {
      // Active user trying to access signin/signup - redirect to feed
      return NextResponse.redirect(new URL("/feed", request.url));
    }

    // Allow for other statuses (pending, etc.)
    return NextResponse.next();
  }

  // ========== ONBOARDING ROUTES ==========
  if (pathname.startsWith("/onboarding")) {
    if (!isAuthenticated) {
      // Not logged in - redirect to signup
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    // Check if user is in onboarding status
    if (status_id !== STATUS_ONBOARDING) {
      // Not in onboarding status - redirect to appropriate page
      return NextResponse.redirect(new URL("/feed", request.url));
    }

    // Check role-specific onboarding routes
    if (pathname.startsWith("/onboarding/applicant")) {
      if (role_id !== ROLE_APPLICANT) {
        return NextResponse.redirect(new URL("/forbidden", request.url));
      }
    }

    if (pathname.startsWith("/onboarding/company")) {
      if (role_id !== ROLE_COMPANY) {
        return NextResponse.redirect(new URL("/forbidden", request.url));
      }
    }

    return NextResponse.next();
  }

  // ========== ADMIN ROUTES ==========
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (role_id !== ROLE_ADMIN) {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  }

  // ========== PROTECTED ROUTES - Require authentication and active status ==========
  const protectedRoutes = ["/feed", "/profile", "/explore", "/test"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    // Check if user is active
    if (status_id !== STATUS_ACTIVE) {
      if (status_id === STATUS_ONBOARDING) {
        // Still in onboarding - redirect to onboarding
        const onboardingPath = role_id === ROLE_APPLICANT 
          ? "/onboarding/applicant" 
          : "/onboarding/company";
        return NextResponse.redirect(new URL(onboardingPath, request.url));
      }

      // Other statuses (pending, disabled, etc.) - forbidden
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  }

  // ========== ROLE-BASED ROUTES ==========

  // Applicant-only routes (profile, etc.)
  if (pathname.match(/^\/(profile|applications)/)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (role_id !== ROLE_APPLICANT) {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    if (status_id !== STATUS_ACTIVE) {
      // If onboarding, redirect to onboarding page
      if (status_id === STATUS_ONBOARDING) {
        return NextResponse.redirect(new URL("/onboarding/applicant", request.url));
      }
      // Other statuses - forbidden
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  }

  // Company-only routes (excludes public /company landing page)
  if (pathname.startsWith("/company/") || (pathname.startsWith("/company") && pathname !== "/company")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (role_id !== ROLE_COMPANY) {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    if (status_id !== STATUS_ACTIVE) {
      // If onboarding, redirect to onboarding page
      if (status_id === STATUS_ONBOARDING) {
        return NextResponse.redirect(new URL("/onboarding/company", request.url));
      }
      // Other statuses - forbidden
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  }

  // Default: allow access
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
