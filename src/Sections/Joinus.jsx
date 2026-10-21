
// import React, { useEffect, useRef } from "react";
// import floralBackground from "../assets/images/1.png";

// function Joinus() {
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           section.classList.remove("is-visible");
//           void section.offsetWidth;
//           section.classList.add("is-visible");
//         } else {
//           section.classList.remove("is-visible");
//         }
//       },
//       { threshold: 0.25 }
//     );

//     observer.observe(section);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="celebrate"
//       className="relative isolate min-h-screen overflow-hidden bg-[#f5ead9] font-serif text-center"
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

//         .joinus-title {
//           opacity: 0;
//           transform: translateY(20px);
//         }

//         .is-visible .joinus-title {
//           animation: joinusHeadingReveal 1.2s ease-out .2s forwards;
//         }

//         @keyframes joinusHeadingReveal {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

        
// .joinus-gold {
//   background: linear-gradient(
//     110deg,
//     #3B2415 0%,
//     #593A23 30%,
//     #765333 50%,
//     #4A2E1B 75%,
//     #352013 100%
//   );
//   -webkit-background-clip: text;
//   background-clip: text;
//   -webkit-text-fill-color: transparent;
//   color: transparent;
// }


//         .joinus-title span {
//           display: block;
//           margin-top: 12px;
//           font-size: .48em;
//           letter-spacing: .22em;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .joinus-title {
//             animation: none !important;
//             opacity: 1;
//             transform: none;
//           }
//         }
//       `}</style>

//       {/* Floral background */}
//       <img
//         src={floralBackground}
//         alt=""
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
//       />

//       {/* Center heading */}
//       <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-5 py-10">
//         <h2
//           className="joinus-title joinus-gold m-0 font-normal uppercase leading-[1.15] tracking-[0.09em]"
//           style={{
//             fontFamily: "'Cormorant Garamond', Georgia, serif",
//             fontSize: "clamp(42px, 8vw, 76px)",
//           }}
//         >
//           Join Us
//           <span>To Celebrate</span>
//         </h2>
//       </div>
//     </section>
//   );
// }

// export default Joinus;

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

        .joinus-content {
          opacity: 0;
          transform: translateY(28px);
        }

        .is-visible .joinus-content {
          animation: joinusReveal 1.3s cubic-bezier(.22, 1, .36, 1) .15s forwards;
        }

        .joinus-title {
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
          opacity: 0;
          transform: translateY(22px);
        }

        .is-visible .joinus-title {
          animation: joinusReveal 1.2s ease-out .3s forwards;
        }

        .joinus-subtitle {
          display: block;
          margin-top: 12px;
          font-size: .48em;
          letter-spacing: .22em;
          opacity: 0;
          transform: translateY(15px);
        }

        .is-visible .joinus-subtitle {
          animation: joinusReveal 1s ease-out .65s forwards;
        }

        .joinus-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 25px auto;
          color: #9b7544;
          opacity: 0;
        }

        .is-visible .joinus-divider {
          animation: joinusFade 1s ease-out .9s forwards;
        }

        .joinus-divider span {
          width: clamp(35px, 8vw, 85px);
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #9b7544,
            transparent
          );
        }

        .joinus-message {
          max-width: 560px;
          margin: 0 auto;
          color: #49351f;
          font-size: clamp(18px, 3vw, 27px);
          line-height: 1.55;
          letter-spacing: .025em;
          opacity: 0;
          transform: translateY(15px);
        }

        .is-visible .joinus-message {
          animation: joinusReveal 1s ease-out 1s forwards;
        }

        @keyframes joinusReveal {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes joinusFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .joinus-content,
          .joinus-title,
          .joinus-subtitle,
          .joinus-divider,
          .joinus-message {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Existing PNG Background */}
      <img
        src={floralBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      />

      {/* Animated Center Text */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-5 py-10">
        <div className="joinus-content w-full">
          <h2
            className="joinus-title m-0 font-normal leading-[1.15] tracking-[0.04em]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(64px, 12vw, 110px)",
              fontStyle: "italic",
            }}
          >
            Join Us

            <span className="joinus-subtitle">
              TO CELEBRATE
            </span>
          </h2>

          <div className="joinus-divider" aria-hidden="true">
            <span />
            <b className="text-xl font-normal">❧</b>
            <span />
          </div>

          <p className="joinus-message font-normal">
           Your presence will make our{" "}
  <br className="hidden sm:block" />
  celebration even more special.
</p>
        </div>
      </div>
    </section>
  );
}

export default Joinus;
