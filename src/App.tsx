import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import ArtworkDetail from "@/pages/ArtworkDetail";
import Contact from "@/pages/Contact";
import AdminPanel from "@/pages/AdminPanel";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/gallery/:id" component={ArtworkDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/studio-private" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;