import { useEffect } from 'react';

export function PortalGatewayPage() {
  useEffect(() => {
    document.title = "Student Portal | Alumni Tutoring";
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Access your SAT & ACT testing portal or connect with your subject tutor through the Alumni Tutoring student portal.');
  }, []);

  return (
    <div className="bg-white">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center px-6 pt-32 pb-4">
        <h1 className="text-[36px] md:text-[48px] font-serif font-bold text-[#1D1D1F] leading-tight">
          Student Portal
        </h1>
        <p className="text-[17px] text-[#86868B] mt-4 max-w-md mx-auto leading-relaxed">
          Select the portal that matches your program.
        </p>
      </div>

      {/* Portal Cards */}
      <section className="mt-12 pb-32">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* SAT & ACT Testing Portal */}
          <a
            href="https://alumnitutoring.practicetest.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <div>
              <p className="text-[13px] uppercase tracking-[0.08em] text-[#86868B] font-medium">
                SAT & ACT
              </p>
              <h2 className="text-[22px] font-serif font-bold text-[#1D1D1F] mt-2 tracking-[-0.02em]">
                Testing Portal
              </h2>
              <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
                Full-length practice exams, score reports, and progress tracking.
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-flex items-center gap-2 text-[15px] font-medium text-[#1D1D1F] group-hover:text-black transition-colors duration-200">
                Open
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>

          {/* Subject & AP Tutoring Portal */}
          <a
            href="https://portal.alumnitutoring.com/login"
            className="group rounded-2xl border border-[#E5E5EA] bg-[#F5F5F7] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <div>
              <p className="text-[13px] uppercase tracking-[0.08em] text-[#86868B] font-medium">
                Subject & AP
              </p>
              <h2 className="text-[22px] font-serif font-bold text-[#1D1D1F] mt-2 tracking-[-0.02em]">
                Tutoring Portal
              </h2>
              <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">
                Schedule sessions, message your tutor, and access learning materials.
              </p>
            </div>
            <div className="mt-8">
              <span className="inline-flex items-center gap-2 text-[15px] font-medium text-[#1D1D1F] group-hover:text-black transition-colors duration-200">
                Open
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </a>

        </div>
      </section>

    </div>
  );
}
