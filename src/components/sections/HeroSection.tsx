import { Link } from "react-router-dom";
import { ArrowRight, Heart, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-children.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src={heroImage} 
          alt="Children smiling together" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/90 backdrop-blur-sm rounded-full mb-8 animate-fade-in">
            <Heart className="h-4 w-4 text-coral" />
            <span className="text-sm font-medium text-foreground/80">A symbolic gift of identity</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Every Life Deserves
            <br />
            <span className="text-gradient">a Beginning</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            REBIRTH gives children without birth records a symbolic date of belonging — 
            a moment to be seen, celebrated, and remembered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="group" asChild>
              <Link to="/auth?mode=register">
                Create a Rebirth
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm" asChild>
              <Link to="/auth?mode=register">Partner as NGO</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col items-center gap-3 p-6 bg-card/90 backdrop-blur-sm rounded-2xl border border-border hover-lift">
              <div className="p-3 bg-secondary rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Symbolic Date</h3>
              <p className="text-sm text-muted-foreground text-center">
                A meaningful date chosen with care and dignity
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-card/90 backdrop-blur-sm rounded-2xl border border-border hover-lift">
              <div className="p-3 bg-coral-light rounded-full">
                <Heart className="h-6 w-6 text-coral" />
              </div>
              <h3 className="font-semibold text-foreground">Celebration</h3>
              <p className="text-sm text-muted-foreground text-center">
                Birthday-style events with cakes, gifts, and joy
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-card/90 backdrop-blur-sm rounded-2xl border border-border hover-lift">
              <div className="p-3 bg-secondary rounded-full">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Certificate</h3>
              <p className="text-sm text-muted-foreground text-center">
                Official rebirth certificate with QR verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
