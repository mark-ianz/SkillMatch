import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Users,
  Heart,
  TrendingUp,
  Shield,
  Sparkles,
  CheckCircle2,
  Globe,
  Mail,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// SEO Metadata
export const metadata: Metadata = {
  title: "About SkillMatch | QCU OJT Placement Platform",
  description:
    "Learn about SkillMatch, the exclusive OJT placement platform connecting Quezon City University students with verified partner companies. Discover our mission, values, and impact.",
  keywords: [
    "SkillMatch",
    "Quezon City University",
    "QCU",
    "OJT platform",
    "internship placement",
    "student employment",
    "career development",
    "partner companies",
    "Manila internships",
  ],
  authors: [{ name: "SkillMatch Team" }],
  creator: "SkillMatch",
  publisher: "SkillMatch",
  openGraph: {
    title: "About SkillMatch - QCU&apos;s Premier OJT Placement Platform",
    description:
      "Connecting 3,000+ QCU students with 200+ verified partner companies. Learn about our mission to bridge education and industry.",
    type: "website",
    locale: "en_PH",
    url: "https://skillmatch.com/about",
    siteName: "SkillMatch",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "SkillMatch - About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SkillMatch | QCU OJT Placement Platform",
    description:
      "Connecting QCU students with verified partner companies for meaningful OJT experiences.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "https://skillmatch.com/about",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AboutPage() {
  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SkillMatch",
    url: "https://skillmatch.com",
    logo: "https://skillmatch.com/logo.png",
    description:
      "SkillMatch is an exclusive OJT placement platform connecting Quezon City University students with verified partner companies.",
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Quezon City",
      addressRegion: "Metro Manila",
      addressCountry: "PH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+63-2-8806-3000",
      contactType: "Customer Support",
      email: "support@skillmatch.com",
      availableLanguage: ["English", "Filipino"],
    },
    sameAs: [
      "https://facebook.com/skillmatch",
      "https://twitter.com/skillmatch",
      "https://linkedin.com/company/skillmatch",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background">
        <div className="py-20 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <article className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                <Sparkles className="h-3 w-3 mr-1" />
                Bridging Education & Industry Since 2023
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
                About{" "}
                <span className="text-skillmatch-primary-green">
                  SkillMatch
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                We&apos;re building the future of career development by
                connecting Quezon City University students with trusted industry
                partners, creating meaningful opportunities that transform
                education into real-world success.
              </p>
            </article>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <section
          className="py-20 border-y bg-background"
          aria-labelledby="mission-heading"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="p-8 lg:p-10 border-2 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-skillmatch-primary-green" />
                </div>
                <h2 id="mission-heading" className="text-3xl font-bold mb-4">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To empower Quezon City University students by providing
                  seamless access to quality on-the-job training opportunities
                  with verified partner companies, fostering professional growth
                  and bridging the gap between academic learning and industry
                  experience.
                </p>
              </Card>

              <Card className="p-8 lg:p-10 border-2 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-skillmatch-primary-green" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To become the leading OJT placement platform in the
                  Philippines, recognized for creating lasting partnerships
                  between educational institutions and industries while
                  empowering the next generation of professionals to achieve
                  their career aspirations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section
          className="py-20 bg-background"
          aria-labelledby="values-heading"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="values-heading"
                className="text-3xl md:text-5xl font-bold mb-4 text-balance"
              >
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at SkillMatch
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-skillmatch-primary-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trust & Safety</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We verify every partner company and ensure all opportunities
                  meet our quality standards, protecting students throughout
                  their journey.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-skillmatch-primary-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Student-First Approach
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every decision we make prioritizes student success, career
                  growth, and meaningful professional development.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-skillmatch-primary-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We maintain the highest standards in matching students with
                  opportunities that truly align with their skills and
                  aspirations.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-skillmatch-primary-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community Building</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We foster connections between students, alumni, and industry
                  professionals to create a supportive network.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-skillmatch-primary-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Continuous Innovation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We constantly improve our platform with new features and
                  technologies to better serve our community.
                </p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-skillmatch-primary-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Transparency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We operate with openness and honesty, providing clear
                  information about opportunities, processes, and expectations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-muted/50" aria-labelledby="story-heading">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2
                id="story-heading"
                className="text-3xl md:text-5xl font-bold mb-8 text-center text-balance"
              >
                Our Story
              </h2>
              <div className="prose prose-lg max-w-none">
                <Card className="p-8 lg:p-12">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    SkillMatch was founded in 2025 with a simple but powerful
                    vision: to redefine how Quezon City University students
                    connect with their first professional opportunities.
                    Recognizing that traditional OJT placement processes were
                    often fragmented and inefficient, we set out to create a
                    platform that bridges the gap between academic learning and
                    industry readiness.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    In collaboration with Quezon City University Scholarship,
                    Placement, and Alumni Relations Division, we designed a
                    comprehensive platform that guides students through the
                    entire OJT journey—from discovering opportunities to
                    securing placements. Our carefully curated partnership model
                    ensures that only verified, quality companies can post
                    positions, giving students confidence as they explore their
                    career paths.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    SkillMatch serves as the primary OJT placement platform for
                    Quezon City University, connecting thousands of students
                    with industry-leading companies across Metro Manila and
                    beyond. We&apos;re proud to have facilitated meaningful
                    career starts for our students while providing companies
                    access to Quezon City University&apos;s exceptional talent
                    pool.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          className="py-20 bg-background"
          aria-labelledby="contact-heading"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="contact-heading"
                className="text-3xl md:text-5xl font-bold mb-4 text-balance"
              >
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions or want to learn more? We&apos;d love to hear
                from you.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-7 w-7 text-skillmatch-primary-green" />
                </div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <a
                  href="mailto:skillmatch.qcu@gmail.com"
                  className="text-skillmatch-primary-green hover:underline"
                  aria-label="Email SkillMatch support"
                >
                  skillmatch.qcu@gmail.com
                </a>
              </Card>

              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-7 w-7 text-skillmatch-primary-green" />
                </div>
                <h3 className="font-bold mb-2">Contact QCU</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  For university-related inquiries, visit:
                </p>
                <a
                  href="https://qcu.edu.ph/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-skillmatch-primary-green hover:underline"
                  aria-label="Visit QCU contact page"
                >
                  QCU Contact Page
                </a>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className="bg-gradient-to-r from-skillmatch-primary-blue to-skillmatch-primary-green text-white p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join the SkillMatch community and discover how we&apos;re
                transforming OJT experiences for QCU students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-sm bg-skillmatch-light text-skillmatch-dark hover:bg-skillmatch-light/90"
                >
                  Explore Opportunities
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-sm bg-transparent hover:bg-skillmatch-light/10 hover:text-skillmatch-light"
                >
                  For Companies
                </Button>
              </div>
            </Card>
            {/* Footer Links */}
            <div className="text-center pb-12 space-y-4 mt-14">
              <p className="text-sm text-muted-foreground">Related Documents</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  href="/privacy-policy"
                  className="text-sm text-skillmatch-primary-green hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-skillmatch-primary-green hover:underline"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/faqs"
                  className="text-sm text-skillmatch-primary-green hover:underline"
                >
                  FAQs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
