import { FileCheck, QrCode, Shield, Building2, AlertTriangle } from "lucide-react";

export function CertificateSection() {
  return (
    <section id="certificate" className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Certificate Preview */}
          <div className="relative">
            <div className="bg-card rounded-3xl border-2 border-border p-8 shadow-xl">
              {/* Certificate Header */}
              <div className="text-center border-b border-border pb-6 mb-6">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <FileCheck className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-primary lowercase">rebirth</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">Certificate of Rebirth</h3>
              </div>

              {/* Certificate Body */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Child Name</label>
                    <p className="font-semibold text-foreground">Sample Child Name</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Rebirth Date</label>
                    <p className="font-semibold text-foreground">January 15, 2024</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Partner NGO</label>
                    <p className="font-semibold text-foreground">Hope Foundation</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase">Certificate ID</label>
                    <p className="font-semibold text-foreground">RB-2024-001234</p>
                  </div>
                </div>
              </div>

              {/* QR Code placeholder */}
              <div className="flex items-center justify-center p-4 bg-muted rounded-xl">
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-primary mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground">Scan to verify</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-coral-light rounded-full opacity-50 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary rounded-full opacity-50 -z-10" />
          </div>

          {/* Right: Certificate Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Rebirth <span className="text-primary">Certificate</span>
            </h2>

            <div className="space-y-6">
              <p className="text-muted-foreground text-lg">
                Each Rebirth Certificate is a beautiful, official document that symbolizes 
                a child's new beginning. It serves as a meaningful record of their identity 
                and celebration.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-lg flex-shrink-0">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Unique Certificate ID</h4>
                    <p className="text-sm text-muted-foreground">Every certificate has a unique identifier for records</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-lg flex-shrink-0">
                    <QrCode className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">QR Verification</h4>
                    <p className="text-sm text-muted-foreground">Instantly verify authenticity by scanning the QR code</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-lg flex-shrink-0">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">NGO Validation</h4>
                    <p className="text-sm text-muted-foreground">Issued by verified partner organizations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary rounded-lg flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Secure & Protected</h4>
                    <p className="text-sm text-muted-foreground">Child data is protected with privacy safeguards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-coral-light/50 rounded-xl border border-coral/20 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-coral flex-shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                <strong>Important:</strong> The Rebirth Certificate is a symbolic identity record 
                and not a government-issued birth certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
