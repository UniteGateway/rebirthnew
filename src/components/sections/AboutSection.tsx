import { Quote } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            What is <span className="text-primary">Rebirth?</span>
          </h2>
          
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
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
          <div className="mt-12 p-8 bg-secondary/50 rounded-2xl relative">
            <Quote className="absolute top-4 left-4 h-8 w-8 text-coral/30" />
            <blockquote className="text-xl md:text-2xl font-medium text-foreground italic">
              "A date does not define a child — but belonging changes everything."
            </blockquote>
          </div>

          {/* What it is NOT */}
          <div className="mt-12 p-6 bg-muted rounded-xl border border-border">
            <h3 className="font-semibold text-foreground mb-3">Important Note</h3>
            <p className="text-sm text-muted-foreground">
              The Rebirth Certificate is a <strong>symbolic identity record</strong> and not a government-issued 
              birth certificate. It serves as a meaningful acknowledgment of a child's existence and their 
              chosen date of celebration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
