import { useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { TrustSection } from './TrustSection';
import { ServicesSection } from './ServicesSection';
import { ServiceProcessSlideshow } from './ServiceProcessSlideshow';
import { TestimonialsSection } from './TestimonialsSection';
import { FAQSection } from './FAQSection';

export function HomePage() {
  useEffect(() => {
    document.title = "Alumni Tutoring - Expert Academic Tutoring from Your School's Top Alumni";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Alumni Tutoring connects students with elite graduates from their own high school. 550+ families trust our tutors for personalized academic support and SAT/ACT prep.');
  }, []);

  return (
    <>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ServiceProcessSlideshow />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
