import { useEffect, useState } from "react";
import { gsap } from "gsap";

const loadingTexts = [
  "PREPARING YOUR INVITATION",
  "SOMETHING BEAUTIFUL AWAITS",
  "A MOMENT TO REMEMBER",
  "YOUR STORY BEGINS",
  "PREPARE FOR THE INVITATION",
];

export default function Loader({ onComplete }) {
  const [text, setText] = useState(loadingTexts[0]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;

      if (index < loadingTexts.length) {
        gsap.fromTo(
          ".loader-text",
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          }
        );

        setText(loadingTexts[index]);
      } else {
        clearInterval(interval);

        gsap.to(".loader-content", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.inOut",
        });

        gsap.to(".loader", {
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.inOut",
          onComplete,
        });
      }
    }, 700);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
      <div className="loader-content text-center px-6">
        <p className="loader-text text-xs md:text-sm tracking-[0.35em] font-light">
          {text}
        </p>
      </div>
    </div>
  );
}