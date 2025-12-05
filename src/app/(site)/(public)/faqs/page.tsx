import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { FAQsClient } from "@/components/page_specific/faqs/FAQsClient";

// SEO Metadata
export const metadata: Metadata = {
  title: "FAQs - Frequently Asked Questions | SkillMatch",
  description:
    "Find answers to commonly asked questions about SkillMatch, the premier OJT placement platform for Quezon City University students. Learn about applications, requirements, and how our platform works.",
  keywords: [
    "SkillMatch FAQ",
    "OJT questions",
    "QCU internship help",
    "how to apply OJT",
    "student questions",
    "company partnership",
    "application process",
    "SkillMatch support",
  ],
  authors: [{ name: "SkillMatch Team" }],
  creator: "SkillMatch",
  publisher: "SkillMatch",
  openGraph: {
    title: "Frequently Asked Questions - SkillMatch",
    description:
      "Get answers to your questions about finding OJT opportunities, applying to companies, and making the most of SkillMatch platform.",
    type: "website",
    locale: "en_PH",
    url: "https://skillmatch.com/faqs",
    siteName: "SkillMatch",
    images: [
      {
        url: "/og-faqs.jpg",
        width: 1200,
        height: 630,
        alt: "SkillMatch FAQs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | SkillMatch - Your Questions Answered",
    description:
      "Everything you need to know about finding OJT opportunities through SkillMatch.",
    images: ["/og-faqs.jpg"],
  },
  alternates: {
    canonical: "https://skillmatch.com/faqs",
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

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        id: "what-is-skillmatch",
        question: "What is SkillMatch?",
        answer:
          "SkillMatch is an exclusive OJT placement platform designed specifically for Quezon City University students. We connect students with verified partner companies for internships and on-the-job training opportunities, streamlining the entire application and placement process.",
      },
      {
        id: "who-can-use-skillmatch",
        question: "Who can use SkillMatch?",
        answer:
          "SkillMatch is exclusively available to currently enrolled Quezon City University (QCU) students and verified companies by QCU.",
      },
      {
        id: "how-to-create-account",
        question: "How do I create an account?",
        answer:
          "Creating an account is simple! Click the 'Sign Up' button, use your QCU email address, and complete the registration form. You'll need to verify your email before accessing the full platform features.",
      },
      {
        id: "is-skillmatch-free",
        question: "Is SkillMatch free to use?",
        answer:
          "Yes! SkillMatch is completely free for all QCU students. There are no hidden fees, subscription costs, or charges to apply for positions or use any of our platform features.",
      },
    ],
  },
  {
    category: "Applications & Job Search",
    questions: [
      {
        id: "how-to-search-ojt",
        question: "How do I search for OJT opportunities?",
        answer:
          "Navigate to the 'Browse Jobs' section where you can filter opportunities by industry, location, duration, and requirements. Use the search function to find specific companies or roles that match your interests and qualifications.",
      },
      {
        id: "apply-multiple-companies",
        question: "Can I apply to multiple companies?",
        answer:
          "Absolutely! You can apply to as many positions as you like. However, we recommend focusing on opportunities that truly match your skills and career goals to increase your chances of success.",
      },
      {
        id: "application-process-duration",
        question: "How long does the application process take?",
        answer:
          "The application process varies by company. On average, students receive responses within 1-2 weeks. You can track the status of all your applications in your navigations under 'Application Tracker'.",
      },
      {
        id: "required-documents",
        question: "What documents do I need to use SkillMatch?",
        answer:
          "To use SkillMatch, you only need to upload an updated resume/CV. Any additional documents required for the actual hiring process are handled directly by the company.",
      },
      {
        id: "save-jobs-later",
        question: "Can I save jobs to apply later?",
        answer:
          "Yes! Click the bookmark icon on any job posting to save it to your 'Saved Jobs' list. You can access your saved opportunities anytime from your navigations.",
      },
    ],
  },
  {
    category: "Profile & Resume",
    questions: [
      {
        id: "update-profile",
        question: "How do I update my profile?",
        answer:
          "Go to your profile settings from the dropdown menu under your avatar. You can update your personal information, skills, education, and work experience. Keep your profile current to improve your matching with relevant opportunities.",
      },
      {
        id: "upload-resume",
        question: "Should I upload my resume?",
        answer:
          "Yes, uploading your resume is highly recommended! It allows companies to quickly review your qualifications and speeds up the application process. Make sure your resume is updated and in PDF format.",
      },
    ],
  },
  {
    category: "Company & Opportunities",
    questions: [
      {
        id: "verified-companies",
        question: "Are all companies verified?",
        answer:
          "Yes! All companies on SkillMatch are verified partners of Quezon City University. We carefully screen each organization to ensure they provide quality OJT experiences and maintain professional standards.",
      },
      {
        id: "available-industries",
        question: "What industries are available?",
        answer:
          "SkillMatch partners with companies across various industries including Information Technology, Business, Engineering, Healthcare, Marketing, Finance, Education, and more. Browse our company directory to see all available sectors.",
      },
      {
        id: "contact-companies-directly",
        question: "Can I contact companies directly?",
        answer:
          "While you can view company profiles and learn about their culture, all applications and communications should go through the SkillMatch platform. This ensures proper documentation and protects both students and companies.",
      },
      {
        id: "new-opportunities-frequency",
        question: "How often are new opportunities posted?",
        answer:
          "New opportunities are posted regularly throughout the year. We recommend checking the platform weekly to stay updated on positions that match your interests.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        id: "forgot-password",
        question: "I forgot my password. What should I do?",
        answer:
          "Since registration is done through Google Account, you can log in with your QCU email even if you don't remember a password. If you've set a password and want to change it, log in first using Google, then update your password in the Settings tab.",
      },
      {
        id: "access-features",
        question: "Why can't I access certain features?",
        answer:
          "Access to some features depends on your user role. Certain tools and options are only available to specific roles to ensure the platform works securely and efficiently for everyone.",
      },
      {
        id: "website-loading-issues",
        question: "The website isn't loading properly. What should I do?",
        answer:
          "Try clearing your browser cache, using a different browser, or checking your internet connection. If problems continue, reach out to our technical support team at skillmatch.qcu@gmail.com with details about the issue.",
      },
      {
        id: "mobile-friendly",
        question: "Is SkillMatch mobile-friendly?",
        answer:
          "Yes! SkillMatch is fully responsive and works seamlessly on smartphones and tablets. You can browse opportunities, apply to positions, and manage your profile from any device.",
      },
    ],
  },
  {
    category: "For Companies",
    questions: [
      {
        id: "company-partnership",
        question: "How can my company partner with SkillMatch?",
        answer: (
          <>
            SkillMatch is available only to companies that are officially
            partnered with Quezon City University (QCU). If your company is not
            yet partnered with QCU, please contact them directly at{" "}
            <Link
              className="underline"
              target="_blank"
              href="https://qcu.edu.ph/contact-us/"
            >
              https://qcu.edu.ph/contact-us/
            </Link>
            . Once your company has an official partnership with QCU, you can
            register on SkillMatch and submit the necessary documents to verify
            your partnership.
          </>
        ),
      },
      {
        id: "posting-benefits",
        question: "What are the benefits of posting on SkillMatch?",
        answer:
          "Companies gain access to a curated talent pool of QCU students, streamlined application management, verified candidate profiles, and direct communication tools. It's an efficient way to find skilled interns who are pre-screened by the university.",
      },
    ],
  },
];

