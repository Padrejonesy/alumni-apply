import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, external?: boolean) => {
    if (external) {
      window.location.href = path;
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/': case '/home': return 'home';
      case '/about': return 'about';
      case '/testprep': return 'sat';
      case '/alumnitutors': return 'alumni';
      case '/vault': return 'vault';
      default: return 'home';
    }
  };

  const currentPage = getCurrentPage();

  const navLinks: { label: string; path: string; key: string; external?: boolean }[] = [
    { label: 'Alumni Tutors', path: '/alumnitutors', key: 'alumni' },
    { label: 'SAT & ACT', path: '/testprep', key: 'sat' },
    { label: 'About', path: '/about', key: 'about' },
    { label: 'Portal', path: '/portal', key: 'portal' },
    { label: 'Apply to Tutor', path: '/tutorapplication', key: 'apply' },
  ];

  const allMobileLinks: { label: string; path: string; key: string; external?: boolean }[] = [
    { label: 'Home', path: '/', key: 'home' },
    ...navLinks,
  ];

  return (
    <>
      {/* Backdrop when mobile menu open */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)} />
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4">
        <div className="max-w-3xl lg:max-w-4xl mx-auto">
          <div
            className={`backdrop-blur-xl transition-all duration-200 ease-out ${
              isMenuOpen
                ? 'bg-white/50 rounded-[20px] border-2 border-[#C8C8CD] shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
                : 'bg-white/50 rounded-full border-2 border-[#C8C8CD] shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
            }`}
          >
          {/* Top bar: logo + desktop links + hamburger */}
          <div className="px-4 md:px-6 py-2.5 flex items-center justify-between gap-2">
            {/* Logo */}
            <button onClick={() => handleNavigation('/')} className="flex-shrink-0 pl-1">
              <img src="/alumni-tutoring-logo.webp" alt="Alumni Tutoring" className="h-[40px] lg:h-[44px] w-auto object-contain -mt-[2%] -ml-[10%]" />
            </button>

            {/* Desktop center links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavigation(link.path, link.external)}
                  className={`text-[14px] font-medium px-4 py-2 rounded-full transition-colors duration-150 ${
                    currentPage === link.key
                      ? 'text-[#1D1D1F] bg-[#F5F5F7]'
                      : 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop right: CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="border-2 border-[#D1D1D6] bg-white/40 rounded-full p-1">
                <button
                  onClick={() => window.open('https://calendly.com/tutoringalumni/consultation', '_blank')}
                  className="bg-[#0A1628] text-white rounded-full px-5 py-1.5 text-[13px] font-medium hover:bg-[#0D1D33] transition-colors duration-150"
                >
                  Get in touch
                </button>
              </div>
            </div>

            {/* Mobile: hamburger/X */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 mr-[-6px] rounded-full text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors duration-150 cursor-pointer"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile expanded menu — inside the same container */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-200 ease-out ${
              isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-5 pb-4">
              {allMobileLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavigation(link.path, link.external)}
                  className={`block w-full text-left px-4 py-3.5 text-[15px] text-[#1D1D1F] rounded-[10px] transition-colors duration-200 ${
                    currentPage === link.key
                      ? 'bg-[#F5F5F7] font-semibold'
                      : 'font-medium hover:bg-[#F5F5F7]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-3 pt-4 border-t border-[#E5E5EA]/50 mb-1">
                <div className="border-2 border-[#D1D1D6] bg-white/40 rounded-full p-1">
                  <button
                    onClick={() => {
                      window.open('https://calendly.com/tutoringalumni/consultation', '_blank');
                      setIsMenuOpen(false);
                    }}
                    className="bg-[#0A1628] text-white rounded-full w-full py-3 text-[15px] font-medium hover:bg-[#0D1D33] transition-colors duration-150"
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </nav>
    </>
  );
}
