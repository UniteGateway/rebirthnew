import * as React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { 
  ArrowLeft, Loader2, Calendar, Award, PartyPopper, 
  Download, QrCode, User, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import rebirthLogo from "@/assets/rebirth-logo.png";

interface Child {
  id: string;
  first_name: string;
  last_name: string | null;
  gender: string | null;
  approximate_age: number | null;
  rebirth_date: string | null;
  story: string | null;
  created_at: string;
}

interface Certificate {
  id: string;
  certificate_number: string;
  issue_date: string;
  qr_code_data: string | null;
}

export default function ChildDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  
  const [child, setChild] = React.useState<Child | null>(null);
  const [certificate, setCertificate] = React.useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [ngoName, setNgoName] = React.useState<string>("");

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user && id) {
      fetchChildData();
    }
  }, [user, loading, id, navigate]);

  const fetchChildData = async () => {
    try {
      // Fetch child with NGO info
      const { data: childData, error: childError } = await supabase
        .from("children")
        .select("*, ngos(name)")
        .eq("id", id)
        .single();

      if (childError) throw childError;
      
      setChild(childData);
      setNgoName((childData.ngos as any)?.name || "");

      // Fetch certificate if exists
      const { data: certData } = await supabase
        .from("certificates")
        .select("*")
        .eq("child_id", id)
        .maybeSingle();

      if (certData) {
        setCertificate(certData);
      }
    } catch (error: any) {
      toast({
        title: "Error loading child",
        description: error.message,
        variant: "destructive",
      });
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const generateCertificate = async () => {
    if (!child || !user) return;

    setIsGenerating(true);

    try {
      // Get NGO ID
      const { data: membership } = await supabase
        .from("ngo_members")
        .select("ngo_id")
        .eq("user_id", user.id)
        .single();

      if (!membership) throw new Error("NGO not found");

      // Generate certificate number
      const { data: certNumber } = await supabase.rpc("generate_certificate_number");

      // Create QR code data
      const qrData = JSON.stringify({
        id: child.id,
        name: `${child.first_name} ${child.last_name || ""}`.trim(),
        rebirthDate: child.rebirth_date,
        certificate: certNumber,
        ngo: ngoName,
      });

      // Insert certificate
      const { data: newCert, error } = await supabase
        .from("certificates")
        .insert({
          child_id: child.id,
          ngo_id: membership.ngo_id,
          certificate_number: certNumber,
          qr_code_data: qrData,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setCertificate(newCert);
      toast({
        title: "Certificate Generated!",
        description: `Certificate ${certNumber} has been created.`,
      });
    } catch (error: any) {
      toast({
        title: "Failed to generate certificate",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Child not found</div>
      </div>
    );
  }

  const fullName = `${child.first_name} ${child.last_name || ""}`.trim();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={rebirthLogo} alt="Rebirth" className="h-8 w-auto" />
            <span className="text-xl font-bold text-primary lowercase">rebirth</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to dashboard
          </Link>

          {/* Profile Header */}
          <div className="bg-gradient-to-br from-secondary to-coral-light/30 rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{fullName}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {child.gender && (
                    <span className="capitalize">{child.gender}</span>
                  )}
                  {child.approximate_age && (
                    <span>~{child.approximate_age} years old</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rebirth Date Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-coral-light rounded-lg">
                  <Sparkles className="h-5 w-5 text-coral" />
                </div>
                <h2 className="font-semibold text-foreground">Rebirth Date</h2>
              </div>
              {child.rebirth_date ? (
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {format(new Date(child.rebirth_date), "MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A new beginning
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">Not yet assigned</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-secondary rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-semibold text-foreground">Quick Actions</h2>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/celebrations/new?child=${child.id}`}>
                    <PartyPopper className="h-4 w-4 mr-2" />
                    Schedule Celebration
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Story */}
          {child.story && (
            <div className="bg-card rounded-xl border border-border p-6 mt-6">
              <h2 className="font-semibold text-foreground mb-3">Their Story</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{child.story}</p>
            </div>
          )}

          {/* Certificate Section */}
          <div className="bg-card rounded-xl border border-border p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-semibold text-foreground">Rebirth Certificate</h2>
            </div>

            {certificate ? (
              <div className="space-y-4">
                {/* Certificate Preview */}
                <div className="bg-muted rounded-xl p-6 border-2 border-dashed border-border">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <img src={rebirthLogo} alt="Rebirth" className="h-8 w-auto" />
                      <span className="text-lg font-bold text-primary lowercase">rebirth</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Certificate of Rebirth</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Name</p>
                      <p className="font-semibold text-foreground">{fullName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Rebirth Date</p>
                      <p className="font-semibold text-foreground">
                        {child.rebirth_date && format(new Date(child.rebirth_date), "PPP")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Certificate ID</p>
                      <p className="font-semibold text-foreground">{certificate.certificate_number}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase">Issued By</p>
                      <p className="font-semibold text-foreground">{ngoName}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center p-4 bg-background rounded-lg">
                    <div className="text-center">
                      <QrCode className="h-16 w-16 text-primary mx-auto mb-2" />
                      <span className="text-xs text-muted-foreground">Scan to verify</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Issued on {format(new Date(certificate.issue_date), "PPP")}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No Certificate Yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Generate an official Rebirth Certificate for {child.first_name} to commemorate their new beginning.
                </p>
                <Button onClick={generateCertificate} disabled={isGenerating}>
                  {isGenerating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  <Award className="h-4 w-4 mr-2" />
                  Generate Certificate
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
