import { useEffect, useState, useRef } from "react";
import { Users, Award, PartyPopper, Building2 } from "lucide-react";

const impactStats = [
  {
    icon: Users,
    value: 1250,
    label: "Children Impacted",
    suffix: "+",
  },
  {
    icon: Award,
    value: 1180,
    label: "Certificates Issued",
    suffix: "",
  },
  {
    icon: PartyPopper,
    value: 980,
    label: "Celebrations Held",
    suffix: "",
  },
  {
    icon: Building2,
    value: 45,
    label: "Partner NGOs",
    suffix: "",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const duration = 2000;
            const increment = value / (duration / 16);
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function ImpactSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Impact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Together, we're creating new beginnings for children across India
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl border border-border p-6 md:p-8 text-center hover-lift"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary rounded-full mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Map or visual placeholder */}
        <div className="mt-12 bg-gradient-to-br from-secondary to-coral-light/30 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Growing Across India
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our partner NGOs are spread across multiple states, 
            creating rebirth moments from urban centers to rural communities.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi NCR", "Gujarat", "Rajasthan", "West Bengal", "Kerala"].map((state) => (
              <div key={state} className="bg-background/50 rounded-lg py-2 px-4 text-foreground">
                {state}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
