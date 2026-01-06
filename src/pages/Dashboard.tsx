import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Users, Award, PartyPopper, Building2, Plus, LogOut, 
  Settings, ChevronRight, Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import rebirthLogo from "@/assets/rebirth-logo.png";

interface NGO {
  id: string;
  name: string;
  status: string;
}

interface Stats {
  children: number;
  certificates: number;
  celebrations: number;
}

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [ngo, setNgo] = React.useState<NGO | null>(null);
  const [stats, setStats] = React.useState<Stats>({ children: 0, certificates: 0, celebrations: 0 });
  const [hasNgo, setHasNgo] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  React.useEffect(() => {
    if (user) {
      fetchNgoData();
    }
  }, [user]);

  const fetchNgoData = async () => {
    // Check if user is member of an NGO
    const { data: membership } = await supabase
      .from("ngo_members")
      .select("ngo_id, ngos(*)")
      .eq("user_id", user!.id)
      .maybeSingle();

    if (membership?.ngos) {
      const ngoData = membership.ngos as unknown as NGO;
      setNgo(ngoData);
      setHasNgo(true);
      
      // Fetch stats
      const [childrenRes, certsRes, celebsRes] = await Promise.all([
        supabase.from("children").select("id", { count: "exact" }).eq("ngo_id", ngoData.id),
        supabase.from("certificates").select("id", { count: "exact" }).eq("ngo_id", ngoData.id),
        supabase.from("celebrations").select("id", { count: "exact" }).eq("ngo_id", ngoData.id),
      ]);
      
      setStats({
        children: childrenRes.count || 0,
        certificates: certsRes.count || 0,
        celebrations: celebsRes.count || 0,
      });
    } else {
      setHasNgo(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || hasNgo === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // If user doesn't have an NGO, show onboarding
  if (!hasNgo) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={rebirthLogo} alt="Rebirth" className="h-8 w-auto" />
              <span className="text-xl font-bold text-primary lowercase">rebirth</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-6">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Register Your NGO
            </h1>
            <p className="text-muted-foreground mb-8">
              Complete your NGO registration to start creating rebirth moments for children.
            </p>
            <Button size="lg" asChild>
              <Link to="/ngo/register">
                Register NGO
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={rebirthLogo} alt="Rebirth" className="h-8 w-auto" />
            <span className="text-xl font-bold text-primary lowercase">rebirth</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {ngo?.name}
            </span>
            {ngo?.status === "pending" && (
              <span className="text-xs bg-coral-light text-coral px-2 py-1 rounded-full">
                Pending Verification
              </span>
            )}
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your rebirth programs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link to="/children" className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.children}</p>
                <p className="text-sm text-muted-foreground">Children</p>
              </div>
            </div>
          </Link>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-coral-light rounded-lg">
                <Award className="h-6 w-6 text-coral" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.certificates}</p>
                <p className="text-sm text-muted-foreground">Certificates</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary rounded-lg">
                <PartyPopper className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.celebrations}</p>
                <p className="text-sm text-muted-foreground">Celebrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            to="/children/new"
            className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Add Child Profile</h3>
                <p className="text-sm text-muted-foreground">Create a new rebirth profile</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </div>
          </Link>

          <Link 
            to="/celebrations/new"
            className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-coral-light/50 rounded-lg group-hover:bg-coral-light transition-colors">
                <Calendar className="h-6 w-6 text-coral" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Schedule Celebration</h3>
                <p className="text-sm text-muted-foreground">Plan a rebirth celebration</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </div>

        {/* Empty state for children */}
        {stats.children === 0 && (
          <div className="mt-12 text-center py-12 bg-muted/50 rounded-2xl">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No children yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by adding your first child profile to create a rebirth moment.
            </p>
            <Button asChild>
              <Link to="/children/new">
                <Plus className="h-4 w-4 mr-2" />
                Add First Child
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
