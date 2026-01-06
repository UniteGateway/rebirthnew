import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Rebirth ("we," "our," or "us") is committed to protecting the privacy of children and all users of our platform. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>NGO registration information (organization name, contact details, registration numbers)</li>
                <li>Child information (first name, approximate age, symbolic rebirth date)</li>
                <li>Sponsor and donor information (name, email, donation details)</li>
                <li>Account credentials and profile information</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Protection of Children's Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take special care to protect information about children. All child data is handled with the utmost confidentiality 
                and is only accessible to verified NGO partners. We never share identifiable information about children publicly 
                without explicit consent from their legal guardians.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process donations and issue Rebirth certificates</li>
                <li>Communicate with NGO partners and sponsors</li>
                <li>Ensure the security and integrity of our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
                and regular security assessments.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your information for as long as necessary to fulfill the purposes outlined in this policy, 
                unless a longer retention period is required by law. You may request deletion of your data at any time.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict certain processing</li>
                <li>Data portability where applicable</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
                <a href="mailto:privacy@rebirth.org" className="text-primary hover:underline">
                  privacy@rebirth.org
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

export default Privacy;
