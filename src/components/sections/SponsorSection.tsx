import { Heart, Gift, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const sponsorTiers = [
  {
    amount: "₹500",
    title: "Celebration Support",
    description: "Help fund a child's rebirth celebration",
    icon: Heart,
    features: [
      "Cake and refreshments",
      "Basic celebration kit",
      "Digital thank you note",
    ],
    popular: false,
  },
  {
    amount: "₹1,000",
    title: "Celebration + Gifts",
    description: "Complete celebration with meaningful gifts",
    icon: Gift,
    features: [
      "Everything in ₹500 tier",
      "Educational books",
      "Special birthday gift",
      "Printed certificate",
    ],
    popular: true,
  },
  {
    amount: "₹2,500",
    title: "Complete Package",
    description: "Full rebirth experience with lasting impact",
    icon: Sparkles,
    features: [
      "Everything in ₹1,000 tier",
      "Premium gift hamper",
      "Photo memory album",
      "Annual celebration support",
      "Impact report",
    ],
    popular: false,
  },
];

export function SponsorSection() {
  return (
    <section id="sponsor" className="section-padding bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sponsor a <span className="text-coral">Rebirth</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One sponsor. One child. One remembered day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative bg-background rounded-3xl border-2 p-8 hover-lift transition-all ${
                tier.popular
                  ? "border-coral shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 ${
                tier.popular ? "bg-coral-light" : "bg-secondary"
              }`}>
                <tier.icon className={`h-7 w-7 ${tier.popular ? "text-coral" : "text-primary"}`} />
              </div>

              {/* Amount */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-foreground">{tier.amount}</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-foreground mb-2">{tier.title}</h3>
              <p className="text-muted-foreground mb-6">{tier.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 flex-shrink-0 ${tier.popular ? "text-coral" : "text-primary"}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <Button
                className={`w-full ${tier.popular ? "bg-coral hover:bg-coral/90" : ""}`}
                variant={tier.popular ? "default" : "outline"}
              >
                Donate {tier.amount}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            Secure payments
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            Tax deductible (80G)
          </span>
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" />
            Transparent impact
          </span>
        </div>
      </div>
    </section>
  );
}
