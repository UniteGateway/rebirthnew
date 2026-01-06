import { Cake, Gift, Users, Music, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import celebrationImage from "@/assets/celebration.jpg";
import birthdayCakeImage from "@/assets/birthday-cake.jpg";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Image */}
          <div className="relative">
            <img 
              src={celebrationImage} 
              alt="Children celebrating together" 
              className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-background">
              <img 
                src={birthdayCakeImage} 
                alt="Birthday celebration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-coral">Celebrations</span> That Matter
            </h2>
            <p className="text-muted-foreground mb-8">
              Every rebirth deserves to be celebrated with joy, love, and community.
              Our celebrations create lasting memories for children who never had a birthday.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {celebrationFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="p-2 bg-coral-light rounded-lg flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
