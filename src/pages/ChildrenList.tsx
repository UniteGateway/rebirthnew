import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { 
  ArrowLeft, Plus, Users, Award, Calendar, 
  ChevronRight, Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import rebirthLogo from "@/assets/rebirth-logo.png";

interface Child {
  id: string;
  first_name: string;
  last_name: string | null;
  rebirth_date: string | null;
  created_at: string;
  certificates: { id: string }[];
}

export default function ChildrenList() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
  const [children, setChildren] = React.useState<Child[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchChildren();
    }
  }, [user, loading, navigate]);

  const fetchChildren = async () => {
    try {
      // Get user's NGO
      const { data: membership } = await supabase
        .from("ngo_members")
        .select("ngo_id")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (!membership?.ngo_id) {
        navigate("/ngo/register");
        return;
      }

      // Fetch children with certificate status
      const { data, error } = await supabase
        .from("children")
        .select("id, first_name, last_name, rebirth_date, created_at, certificates(id)")
        .eq("ngo_id", membership.ngo_id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChildren(data || []);
    } catch (error) {
      console.error("Error fetching children:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredChildren = children.filter((child) => {
    const fullName = `${child.first_name} ${child.last_name || ""}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to dashboard
          </Link>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Children</h1>
              <p className="text-muted-foreground">
                {children.length} child{children.length !== 1 ? "ren" : ""} registered
              </p>
            </div>
            <Button asChild>
              <Link to="/children/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </Link>
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Children List */}
          {filteredChildren.length === 0 ? (
            <div className="text-center py-16 bg-muted/50 rounded-2xl">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? "No children found" : "No children yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "Try a different search term"
                  : "Start by adding your first child profile"
                }
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link to="/children/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Child
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredChildren.map((child) => {
                const fullName = `${child.first_name} ${child.last_name || ""}`.trim();
                const hasCertificate = child.certificates && child.certificates.length > 0;

                return (
                  <Link
                    key={child.id}
                    to={`/children/${child.id}`}
                    className="block bg-card rounded-xl border border-border p-4 hover:border-primary transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{fullName}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {child.rebirth_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(child.rebirth_date), "MMM d, yyyy")}
                            </span>
                          )}
                          {hasCertificate && (
                            <span className="flex items-center gap-1 text-primary">
                              <Award className="h-3 w-3" />
                              Certified
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
