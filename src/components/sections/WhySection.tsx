import { AlertCircle, Heart, Sparkles } from "lucide-react";

export function WhySection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why <span className="text-primary">Rebirth</span> Exists
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Millions of children worldwide don't know their birth date. 
            We're here to change that, one symbolic moment at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Problem */}
          <div className="bg-card rounded-2xl border border-border p-8 hover-lift">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-full mb-6">
              <AlertCircle className="h-7 w-7 text-destructive" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">The Problem</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span>Millions of children don't know their birth date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span>Often assigned arbitrary default dates (Jan 1)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0" />
                <span>These dates lack emotional value or meaning</span>
              </li>
            </ul>
          </div>

          {/* Gap */}
          <div className="bg-card rounded-2xl border border-border p-8 hover-lift">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-coral-light rounded-full mb-6">
              <Heart className="h-7 w-7 text-coral" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">The Gap</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-coral rounded-full mt-2 flex-shrink-0" />
                <span>No celebration of their existence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-coral rounded-full mt-2 flex-shrink-0" />
                <span>No identity moment to call their own</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-coral rounded-full mt-2 flex-shrink-0" />
                <span>No sense of belonging or being remembered</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 hover-lift">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-foreground/20 rounded-full mb-6">
              <Sparkles className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold mb-4">The Solution</h3>
            <ul className="space-y-3 text-primary-foreground/90">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <span>A meaningful <strong>Rebirth Date</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <span>A joyful <strong>Celebration</strong> event</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full mt-2 flex-shrink-0" />
                <span>An official <strong>Rebirth Certificate</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
