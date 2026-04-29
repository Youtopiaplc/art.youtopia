import { useLocation } from "wouter";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Contact() {


  const { artist, artworks } = useSiteContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    artworkId: "none",
    message: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const artworkId = params.get("artwork");
    const matched = artworks.find(a => a.id === artworkId);
    if (matched) {
      setFormData(prev => ({
        ...prev,
        artworkId: matched.id,
        subject: `Inquiry about "${matched.title}"${matched.year ? `, ${matched.year}` : ""}`,
      }));
    }
  }, [artworks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Inquiry sent",
      description: "Thank you for your message. We will get back to you shortly.",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      artworkId: "none",
      message: ""
    });
  };

  return (
    <>  <Helmet>
  <title>Contact | Mikiyas Assefa</title>
  <meta name="description" content="Inquire about artwork, commissions, or visit the studio in Addis Ababa, Ethiopia." />
  </Helmet>
  
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block">GET IN TOUCH</span>
          <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Contact</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* LEFT: Contact Info */}
          <div className="lg:col-span-4 space-y-16">
            <section>
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">EMAIL</h3>
              <div className="flex items-center gap-4 text-lg">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${artist.email}`} className="hover:text-primary transition-colors underline-offset-4 underline">{artist.email}</a>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">PHONE</h3>
              <div className="flex items-center gap-4 text-lg">
                <Phone className="w-5 h-5 text-primary" />
                <a href={`tel:${artist.phone}`} className="hover:text-primary transition-colors">{artist.phone}</a>
              </div>
            </section>

            <section>
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">FOLLOW</h3>
              <div className="flex flex-col gap-4">
                <a href={artist.social.instagram} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-primary transition-colors w-fit">Instagram</a>
                <a href={artist.social.behance} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-primary transition-colors w-fit">Behance</a>
                <a href={artist.social.facebook} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-primary transition-colors w-fit">Facebook</a>
              </div>
            </section>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground ml-1">NAME</label>
                  <Input 
                    required 
                    className="bg-transparent border-border/60 h-14 text-lg focus-visible:ring-primary"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground ml-1">EMAIL</label>
                  <Input 
                    required 
                    type="email"
                    className="bg-transparent border-border/60 h-14 text-lg focus-visible:ring-primary"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground ml-1">SUBJECT</label>
                <Input 
                  required 
                  className="bg-transparent border-border/60 h-14 text-lg focus-visible:ring-primary"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground ml-1">ARTWORK OF INTEREST (OPTIONAL)</label>
                <Select value={formData.artworkId} onValueChange={(val) => setFormData(prev => ({ ...prev, artworkId: val }))}>
                  <SelectTrigger className="bg-transparent border-border/60 h-14 text-lg focus-visible:ring-primary">
                    <SelectValue placeholder="— None —" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— None —</SelectItem>
                    {artworks.map(art => (
                      <SelectItem key={art.id} value={art.id}>
                        {art.title} ({art.year})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground ml-1">MESSAGE</label>
                <Textarea 
                  required 
                  className="bg-transparent border-border/60 min-h-[200px] text-lg focus-visible:ring-primary resize-none p-6"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-[#8c1c1c] text-white font-medium tracking-[0.3em] uppercase text-xs cursor-pointer hover:bg-[#6b1515] transition-all duration-300 shadow-xl shadow-black/5"
              >
                SEND INQUIRY
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
