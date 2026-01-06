import { Quote } from "lucide-react";
import happyChildImage from "@/assets/happy-child.jpg";

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img 
                src={happyChildImage} 
                alt="Happy child smiling" 
                className="rounded-3xl shadow-xl w-full h-[450px] object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-coral-light rounded-full opacity-60 -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary rounded-full opacity-60 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What is <span className="text-primary">Rebirth?</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Rebirth is a <strong className="text-foreground">symbolic recognition of identity</strong> for children 
                who were never given a date of birth. It is not a legal birth certificate, but something 
                equally meaningful — a moment of belonging.
              </p>
              
              <p>
                Every rebirth date is chosen with care, dignity, and intention. It represents a new 
                beginning, a celebration of existence, and an acknowledgment that every child deserves 
                to be seen and remembered.
              </p>
              
              <p>
                Through partner NGOs, we create these meaningful moments — issuing symbolic certificates, 
                organizing celebrations, and giving children the gift of a special day that is truly theirs.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-8 p-6 bg-secondary/50 rounded-2xl relative">
              <Quote className="absolute top-3 left-3 h-6 w-6 text-coral/30" />
              <blockquote className="text-lg font-medium text-foreground italic pl-4">
                "A date does not define a child — but belonging changes everything."
              </blockquote>
            </div>

            {/* What it is NOT */}
            <div className="mt-6 p-4 bg-muted rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> The Rebirth Certificate is a symbolic identity record 
                and not a government-issued birth certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
