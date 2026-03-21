import { useNavigate } from 'react-router-dom';

const services = [
  {
    num: '01',
    title: 'General Subject Mastery',
    desc: 'Build a strong academic foundation across math, science, history, English, and more — from middle school through high school.',
    link: '/alumnitutors',
  },
  {
    num: '02',
    title: 'AP Course Mastery',
    desc: 'Excel in every AP course with focused, advanced-level tutoring from tutors who earned perfect 5s themselves.',
    link: '/alumnitutors',
  },
  {
    num: '03',
    title: 'Expert SAT & ACT Prep',
    desc: 'Strategic, results-driven test preparation guided by tutors who specialize in test-taking techniques.',
    link: '/testprep',
  },
  {
    num: '04',
    title: 'College Advisory',
    desc: 'Navigate admissions with expert guidance — from crafting standout supplements to pacing the entire process.',
    link: 'https://calendly.com/tutoringalumni/consultation',
  },
];

export function ServicesSection() {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="relative bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.1em] text-[#86868B] font-medium text-center">
          WHAT WE DO
        </p>
        <h2 className="text-[34px] md:text-[44px] font-serif font-bold text-[#1D1D1F] text-center mt-3 leading-tight">
          Four ways we help students excel.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
          {services.map((s) => (
            <div
              key={s.num}
              onClick={() => handleClick(s.link)}
              className="bg-[#F5F5F7] rounded-2xl p-8 hover:bg-[#EDEDF0] transition-all duration-300 cursor-pointer"
            >
              <p className="text-[13px] font-medium text-[#86868B] uppercase tracking-wide">{s.num}</p>
              <h3 className="text-[20px] font-serif font-bold text-[#1D1D1F] mt-3">{s.title}</h3>
              <p className="text-[15px] text-[#86868B] mt-3 leading-relaxed">{s.desc}</p>
              <p className="text-[14px] font-medium text-[#1D1D1F] mt-4">Learn more <span className="ml-0.5">→</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
