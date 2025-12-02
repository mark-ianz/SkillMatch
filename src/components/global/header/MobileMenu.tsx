"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { cn, getRoleName } from "@/lib/utils";
import NotificationPopover from "./NotificationPopover";
import ProfilePopover from "./ProfilePopover";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const role_id = session?.user?.role_id;
  const status_id = session?.user?.status_id;
  const role = getRoleName(role_id);
  const isActive = status_id === 1 || role_id === 2;
  const isAdmin = session?.user?.isAdmin;

  // Determine user type based on current path
  const isCompanyPath = pathname?.startsWith("/company");
  const userType = isCompanyPath ? "company" : "applicant";

  // Hide menu if user is in onboarding (not active)
  const showNavigation = !role_id || isActive;

  const isApplicant = role === "Applicant";
  const isCompany = role === "Company";

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          {/* Navigation Links */}
          {showNavigation && (
            <nav className="flex flex-col gap-2">
              {/* Unauthenticated Navigation */}
              {!role_id && (
                <>
                  <Link
                    href={isCompanyPath ? "/company" : "/"}
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                  {!isCompanyPath && (
                    <>
                      <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                        Explore
                      </div>
                      <Link
                        href="/explore/job-postings"
                        className="px-6 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                        onClick={handleLinkClick}
                      >
                        Jobs
                      </Link>
                      <Link
                        href="/explore/companies"
                        className="px-6 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                        onClick={handleLinkClick}
                      >
                        Companies
                      </Link>
                    </>
                  )}
                  <Link
                    href="/about"
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    About
                  </Link>
                  {isCompanyPath && (
                    <Link
                      href="/company#benefits"
                      className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                      onClick={handleLinkClick}
                    >
                      Benefits
                    </Link>
                  )}
                  <Link
                    href={`${isCompanyPath ? "/company#how-it-works" : "/#how-it-works"}`}
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    How It Works
                  </Link>
                  <Link
                    href={isCompanyPath ? "/" : "/company"}
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    For {isCompanyPath ? "Applicants" : "Companies"}
                  </Link>
                </>
              )}

              {/* Applicant Navigation */}
              {isApplicant && (
                <>
                  <Link
                    href="/feed"
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Feed
                  </Link>
                  <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                    Explore
                  </div>
                  <Link
                    href="/explore/job-postings"
                    className="px-6 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Jobs
                  </Link>
                  <Link
                    href="/explore/companies"
                    className="px-6 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Companies
                  </Link>
                  <Link
                    href="/applicant/application-tracker"
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Application Tracker
                  </Link>
                </>
              )}

              {/* Company Navigation */}
              {isCompany && (
                <>
                  <Link
                    href="/feed"
                    className="px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Feed
                  </Link>
                  <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                    Manage
                  </div>
                  <Link
                    href="/company/job-postings"
                    className="px-6 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Job Postings
                  </Link>
                  <Link
                    href="/company/feed-posts"
                    className="px-6 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                    onClick={handleLinkClick}
                  >
                    Feed Posts
                  </Link>
                </>
              )}
            </nav>
          )}

          {/* Divider */}
          <div className="border-t" />

          {/* User Actions */}
          {status === "loading" ? (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              Loading...
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {!role_id ? (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/signin?type=${userType}`} onClick={handleLinkClick}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className={cn(
                      "w-full bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90",
                      userType === "company" &&
                        "bg-skillmatch-primary-blue hover:bg-skillmatch-primary-blue/90"
                    )}
                  >
                    <Link href={`/signup?type=${userType}`} onClick={handleLinkClick}>
                      Get Started
                    </Link>
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-3 px-4">
                  {!isAdmin && <NotificationPopover />}
                  <ProfilePopover userType={role} />
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
