import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Users, Trophy, ArrowRight } from "lucide-react";

export function BlessingsDateSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Community Participation</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            The <span className="text-primary">Blessings Date</span> Concept
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            We believe every child's Rebirth celebration should be blessed by the community. 
            That's why we let <strong>you</strong> decide the perfect date! The date with the 
            most community blessings becomes the official celebration day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card rounded-2xl p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Choose a Date</h3>
            <p className="text-muted-foreground">
              Recommend a special date that you feel would be meaningful for the celebration.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Community Votes</h3>
            <p className="text-muted-foreground">
              Everyone can participate and add their blessing to their preferred date.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Majority Wins</h3>
            <p className="text-muted-foreground">
              The date with the most blessings becomes the official Blessings Date.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/participate">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Participate Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Join the community and help choose the perfect celebration date
          </p>
        </div>
      </div>
    </section>
  );
}
