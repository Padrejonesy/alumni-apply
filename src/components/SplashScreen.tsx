import { useState, useEffect } from 'react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // Fade in + subtle scale (0→0.6s)
    const enterTimer = setTimeout(() => setPhase('hold'), 50);
    // Hold (0.6s→1.4s)
    const holdTimer = setTimeout(() => setPhase('exit'), 1400);
    // Remove from DOM after exit transition
    const removeTimer = setTimeout(() => onComplete(), 1800);
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: '#000000',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      <img
        src="/at-monogram.png"
        alt="Alumni Tutoring"
        className="w-[180px] h-[180px]"
        style={{
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      />
    </div>
  );
}
