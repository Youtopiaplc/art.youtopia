import { motion } from "framer-motion";
import { type Artwork } from "@/data/artworks";
import { WatermarkedImage } from "@/components/WatermarkedImage";
import { Link } from "wouter";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  return (
    <Link href={`/gallery/${artwork.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group cursor-pointer"
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
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white pointer-events-none">
            <h3 className="font-serif text-2xl mb-1">{artwork.title}</h3>
            {artwork.year && <p className="text-sm tracking-widest uppercase">{artwork.year}</p>}
          </div>
        </div>
        <div className="space-y-1 px-1">
          <h3 className="font-serif text-xl text-foreground">
            {artwork.title}
          </h3>
          <div className="flex justify-between items-baseline text-sm text-muted-foreground uppercase tracking-wider">
            <span>{artwork.year ? `${artwork.year} : ` : ""}{artwork.medium}</span>
            <span className="text-foreground font-medium">{artwork.price}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
