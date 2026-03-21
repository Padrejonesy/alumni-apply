import { Dialog, DialogContent } from './ui/dialog';
import { useState, useEffect } from 'react';
import { PerformanceCharts } from './PerformanceCharts';
import { X } from 'lucide-react';
import { Button } from './ui/button';

export function SATPage() {
  useEffect(() => {
    document.title = "SAT & ACT Test Prep | Alumni Tutoring";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Full-length practice SATs and ACTs with detailed score reports and 1-on-1 review from a tutor who aced the exam at your high school. Average improvement: 160+ SAT points.');
  }, []);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <div className="bg-white">

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center px-6 pt-40">
        <h1 className="text-[40px] md:text-[56px] font-serif font-bold text-[#1D1D1F] leading-[1.08] tracking-[-0.02em]">
          The test prep program
          <br />
          your kid won't dread.
        </h1>
        <p className="text-[18px] md:text-[20px] text-[#86868B] mt-6 max-w-xl mx-auto leading-relaxed">
          Full-length practice SATs and ACTs. Detailed score reports. 1-on-1 review with a tutor who aced the same exam at your kid's school.
        </p>
        <div className="mt-10 inline-flex rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5">
          <a
            href="https://calendly.com/tutoringalumni/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 inline-flex items-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <span className="relative z-10">Schedule a Consultation</span>
          </a>
        </div>
      </div>

      {/* Big proof numbers */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 mt-32">
        <div className="text-center">
          <p className="text-[72px] md:text-[96px] font-serif font-bold text-[#1D1D1F] leading-none">
            160<span className="text-[#D1D1D6]">+</span>
          </p>
          <p className="text-[17px] text-[#86868B] mt-3">avg. SAT improvement</p>
        </div>
        <div className="w-px h-20 bg-[#E5E5EA] hidden md:block" />
        <div className="text-center">
          <p className="text-[72px] md:text-[96px] font-serif font-bold text-[#1D1D1F] leading-none">
            3.5<span className="text-[#D1D1D6]">+</span>
          </p>
          <p className="text-[17px] text-[#86868B] mt-3">avg. ACT improvement</p>
        </div>
      </div>

      {/* Three differentiators */}
      <div className="max-w-4xl mx-auto px-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          <div className="text-center">
            <p className="text-[36px] md:text-[40px] font-serif font-bold text-[#1D1D1F] leading-[1.1]">Free tests.</p>
            <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
              Every student gets full-length practice SATs and ACTs at no extra cost. Real questions, real conditions.
            </p>
          </div>
          <div className="text-center">
            <p className="text-[36px] md:text-[40px] font-serif font-bold text-[#1D1D1F] leading-[1.1]">Real data.</p>
            <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
              Question-by-question breakdowns, category analysis, and time tracking after every test.
            </p>
          </div>
          <div className="text-center">
            <p className="text-[36px] md:text-[40px] font-serif font-bold text-[#1D1D1F] leading-[1.1] whitespace-nowrap">Expert review.</p>
            <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
              1-on-1 sessions with an alumni tutor who scored in the 99th percentile — from your high school.
            </p>
          </div>
        </div>
      </div>

      {/* Product showcase — Testing Portal */}
      <div className="max-w-5xl mx-auto px-6 mt-40">
        <div className="text-center mb-12">
          <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium">
            {'//'} The Portal {'\\\\'}
          </p>
          <h2 className="text-[28px] md:text-[40px] font-serif font-bold text-[#1D1D1F] mt-3 leading-tight">
            Built for test day.
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden border border-[#E5E5EA] cursor-pointer shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          onClick={() => setFullscreenImage('/lovable-uploads/c59892a3-ad25-4a31-a2e1-a99ab7e10d29.webp')}
        >
          <img
            src="/lovable-uploads/c59892a3-ad25-4a31-a2e1-a99ab7e10d29.webp"
            alt="Alumni Tutoring Testing Portal — realistic SAT practice interface"
            className="w-full h-auto"
          />
        </div>
        <p className="text-[15px] text-[#86868B] text-center mt-6 max-w-lg mx-auto leading-relaxed">
          Our testing portal simulates the exact digital SAT and ACT experience — timed modules, real released questions, and the same interface your student will see on test day.
        </p>
      </div>

      {/* Product showcase — Score Reports */}
      <div className="max-w-5xl mx-auto px-6 mt-32">
        <div className="text-center mb-12">
          <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium">
            {'//'} Score Reports {'\\\\'}
          </p>
          <h2 className="text-[28px] md:text-[40px] font-serif font-bold text-[#1D1D1F] mt-3 leading-tight">
            Know exactly where to improve.
          </h2>
        </div>

        <div
          className="rounded-2xl overflow-hidden border border-[#E5E5EA] cursor-pointer shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          onClick={() => setFullscreenImage('/lovable-uploads/51467fa4-a90c-467a-b312-ba728898a4d3.webp')}
        >
          <img
            src="/lovable-uploads/51467fa4-a90c-467a-b312-ba728898a4d3.webp"
            alt="Detailed score report with category breakdowns and time analysis"
            className="w-full h-auto"
          />
        </div>
        <p className="text-[15px] text-[#86868B] text-center mt-6 max-w-lg mx-auto leading-relaxed">
          Every practice test generates a detailed report — raw scores, category breakdowns, time per question. Your tutor uses this data to target exactly what needs work.
        </p>
        <div className="text-center mt-6">
          <a
            href="/sample-sat-score-report.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-medium text-[#1D1D1F] underline underline-offset-4 decoration-[#D1D1D6] hover:decoration-[#1D1D1F] transition-colors"
          >
            View a sample report →
          </a>
        </div>
      </div>

      {/* Results */}
      <div className="mt-40">
        <div className="text-center">
          <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium">
            {'//'} Results {'\\\\'}
          </p>
          <h2 className="text-[28px] md:text-[40px] font-serif font-bold text-[#1D1D1F] mt-3 leading-tight">
            The numbers speak.
          </h2>
        </div>
        <PerformanceCharts />
      </div>

      {/* Testimonial */}
      <div className="max-w-2xl mx-auto px-6 mt-32 text-center">
        <p className="text-[22px] md:text-[28px] font-serif italic text-[#1D1D1F] leading-[1.5]">
          "Our daughter improved 210 points in 8 weeks. She actually looked forward to her review sessions — which is saying a lot for SAT prep."
        </p>
        <p className="text-[15px] text-[#86868B] mt-6">Stacy L., parent of a rising senior</p>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-32 pb-32">
        <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#1D1D1F] leading-tight">
          Better scores start here.
        </h2>
        <div className="mt-8 inline-flex rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5">
          <a
            href="https://calendly.com/tutoringalumni/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 inline-flex items-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <span className="relative z-10">Schedule a Consultation</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Image Dialog */}
      <Dialog open={!!fullscreenImage} onOpenChange={() => setFullscreenImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10 text-white hover:bg-white/20" onClick={() => setFullscreenImage(null)}>
              <X className="w-6 h-6" />
            </Button>
            {fullscreenImage && <img src={fullscreenImage} alt="Fullscreen view" className="max-w-full max-h-full object-contain" />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
