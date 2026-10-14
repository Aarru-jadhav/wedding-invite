
import React, { useEffect, useRef } from "react";
import floralBackground from "../assets/images/1.png";

function Joinus() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.remove("is-visible");
          void section.offsetWidth;
          section.classList.add("is-visible");
        } else {
          section.classList.remove("is-visible");
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="celebrate"
      className="relative isolate min-h-screen overflow-hidden bg-[#f5ead9] font-serif text-center"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

        .joinus-title {
          opacity: 0;
          transform: translateY(20px);
        }

        .is-visible .joinus-title {
          animation: joinusHeadingReveal 1.2s ease-out .2s forwards;
        }

        @keyframes joinusHeadingReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        
.joinus-gold {
  background: linear-gradient(
    110deg,
    #3B2415 0%,
    #593A23 30%,
    #765333 50%,
    #4A2E1B 75%,
    #352013 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}


        .joinus-title span {
          display: block;
          margin-top: 12px;
          font-size: .48em;
          letter-spacing: .22em;
        }

        @media (prefers-reduced-motion: reduce) {
          .joinus-title {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Floral background */}
      <img
        src={floralBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* Center heading */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-5 py-10">
        <h2
          className="joinus-title joinus-gold m-0 font-normal uppercase leading-[1.15] tracking-[0.09em]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(42px, 8vw, 76px)",
          }}
        >
          Join Us
          <span>To Celebrate</span>
        </h2>
      </div>
    </section>
  );
}

export default Joinus;
