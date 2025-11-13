import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  TrendingUp,
  Users,
  Search,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function OJTLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SkillMatch</span>
              <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
                For Students
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary transition-colors hidden md:inline-flex"
              >
                How It Works
              </Link>
              <Link
                href="#explore"
                className="text-sm font-medium hover:text-primary transition-colors hidden md:inline-flex"
              >
                Explore
              </Link>
              <Link
                href="/company"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                For Companies
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-skillmatch-primary-green/15 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              Exclusive to QCU Students
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              Launch Your Career.
              <span className="text-skillmatch-primary-green block mt-2">
                Find Your Perfect OJT.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Connect with top companies partnered with Quezon City University.
              Discover opportunities that match your skills and kickstart your
              professional journey.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card border rounded-lg shadow-lg">
                <div className="flex items-center flex-1 gap-2 px-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by job title or skills..."
                    className="border-0 focus-visible:ring-0 px-0"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 border-l">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Quezon City"
                    className="border-0 focus-visible:ring-0 px-0 w-32"
                  />
                </div>
                <Button className="bg-skillmatch-primary-green text-skillmatch-light hover:bg-skillmatch-primary-green/90">
                  Search Jobs
                </Button>
              </div>
            </div>

            {/* Popular Skills */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              >
                Web Developer
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              >
                UI/UX Designer
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              >
                Data Analyst
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              >
                Marketing
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-skillmatch-primary-green hover:text-skillmatch-light transition-colors"
              >
                Software Engineer
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Active Opportunities
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
                200+
              </div>
              <div className="text-sm text-muted-foreground">
                Partner Companies
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
                3,000+
              </div>
              <div className="text-sm text-muted-foreground">
                QCU Students Placed
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-skillmatch-primary-green mb-2">
                95%
              </div>
              <div className="text-sm text-muted-foreground">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Your Path to Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five simple steps to find and secure your ideal OJT position
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-skillmatch-primary-green">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up with your QCU email and build a profile showcasing your
                skills, courses, and career interests.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-skillmatch-primary-green">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Browse Opportunities</h3>
              <p className="text-muted-foreground">
                Explore hundreds of OJT positions from verified partner
                companies tailored to your field of study.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-skillmatch-primary-green">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Apply with Confidence</h3>
              <p className="text-muted-foreground">
                Submit applications directly through the platform. Track your
                progress and manage multiple applications easily.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-skillmatch-primary-green">
                  4
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Matched</h3>
              <p className="text-muted-foreground">
                Our smart matching system connects you with companies looking
                for students with your exact skill set.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-skillmatch-primary-green">
                  5
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Start Your Journey</h3>
              <p className="text-muted-foreground">
                Connect with employers, complete interviews, and begin your
                professional journey with top companies.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow bg-skillmatch-primary-green/5 border-skillmatch-bg-skillmatch-primary-green/20">
              <div className="w-12 h-12 rounded-full bg-skillmatch-primary-green flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-skillmatch-light" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build Your Future</h3>
              <p className="text-muted-foreground">
                Gain real-world experience, develop professional skills, and
                create meaningful connections in your industry.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="explore" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Why Choose SkillMatch?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to find and secure the perfect OJT opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-7 w-7 text-skillmatch-primary-green" />
              </div>
              <h3 className="font-bold mb-2">Verified Companies</h3>
              <p className="text-sm text-muted-foreground">
                All companies are officially partnered with QCU, ensuring
                quality and safety.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-7 w-7 text-skillmatch-primary-green" />
              </div>
              <h3 className="font-bold mb-2">Career Growth</h3>
              <p className="text-sm text-muted-foreground">
                Access opportunities that align with your career goals and skill
                development.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-skillmatch-primary-green" />
              </div>
              <h3 className="font-bold mb-2">Direct Connections</h3>
              <p className="text-sm text-muted-foreground">
                Connect directly with hiring managers and build professional
                relationships.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-7 w-7 text-skillmatch-primary-green" />
              </div>
              <h3 className="font-bold mb-2">Track Applications</h3>
              <p className="text-sm text-muted-foreground">
                Manage all your applications in one place with real-time status
                updates.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-skillmatch-primary-green text-skillmatch-light p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of QCU students who have found their perfect OJT
              match. Create your profile today and discover opportunities
              waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-sm bg-skillmatch-light text-skillmatch-dark"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-sm bg-transparent hover:bg-skillmatch-primary-green/5"
              >
                Learn More
              </Button>
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
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SkillMatch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting QCU students with verified partner companies for
                meaningful OJT experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Track Applications
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/company"
                    className="hover:text-foreground transition-colors"
                  >
                    For Companies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Partner Companies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
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
              &copy; 2025 SkillMatch. Exclusive to Quezon City University. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
