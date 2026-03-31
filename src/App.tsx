import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { TutorApplicationPage } from './components/TutorApplicationPage';

const PageLoader = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400" />
  </div>
);

function AppContent() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <div className="min-h-screen bg-white">
          {/* Minimal nav bar */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E5EA]/50">
            <div className="max-w-2xl mx-auto px-6 h-24 flex items-center justify-between">
              <a href="https://alumnitutoring.com">
                <img src="/alumni-tutoring-logo-color.webp" alt="Alumni Tutoring" className="h-20" />
              </a>
              <a href="https://alumnitutoring.com" className="text-[13px] text-[#86868B] hover:text-[#1D1D1F] transition-colors">
                Back to site
              </a>
            </div>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<TutorApplicationPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Suspense>
      <Toaster />
      <Sonner />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <TooltipProvider>
        <Router>
          <AppContent />
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  );
}
