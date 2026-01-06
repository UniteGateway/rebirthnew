import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import rebirthLogo from "@/assets/rebirth-logo.png";

const ngoSchema = z.object({
  name: z.string().trim().min(2, "NGO name must be at least 2 characters").max(200),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15).optional().or(z.literal("")),
  registrationNumber: z.string().trim().max(100).optional().or(z.literal("")),
  address: z.string().trim().max(500).optional().or(z.literal("")),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  state: z.string().trim().max(100).optional().or(z.literal("")),
  pincode: z.string().trim().max(10).optional().or(z.literal("")),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
});

type NgoForm = z.infer<typeof ngoSchema>;

export default function NgoRegister() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<NgoForm>({
    resolver: zodResolver(ngoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      registrationNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      description: "",
    },
  });

  const handleSubmit = async (data: NgoForm) => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "Please log in to register your NGO.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsLoading(true);

    try {
      // Create NGO
      const { data: ngo, error: ngoError } = await supabase
        .from("ngos")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          registration_number: data.registrationNumber || null,
          address: data.address || null,
          city: data.city || null,
          state: data.state || null,
          pincode: data.pincode || null,
          description: data.description || null,
        })
        .select()
        .single();

      if (ngoError) throw ngoError;

      // Create membership
      const { error: memberError } = await supabase
        .from("ngo_members")
        .insert({
          ngo_id: ngo.id,
          user_id: user.id,
          role: "ngo_admin",
        });

      if (memberError) throw memberError;

      toast({
        title: "NGO Registered!",
        description: "Your organization has been registered successfully. It's pending verification.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Register Your NGO</h1>
              <p className="text-muted-foreground">
                Complete the form below to register your organization
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-foreground">Organization Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Organization Name *</Label>
                  <Input
                    id="name"
                    placeholder="Hope Foundation"
                    {...form.register("name")}
                    className="mt-1"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Official Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@organization.org"
                    {...form.register("email")}
                    className="mt-1"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...form.register("phone")}
                    className="mt-1"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="registrationNumber">Registration Number (if available)</Label>
                  <Input
                    id="registrationNumber"
                    placeholder="NGO registration number"
                    {...form.register("registrationNumber")}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-foreground">Address</h2>
              
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street, Building Name"
                  {...form.register("address")}
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    {...form.register("city")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Maharashtra"
                    {...form.register("state")}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="400001"
                    {...form.register("pincode")}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h2 className="font-semibold text-foreground">About Your Organization</h2>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your organization, its mission, and the children you serve..."
                  {...form.register("description")}
                  className="mt-1"
                  rows={4}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-destructive mt-1">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="bg-muted rounded-xl p-4 text-sm text-muted-foreground">
              <strong>Note:</strong> Your NGO registration will be reviewed by our team. 
              Once verified, you'll be able to create child profiles and generate rebirth certificates.
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Register NGO
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
