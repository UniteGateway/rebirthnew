import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, Users, Trophy, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface DateVote {
  recommended_date: string;
  count: number;
  blessings: string[];
}

export default function PublicParticipation() {
  const [searchParams] = useSearchParams();
  const childId = searchParams.get("child");
  
  const [voterName, setVoterName] = useState("");
  const [voterEmail, setVoterEmail] = useState("");
  const [recommendedDate, setRecommendedDate] = useState("");
  const [blessingMessage, setBlessingMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateVotes, setDateVotes] = useState<DateVote[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    fetchVotes();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('date-recommendations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'date_recommendations'
        },
        () => {
          fetchVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [childId]);

  const fetchVotes = async () => {
    let query = supabase
      .from('date_recommendations')
      .select('recommended_date, blessing_message');
    
    if (childId) {
      query = query.eq('child_id', childId);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching votes:', error);
      return;
    }

    // Aggregate votes by date
    const voteMap = new Map<string, { count: number; blessings: string[] }>();
    
    data?.forEach((vote) => {
      const date = vote.recommended_date;
      const existing = voteMap.get(date) || { count: 0, blessings: [] };
      existing.count++;
      if (vote.blessing_message) {
        existing.blessings.push(vote.blessing_message);
      }
      voteMap.set(date, existing);
    });

    const sortedVotes = Array.from(voteMap.entries())
      .map(([date, data]) => ({
        recommended_date: date,
        count: data.count,
        blessings: data.blessings
      }))
      .sort((a, b) => b.count - a.count);

    setDateVotes(sortedVotes);
    setTotalVotes(data?.length || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recommendedDate) {
      toast.error("Please select a date");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('date_recommendations')
        .insert({
          child_id: childId || null,
          recommended_date: recommendedDate,
          voter_name: voterName.trim() || null,
          voter_email: voterEmail.trim() || null,
          blessing_message: blessingMessage.trim() || null
        });

      if (error) throw error;

      toast.success("Your blessing and date recommendation has been recorded! 🎉");
      setVoterName("");
      setVoterEmail("");
      setRecommendedDate("");
      setBlessingMessage("");
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast.error("Failed to submit your recommendation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const winningDate = dateVotes[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Live Public Participation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Choose the <span className="text-primary">Blessings Date</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Be part of a beautiful tradition! Recommend a special date for a child's Rebirth celebration. 
              The date with the most community blessings becomes the official <strong>Blessings Date</strong>.
            </p>
            
            {/* Live Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-card rounded-xl p-4 shadow-sm border">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalVotes}</div>
                <div className="text-sm text-muted-foreground">Total Blessings</div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border">
                <Calendar className="h-6 w-6 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{dateVotes.length}</div>
                <div className="text-sm text-muted-foreground">Dates Suggested</div>
              </div>
              {winningDate && (
                <div className="bg-primary/10 rounded-xl p-4 shadow-sm border border-primary/20">
                  <Trophy className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">
                    {format(new Date(winningDate.recommended_date), 'MMM d')}
                  </div>
                  <div className="text-sm text-muted-foreground">Leading Date</div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Voting Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Submit Your Blessing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Recommended Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={recommendedDate}
                      onChange={(e) => setRecommendedDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name (optional)</Label>
                    <Input
                      id="name"
                      type="text"
                      value={voterName}
                      onChange={(e) => setVoterName(e.target.value)}
                      placeholder="Enter your name"
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={voterEmail}
                      onChange={(e) => setVoterEmail(e.target.value)}
                      placeholder="Enter your email"
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blessing">Your Blessing Message (optional)</Label>
                    <Textarea
                      id="blessing"
                      value={blessingMessage}
                      onChange={(e) => setBlessingMessage(e.target.value)}
                      placeholder="Write a special blessing or message for the child..."
                      rows={4}
                      maxLength={500}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Your Blessing 🙏"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Live Results */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                Live Voting Results
              </h2>

              {dateVotes.length === 0 ? (
                <Card className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No votes yet. Be the first to recommend a date!
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {dateVotes.slice(0, 5).map((vote, index) => {
                    const percentage = totalVotes > 0 ? (vote.count / totalVotes) * 100 : 0;
                    const isWinning = index === 0;
                    
                    return (
                      <Card 
                        key={vote.recommended_date}
                        className={`overflow-hidden ${isWinning ? 'border-primary border-2 bg-primary/5' : ''}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {isWinning && <Trophy className="h-5 w-5 text-primary" />}
                              <span className="font-semibold text-lg">
                                {format(new Date(vote.recommended_date), 'MMMM d, yyyy')}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">
                              {vote.count} {vote.count === 1 ? 'blessing' : 'blessings'}
                            </span>
                          </div>
                          
                          <div className="w-full bg-muted rounded-full h-3 mb-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${
                                isWinning ? 'bg-primary' : 'bg-secondary'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>

                          {vote.blessings.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {vote.blessings.slice(0, 2).map((blessing, i) => (
                                <p key={i} className="text-sm text-muted-foreground italic">
                                  "{blessing}"
                                </p>
                              ))}
                              {vote.blessings.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{vote.blessings.length - 2} more blessings
                                </p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {winningDate && (
                <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Current Blessings Date
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {format(new Date(winningDate.recommended_date), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      With {winningDate.count} community blessings
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              How the Blessings Date Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Recommend a Date</h3>
                <p className="text-muted-foreground">
                  Choose a special date you believe would be perfect for the child's Rebirth celebration.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Send Blessings</h3>
                <p className="text-muted-foreground">
                  Add your heartfelt blessing message to make the recommendation even more meaningful.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Majority Wins</h3>
                <p className="text-muted-foreground">
                  The date with the most community blessings becomes the official Blessings Date for the celebration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
