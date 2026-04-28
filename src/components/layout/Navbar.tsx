import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <span className="font-serif text-2xl font-medium tracking-tight cursor-pointer hover:text-primary transition-colors">
            Mikiyas Assefa
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span
                className={`text-sm tracking-wide uppercase cursor-pointer transition-colors hover:text-primary ${
                  location === link.path ? "text-primary font-medium" : "text-foreground/80"
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
          <nav className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg cursor-pointer block py-2 border-b border-border/30 hover:text-primary transition-colors ${
                    location === link.path ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
