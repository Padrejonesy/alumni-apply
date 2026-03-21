export function PerformanceCharts() {
  const improvementsByLevel = [
    { range: '1100 and below', act: '26 and below', sat: '+288 pts', actPts: '+4.3 pts' },
    { range: '1100–1300', act: '26–28', sat: '+168 pts', actPts: '+3.7 pts' },
    { range: '1200–1300', act: '28–30', sat: '+156 pts', actPts: '+3.3 pts' },
    { range: '1300–1400', act: '30–32', sat: '+133 pts', actPts: '+2.9 pts' },
    { range: '1400–1500+', act: '32–34', sat: '+85 pts', actPts: '+1.2 pts' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* Big stat */}
      <div className="text-center my-12">
        <p className="text-[36px] md:text-[56px] lg:text-[72px] font-serif font-bold text-[#1D1D1F] leading-none">
          250<span className="text-[#86868B] font-normal">+</span> Students Improved
        </p>
      </div>

      {/* Table */}
      <div className="border border-[#E5E5EA] rounded-[12px] overflow-hidden">
        {/* Header */}
        <div className="bg-[#F5F5F7] px-3 md:px-6 py-3 grid grid-cols-3 gap-4">
          <p className="text-[13px] font-medium text-[#86868B] uppercase tracking-wide">Original Score</p>
          <p className="text-[13px] font-medium text-[#86868B] uppercase tracking-wide text-right">SAT Improvement</p>
          <p className="text-[13px] font-medium text-[#86868B] uppercase tracking-wide text-right">ACT Improvement</p>
        </div>

        {/* Rows */}
        {improvementsByLevel.map((level, index) => (
          <div
            key={index}
            className={`px-3 md:px-6 py-4 grid grid-cols-3 gap-4 items-center ${index % 2 === 1 ? 'bg-[#FAFAFA]' : 'bg-white'}`}
          >
            <div>
              <p className="text-[15px] text-[#1D1D1F]">{level.range}</p>
              <p className="text-[13px] text-[#86868B]">{level.act}</p>
            </div>
            <p className="text-[14px] font-medium text-[#1D1D1F] text-right">{level.sat}</p>
            <p className="text-[14px] font-medium text-[#1D1D1F] text-right">{level.actPts}</p>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-[#AEAEB2] text-center mt-4">
        Average improvement: SAT 160+ pts · ACT 3.5+ pts
      </p>
    </div>
  );
}