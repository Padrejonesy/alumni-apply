import { useEffect } from 'react';

export function AboutPage() {
  useEffect(() => {
    document.title = "About | Alumni Tutoring";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Our tutors graduated from the same high schools they tutor at — they know the curriculum, the teachers, and exactly what it takes to succeed.');
  }, []);

  return (
    <div className="bg-white">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-6 pt-40 pb-8">
        <h1 className="text-[36px] md:text-[52px] font-serif font-bold text-[#1D1D1F] leading-[1.1] tracking-[-0.02em]">
          Tutoring from someone
          <br />
          who's been there.
        </h1>
      </div>

      {/* Core idea — one clear statement */}
      <div className="max-w-xl mx-auto px-6 mt-16">
        <p className="text-[18px] md:text-[20px] text-[#1D1D1F] leading-[1.7] text-center">
          Our tutors graduated from the same high schools they tutor at. They know the curriculum, the teachers, and exactly what it takes to get in where your kid wants to go.
        </p>
      </div>

      {/* Three pillars */}
      <div className="max-w-4xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <p className="text-[32px] md:text-[40px] font-serif font-bold text-[#1D1D1F] leading-none">Same school.</p>
            <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
              Your tutor walked the same halls, had the same teachers, and took the same tests your student is facing right now.
            </p>
          </div>
          <div>
            <p className="text-[32px] md:text-[40px] font-serif font-bold text-[#1D1D1F] leading-none">Fully online.</p>
            <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
              Every session happens over video — flexible scheduling that fits your family's life, not the other way around.
            </p>
          </div>
          <div>
            <p className="text-[32px] md:text-[40px] font-serif font-bold text-[#1D1D1F] leading-none">Real results.</p>
            <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
              Personalized instruction tailored to your student's exact courses, learning style, and goals.
            </p>
          </div>
        </div>
      </div>

      {/* Giving Back */}
      <div className="max-w-xl mx-auto px-6 mt-32 text-center">
        <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium">
          {'//'} Community {'\\\\'}
        </p>
        <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#1D1D1F] mt-3 leading-tight">
          Giving back to the schools that made us.
        </h2>
        <p className="text-[17px] text-[#86868B] mt-5 leading-relaxed">
          We've donated to dozens of PTAs across the country. Want us to support your school? Reach out at{" "}
          <a
            href="mailto:info@alumnitutoring.com"
            className="text-[#1D1D1F] underline underline-offset-4 decoration-[#D1D1D6] hover:decoration-[#1D1D1F] transition-colors"
          >
            info@alumnitutoring.com
          </a>
        </p>
      </div>

      {/* CTA */}
      <div className="text-center mt-32 pb-32">
        <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#1D1D1F] leading-tight">
          Ready to get started?
        </h2>
        <div className="mt-8 inline-flex rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5">
          <a
            href="https://calendly.com/tutoringalumni/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 inline-flex items-center"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <span className="relative z-10">Book a Free Consultation</span>
          </a>
        </div>
      </div>

    </div>
  );
}
