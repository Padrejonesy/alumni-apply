import { Home, Users, GraduationCap, Vault } from 'lucide-react';
import { LazyMotion, domAnimation, m as motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export function MobileBottomNav() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isMobile) {
    return null;
  }

  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/':
      case '/home':
        return 'home';
      case '/about':
        return 'about';
      case '/testprep':
        return 'sat';
      case '/alumnitutors':
        return 'alumni';
      case '/vault':
        return 'vault';
      default:
        return 'home';
    }
  };

  const currentPage = getCurrentPage();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border"
    >
      <div className="flex items-center justify-around py-2 px-4 safe-area-inset-bottom">
        
        {/* Home Button */}
        <motion.button 
          whileTap={{ scale: 0.95 }} 
          onClick={() => handleNavigation('/')} 
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            currentPage === 'home' ? 'text-gold-600 bg-gold-50' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Home size={20} fill={currentPage === 'home' ? 'currentColor' : 'none'} />
          <span className="text-xs font-medium">Home</span>
        </motion.button>

        {/* Alumni Tutors Button */}
        <motion.button 
          whileTap={{ scale: 0.95 }} 
          onClick={() => handleNavigation('/alumnitutors')} 
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            currentPage === 'alumni' ? 'text-gold-600 bg-gold-50' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users size={20} fill={currentPage === 'alumni' ? 'currentColor' : 'none'} />
          <span className="text-xs font-medium">Alumni Tutors</span>
        </motion.button>

        {/* SAT/ACT Button */}
        <motion.button 
          whileTap={{ scale: 0.95 }} 
          onClick={() => handleNavigation('/testprep')} 
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            currentPage === 'sat' ? 'text-gold-600 bg-gold-50' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <GraduationCap size={20} fill={currentPage === 'sat' ? 'currentColor' : 'none'} />
          <span className="text-xs font-medium">SAT & ACT</span>
        </motion.button>

      </div>
    </motion.div>
    </LazyMotion>
  );
}