export default function FAQsPage() {
  // JSON-LD Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.questions.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }))
    ),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="py-20 lg:py-28 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <article className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                <HelpCircle className="h-3 w-3 mr-1" />
                Frequently Asked Questions
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
                How Can We{" "}
                <span className="text-skillmatch-primary-green">Help You?</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                Find answers to common questions about using SkillMatch,
                applying for OJT positions, and connecting with partner
                companies.
              </p>
            </article>
          </div>
        </header>

        {/* FAQs Section */}
        <FAQsClient faqCategories={faqCategories} />

        {/* Still Have Questions Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-12 text-center bg-gradient-to-r from-skillmatch-primary-blue to-skillmatch-primary-green text-white">
                <MessageCircle className="h-16 w-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                  Can&apos;t find the answer you&apos;re looking for? Our
                  support team is here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="flex text-sm bg-skillmatch-light text-skillmatch-dark hover:bg-skillmatch-light/90"
                  >
                    <Link href="mailto:skillmatch.qcu@gmail.com">
                      <Mail className="h-5 w-5" />
                      Email Support
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="flex text-sm bg-transparent hover:bg-skillmatch-light/10 hover:text-skillmatch-light"
                  >
                    <Link
                      href="https://qcu.edu.ph/contact-us/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="h-5 w-5" />
                      Contact QCU
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
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
                  href="/about"
                  className="text-sm text-skillmatch-primary-green hover:underline"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
