import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Building2,
  Target,
  Users,
  Zap,
  Shield,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function CompanyLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-skillmatch-primary-blue/15 to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-6 border-skillmatch-primary-blue/50"
              >
                <Sparkles className="h-3 w-3 mr-1 text-skillmatch-primary-blue" />
                QCU Partnership Program
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
                Hire Tomorrow&apos;s
                <span className="text-skillmatch-primary-blue block mt-2">
                  Top Talent Today
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
                Access a curated pool of skilled students from Quezon City
                University. Post opportunities, find perfect matches, and build
                your team with pre-vetted talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg bg-skillmatch-primary-blue text-white hover:bg-skillmatch-primary-blue/90"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 backdrop-blur-sm bg-card/50 border-skillmatch-primary-blue/20">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-skillmatch-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Targeted Recruitment</h3>
                      <p className="text-sm text-muted-foreground">
                        Post specific roles and reach students with matching
                        skill sets instantly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-skillmatch-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Verified Candidates</h3>
                      <p className="text-sm text-muted-foreground">
                        All students are verified QCU enrollees with validated
                        academic records
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-skillmatch-primary-blue/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-skillmatch-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Fast Hiring Process</h3>
                      <p className="text-sm text-muted-foreground">
                        Reduce time-to-hire with streamlined application and
                        review workflows
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-gradient-to-r from-skillmatch-primary-blue/5 via-transparent to-company-secondary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-skillmatch-primary-blue mb-2">
                3,000+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Active Students
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-skillmatch-primary-blue mb-2">
                200+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Partner Companies
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-skillmatch-primary-blue mb-2">
                14 Days
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Avg. Time to Hire
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-skillmatch-primary-blue mb-2">
                92%
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Match Success Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Why Partner with SkillMatch?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamline your recruitment process and access quality talent from
              QCU
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-all hover:border-skillmatch-primary-blue/50">
              <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-skillmatch-primary-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Access Top Talent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with motivated students across various programs
                including IT, Business, Engineering, and more.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:border-skillmatch-primary-blue/50">
              <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-skillmatch-primary-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Save Time & Resources</h3>
              <p className="text-muted-foreground leading-relaxed">
                Reduce recruitment costs with our efficient platform that
                handles screening and matching automatically.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:border-skillmatch-primary-blue/50">
              <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-skillmatch-primary-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Track Performance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor applications, manage candidates, and analyze hiring
                metrics all from one dashboard.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:border-skillmatch-primary-blue/50">
              <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-skillmatch-primary-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Partnership</h3>
              <p className="text-muted-foreground leading-relaxed">
                Official QCU partnership ensures quality candidates and
                institutional support throughout.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:border-skillmatch-primary-blue/50">
              <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-skillmatch-primary-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our algorithm matches your requirements with student skills,
                saving you hours of screening.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all hover:border-skillmatch-primary-blue/50">
              <div className="w-14 h-14 rounded-xl bg-skillmatch-primary-blue/10 flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-skillmatch-primary-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3">Streamlined Process</h3>
              <p className="text-muted-foreground leading-relaxed">
                From posting to hiring, manage everything in one place with our
                intuitive interface.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-b from-muted/50 to-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Simple, Effective Hiring
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and find your next intern in days
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Create Your Company Profile
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Register your company and complete verification through
                    QCU&apos;s partnership program. Showcase your company
                    culture, values, and opportunities.
                  </p>
                  <Card className="p-4 bg-muted/50 border-skillmatch-primary-blue/20">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-skillmatch-primary-blue" />
                      <span>Partnership verification within 24-48 hours</span>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Post Your Opportunities
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Create detailed job postings with requirements,
                    responsibilities, and benefits. Our platform guides you to
                    attract the right candidates.
                  </p>
                  <Card className="p-4 bg-muted/50 border-skillmatch-primary-blue/20">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-skillmatch-primary-blue" />
                      <span>Unlimited job postings with premium features</span>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Review & Select Candidates
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Receive applications from qualified students. Use our smart
                    filtering and matching tools to find the perfect fit for
                    your team.
                  </p>
                  <Card className="p-4 bg-muted/50 border-skillmatch-primary-blue/20">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-skillmatch-primary-blue" />
                      <span>
                        Advanced filtering by skills, program, and availability
                      </span>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-skillmatch-primary-blue text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Connect & Hire</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Communicate directly with candidates, schedule interviews,
                    and make offers all through our platform. We facilitate the
                    entire process.
                  </p>
                  <Card className="p-4 bg-muted/50 border-skillmatch-primary-blue/20">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-skillmatch-primary-blue" />
                      <span>
                        Built-in messaging and interview scheduling tools
                      </span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Trusted by Leading Companies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our partner companies say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-skillmatch-primary-blue text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;SkillMatch transformed our internship program. We found
                talented students quickly and efficiently. The quality of
                candidates from QCU is exceptional.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-skillmatch-primary-blue/10 flex items-center justify-center">
                  <span className="font-bold text-skillmatch-primary-blue">
                    AB
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">Anna Reyes</div>
                  <div className="text-xs text-muted-foreground">
                    HR Manager, TechCorp
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-skillmatch-primary-blue text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;The platform made it so easy to manage applications and
                communicate with students. We hired 3 interns within 2
                weeks!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-skillmatch-primary-blue/10 flex items-center justify-center">
                  <span className="font-bold text-skillmatch-primary-blue">
                    MC
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">Miguel Cruz</div>
                  <div className="text-xs text-muted-foreground">
                    CEO, StartupHub PH
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="text-skillmatch-primary-blue text-xl"
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                &quot;As a QCU partner, we get access to a pool of pre-vetted
                talent. The matching algorithm saved us countless hours of
                screening.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-skillmatch-primary-blue/10 flex items-center justify-center">
                  <span className="font-bold text-skillmatch-primary-blue">
                    SD
                  </span>
                </div>
                <div>
                  <div className="font-bold text-sm">Sarah Dela Cruz</div>
                  <div className="text-xs text-muted-foreground">
                    Talent Director, InnovateLab
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-skillmatch-primary-blue text-skillmatch-light p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                Start Hiring Top QCU Talent Today
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join 200+ companies who trust SkillMatch for their internship
                recruitment. Post your first job in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-sm bg-skillmatch-light text-skillmatch-dark"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SkillMatch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The trusted platform for companies to hire exceptional OJT
                talent from Quezon City University.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Partnership</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Become a Partner
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About QCU
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Partnership Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2025 SkillMatch. Official QCU Partnership Platform. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
