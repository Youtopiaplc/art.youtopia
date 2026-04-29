import { useRoute, useLocation, Link } from "wouter";
import { useSiteContent } from "@/hooks/useSiteContent";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { type Artwork } from "@/data/artworks";
import { Helmet } from "react-helmet-async";



// Zoomable Image Component
function ZoomableImage({ src, alt, onZoomRequest }: { src: string; alt: string; onZoomRequest: () => void }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  // Handle pinch-to-zoom on mobile
  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    let initialDistance = 0;
    let initialScale = 1;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch start
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialDistance = Math.sqrt(dx * dx + dy * dy);
        initialScale = scale;
      } else if (e.touches.length === 1 && scale > 1) {
        // Drag start when zoomed
        setIsDragging(true);
        setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance > 0) {
        // Pinch zoom
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        let newScale = initialScale * (distance / initialDistance);
        newScale = Math.min(Math.max(newScale, 1), 4);
        setScale(newScale);
        
        // Reset position if scale is 1
        if (newScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
      } else if (e.touches.length === 1 && isDragging && scale > 1) {
        // Drag pan
        const newX = e.touches[0].clientX - dragStart.x;
        const newY = e.touches[0].clientY - dragStart.y;
        
        // Calculate bounds
        const elementRect = element.getBoundingClientRect();
        const imgWidth = elementRect.width * scale;
        const imgHeight = elementRect.height * scale;
        const maxX = Math.max(0, (imgWidth - elementRect.width) / 2);
        const maxY = Math.max(0, (imgHeight - elementRect.height) / 2);
        
        setPosition({
          x: Math.min(Math.max(newX, -maxX), maxX),
          y: Math.min(Math.max(newY, -maxY), maxY),
        });
      }
    };

    const handleTouchEnd = () => {
      initialDistance = 0;
      setIsDragging(false);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale, position, dragStart, isDragging]);

  // Mouse wheel zoom for desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      let newScale = scale - e.deltaY * 0.01;
      newScale = Math.min(Math.max(newScale, 1), 4);
      setScale(newScale);
      
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleZoomIn = () => {
    setScale(Math.min(scale + 0.5, 4));
  };

  const handleZoomOut = () => {
    if (scale > 1) {
      setScale(Math.max(scale - 0.5, 1));
      if (scale - 0.5 <= 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const isZoomed = scale > 1;

  return (
    <div className="relative">
      {/* Zoom Controls - Desktop */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {isZoomed && (
          <button
            onClick={handleReset}
            className="p-2 bg-background/80 backdrop-blur-sm rounded-md hover:bg-[#8c1c1c] hover:text-white transition-all duration-300 shadow-xl"
            title="Reset zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={handleZoomIn}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-md hover:bg-[#8c1c1c] hover:text-white transition-all duration-300 shadow-xl"
          title="Zoom in (Ctrl + scroll)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-background/80 backdrop-blur-sm rounded-md hover:bg-[#8c1c1c] hover:text-white transition-all duration-300 shadow-xl"
          title="Zoom out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Image Container with Zoom */}
      <div
        ref={imgRef}
        className="relative bg-muted/30 overflow-hidden cursor-zoom-in"
        onWheel={handleWheel}
        onClick={onZoomRequest}
        style={{
          cursor: isZoomed ? 'grab' : 'zoom-in',
        }}
      >
        <div
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transformOrigin: 'center center',
          }}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Visible watermark across the image */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <span
            className="font-serif italic text-3xl md:text-5xl text-white/55 rotate-[-28deg] tracking-wider whitespace-nowrap mix-blend-overlay"
            style={{ textShadow: "0 2px 6px rgba(0,0,0,0.55)" }}
          >
            @Mikiyas Assefa
          </span>
        </div>

        {/* Expand Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onZoomRequest();
          }}
          className="absolute bottom-6 right-6 p-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-[#8c1c1c] hover:text-white transition-all duration-300 shadow-xl"
          aria-label="View fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile zoom hint */}
     
    </div>
  );
}

export default function ArtworkDetail() {
  
  const [, params] = useRoute("/gallery/:id");
  const [, setLocation] = useLocation();
  const { artworks } = useSiteContent();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxPosition, setLightboxPosition] = useState({ x: 0, y: 0 });

  const artworkIndex = artworks.findIndex(a => a.id === params?.id);
  const artwork = artworks[artworkIndex];



  useEffect(() => {
    if (artwork) {
      setLightboxImage(artwork.image);
    }
    // Reset lightbox zoom when artwork changes
    setLightboxScale(1);
    setLightboxPosition({ x: 0, y: 0 });
  }, [artwork]);

  useEffect(() => {
    if (!artwork && params?.id) {
      setLocation("/404");
    }
  }, [artwork, params, setLocation]);

  if (!artwork) return null;

  const prevArtwork = artworks[(artworkIndex - 1 + artworks.length) % artworks.length];
  const nextArtwork = artworks[(artworkIndex + 1) % artworks.length];

  // Handle lightbox wheel zoom
  const handleLightboxWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      let newScale = lightboxScale - e.deltaY * 0.01;
      newScale = Math.min(Math.max(newScale, 1), 4);
      setLightboxScale(newScale);
      if (newScale === 1) {
        setLightboxPosition({ x: 0, y: 0 });
      }
    }
  };

  return (
    <>
    <Helmet>
    <title>{artwork.title} | Mikiyas Assefa</title>
    <meta name="description" content={artwork.description.substring(0, 150)} />
    </Helmet>

    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Back Link */}
        <Link href="/gallery">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-12">
            <ArrowLeft className="w-3 h-3" /> BACK TO GALLERY
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT: Image Section with Zoom */}
          <ZoomableImage 
            src={artwork.image} 
            alt={artwork.title} 
            onZoomRequest={() => setLightboxOpen(true)}
          />

          {/* RIGHT: Metadata Section (unchanged) */}
          <div className="flex flex-col">
            <div className="mb-8 flex items-center gap-4">
              <span className="px-3 py-1 bg-[#8c1c1c] text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                {artwork.status.toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                WORK No {artwork.number.toString().padStart(2, '0')}
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
              {artwork.title}
            </h1>
            {artwork.year && (
              <p className="font-serif italic text-2xl text-muted-foreground mb-12">
                {artwork.year}
              </p>
            )}

            <div className="space-y-4 mb-12">
              <DetailRow label="MEDIUM" value={artwork.medium} />
              <DetailRow label="SIZE" value={artwork.size} />
              <DetailRow label="CATEGORY" value={artwork.category} />
              <DetailRow label="COLLECTION" value={artwork.collection || "UNSPECIFIED"} />
              <DetailRow label="PRICE" value={artwork.price} isBold />
              <DetailRow label="PRINTS" value={artwork.printEdition || "10 prints"} />
            </div>

            {/* Secondary Images Section */}
            {(artwork.secondaryImages && artwork.secondaryImages.length > 0) || artwork.id === "choosing" ? (
              <div className="mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Additional views</h3>
                <div className="flex flex-wrap gap-4">
                  {/* Show secondary images from database if they exist */}
                  {artwork.secondaryImages && artwork.secondaryImages.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="w-24 h-auto cursor-pointer border border-border/40 hover:border-primary transition-colors"
                      onClick={() => {
                        setLightboxImage(img);
                        setLightboxOpen(true);
                      }}
                    >
                      <img src={img} alt={`${artwork.title} view ${idx + 1}`} className="w-full h-auto" />
                    </div>
                  ))}
                  
                  {/* Hardcoded secondary image for "Choosing" artwork */}
                  {artwork.id === "choosing" && (
                    <div 
                      className="w-24 h-auto cursor-pointer border border-border/40 hover:border-primary transition-colors"
                      onClick={() => {
                        setLightboxImage("/images/Choosing2.png");
                        setLightboxOpen(true);
                      }}
                    >
                      <img src="/images/Choosing2.png" alt="Choosing additional view" className="w-full h-auto" />
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            <div className="border-t border-border pt-12 mb-12">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
                {artwork.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <Link href={`/contact?artwork=${artwork.id}`}>
              <span className="inline-block w-full py-5 bg-[#8c1c1c] text-white text-center font-medium tracking-[0.2em] uppercase text-xs cursor-pointer hover:bg-[#6b1515] transition-all duration-300 shadow-lg shadow-black/5">
                INQUIRE ABOUT THIS WORK
              </span>
            </Link>
          </div>
        </div>

        {/* Pager */}
        <div className="mt-32 pt-12 border-t border-border flex justify-between items-center">
          <Link href={`/gallery/${prevArtwork.id}`}>
            <div className="group cursor-pointer">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 group-hover:text-primary transition-colors">
                <ArrowLeft className="w-3 h-3" /> PREVIOUS
              </span>
              <h4 className="font-serif text-xl text-foreground group-hover:text-[#8c1c1c] transition-colors">
                {prevArtwork.title}{prevArtwork.year ? `, ${prevArtwork.year}` : ""}
              </h4>
            </div>
          </Link>

          <Link href={`/gallery/${nextArtwork.id}`}>
            <div className="group cursor-pointer text-right">
              <span className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 group-hover:text-primary transition-colors">
                NEXT <ArrowRight className="w-3 h-3" />
              </span>
              <h4 className="font-serif text-xl text-foreground group-hover:text-[#8c1c1c] transition-colors">
                {nextArtwork.title}{nextArtwork.year ? `, ${nextArtwork.year}` : ""}
              </h4>
            </div>
          </Link>
        </div>
      </div>

      {/* Lightbox with Zoom */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
            onWheel={handleLightboxWheel}
          >
            <button 
              onClick={() => {
                setLightboxOpen(false);
                setLightboxScale(1);
                setLightboxPosition({ x: 0, y: 0 });
              }}
              className="absolute top-12 right-12 text-foreground hover:text-[#8c1c1c] transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Lightbox Zoom Controls */}
            <div className="absolute top-12 left-12 z-10 flex gap-2">
              {lightboxScale > 1 && (
                <button
                  onClick={() => {
                    setLightboxScale(1);
                    setLightboxPosition({ x: 0, y: 0 });
                  }}
                  className="p-2 bg-background/80 backdrop-blur-sm rounded-md hover:bg-[#8c1c1c] hover:text-white transition-all duration-300"
                  title="Reset zoom"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setLightboxScale(Math.min(lightboxScale + 0.5, 4))}
                className="p-2 bg-background/80 backdrop-blur-sm rounded-md hover:bg-[#8c1c1c] hover:text-white transition-all duration-300"
                title="Zoom in (Ctrl + scroll)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if (lightboxScale > 1) {
                    setLightboxScale(Math.max(lightboxScale - 0.5, 1));
                    if (lightboxScale - 0.5 <= 1) {
                      setLightboxPosition({ x: 0, y: 0 });
                    }
                  }
                }}
                className="p-2 bg-background/80 backdrop-blur-sm rounded-md hover:bg-[#8c1c1c] hover:text-white transition-all duration-300"
                title="Zoom out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative max-w-full max-h-full"
              onContextMenu={(e) => e.preventDefault()}
              style={{
                transform: `scale(${lightboxScale})`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <img
                src={lightboxImage || artwork.image}
                alt={artwork.title}
                className="max-w-full max-h-[90vh] object-contain shadow-2xl select-none pointer-events-none"
              />
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <span
                  className="font-serif italic text-4xl md:text-6xl text-white/55 rotate-[-28deg] tracking-wider whitespace-nowrap mix-blend-overlay"
                  style={{ textShadow: "0 2px 6px rgba(0,0,0,0.55)" }}
                >
                  @Mikiyas Assefa
                </span>
              </div>
            </div>
            
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>
  );
}

function DetailRow({ label, value, isBold = false }: { label: string; value: string; isBold?: boolean }) {
  return (
    <div className="flex justify-between items-baseline border-b border-border/40 pb-2">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <span className={`text-sm tracking-wide ${isBold ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>{value}</span>
    </div>
  );
}