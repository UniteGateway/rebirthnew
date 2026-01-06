import { Shield, Check, Lock, Eye, UserCheck, AlertCircle } from "lucide-react";

const safeguards = [
  {
    icon: UserCheck,
    title: "Child Consent Respected",
    description: "Children's voices and preferences are always considered in the process",
  },
  {
    icon: Check,
    title: "NGO Verification Mandatory",
    description: "All partner organizations undergo thorough verification before onboarding",
  },
  {
    icon: Lock,
    title: "Data Privacy Protected",
    description: "All child information is encrypted and handled with strict privacy protocols",
  },
  {
    icon: Eye,
    title: "No Public Exposure",
    description: "Child photos and details are never shared publicly without explicit approval",
  },
  {
    icon: AlertCircle,
    title: "One Rebirth Per Child",
    description: "Each child receives only one rebirth date to maintain its special significance",
  },
  {
    icon: Shield,
    title: "Regular Audits",
    description: "Partner NGOs and processes are regularly reviewed for compliance",
  },
];

export function EthicsSection() {
  return (
    <section id="ethics" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ethics & <span className="text-primary">Safeguards</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Protecting children is our highest priority. Every aspect of Rebirth 
            is designed with their safety, dignity, and best interests in mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeguards.map((item) => (
            <div
              key={item.title}
              className="bg-background rounded-2xl border border-border p-6 hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-secondary rounded-lg flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Statement */}
        <div className="mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">Our Commitment</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Rebirth is committed to operating with the highest ethical standards. 
            We believe that every child deserves protection, respect, and dignity. 
            Our safeguards ensure that the rebirth experience is positive, meaningful, 
            and safe for every child involved.
          </p>
        </div>
      </div>
    </section>
  );
}
