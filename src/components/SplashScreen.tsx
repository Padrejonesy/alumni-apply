import { useState, useEffect } from 'react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
    const removeTimer = setTimeout(() => onComplete(), 1900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-400"
      style={{
        backgroundColor: '#000000',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <img src="/at-monogram.png" alt="Alumni Tutoring" className="w-[180px] h-[180px]" />
    </div>
  );
}
