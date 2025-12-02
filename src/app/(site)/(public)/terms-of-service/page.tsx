import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Mail, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | SkillMatch",
  description:
    "Read the Terms of Service for SkillMatch. Understand the rules, responsibilities, and guidelines for using our OJT placement platform for QCU students and partner companies.",
  keywords: [
    "SkillMatch terms",
    "terms of service",
    "user agreement",
    "QCU platform rules",
    "OJT platform terms",
    "usage policy",
  ],
  openGraph: {
    title: "Terms of Service - SkillMatch",
    description: "Terms and conditions for using SkillMatch platform.",
    type: "website",
    url: "https://skillmatch.com/terms-of-service",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://skillmatch.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "November 30, 2025";
  const effectiveDate = "November 30, 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-16 lg:py-20 bg-gradient-to-b from-muted/50 to-background border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="mb-4">
              <FileText className="h-3 w-3 mr-1" />
              Legal Agreement
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span>Effective: {effectiveDate}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Important Notice */}
          <Card className="p-6 border-l-4 border-skillmatch-primary-green bg-muted/50">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-skillmatch-primary-green flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold">Important Notice</p>
                <p className="text-sm text-muted-foreground">
                  Please read these Terms of Service carefully before using
                  SkillMatch. By accessing or using our platform, you agree to
                  be bound by these terms. If you do not agree, please do not
                  use our services.
                </p>
              </div>
            </div>
          </Card>

          {/* Introduction */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                These Terms of Service (&quot;Terms&quot;) constitute a legally
                binding agreement between you and SkillMatch (&quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;) regarding your use of the
                SkillMatch platform (the &quot;Service&quot;).
              </p>
              <p>
                SkillMatch is an exclusive OJT placement platform designed for
                Quezon City University (QCU) students and verified partner
                companies. By creating an account or using our Service, you
                confirm that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You are at least 18 years of age</li>
                <li>
                  You are a currently enrolled QCU student or authorized
                  representative of a verified company
                </li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>
                  You will comply with all applicable laws and regulations
                </li>
              </ul>
            </div>
          </Card>

          {/* Eligibility */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              2. Eligibility and Account Registration
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  2.1 Student Accounts
                </h3>
                <p>To create a student account, you must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    Be a currently enrolled student at Quezon City University
                  </li>
                  <li>Register using a valid QCU email address</li>
                  <li>Provide accurate and complete information</li>
                  <li>Verify your email address</li>
                  <li>Complete required onboarding steps</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  2.2 Company Accounts
                </h3>
                <p>To create a company account, you must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    Be an authorized representative of a legitimate business
                  </li>
                  <li>
                    Be verified and approved by QCU or SkillMatch administration
                  </li>
                  <li>
                    Provide accurate company information and documentation
                  </li>
                  <li>
                    Agree to comply with additional company-specific terms
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  2.3 Account Security
                </h3>
                <p>You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Logging out from shared or public devices</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Use of Service */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">3. Use of the Service</h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  3.1 Permitted Use
                </h3>
                <p>You may use SkillMatch to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Search and browse OJT opportunities (students)</li>
                  <li>Create and submit job applications (students)</li>
                  <li>Post and manage job listings (companies)</li>
                  <li>Review applications from students (companies)</li>
                  <li>Communicate with potential employers/candidates</li>
                  <li>Manage your profile and account settings</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  3.2 Prohibited Conduct
                </h3>
                <p>You agree NOT to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Provide false, inaccurate, or misleading information</li>
                  <li>Impersonate another person or entity</li>
                  <li>Post fraudulent job listings or applications</li>
                  <li>
                    Use the platform for any illegal or unauthorized purpose
                  </li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Scrape, copy, or extract data from the platform</li>
                  <li>
                    Attempt to bypass security measures or access restrictions
                  </li>
                  <li>Upload viruses, malware, or malicious code</li>
                  <li>Use automated systems (bots) without authorization</li>
                  <li>Share your account with others</li>
                  <li>Solicit users for purposes outside the platform</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Content and Intellectual Property */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              4. Content and Intellectual Property
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  4.1 Your Content
                </h3>
                <p>
                  When you upload or post content (resumes, profiles, job
                  postings, etc.), you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Retain ownership of your content</li>
                  <li>
                    Grant us a license to use, display, and distribute your
                    content for platform operations
                  </li>
                  <li>Represent that you have the right to post the content</li>
                  <li>
                    Agree that your content does not violate any laws or
                    third-party rights
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  4.2 Our Content
                </h3>
                <p>
                  All SkillMatch platform features, design, text, graphics,
                  logos, and source code are owned by SkillMatch and protected
                  by intellectual property laws. You may not copy, modify, or
                  distribute our content without permission.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  4.3 Content Moderation
                </h3>
                <p>We reserve the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Review, monitor, and remove any content</li>
                  <li>
                    Suspend or terminate accounts that violate these Terms
                  </li>
                  <li>Refuse service to anyone for any reason</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Job Postings and Applications */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              5. Job Postings and Applications
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  5.1 Company Responsibilities
                </h3>
                <p>Companies must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Post only legitimate, legal OJT opportunities</li>
                  <li>Provide accurate job descriptions and requirements</li>
                  <li>
                    Comply with labor laws and anti-discrimination regulations
                  </li>
                  <li>Respond to applications in a timely manner</li>
                  <li>Not misrepresent compensation or working conditions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  5.2 Student Responsibilities
                </h3>
                <p>Students must:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>
                    Provide accurate and truthful information in applications
                  </li>
                  <li>
                    Only apply for positions they are qualified for and
                    interested in
                  </li>
                  <li>Communicate professionally with companies</li>
                  <li>Honor commitments made to employers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  5.3 No Employment Guarantee
                </h3>
                <p>
                  SkillMatch is a platform that facilitates connections between
                  students and companies. We do not guarantee employment,
                  interview opportunities, or successful placements. All hiring
                  decisions are made solely by the companies.
                </p>
              </div>
            </div>
          </Card>

          {/* Google OAuth */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              6. Google OAuth and Third-Party Services
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                SkillMatch uses Google OAuth for authentication. By using Google
                Sign-In, you agree to Google&apos;s Terms of Service and Privacy
                Policy in addition to ours.
              </p>
              <p>When you authenticate with Google:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We only access your email, name, and profile picture</li>
                <li>
                  We do not access your Gmail, Drive, or other Google services
                </li>
                <li>
                  You can revoke our access at any time through your Google
                  account settings
                </li>
                <li>
                  We are not responsible for Google&apos;s services or policies
                </li>
              </ul>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              7. Privacy and Data Protection
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Your privacy is important to us. Our collection and use of
                personal information is governed by our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-skillmatch-primary-green hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
              <p>By using SkillMatch, you consent to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Our collection and processing of your information as described
                  in the Privacy Policy
                </li>
                <li>
                  Sharing your application information with companies you apply
                  to
                </li>
                <li>Our use of cookies and tracking technologies</li>
              </ul>
            </div>
          </Card>

          {/* Disclaimers */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              8. Disclaimers and Limitation of Liability
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  8.1 Service Provided &quot;As Is&quot;
                </h3>
                <p>
                  SkillMatch is provided on an &quot;as is&quot; and &quot;as
                  available&quot; basis. We make no warranties about the
                  Service&apos;s reliability, accuracy, or availability. We do
                  not guarantee:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Uninterrupted or error-free service</li>
                  <li>Accuracy of information provided by users</li>
                  <li>Suitability of job opportunities or candidates</li>
                  <li>Success in finding employment or candidates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  8.2 Limitation of Liability
                </h3>
                <p>
                  To the maximum extent permitted by law, SkillMatch shall not
                  be liable for any indirect, incidental, special,
                  consequential, or punitive damages arising from your use of
                  the Service, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Loss of employment opportunities or revenue</li>
                  <li>Fraudulent activities by other users</li>
                  <li>Disputes between students and companies</li>
                  <li>Data loss or security breaches</li>
                  <li>Third-party conduct or content</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  8.3 User Verification
                </h3>
                <p>
                  While we verify QCU student status and company legitimacy, we
                  cannot guarantee the accuracy of all information provided by
                  users. You are responsible for conducting your own due
                  diligence when interacting with other users.
                </p>
              </div>
            </div>
          </Card>

          {/* Termination */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  9.1 By You
                </h3>
                <p className="mb-3">
                  You may request to terminate your account at any time by
                  contacting us at{" "}
                  <Link
                    className="text-skillmatch-primary-green hover:underline"
                    href="mailto:skillmatch.qcu@gmail.com"
                  >
                    skillmatch.qcu@gmail.com
                  </Link>
                  .
                </p>
                <p className="mb-3">
                  Upon termination, you will lose access to your account and
                  data.
                </p>
                <p>
                  Currently, account termination through the platform&apos;s
                  settings is not available, but we will process termination
                  requests within 30 days, except where we are required to
                  retain certain information for legal or compliance purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  9.2 By Us
                </h3>
                <p>We may suspend or terminate your account if you:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Violate these Terms</li>
                  <li>Engage in fraudulent or illegal activity</li>
                  <li>Are no longer a QCU student (for student accounts)</li>
                  <li>Fail company verification (for company accounts)</li>
                  <li>Abuse or misuse the platform</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  9.3 Effect of Termination
                </h3>
                <p>Upon termination:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li>Your access to the Service will cease immediately</li>
                  <li>Your profile and content may be removed</li>
                  <li>
                    Certain provisions of these Terms will survive (e.g.,
                    disclaimers, limitations)
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Changes to Terms */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right to modify these Terms at any time. When we
                make material changes, we will:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Update the &quot;Last Updated&quot; date at the top of this
                  page
                </li>
                <li>Notify you via email or platform notification</li>
                <li>Provide a reasonable period to review the changes</li>
              </ul>
              <p className="mt-4">
                Your continued use of SkillMatch after changes become effective
                constitutes acceptance of the updated Terms. If you do not agree
                to the changes, you must stop using the Service.
              </p>
            </div>
          </Card>

          {/* Governing Law */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              11. Governing Law and Dispute Resolution
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                These Terms are governed by the laws of the Republic of the
                Philippines. Any disputes arising from these Terms or your use
                of SkillMatch shall be resolved through:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Good faith negotiation between the parties</li>
                <li>Mediation, if negotiation fails</li>
                <li>
                  Arbitration or courts in Quezon City, Metro Manila,
                  Philippines
                </li>
              </ol>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-8 bg-muted/50">
            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>If you have questions about these Terms, please contact us:</p>
              <Link
                className="mt-4 flex items-center gap-2 text-skillmatch-primary-green hover:underline"
                href="mailto:skillmatch.qcu@gmail.com"
              >
                <Mail className="h-4 w-4 text-skillmatch-primary-green" />
                skillmatch.qcu@gmail.com
              </Link>
            </div>
          </Card>

          {/* Acknowledgment */}
          <Card className="p-6 border-l-4 border-skillmatch-primary-green bg-muted/50">
            <div className="space-y-2">
              <p className="font-semibold">Acknowledgment</p>
              <p className="text-sm text-muted-foreground">
                By using SkillMatch, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service and
                our Privacy Policy.
              </p>
            </div>
          </Card>

          {/* Footer Links */}
          <div className="text-center pt-8 space-y-4">
            <p className="text-sm text-muted-foreground">Related Documents</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/privacy-policy"
                className="text-sm text-skillmatch-primary-green hover:underline"
              >
                Privacy Policy
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
