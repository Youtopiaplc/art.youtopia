import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export function ImageWithSkeleton({ src, alt, className, wrapperClassName, ...props }: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName || ""}`}>
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} ${className || ""}`}
        onLoad={() => setIsLoaded(true)}
        onContextMenu={(e) => e.preventDefault()}
        {...props}
      />
    </div>
  );
}
