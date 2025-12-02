import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SkillMatch",
  description:
    "Learn how SkillMatch collects, uses, and protects your personal information. Our commitment to student privacy and data security for QCU students.",
  keywords: [
    "SkillMatch privacy policy",
    "data protection",
    "student privacy",
    "QCU data security",
    "Google OAuth privacy",
    "personal information",
  ],
  openGraph: {
    title: "Privacy Policy - SkillMatch",
    description:
      "How we protect and handle your personal information at SkillMatch.",
    type: "website",
    url: "https://skillmatch.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://skillmatch.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 30, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-16 lg:py-20 bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="mb-4">
              <Shield className="h-3 w-3 mr-1" />
              Legal Document
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Welcome to SkillMatch. We are committed to protecting your
                personal information and your right to privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our OJT placement platform
                designed exclusively for Quezon City University (QCU) students
                and verified partner companies.
              </p>
              <p>
                By using SkillMatch, you agree to the collection and use of
                information in accordance with this Privacy Policy. If you do
                not agree with our policies and practices, please do not use our
                platform.
              </p>
            </div>
          </Card>

          {/* Information We Collect */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  1.1 Personal Information You Provide
                </h3>
                <p className="mb-2">
                  We collect information that you voluntarily provide when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Register for an account (name, email address, student ID)
                  </li>
                  <li>
                    Complete your profile (course, year level, skills, contact
                    information)
                  </li>
                  <li>Upload documents (resume, portfolio, certificates)</li>
                  <li>Apply for OJT positions</li>
                  <li>Communicate with companies or our support team</li>
                  <li>Participate in surveys or provide feedback</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  1.2 Google OAuth Information
                </h3>
                <p className="mb-2">
                  When you sign in using Google OAuth, we collect and process
                  the following information from your Google account:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email address (to verify QCU affiliation)</li>
                  <li>Name and profile picture</li>
                  <li>Google account ID (for authentication purposes)</li>
                </ul>
                <p className="mt-3 text-sm">
                  We only request the minimum permissions necessary to
                  authenticate your account. We do not access your Gmail, Google
                  Drive, or other Google services beyond what is required for
                  authentication.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  1.3 Company-Specific Information
                </h3>
                <p className="mb-2">
                  For verified company accounts, we additionally collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Company name, address, and contact details</li>
                  <li>Business registration information</li>
                  <li>Company logo and profile information</li>
                  <li>Job posting details and requirements</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* How We Use Your Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">
                    Account Management:
                  </strong>{" "}
                  To create and manage your account, verify your identity, and
                  authenticate access
                </li>
                <li>
                  <strong className="text-foreground">OJT Matching:</strong> To
                  match students with suitable OJT opportunities based on
                  skills, preferences, and qualifications
                </li>
                <li>
                  <strong className="text-foreground">Communication:</strong> To
                  send notifications about applications, job matches, platform
                  updates, and support responses
                </li>
                <li>
                  <strong className="text-foreground">
                    Platform Improvement:
                  </strong>{" "}
                  To analyze usage patterns, improve features, and enhance user
                  experience
                </li>
                <li>
                  <strong className="text-foreground">Security:</strong> To
                  detect fraud, prevent abuse, and maintain platform security
                </li>
                <li>
                  <strong className="text-foreground">Compliance:</strong> To
                  comply with legal obligations and QCU partnership requirements
                </li>
              </ul>
            </div>
          </Card>

          {/* Information Sharing */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              3. How We Share Your Information
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  3.1 With Companies
                </h3>
                <p>
                  When you apply for an OJT position, we share your profile
                  information, resume, and application details with the specific
                  company you&apos;re applying to. Companies only see
                  information relevant to your application.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  3.2 With QCU
                </h3>
                <p>
                  As part of our partnership with Quezon City University, we may
                  share aggregated, anonymized data about student placements and
                  platform usage with the university&apos;s Office of Student
                  Affairs for academic and administrative purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  3.3 Service Providers
                </h3>
                <p>
                  We work with trusted third-party service providers who assist
                  us in operating our platform, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Google OAuth (for authentication)</li>
                  <li>aiven.io (for data storage)</li>
                  <li>vercel (for notifications)</li>
                </ul>
                <p className="mt-2">
                  These providers are contractually obligated to protect your
                  information and use it only for the purposes we specify.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  3.4 Legal Requirements
                </h3>
                <p>
                  We may disclose your information if required by law or in
                  response to valid legal requests.
                </p>
              </div>
            </div>
          </Card>

          {/* Data Security */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We implement industry-standard security measures to protect your
                personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication using Google OAuth 2.0</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication requirements</li>
                <li>Secure password hashing for credential-based logins</li>
              </ul>
              <p className="mt-4">
                While we strive to protect your information, no method of
                transmission over the internet is 100% secure. We cannot
                guarantee absolute security of your data.
              </p>
            </div>
          </Card>

          {/* Your Rights */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">5. Your Privacy Rights</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Correction:</strong>{" "}
                  Update or correct inaccurate information
                </li>
                <li>
                  <strong className="text-foreground">Deletion:</strong> Request
                  deletion of your account and data
                </li>
                <li>
                  <strong className="text-foreground">Data Portability:</strong>{" "}
                  Request your data in a portable format
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:skillmatch.qcu@skillmatch.com"
                  className="text-skillmatch-primary-green hover:underline"
                >
                  skillmatch.qcu@skillmatch.com
                </a>
              </p>
            </div>
          </Card>

          {/* Cookies */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We use cookies to enhance your experience on SkillMatch. These
                cookies are essential for authentication and core platform
                functionality, such as keeping you logged in across pages.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Session Cookies:</strong>{" "}
                  Used to maintain your login session and ensure secure access
                  to your account.
                </li>
                <li>
                  <strong className="text-foreground">Control:</strong> You can
                  manage or block cookies through your browser settings, but
                  please note that doing so may prevent you from logging in or
                  using certain features.
                </li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> We do not use analytics, advertising, or
                preference cookies at this time.
              </p>
            </div>
          </Card>

          {/* Data Retention */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We retain your personal information for as long as:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your account remains active</li>
                <li>Needed to provide services to you</li>
                <li>Required by law or for legitimate business purposes</li>
              </ul>
              <p className="mt-4">
                Currently, we do not provide a feature for users to delete their
                own accounts.
              </p>
              <p>
                If you wish to have your account or personal information
                removed, please contact us at{" "}
                <Link
                  className="text-skillmatch-primary-green hover:underline"
                  href="mailto:skillmatch.qcu@gmail.com"
                >
                  skillmatch.qcu@gmail.com
                </Link>
                .
              </p>
              <p>
                We will remove your personal information within 30 days of such
                a request, except where we are required to retain it for legal
                or compliance purposes.
              </p>
            </div>
          </Card>

          {/* Children's Privacy */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              8. Children&apos;s Privacy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                SkillMatch is intended for college students aged 18 and above.
                We do not knowingly collect information from individuals under
                18. If you are under 18, please do not use our platform or
                provide any personal information.
              </p>
            </div>
          </Card>

          {/* Changes to Policy */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new policy on
                this page and updating the &quot;Last Updated&quot; date. Your
                continued use of SkillMatch after changes are posted constitutes
                acceptance of the updated policy.
              </p>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-8 bg-muted/50">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <Link
                className="mt-4 flex items-center gap-2 text-skillmatch-primary-green hover:underline"
                href="mailto:skillmatch.qcu@gmail.com"
              >
                <Mail className="h-4 w-4 text-skillmatch-primary-green" />
                skillmatch.qcu@gmail.com
              </Link>
            </div>
          </Card>

          {/* Footer Links */}
          <div className="text-center pt-8 space-y-4">
            <p className="text-sm text-muted-foreground">Related Documents</p>
            <div className="flex justify-center gap-4 flex-wrap">
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
              <Link
                href="/about"
                className="text-sm text-skillmatch-primary-green hover:underline"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
