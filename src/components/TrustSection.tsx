export function TrustSection() {
  return (
    <section className="relative bg-white py-32">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-[11px] md:text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium text-center whitespace-nowrap">
          // OUR TUTORS ARE EXCEPTIONALLY QUALIFIED \\
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mt-12">
          {[
            { value: '4.0', label: 'Average GPA' },
            { value: '1550', label: 'Average SAT' },
            { value: '35', label: 'Average ACT' },
            { value: '8', label: 'AP 5s per Tutor' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/40 backdrop-blur-xl border border-[#E5E5EA]/50 rounded-[20px] p-8 md:p-10 text-center"
            >
              <p className="text-[48px] md:text-[64px] font-serif font-bold text-[#1D1D1F] leading-none">{stat.value}</p>
              <p className="text-[14px] text-[#86868B] font-normal mt-3 whitespace-nowrap">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
