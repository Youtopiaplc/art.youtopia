import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "wouter";
import { ArtworkCard } from "@/components/ArtworkCard";
import { artistImage } from "@/data/artworks";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const { artist, artworks } = useSiteContent();

  // Select 8 to 10 selected works
  const featuredArtworks = artworks.slice(0, 9);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] as any }
    }
  };

  return (
    <>
  <Helmet>
  <title>Mikiyas Assefa | Contemporary Artist</title>
  <meta name="description" content="Ethiopian contemporary artist exploring identity, memory, and the human condition through acrylics and mixed media." />
  </Helmet>
    <div className="min-h-screen bg-[#fdfcf0]">
      {/* Hero Section - Artist Profile Redesign */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Artistic Textured Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#fdfcf0] via-[#f7f3e3] to-[#efead7]" />
          
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
          
          {/* Subtle paint strokes / texture overlays could be added here as background images */}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-start">
            {/* Artist Photo Column */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative order-1 lg:order-1 lg:sticky lg:top-32"
            >
              <div className="relative group max-w-md mx-auto lg:mx-0">
                {/* Decorative offset frame */}
                <div className="absolute -inset-3 border border-[#d4a017]/40 translate-x-3 translate-y-3 pointer-events-none" />
                <div className="absolute -left-6 top-0 bottom-0 w-px bg-[#d4a017]/60 hidden lg:block" />
                <div className="absolute -left-10 top-12 h-20 w-px bg-[#8c1c1c] hidden lg:block" />

                <div className="relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#8c1c1c]/10 via-transparent to-[#8c1c1c]/30 mix-blend-multiply z-10 pointer-events-none" />
                  <img 
                    src={artistImage} 
                    alt={artist.name}
                    className="w-full h-auto block sepia-[0.25] contrast-[1.05] saturate-[0.85]"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.25)] pointer-events-none" />
                </div>

                <div className="mt-5 flex items-center justify-end text-[10px] tracking-[0.3em] uppercase">
                  <span className="text-foreground/70 font-medium">Painter, Addis Ababa</span>
                </div>
              </div>
            </motion.div>

            {/* Artist Info Column */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-2"
            >
              <motion.div variants={itemVariants} className="mb-2">
                <span className="font-serif text-[#8c1c1c] text-6xl leading-none opacity-20 block -mb-8 select-none">“</span>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="font-serif text-5xl sm:text-6xl lg:text-8xl font-medium text-foreground mb-4 tracking-tight break-words leading-[0.9]"
              >
                {artist.name}
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-[#8c1c1c] font-serif italic mb-10 tracking-wide"
              >
                Painter of inner states, memory, and quiet defiance
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="max-w-prose space-y-6 mb-12"
              >
                {artist.bio.map((paragraph, idx) => (
                  <p key={idx} className={`text-lg text-foreground/80 leading-relaxed font-light ${idx === 0 ? "first-letter:text-6xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-[#8c1c1c] first-letter:leading-none first-letter:font-medium" : ""}`}>
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Stats Strip */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-6 py-6 border-y border-border/40 mb-12 text-[10px] tracking-[0.3em] uppercase font-bold text-muted-foreground"
              >
                <span>12 YEARS PRACTICE</span>
                <div className="w-px h-4 bg-border/40" />
                <span>ADDIS ABABA</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Link href="/gallery">
                  <span className="inline-block px-10 py-5 bg-[#8c1c1c] text-white font-medium tracking-[0.2em] uppercase text-xs cursor-pointer hover:bg-[#6b1515] transition-all duration-300 shadow-lg shadow-black/5">
                    Explore the Gallery
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="inline-block px-10 py-5 border border-foreground/20 text-foreground font-medium tracking-[0.2em] uppercase text-xs cursor-pointer hover:bg-foreground hover:text-white transition-all duration-300">
                    Contact the Studio
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Works Section - Masonry */}
      <section className="py-32 bg-background border-t border-border/40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Curated Selection</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Selected Works</h2>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {featuredArtworks.map((artwork, idx) => (
              <div key={artwork.id} className="break-inside-avoid mb-6">
                <ArtworkCard
                  artwork={artwork}
                  index={idx}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <Link href="/gallery">
              <span className="inline-block border-b-2 border-[#8c1c1c] pb-2 text-[#8c1c1c] hover:text-[#6b1515] hover:border-[#6b1515] transition-all duration-300 cursor-pointer uppercase tracking-[0.2em] text-xs font-bold">
                View Full Collection
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center bg-background">
        <div className="container mx-auto px-6">
          <h3 className="font-serif text-3xl md:text-4xl mb-12">Interested in a piece or a commission?</h3>
          <Link href="/contact">
            <span className="inline-block px-10 py-5 bg-[#8c1c1c] text-white font-medium tracking-[0.2em] uppercase text-xs cursor-pointer hover:bg-[#6b1515] transition-all duration-300 shadow-lg shadow-black/5">
              Get in Touch
            </span>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
