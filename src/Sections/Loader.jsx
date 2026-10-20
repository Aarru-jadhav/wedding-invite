import { useEffect, useState } from "react";
import { gsap } from "gsap";

const loadingTexts = [
  "A MOMENT TO REMEMBER",
  "A ROYAL CELEBRATION",
  "PREPARE FOR THE INVITATION",
];

export default function Loader({ onComplete }) {
  const [text, setText] = useState(loadingTexts[0]);

  useEffect(() => {
    let index = 0;

    // Total duration calculation: 3 texts * 4 seconds = 12 seconds total fill time
    const totalDuration = loadingTexts.length * 4;

    // Golden liquid fill animation slowed down to match total text time
    gsap.to(".kalash-fill-clip rect", {
      attr: { y: 0, height: 100 },
      duration: totalDuration,
      ease: "power1.inOut",
    });

    // Gentle pulse glow
    gsap.fromTo(
      ".kalash-glow",
      { opacity: 0.7, scale: 0.98 },
      { opacity: 1, scale: 1.03, repeat: -1, yoyo: true, duration: 2, ease: "sine.inOut" }
    );

    // Text changes every 4000ms (4 seconds)
    const interval = setInterval(() => {
      index++;

      if (index < loadingTexts.length) {
        // Smooth text transition out and in
        gsap.to(".loader-text", {
          opacity: 0,
          y: -10,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setText(loadingTexts[index]);
            gsap.fromTo(
              ".loader-text",
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
          },
        });
      } else {
        clearInterval(interval);

        // Exit animation
        gsap.to(".loader-content", {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power2.inOut",
        });

        gsap.to(".loader", {
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "power2.inOut",
          onComplete,
        });
      }
    }, 4000); // 4 Seconds Interval

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0c] text-white overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="loader-content text-center px-6 relative z-10 max-w-lg">
        {/* Kalash Graphic Container */}
        <div className="relative mx-auto mb-8 h-36 w-36 md:h-48 md:w-48 kalash-glow">
          <svg
            className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <defs>
              {/* Gold Gradient Outline */}
              <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B2" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#7A5200" />
              </linearGradient>

              {/* Gold Radiant Liquid Fill */}
              <linearGradient id="gold-fill" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5E3F00" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FFF7D6" />
              </linearGradient>

              {/* Clip Path for Bottom-to-Top Filling */}
              <clipPath id="kalash-fill-clip" className="kalash-fill-clip">
                <rect x="0" y="100" width="100" height="0" />
              </clipPath>
            </defs>

            {/* --- FILLED ANIMATED LAYER --- */}
            <g clipPath="url(#kalash-fill-clip)" fill="url(#gold-fill)">
              {/* Coconut (Nariyal) */}
              <path d="M50 10 C42 22 42 32 50 36 C58 32 58 22 50 10 Z" />
              
              {/* Mango Leaves (Aam ke Patte) */}
              <path d="M30 30 C38 22 46 28 48 36 C38 38 30 34 30 30 Z" />
              <path d="M70 30 C62 22 54 28 52 36 C62 38 70 34 70 30 Z" />
              <path d="M50 36 C45 28 35 24 25 28 C32 36 42 38 50 36 Z" />
              <path d="M50 36 C55 28 65 24 75 28 C68 36 58 38 50 36 Z" />

              {/* Kalash Neck & Rim */}
              <path d="M26 38 L74 38 L70 44 L30 44 Z" />

              {/* Kalash Pot Body */}
              <path d="M30 44 C18 58 20 80 34 88 C40 92 60 92 66 88 C80 80 82 58 70 44 Z" />
            </g>

            {/* --- GOLDEN OUTLINE LAYER --- */}
            <g fill="none" stroke="url(#gold-stroke)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
              {/* Coconut Outline */}
              <path d="M50 10 C42 22 42 32 50 36 C58 32 58 22 50 10 Z" />

              {/* Mango Leaves Outlines */}
              <path d="M30 30 C38 22 46 28 48 36 C38 38 30 34 30 30 Z" />
              <path d="M70 30 C62 22 54 28 52 36 C62 38 70 34 70 30 Z" />
              <path d="M25 28 C35 24 45 28 50 36 C42 38 32 36 25 28 Z" />
              <path d="M75 28 C65 24 55 28 50 36 C58 38 68 36 75 28 Z" />

              {/* Kalash Body Outline */}
              <path d="M26 38 L74 38 L70 44 C82 58 80 80 66 88 C60 92 40 92 34 88 C20 80 18 58 30 44 Z" />
              
              {/* Kalash Neck Lines */}
              <line x1="26" y1="38" x2="74" y2="38" strokeWidth="3" />
              <line x1="30" y1="44" x2="70" y2="44" strokeWidth="2" />
              
              {/* Swastik / Sacred Motif on Kalash */}
              <path d="M46 60 H54 M50 56 V64 M54 60 V64 M46 60 V56 M50 56 H54 M50 64 H46" strokeWidth="1.8" />
              
              {/* Base Ring */}
              <line x1="38" y1="90" x2="62" y2="90" strokeWidth="3" />
            </g>
          </svg>
        </div>

        {/* Traditional Royal Font Text */}
        <p className="loader-text text-sm md:text-base tracking-[0.45em] text-[#E5D5A5] font-light uppercase font-serif leading-relaxed select-none">
          {text}
        </p>
      </div>
    </div>
  );
}