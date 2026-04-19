import React from "react";
import { render, screen } from "@testing-library/react";
import App from "@/App";
import { renderWithRouter } from "./test-utils";
import { AboutPage } from "@/components/AboutPage";
import { AlumniPage } from "@/components/AlumniPage";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HomePage } from "@/components/HomePage";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Navigation } from "@/components/Navigation";
import { PDFViewer } from "@/components/PDFViewer";
import { PerformanceCharts } from "@/components/PerformanceCharts";
import { PortalGatewayPage } from "@/components/PortalGatewayPage";
import { QuizComponent } from "@/components/QuizComponent";
import { SATPage } from "@/components/SATPage";
import { ServiceProcessSlideshow } from "@/components/ServiceProcessSlideshow";
import { ServicesSection } from "@/components/ServicesSection";
import { SplashScreen } from "@/components/SplashScreen";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TrustSection } from "@/components/TrustSection";
import { TutorApplicationPage } from "@/components/TutorApplicationPage";
import { TutorDirectory } from "@/components/TutorDirectory";
import { TutorOnboardingPolicy } from "@/components/TutorOnboardingPolicy";
import { TutorProfilePage } from "@/components/TutorProfilePage";
import UrgentPill from "@/components/UrgentPill";
import { VaultPage } from "@/components/VaultPage";
import { ViewOnlyPDFViewer } from "@/components/ViewOnlyPDFViewer";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

describe("app smoke coverage", () => {
  it("renders App without breaking the entry flow", () => {
    vi.useFakeTimers();
    render(<App />);
    vi.runAllTimers();
    expect(screen.getByText(/become a tutor/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  const smokeCases: Array<{ name: string; renderCase: () => ReturnType<typeof render> }> = [
    { name: "AboutPage", renderCase: () => renderWithRouter(<AboutPage />) },
    { name: "AlumniPage", renderCase: () => renderWithRouter(<AlumniPage />) },
    { name: "FAQSection", renderCase: () => render(<FAQSection />) },
    { name: "Footer", renderCase: () => renderWithRouter(<Footer />) },
    { name: "HeroSection", renderCase: () => renderWithRouter(<HeroSection />) },
    { name: "HomePage", renderCase: () => renderWithRouter(<HomePage />) },
    { name: "MobileBottomNav", renderCase: () => renderWithRouter(<MobileBottomNav />) },
    { name: "Navigation", renderCase: () => renderWithRouter(<Navigation />) },
    { name: "PDFViewer", renderCase: () => render(<PDFViewer title="Test PDF" />) },
    { name: "PerformanceCharts", renderCase: () => render(<PerformanceCharts />) },
    { name: "PortalGatewayPage", renderCase: () => renderWithRouter(<PortalGatewayPage />) },
    { name: "QuizComponent", renderCase: () => render(<QuizComponent onClose={vi.fn()} />) },
    { name: "SATPage", renderCase: () => renderWithRouter(<SATPage />) },
    { name: "ServiceProcessSlideshow", renderCase: () => render(<ServiceProcessSlideshow />) },
    { name: "ServicesSection", renderCase: () => renderWithRouter(<ServicesSection />) },
    { name: "SplashScreen", renderCase: () => render(<SplashScreen onComplete={vi.fn()} />) },
    { name: "TestimonialsSection", renderCase: () => render(<TestimonialsSection />) },
    { name: "TrustSection", renderCase: () => render(<TrustSection />) },
    { name: "TutorApplicationPage", renderCase: () => renderWithRouter(<TutorApplicationPage />) },
    {
      name: "TutorDirectory",
      renderCase: () => renderWithRouter(<TutorDirectory />, { route: "/alumnitutors", path: "/alumnitutors/:schoolSlug?" }),
    },
    {
      name: "TutorOnboardingPolicy",
      renderCase: () => render(<TutorOnboardingPolicy tutorName="Alex Tutor" onSign={vi.fn()} />),
    },
    {
      name: "TutorProfilePage",
      renderCase: () =>
        renderWithRouter(<TutorProfilePage />, {
          route: "/alumnitutors/test-school/test-tutor",
          path: "/alumnitutors/:schoolSlug/:tutorSlug",
        }),
    },
    { name: "UrgentPill", renderCase: () => render(<UrgentPill />) },
    { name: "VaultPage", renderCase: () => renderWithRouter(<VaultPage />) },
    { name: "ViewOnlyPDFViewer", renderCase: () => render(<ViewOnlyPDFViewer title="Read Only PDF" />) },
    { name: "Index page", renderCase: () => renderWithRouter(<Index />) },
    { name: "NotFound page", renderCase: () => renderWithRouter(<NotFound />, { route: "/missing", path: "*" }) },
  ];

  it.each(smokeCases)("$name renders without crashing", ({ renderCase }) => {
    const { container } = renderCase();
    expect(container).toBeTruthy();
  });
});
