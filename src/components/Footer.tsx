import { useNavigate } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F7] border-t border-[#E5E5EA]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1 — Brand */}
          <div>
            <img src="/alumni-tutoring-logo.webp" alt="Alumni Tutoring" className="h-10 w-auto" />
            <p className="text-[14px] text-[#86868B] leading-relaxed max-w-[240px] mt-4">
              Connecting students with elite university alumni for personalized academic excellence.
            </p>
          </div>

          {/* Column 2 — Company */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#86868B] font-medium mb-4">Company</p>
            <button onClick={() => { navigate('/about'); window.scrollTo(0, 0); }} className="text-[14px] text-[#1D1D1F] hover:text-[#86868B] transition-colors block mb-2.5 text-left">
              About
            </button>
            <a href="https://www.google.com/search?sca_esv=a034994e941f7d25&rlz=1C1UEAD_enUS1125US1125&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOZRt1LyXxhRegYiOos3842k6D19aXB75IfORbU8NJgLADUQ4-hPYuBSmuHVsLeccL8YHYI__Nd_YAN8IiXwgZPoGnXPN&q=Alumni+Tutoring+Reviews&sa=X&ved=2ahUKEwieiMfc2PiSAxUB7TgGHQTqKP8Q0bkNegQIJRAF&biw=1536&bih=730&dpr=1.25" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#1D1D1F] hover:text-[#86868B] transition-colors block mb-2.5">
              Testimonials
            </a>
            <a href="mailto:info@alumnitutoring.com" className="text-[14px] text-[#1D1D1F] hover:text-[#86868B] transition-colors block mb-2.5">
              Contact
            </a>
            <button onClick={() => { navigate('/tutorapplication'); window.scrollTo(0, 0); }} className="text-[14px] text-[#1D1D1F] hover:text-[#86868B] transition-colors block mb-2.5 text-left">Apply to Tutor</button>
          </div>

          {/* Column 3 — Services */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#86868B] font-medium mb-4">Services</p>
            <button onClick={() => navigate('/alumnitutors')} className="text-[14px] text-[#1D1D1F] hover:text-[#86868B] transition-colors block mb-2.5 text-left">
              Meet Your Alumni
            </button>
            <button onClick={() => {navigate('/testprep');window.scrollTo(0, 0);}} className="text-[14px] text-[#1D1D1F] hover:text-[#86868B] transition-colors block mb-2.5 text-left">
              SAT & ACT Prep
            </button>
            <button onClick={() => { navigate('/portal'); window.scrollTo(0, 0); }} className="text-[14px] text-[#1D1D1F] hover:text-[#86868B] transition-colors block mb-2.5 text-left">Student Portal</button>

          </div>

          {/* Column 4 — Get in Touch */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.1em] text-[#86868B] font-medium mb-4">Get in Touch</p>
            <p className="text-[14px] text-[#86868B] leading-relaxed">
              Ready to get started?
            </p>
            <a
              href="https://calendly.com/tutoringalumni/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-[#1D1D1F] underline underline-offset-4 decoration-[#D1D1D6] hover:decoration-[#1D1D1F] transition-colors mt-3 inline-block">

              Schedule a consultation →
            </a>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="border-t border-[#E5E5EA] mt-12 pt-6 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <span className="text-[12px] text-[#AEAEB2]">© {currentYear} Alumni Tutoring LLC. All rights reserved.</span>
            <span className="text-[12px] text-[#AEAEB2]">
              <a href="#" className="hover:text-[#86868B] transition-colors">Privacy Policy</a>
              {' · '}
              <a href="#" className="hover:text-[#86868B] transition-colors">Terms of Service</a>
            </span>
          </div>
          <p className="text-[11px] text-[#AEAEB2] leading-relaxed text-center max-w-3xl mx-auto mt-4">
            We are not affiliated with any school, but we are entirely run and operated by alumni from the schools our tutors attended. Alumni Tutoring LLC operates independently and is not endorsed by or associated with any educational institution.
          </p>
          <p className="text-[11px] text-[#AEAEB2] leading-relaxed text-center max-w-3xl mx-auto mt-2">
            All high school logos displayed on this website are the intellectual property of Alumni Tutoring LLC. All college and university logos belong to their respective institutions and are not the intellectual property of Alumni Tutoring LLC.
          </p>
        </div>
      </div>
    </footer>);

}