import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using Rebirth's services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Rebirth provides a platform that connects NGOs, sponsors, and communities to give children without 
                documented birth dates a symbolic "rebirth date" — a date to be celebrated and remembered. 
                Our services include the issuance of symbolic Rebirth Certificates, coordination of birthday 
                celebrations, and donor management.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Nature of Rebirth Certificates</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Important:</strong> Rebirth Certificates are symbolic documents only. They are not legal 
                birth certificates and do not confer any legal identity, rights, or status. They serve as a 
                meaningful gesture of recognition and belonging for children who lack official documentation.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. NGO Partner Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Registered NGO partners agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate information about their organization and the children they serve</li>
                <li>Maintain the confidentiality and dignity of all children in their care</li>
                <li>Use donations and sponsorships exclusively for the benefit of registered children</li>
                <li>Report celebrations and provide updates as required</li>
                <li>Comply with all applicable laws regarding child welfare</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Sponsor and Donor Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sponsors and donors agree that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All donations are voluntary contributions</li>
                <li>Donations are used to support celebrations and program operations</li>
                <li>Tax receipts are provided where legally applicable</li>
                <li>Refunds may be requested within 30 days of donation for unused funds</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all 
                activities that occur under your account. You must notify us immediately of any unauthorized use 
                of your account.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Prohibited Conduct</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use our services for any unlawful purpose</li>
                <li>Provide false or misleading information</li>
                <li>Attempt to access accounts or data that do not belong to you</li>
                <li>Interfere with the proper functioning of our platform</li>
                <li>Use the platform to exploit or harm children in any way</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, trademarks, and intellectual property on the Rebirth platform are owned by or 
                licensed to us. You may not use our branding or content without prior written permission.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Rebirth provides its services "as is" without warranties of any kind. We are not liable for any 
                indirect, incidental, or consequential damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms of Service from time to time. We will notify users of significant 
                changes via email or through our platform. Continued use of our services after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@rebirth.org" className="text-primary hover:underline">
                  legal@rebirth.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
