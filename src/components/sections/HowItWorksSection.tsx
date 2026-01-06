import { Building2, UserPlus, Calendar, FileCheck, PartyPopper, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Building2,
    title: "NGO Registers",
    description: "Partner NGOs register on the Rebirth platform with verification",
  },
  {
    icon: UserPlus,
    title: "Child Profile Created",
    description: "NGO creates a profile for each child with their information",
  },
  {
    icon: Calendar,
    title: "Rebirth Date Chosen",
    description: "A meaningful date is selected with care and intention",
  },
  {
    icon: FileCheck,
    title: "Certificate Generated",
    description: "Official digital Rebirth Certificate with QR verification",
  },
  {
    icon: PartyPopper,
    title: "Celebration Held",
    description: "Birthday-style event with cake, gifts, and community",
  },
  {
    icon: BarChart3,
    title: "Impact Recorded",
    description: "Each rebirth is tracked to measure our collective impact",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, dignified process that transforms a child's story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-background rounded-2xl border border-border p-6 hover-lift group"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary rounded-xl mb-4 group-hover:bg-coral-light transition-colors">
                <step.icon className="h-6 w-6 text-primary group-hover:text-coral transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
