import { useState, useEffect, useRef } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Artwork, type ArtistProfile } from "@/data/artworks";
import { Trash2, Plus, Save } from "lucide-react";

type DraftArtwork = Omit<Artwork, "number"> & { number?: number };
const emptyNewArtwork: DraftArtwork = {
  id: "",
  title: "",
  year: "",
  medium: "Acrylic on Canvas",
  size: "",
  description: "",
  image: "",
  orientation: "PORTRAIT",
  category: "Portraits",
  collection: "",
  status: "Available",
  price: "",
  printEdition: "10 prints",
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const {
    artist,
    artworks,
    replaceArtist,
    replaceArtworks,
    updateArtwork,
    addArtwork,
    deleteArtwork,
    uploadImage,
    verifyPassword,
    updateAdminPassword,
    resetAll,
  } = useSiteContent();
  const { toast } = useToast();

  const [draftArtist, setDraftArtist] = useState<ArtistProfile>(artist);
  const [draftArtworks, setDraftArtworks] = useState<Artwork[]>(artworks);
  const [newArtwork, setNewArtwork] = useState<DraftArtwork>(emptyNewArtwork);
  const newImageRef = useRef<HTMLInputElement>(null);

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  useEffect(() => {
    const unlocked = localStorage.getItem("miki_admin_unlocked");
    if (unlocked === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    setDraftArtist(artist);
  }, [artist]);

  useEffect(() => {
    setDraftArtworks(artworks);
  }, [artworks]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await verifyPassword(password);
    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem("miki_admin_unlocked", "true");
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect password.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("miki_admin_unlocked");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content to defaults? This cannot be undone.")) {
      resetAll();
      toast({ title: "Reset successful", description: "Content restored to defaults." });
    }
  };

  const handleSaveProfile = () => {
    replaceArtist(draftArtist);
    toast({ title: "Profile saved", description: "Artist profile has been updated." });
  };

  const handleSaveArtworks = () => {
    replaceArtworks(draftArtworks);
    toast({ title: "Artworks saved", description: "Inventory updates have been saved." });
  };

  const updateDraftArtwork = (id: string, patch: Partial<Artwork>) => {
    setDraftArtworks(prev => prev.map(a => a.id === id ? { ...a, ...patch } : a));
  };

  const handleDeleteArtwork = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteArtwork(id);
      toast({ title: "Artwork deleted", description: `"${title}" removed from inventory.` });
    }
  };

  const handleNewImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image too large",
        description: "Please use an image under 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    const fileName = `${Date.now()}-${slugify(newArtwork.title) || 'artwork'}`;
    const imageUrl = await uploadImage(file, fileName);
    
    if (imageUrl) {
      setNewArtwork(prev => ({ ...prev, image: imageUrl }));
    } else {
      toast({
        title: "Upload failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddArtwork = () => {
    if (!newArtwork.title.trim()) {
      toast({ title: "Title required", description: "Please give the artwork a title.", variant: "destructive" });
      return;
    }
    if (!newArtwork.image) {
      toast({ title: "Image required", description: "Please upload an image for this artwork.", variant: "destructive" });
      return;
    }
    const baseId = slugify(newArtwork.title) || `artwork-${Date.now()}`;
    let id = baseId;
    let counter = 1;
    while (artworks.some(a => a.id === id) || draftArtworks.some(a => a.id === id)) {
      id = `${baseId}-${counter++}`;
    }
    const maxNumber = artworks.reduce((m, a) => Math.max(m, a.number || 0), 0);
    const created: Artwork = {
      ...newArtwork,
      id,
      number: maxNumber + 1,
    } as Artwork;
    addArtwork(created);
    setNewArtwork(emptyNewArtwork);
    if (newImageRef.current) newImageRef.current.value = "";
    toast({ title: "Artwork added", description: `"${created.title}" is now live in the gallery.` });
  };

  const handleUploadReplacementImage = async (id: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please use an image under 5MB.", variant: "destructive" });
      return;
    }
    
    const fileName = `${id}-${Date.now()}`;
    const imageUrl = await uploadImage(file, fileName);
    
    if (imageUrl) {
      updateArtwork(id, { image: imageUrl });
      toast({
        title: "Image updated",
        description: "The artwork image has been replaced.",
      });
    } else {
      toast({
        title: "Upload failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await verifyPassword(currentPwd);
    if (!isValid) {
      toast({ title: "Current password incorrect", variant: "destructive" });
      return;
    }
    
    if (newPwd.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    
    if (newPwd !== confirmPwd) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    
    const success = await updateAdminPassword(newPwd);
    if (success) {
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      toast({ title: "Password updated", description: "Your studio password has been changed." });
    } else {
      toast({ title: "Update failed", description: "Could not update password. Try again.", variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 bg-card p-10 border border-border shadow-xl rounded-lg text-center">
          <h2 className="font-serif text-3xl">Studio Access</h2>
          <p className="text-muted-foreground">Please enter your password to manage content.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center"
            />
            <Button type="submit" className="w-full">Unlock</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <h1 className="font-serif text-4xl">Studio Admin</h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={handleReset} className="border-destructive text-destructive hover:bg-destructive/10">
              Reset to Defaults
            </Button>
            <Button variant="secondary" onClick={handleLogout}>
              Lock Studio
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="w-full justify-start border-b border-border rounded-none h-auto bg-transparent p-0 space-x-8">
            <TabsTrigger value="profile" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">
              Artist Profile
            </TabsTrigger>
            <TabsTrigger value="artworks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">
              Artworks Inventory
            </TabsTrigger>
            <TabsTrigger value="add" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">
              Add New Artwork
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 py-3">
              Security
            </TabsTrigger>
          </TabsList>

          {/* PROFILE */}
          <TabsContent value="profile" className="space-y-8 bg-card p-8 border border-border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl border-b border-border pb-2">Basic Info</h3>
                <Field label="Name" value={draftArtist.name} onChange={v => setDraftArtist({ ...draftArtist, name: v })} />
                <Field label="Born Info" value={draftArtist.born} onChange={v => setDraftArtist({ ...draftArtist, born: v })} />
                <Field label="Email" value={draftArtist.email} onChange={v => setDraftArtist({ ...draftArtist, email: v })} />
                <Field label="Phone" value={draftArtist.phone} onChange={v => setDraftArtist({ ...draftArtist, phone: v })} />
                <Field label="Location" value={draftArtist.location} onChange={v => setDraftArtist({ ...draftArtist, location: v })} />
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl border-b border-border pb-2">Social Links</h3>
                <Field label="Instagram URL" value={draftArtist.social?.instagram || ""} onChange={v => setDraftArtist({ ...draftArtist, social: { ...draftArtist.social, instagram: v } })} />
                <Field label="Facebook URL" value={draftArtist.social?.facebook || ""} onChange={v => setDraftArtist({ ...draftArtist, social: { ...draftArtist.social, facebook: v } })} />
                <Field label="Behance URL" value={draftArtist.social?.behance || ""} onChange={v => setDraftArtist({ ...draftArtist, social: { ...draftArtist.social, behance: v } })} />
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <h3 className="font-serif text-xl border-b border-border pb-2">Biography Paragraphs</h3>
              {draftArtist.bio.map((paragraph, index) => (
                <div key={index}>
                  <label className="text-sm font-medium mb-1 block text-muted-foreground">Paragraph {index + 1}</label>
                  <Textarea
                    value={paragraph}
                    onChange={(e) => {
                      const newBio = [...draftArtist.bio];
                      newBio[index] = e.target.value;
                      setDraftArtist({ ...draftArtist, bio: newBio });
                    }}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveProfile} className="gap-2">
                <Save className="w-4 h-4" /> Save Profile
              </Button>
            </div>
          </TabsContent>

          {/* ARTWORKS INVENTORY */}
          <TabsContent value="artworks" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={handleSaveArtworks} className="gap-2">
                <Save className="w-4 h-4" /> Save All Changes
              </Button>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {draftArtworks.map((artwork) => (
                <AccordionItem key={artwork.id} value={artwork.id} className="bg-card border border-border px-6 rounded-lg">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center space-x-4 text-left">
                      <div className="w-16 h-16 bg-muted shrink-0 overflow-hidden rounded">
                        {artwork.image ? <img src={artwork.image} alt="" className="w-full h-full object-cover" /> : null}
                      </div>
                      <div>
                        <div className="font-serif text-lg">{artwork.title || "Untitled"}</div>
                        <div className="text-sm text-muted-foreground">{artwork.year || "Year unspecified"} &middot; {artwork.category}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-4 space-y-6 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <Field label="Title" value={artwork.title} onChange={v => updateDraftArtwork(artwork.id, { title: v })} />
                        <div className="grid grid-cols-2 gap-4">
                          <Field label="Year" value={artwork.year} onChange={v => updateDraftArtwork(artwork.id, { year: v })} />
                          <div>
                            <label className="text-sm font-medium mb-1 block">Category</label>
                            <Select value={artwork.category} onValueChange={(val: any) => updateDraftArtwork(artwork.id, { category: val })}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Portraits">Portraits</SelectItem>
                                <SelectItem value="Landscapes">Landscapes</SelectItem>
                                <SelectItem value="Mixed Media">Mixed Media</SelectItem>
                                <SelectItem value="Commissioned">Commissioned</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Field label="Medium" value={artwork.medium} onChange={v => updateDraftArtwork(artwork.id, { medium: v })} />
                        <Field label="Collection" value={artwork.collection || ""} onChange={v => updateDraftArtwork(artwork.id, { collection: v })} />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Status</label>
                            <Select value={artwork.status} onValueChange={(val: any) => updateDraftArtwork(artwork.id, { status: val })}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Available">Available</SelectItem>
                                <SelectItem value="Sold">Sold</SelectItem>
                                <SelectItem value="Reserved">Reserved</SelectItem>
                                <SelectItem value="Archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Field label="Price" value={artwork.price} onChange={v => updateDraftArtwork(artwork.id, { price: v })} />
                        </div>
                        <Field label="Print Edition" value={artwork.printEdition || ""} onChange={v => updateDraftArtwork(artwork.id, { printEdition: v })} />
                        <Field label="Size" value={artwork.size} onChange={v => updateDraftArtwork(artwork.id, { size: v })} />
                        <div>
                          <label className="text-sm font-medium mb-1 block">Replace Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleUploadReplacementImage(artwork.id, f);
                            }}
                            className="text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Description</label>
                          <Textarea
                            value={artwork.description}
                            onChange={(e) => updateDraftArtwork(artwork.id, { description: e.target.value })}
                            className="min-h-[250px]"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            className="border-destructive text-destructive hover:bg-destructive/10 gap-2"
                            onClick={() => handleDeleteArtwork(artwork.id, artwork.title)}
                          >
                            <Trash2 className="w-4 h-4" /> Delete Artwork
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveArtworks} className="gap-2">
                <Save className="w-4 h-4" /> Save All Changes
              </Button>
            </div>
          </TabsContent>

          {/* ADD NEW ARTWORK */}
          <TabsContent value="add" className="bg-card p-8 border border-border rounded-lg space-y-6">
            <h3 className="font-serif text-2xl">Add a New Artwork</h3>
            <p className="text-sm text-muted-foreground">Upload an image and fill in the details. The new piece appears in the gallery as soon as you click Add.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Artwork Image</label>
                  <input
                    ref={newImageRef}
                    type="file"
                    accept="image/*"
                    onChange={handleNewImageUpload}
                    className="text-sm"
                  />
                  {newArtwork.image && (
                    <div className="mt-3 w-40 h-40 border border-border overflow-hidden bg-muted">
                      <img src={newArtwork.image} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <Field label="Title" value={newArtwork.title} onChange={v => setNewArtwork({ ...newArtwork, title: v })} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Year" value={newArtwork.year} onChange={v => setNewArtwork({ ...newArtwork, year: v })} />
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select value={newArtwork.category} onValueChange={(val: any) => setNewArtwork({ ...newArtwork, category: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Portraits">Portraits</SelectItem>
                        <SelectItem value="Landscapes">Landscapes</SelectItem>
                        <SelectItem value="Mixed Media">Mixed Media</SelectItem>
                        <SelectItem value="Commissioned">Commissioned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Field label="Medium" value={newArtwork.medium} onChange={v => setNewArtwork({ ...newArtwork, medium: v })} />
                <Field label="Collection" value={newArtwork.collection || ""} onChange={v => setNewArtwork({ ...newArtwork, collection: v })} />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Status</label>
                    <Select value={newArtwork.status} onValueChange={(val: any) => setNewArtwork({ ...newArtwork, status: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                        <SelectItem value="Reserved">Reserved</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Field label="Price" value={newArtwork.price} onChange={v => setNewArtwork({ ...newArtwork, price: v })} />
                </div>
                <Field label="Print Edition" value={newArtwork.printEdition || ""} onChange={v => setNewArtwork({ ...newArtwork, printEdition: v })} />
                <Field label="Size" value={newArtwork.size} onChange={v => setNewArtwork({ ...newArtwork, size: v })} />
                <div>
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Textarea
                    value={newArtwork.description}
                    onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })}
                    className="min-h-[200px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleAddArtwork} className="gap-2">
                <Plus className="w-4 h-4" /> Add Artwork
              </Button>
            </div>
          </TabsContent>

          {/* SECURITY */}
          <TabsContent value="security" className="bg-card p-8 border border-border rounded-lg space-y-6 max-w-xl">
            <div>
              <h3 className="font-serif text-2xl">Change Password</h3>
              <p className="text-sm text-muted-foreground mt-1">Update the password used to access this admin panel. Use at least 6 characters.</p>
            </div>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Current Password</label>
                <Input type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">New Password</label>
                <Input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Confirm New Password</label>
                <Input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" className="gap-2">
                  <Save className="w-4 h-4" /> Update Password
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}