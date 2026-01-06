import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import rebirthLogo from "@/assets/rebirth-logo.png";

const footerLinks = {
  about: [
    { name: "About Rebirth", href: "#about" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Ethics & Safeguards", href: "#ethics" },
  ],
  partners: [
    { name: "Partner as NGO", href: "/auth?mode=register" },
    { name: "CSR Partnership", href: "#partner" },
    { name: "Sponsor a Rebirth", href: "#sponsor" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={rebirthLogo} alt="Rebirth" className="h-10 w-auto brightness-0 invert" />
              <span className="text-xl font-bold lowercase">rebirth</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Giving every child a symbolic beginning — a date to be seen, celebrated, and remembered.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Links */}
          <div>
            <h3 className="font-semibold mb-4">Partners</h3>
            <ul className="space-y-2">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <blockquote className="text-center italic text-primary-foreground/90 max-w-2xl mx-auto">
            "Rebirth is not about changing the past. It's about giving the future a place to begin."
          </blockquote>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Rebirth. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-coral fill-coral" /> for every child
          </p>
        </div>
      </div>
    </footer>
  );
}
