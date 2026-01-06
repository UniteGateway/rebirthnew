import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import rebirthLogo from "@/assets/rebirth-logo.png";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Certificate", href: "#certificate" },
  { name: "Sponsor", href: "#sponsor" },
  { name: "Partner", href: "#partner" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={rebirthLogo} alt="Rebirth - Giving Every Child a Date to Belong" className="h-16 md:h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/auth">NGO Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth?mode=register">Partner as NGO</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-4 px-4">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/auth">NGO Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/auth?mode=register">Partner as NGO</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
