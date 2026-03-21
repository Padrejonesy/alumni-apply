import { ArrowUpRight } from 'lucide-react';

export function ServiceProcessSlideshow() {
  const steps = [
    {
      num: '01',
      title: 'Schedule a Consultation',
      desc: 'Connect with a specialist who will listen to your goals and outline the best next steps.',
    },
    {
      num: '02',
      title: 'Get Matched',
      desc: 'We pair your student with an alumni tutor from their own high school who excels in their subject.',
    },
    {
      num: '03',
      title: 'Start Improving',
      desc: 'Begin personalized 1-on-1 sessions and watch confidence, grades, and testing scores grow.',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium text-center">
        HOW IT WORKS
      </p>
      <h2 className="text-[34px] md:text-[44px] font-serif font-bold text-[#1D1D1F] text-center mt-3 leading-tight">
        Three steps to better grades.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {steps.map((s) => (
          <div key={s.num} className="text-center md:text-left">
            <p className="text-[28px] font-serif font-bold text-[#D1D1D6] leading-none">{s.num}</p>
            <h3 className="text-[17px] font-serif font-bold text-[#1D1D1F] mt-3">{s.title}</h3>
            <p className="text-[14px] text-[#86868B] mt-2 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <div className="rounded-full bg-[#F0F0F5]/60 backdrop-blur-sm border border-[#D1D1D6]/50 shadow-[0_1px_12px_rgba(0,0,0,0.04)] p-1.5 inline-flex">
          <a
            href="https://calendly.com/tutoringalumni/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-[#0A1628] text-white rounded-full h-11 px-7 text-[15px] font-medium shadow-[0_2px_12px_rgba(10,22,40,0.3)] hover:bg-[#0D1D33] transition-all duration-200 flex items-center gap-2"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
            <span className="relative z-10">Get Started</span>
            <ArrowUpRight className="relative z-10 w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
