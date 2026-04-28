import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ArtworkCard } from "@/components/ArtworkCard";
import { WatermarkedImage } from "@/components/WatermarkedImage";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Link } from "wouter";

export default function Gallery() {
  const { artworks } = useSiteContent();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [collection, setCollection] = useState("All");
  const [year, setYear] = useState("All");
  const [status, setStatus] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(artworks.map(a => a.category))], [artworks]);
  const collections = useMemo(() => ["All", ...new Set(artworks.map(a => a.collection).filter(Boolean) as string[])], [artworks]);
  const years = useMemo(() => ["All", ...new Set(artworks.map(a => a.year).filter(y => y && y.trim() !== ""))].sort((a, b) => b.localeCompare(a)), [artworks]);
  const statuses = useMemo(() => ["All", "Available", "Sold", "Reserved", "Archived"], []);

  const filteredArtworks = useMemo(() => {
    return artworks.filter(art => {
      const matchesSearch = 
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.medium.toLowerCase().includes(search.toLowerCase()) ||
        art.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || art.category === category;
      const matchesCollection = collection === "All" || art.collection === collection;
      const matchesYear = year === "All" || art.year === year;
      const matchesStatus = status === "All" || art.status === status;
      
      return matchesSearch && matchesCategory && matchesCollection && matchesYear && matchesStatus;
    });
  }, [artworks, search, category, collection, year, status]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-20">
          <span className="text-xs uppercase tracking-[0.4em] text-primary mb-4 block">The Gallery</span>
          <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6">Complete Works</h1>
          <p className="text-muted-foreground text-lg max-w-2xl font-light">
            An overview of all paintings, mixed media pieces, and commissioned works by Mikiyas Assefa.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-transparent border-border/60 uppercase text-[10px] tracking-widest h-12">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c} className="uppercase text-[10px] tracking-widest">{c === "All" ? "All Categories" : c}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={collection} onValueChange={setCollection}>
              <SelectTrigger className="bg-transparent border-border/60 uppercase text-[10px] tracking-widest h-12">
                <SelectValue placeholder="All Collections" />
              </SelectTrigger>
              <SelectContent>
                {collections.map(c => <SelectItem key={c} value={c} className="uppercase text-[10px] tracking-widest">{c === "All" ? "All Collections" : c}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="bg-transparent border-border/60 uppercase text-[10px] tracking-widest h-12">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => <SelectItem key={y} value={y} className="uppercase text-[10px] tracking-widest">{y === "All" ? "All Years" : y}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-transparent border-border/60 uppercase text-[10px] tracking-widest h-12">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(s => <SelectItem key={s} value={s} className="uppercase text-[10px] tracking-widest">{s === "All" ? "All Statuses" : s}</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="SEARCH WORKS..." 
                className="pl-10 bg-transparent border-border/60 uppercase text-[10px] tracking-widest h-12 focus-visible:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center border-b border-border/40 pb-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Showing {filteredArtworks.length} of {artworks.length} works
            </span>
          </div>
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork, idx) => (
              <div key={artwork.id} className="break-inside-avoid mb-6">
                <Link href={`/gallery/${artwork.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className="group cursor-pointer mb-8"
                  >
                    <div className="overflow-hidden bg-muted mb-4 relative">
                      <WatermarkedImage
                        src={artwork.image}
                        alt={artwork.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        watermarkSize="md"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl text-foreground">
                        {artwork.title}
                      </h3>
                      <div className="flex justify-between items-baseline text-xs text-muted-foreground uppercase tracking-widest">
                        <span>{artwork.year ? `${artwork.year} : ` : ""}{artwork.medium}</span>
                        <span className="text-foreground font-medium">{artwork.price}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArtworks.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-light">No works found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
