import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

// ============================================
// UPDATE THESE WITH YOUR REAL INFORMATION
// ============================================
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/mikiasse12?igsh=MXFjNWZ2d3QydHF2MA%3D%3D&utm_source=qr",  // ← Change this
  facebook: "https://www.facebook.com/YOUR_PAGE/",       // ← Change this
};

const CONTACT_INFO = {
  email: "mikiyas.assefa@example.com",
  phone: "+251920227210",
  location: "Addis Ababa, Ethiopia",
};

const ARTIST_NAME = "Mikiyas Assefa";
// ============================================

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 - Artist Name */}
          <div>
            <h3 className="font-serif text-xl mb-4">{ARTIST_NAME}</h3>
            <div className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </div>
          </div>

          {/* Column 2 - Contact Info */}
          <div>
            <h4 className="font-serif text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a 
                href={`mailto:${CONTACT_INFO.email}`} 
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{CONTACT_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Column 3 - Social Media */}
          <div>
            <h4 className="font-serif text-lg mb-4">Follow</h4>
            <div className="flex space-x-4">
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}