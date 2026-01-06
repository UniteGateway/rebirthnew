import { Link } from "react-router-dom";
import { Building2, Briefcase, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import communityImage from "@/assets/community.jpg";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img 
                src={communityImage} 
                alt="Community helping children" 
                className="rounded-3xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Partner <span className="text-primary">With Us</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Join our network of changemakers creating meaningful moments for children
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* For NGOs */}
              <div className="bg-card rounded-2xl border border-border p-6 hover-lift">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-full mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">For NGOs</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Register and create rebirth moments for children in your care
                </p>

                <ul className="space-y-2 mb-6">
                  {ngoFeatures.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full group" size="sm" asChild>
                  <Link to="/auth?mode=register">
                    Register NGO
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              {/* For CSR/Donors */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 hover-lift">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-full mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">For CSR & Donors</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Partner with us to make measurable impact through transparent giving
                </p>

                <ul className="space-y-2 mb-6">
                  {csrFeatures.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="secondary" 
                  size="sm"
                  className="w-full group bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  CSR Inquiry
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
