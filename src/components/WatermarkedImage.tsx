import { ImageWithSkeleton } from "@/components/ui/ImageWithSkeleton";

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  watermarkSize?: "sm" | "md" | "lg";
}

export function WatermarkedImage({
  src,
  alt,
  className,
  wrapperClassName,
  loading = "lazy",
  decoding = "async",
  watermarkSize = "md",
}: WatermarkedImageProps) {
  const sizeClass =
    watermarkSize === "lg"
      ? "text-2xl md:text-4xl"
      : watermarkSize === "sm"
      ? "text-xs md:text-sm"
      : "text-base md:text-xl";

  return (
    <div
      className={`relative ${wrapperClassName || ""}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <ImageWithSkeleton
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={`${className || ""} select-none pointer-events-none`}
        wrapperClassName="w-full h-full"
      />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <span
          className={`font-serif italic ${sizeClass} text-white/50 rotate-[-28deg] tracking-wider whitespace-nowrap mix-blend-overlay drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]`}
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          @Mikiyas Assefa
        </span>
      </div>
    </div>
  );
}
