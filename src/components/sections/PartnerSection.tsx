import { Link } from "react-router-dom";
import { Building2, Briefcase, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ngoFeatures = [
  "Free registration and onboarding",
  "Verification and credibility",
  "Structured identity records",
  "Certificate generation tools",
  "Celebration planning support",
  "Impact tracking dashboard",
];

const csrFeatures = [
  "Transparent donation tracking",
  "Auditable impact reports",
  "Brand visibility opportunities",
  "Employee engagement programs",
  "Custom partnership packages",
  "Direct connection to NGOs",
];

export function PartnerSection() {
  return (
    <section id="partner" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Partner <span className="text-primary">With Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our network of changemakers creating meaningful moments for children
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For NGOs */}
          <div className="bg-card rounded-3xl border border-border p-8 hover-lift">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary rounded-full mb-6">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-2">For NGOs</h3>
            <p className="text-muted-foreground mb-6">
              Register your organization and start creating rebirth moments for children in your care
            </p>

            <ul className="space-y-3 mb-8">
              {ngoFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full group" asChild>
              <Link to="/auth?mode=register">
                Register Your NGO
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* For CSR/Donors */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 hover-lift">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-foreground/20 rounded-full mb-6">
              <Briefcase className="h-7 w-7" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2">For CSR & Donors</h3>
            <p className="text-primary-foreground/80 mb-6">
              Partner with us to make a measurable impact on children's lives through transparent giving
            </p>

            <ul className="space-y-3 mb-8">
              {csrFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant="secondary" 
              className="w-full group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              CSR Partnership Inquiry
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
