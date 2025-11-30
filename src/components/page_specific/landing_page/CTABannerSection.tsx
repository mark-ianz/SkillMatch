import Link from "next/link";
import React from "react";

export default function CTABannerSection() {
  return (
    <section className="max-w-7xl mx-auto mt-12">
      <div className="text-skillmatch-light rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 text p-12 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Opportunities made for you</h3>
          <p className="mt-2 text/90">
            Sign up to discover jobs and build meaningful connections.
          </p>
        </div>
        <div>
          <Link
            href="/signup"
            className="inline-block bg text-skillmatch-light bg-skillmatch-primary-green px-6 py-3 rounded-full font-medium"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </section>
  );
}
