import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, Loader2, UserPlus, CalendarIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import rebirthLogo from "@/assets/rebirth-logo.png";

const childSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().max(100).optional().or(z.literal("")),
  gender: z.string().optional(),
  approximateAge: z.coerce.number().min(0).max(25).optional().or(z.literal("")),
  story: z.string().trim().max(2000).optional().or(z.literal("")),
});

type ChildForm = z.infer<typeof childSchema>;

export default function ChildNew() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [rebirthDate, setRebirthDate] = React.useState<Date>();
  const [ngoId, setNgoId] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  const form = useForm<ChildForm>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      approximateAge: "",
      story: "",
    },
  });

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchNgoId();
    }
  }, [user, loading, navigate]);

  const fetchNgoId = async () => {
    const { data } = await supabase
      .from("ngo_members")
      .select("ngo_id")
      .eq("user_id", user!.id)
      .maybeSingle();
    
    if (data?.ngo_id) {
      setNgoId(data.ngo_id);
    } else {
      toast({
        title: "NGO Required",
        description: "Please register your NGO first.",
        variant: "destructive",
      });
      navigate("/ngo/register");
    }
  };

  const handleSubmit = async (data: ChildForm) => {
    if (!user || !ngoId) return;

    if (!rebirthDate) {
      toast({
        title: "Rebirth date required",
        description: "Please select a meaningful rebirth date for this child.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: child, error } = await supabase
        .from("children")
        .insert({
          ngo_id: ngoId,
          first_name: data.firstName,
          last_name: data.lastName || null,
          gender: data.gender || null,
          approximate_age: data.approximateAge ? Number(data.approximateAge) : null,
          rebirth_date: format(rebirthDate, "yyyy-MM-dd"),
          story: data.story || null,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Child profile created!",
        description: `${data.firstName}'s rebirth date has been set to ${format(rebirthDate, "PPP")}.`,
      });

      navigate(`/children/${child.id}`);
    } catch (error: any) {
      toast({
        title: "Failed to create profile",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !ngoId) {
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
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to dashboard
          </Link>

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-secondary rounded-xl">
              <UserPlus className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Add Child Profile</h1>
              <p className="text-muted-foreground">
                Create a meaningful rebirth moment for a child
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-foreground">Child Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Child's first name"
                    {...form.register("firstName")}
                    className="mt-1"
                  />
                  {form.formState.errors.firstName && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Child's last name (optional)"
                    {...form.register("lastName")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) => form.setValue("gender", value)}
                    defaultValue={form.getValues("gender")}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="approximateAge">Approximate Age</Label>
                  <Input
                    id="approximateAge"
                    type="number"
                    min={0}
                    max={25}
                    placeholder="e.g., 8"
                    {...form.register("approximateAge")}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Rebirth Date */}
            <div className="bg-gradient-to-br from-coral-light/30 to-secondary/30 rounded-xl border border-coral/20 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-coral-light rounded-lg">
                  <Sparkles className="h-5 w-5 text-coral" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">Rebirth Date *</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose a meaningful date for this child's new beginning
                  </p>
                </div>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-12 bg-background",
                      !rebirthDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {rebirthDate ? format(rebirthDate, "PPP") : "Select rebirth date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={rebirthDate}
                    onSelect={setRebirthDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              <p className="text-xs text-muted-foreground">
                💡 Consider choosing a date that has special meaning — perhaps the day they joined 
                your organization, a festival day, or simply a beautiful day for a new beginning.
              </p>
            </div>

            {/* Story */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-foreground">Their Story (Optional)</h2>
              <p className="text-sm text-muted-foreground">
                Share a brief, dignified story about this child (visible only to your NGO)
              </p>
              
              <Textarea
                id="story"
                placeholder="A brief note about this child's journey..."
                {...form.register("story")}
                rows={4}
              />
              {form.formState.errors.story && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.story.message}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Rebirth Profile
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
