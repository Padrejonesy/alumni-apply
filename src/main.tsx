import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Redirect lovable.app subdomain to custom domain so PWA & notifications use alumnitutoring.com
if (
  typeof window !== 'undefined' &&
  window.location.hostname === 'alumnitutoring.lovable.app'
) {
  window.location.replace('https://alumnitutoring.com' + window.location.pathname + window.location.search + window.location.hash);
}

// Prevent Safari iOS pinch-zoom and double-tap zoom at document level
let lastTap = 0;
const preventDoubleTap = (e: TouchEvent) => {
  const now = Date.now();
  if (now - lastTap < 300) e.preventDefault();
  lastTap = now;
};
const preventPinch = (e: Event & { scale?: number }) => {
  if (e.scale !== undefined && e.scale !== 1) {
    e.preventDefault();
  }
};
document.addEventListener('touchstart', preventDoubleTap, { passive: false });
document.addEventListener('gesturestart', preventPinch as EventListener, { passive: false });
document.addEventListener('gesturechange', preventPinch as EventListener, { passive: false });

createRoot(document.getElementById("root")!).render(<App />);
