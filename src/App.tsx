
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookingStep1 from "./pages/BookingStep1";
import BookingStep2 from "./pages/BookingStep2";
import BookingStep3 from "./pages/BookingStep3";
import BookingSuccess from "./pages/BookingSuccess";
import DiscoverMore from "./pages/DiscoverMore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover-more" element={<DiscoverMore />} />
          <Route path="/book/step-1" element={<BookingStep1 />} />
          <Route path="/book/step-2" element={<BookingStep2 />} />
          <Route path="/book/step-3" element={<BookingStep3 />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
