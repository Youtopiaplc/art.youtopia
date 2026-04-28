import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex w-full items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6 text-muted-foreground">
          <AlertCircle size={48} strokeWidth={1} />
        </div>
        <h1 className="font-serif text-4xl font-medium text-foreground mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you are looking for has been moved or no longer exists.
        </p>
        <Link href="/">
          <span className="inline-block border border-foreground text-foreground px-8 py-3 text-sm tracking-widest uppercase cursor-pointer hover:bg-foreground hover:text-background transition-colors">
            Return to Gallery
          </span>
        </Link>
      </div>
    </div>
  );
}
