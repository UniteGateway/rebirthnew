import { Link } from "react-router-dom";
import { Cake, Gift, Users, Music, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const celebrationFeatures = [
  {
    icon: Cake,
    title: "Birthday Cake",
    description: "Every child gets their own special cake",
  },
  {
    icon: Gift,
    title: "Meaningful Gifts",
    description: "Books, toys, and educational items",
  },
  {
    icon: Users,
    title: "Community Love",
    description: "Surrounded by caring adults and peers",
  },
  {
    icon: Music,
    title: "Joyful Moments",
    description: "Songs, games, and precious memories",
  },
];

export function CelebrationsSection() {
  const scrollToSponsor = () => {
    const element = document.querySelector("#sponsor");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-coral-light/30 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-coral">Celebrations</span> That Matter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every rebirth deserves to be celebrated with joy, love, and community.
            Our celebrations create lasting memories for children who never had a birthday.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {celebrationFeatures.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-2xl border border-border p-6 text-center hover-lift"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-coral-light rounded-full mb-4">
                <feature.icon className="h-7 w-7 text-coral" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-card rounded-3xl border border-border p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Make a Celebration Possible
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Your sponsorship can give a child the gift of celebration — 
            a day filled with joy, love, and belonging that they'll remember forever.
          </p>
          <Button size="lg" className="group bg-coral hover:bg-coral/90" onClick={scrollToSponsor}>
            Sponsor a Rebirth
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
