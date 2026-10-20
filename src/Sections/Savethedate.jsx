import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEART_PATH =
  "M150 285 C125 258 24 187 24 112 C24 54 88 32 122 76 L150 108 L178 76 C212 32 276 54 276 112 C276 187 175 258 150 285 Z";

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

function BotanicalVine({ side = "left" }) {
  return (
    <svg
      className={`sd-vine sd-vine-${side}`}
      viewBox="0 0 120 440"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="sd-vine-stem"
        d="M14 438 C42 390 13 348 38 300 C61 257 23 216 49 173 C72 135 45 86 87 15"
      />

      {[
        "M28 375 C7 360 4 340 14 327 C33 338 37 356 28 375Z",
        "M31 339 C54 339 70 322 65 307 C46 309 34 322 31 339Z",
        "M34 285 C12 270 10 251 20 239 C40 250 44 269 34 285Z",
        "M44 245 C68 242 79 225 72 211 C53 216 43 229 44 245Z",
        "M43 201 C23 186 23 168 33 158 C50 172 53 189 43 201Z",
        "M53 161 C76 156 84 139 76 127 C58 133 51 146 53 161Z",
        "M63 116 C43 102 42 84 53 74 C69 88 73 103 63 116Z",
        "M74 78 C96 72 102 56 94 45 C78 52 72 65 74 78Z",
      ].map((path, index) => (
        <path
          key={index}
          className="sd-vine-leaf"
          d={path}
        />
      ))}

      <circle className="sd-vine-dot" cx="87" cy="15" r="2.2" />
      <circle className="sd-vine-dot" cx="14" cy="327" r="1.8" />
      <circle className="sd-vine-dot" cx="72" cy="211" r="1.8" />
    </svg>
  );
}

function CornerOrnament({ corner }) {
  return (
    <div
      className={`sd-frame-ornament sd-frame-${corner}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48">
        <path d="M2 24 V2 H24" />
        <path d="M7 17 V7 H17" />
        <path d="M2 11 C8 11 11 8 11 2" />
        <path d="M12 24 C17 18 22 15 28 14" />
        <path d="M22 3 C22 9 27 13 33 13" />
        <path d="M4 30 C11 29 15 33 16 40" />
        <path d="M27 7 C32 8 36 12 37 17" />
      </svg>
    </div>
  );
}

export default function Savethedate() {
  const sectionRef = useRef(null);
  const heartRef = useRef(null);
  const calendarRef = useRef(null);
  const dateHeartRef = useRef(null);
  const hintRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heart = heartRef.current;
    const calendar = calendarRef.current;
    const dateHeart = dateHeartRef.current;
    const hint = hintRef.current;

    if (!section || !heart || !calendar || !dateHeart) {
      return;
    }

    const ctx = gsap.context(() => {
      const heartLength = heart.getTotalLength();

      gsap.set(heart, {
        strokeDasharray: heartLength,
        strokeDashoffset: heartLength,
      });

      gsap.set(".sd-calendar-item", {
        opacity: 0,
        y: 7,
      });

      gsap.set(calendar, {
        opacity: 0,
        scaleY: 0.05,
        transformOrigin: "center top",
      });

      gsap.set(dateHeart, {
        opacity: 0,
        scale: 0.3,
      });

      gsap.set(".sd-vine-stem", {
        strokeDasharray: 500,
        strokeDashoffset: 500,
      });

      gsap.set(".sd-vine-leaf", {
        opacity: 0,
        scale: 0.4,
      });

      gsap.set(".sd-frame-ornament", {
        opacity: 0,
      });

      gsap.set(".sd-heart-glow", {
        opacity: 0,
      });

      gsap.set(".sd-heart-shine", {
        opacity: 0,
        xPercent: -130,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1650",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".sd-frame-ornament", {
        opacity: 1,
        duration: 0.08,
        stagger: 0.015,
      })
        .to(
          ".sd-vine-stem",
          {
            strokeDashoffset: 0,
            duration: 0.22,
            stagger: 0.012,
            ease: "none",
          },
          0
        )
        .to(
          ".sd-vine-leaf",
          {
            opacity: 0.8,
            scale: 1,
            duration: 0.13,
            stagger: 0.006,
          },
          0.1
        )
        .fromTo(
          ".sd-eyebrow",
          {
            opacity: 0,
            y: 14,
            letterSpacing: "8px",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "4px",
            duration: 0.12,
          },
          0.04
        )
        .to(
          heart,
          {
            strokeDashoffset: 0,
            duration: 0.43,
            ease: "none",
          },
          0.12
        )
        .to(
          ".sd-heart-glow",
          {
            opacity: 0.65,
            duration: 0.1,
          },
          0.48
        )
        .to(
          ".sd-heart-shine",
          {
            opacity: 0.9,
            xPercent: 130,
            duration: 0.18,
            ease: "none",
          },
          0.5
        )
        .to(
          calendar,
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.17,
            ease: "power2.out",
          },
          0.59
        )
        .to(
          ".sd-calendar-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.14,
            stagger: 0.008,
            ease: "power1.out",
          },
          0.63
        )
        .to(
          dateHeart,
          {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            ease: "back.out(1.8)",
          },
          0.83
        )
        .to(
          ".sd-final-glint",
          {
            opacity: 1,
            scale: 1,
            duration: 0.07,
          },
          0.86
        )
        .to(
          ".sd-final-glint",
          {
            opacity: 0.3,
            duration: 0.1,
          },
          0.94
        );

      // Scroll hint hides while scrolling down and returns on scrolling up.
      if (hint) {
        gsap.fromTo(
          hint,
          {
            opacity: 1,
            y: 0,
          },
          {
            opacity: 0,
            y: 12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=220",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Floating golden particles.
      gsap.to(".sd-particle", {
        y: "random(-20, 20)",
        x: "random(-12, 12)",
        opacity: "random(0.2, 0.9)",
        duration: "random(2, 5)",
        stagger: {
          each: 0.04,
          from: "random",
        },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Twinkling stars.
      gsap.to(".sd-star", {
        opacity: "random(0.2, 1)",
        scale: "random(0.7, 1.3)",
        rotation: "random(-20, 20)",
        duration: "random(1.1, 2.5)",
        stagger: {
          each: 0.1,
          from: "random",
        },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Rotating decorative orbits.
      gsap.to(".sd-orbit-a", {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".sd-orbit-b", {
        rotation: -360,
        duration: 48,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".sd-heart-glow", {
        opacity: 0.25,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sd-section" ref={sectionRef}>
      <style>{`
        .sd-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          height: 100svh;
          min-height: 540px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 35px 16px 28px;
          color: #87612d;
          font-family: Georgia, "Times New Roman", serif;
          background:
            radial-gradient(
              ellipse at 50% 42%,
              #fffefa 0%,
              #fff9ec 48%,
              #ead8b6 100%
            );
        }

        .sd-section *,
        .sd-section *::before,
        .sd-section *::after {
          box-sizing: border-box;
        }

        .sd-section::before {
          content: "";
          position: absolute;
          z-index: 2;
          inset: 12px;
          border: 1px solid rgba(176, 132, 59, 0.68);
          pointer-events: none;
        }

        .sd-section::after {
          content: "";
          position: absolute;
          z-index: 2;
          inset: 19px;
          border: 1px solid rgba(176, 132, 59, 0.24);
          pointer-events: none;
        }

        /* SCROLL INDICATOR */

        .sd-scroll-hint {
          position: absolute;
          z-index: 20;
          top: 32px;
          bottom: auto;
          left: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transform: translateX(-50%);
          color: #99703a;
          font-family: Arial, sans-serif;
          pointer-events: none;
          text-align: center;
          white-space: nowrap;
          will-change: opacity, transform;
        }

        .sd-scroll-hint-text {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2.5px;
          line-height: 1.5;
          text-transform: uppercase;
          color: #8b622c;
          text-shadow: 0 1px 3px rgba(255, 250, 236, 0.8);
        }

        .sd-scroll-hint-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 27px;
          height: 27px;
          color: #b28a4b;
          animation: sd-arrow-bounce 1.7s ease-in-out infinite;
        }

        .sd-scroll-hint-arrow svg {
          width: 22px;
          height: 22px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        @keyframes sd-arrow-bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.65;
          }

          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }

        /* MAIN CONTENT */

        .sd-content {
          position: relative;
          z-index: 3;
          width: min(100%, 420px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .sd-eyebrow {
          margin: 0 0 3px;
          color: #98713a;
          font-size: 10px;
          letter-spacing: 4px;
          font-weight: 400;
        }

        .sd-heart-stage {
          position: relative;
          isolation: isolate;
          display: flex;
          justify-content: center;
          align-items: center;
          width: min(100%, 340px);
          aspect-ratio: 0.88;
          margin: 0 auto;
        }

        .sd-heart-svg {
          position: absolute;
          z-index: 1;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .sd-heart-outline {
          fill: rgba(255, 252, 244, 0.16);
          stroke: url(#sdGoldGradient);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: url(#sdGoldGlow);
        }

        .sd-heart-glow {
          fill: none;
          stroke: #d9b465;
          stroke-width: 4;
          filter: url(#sdGlowBlur);
        }

        .sd-heart-shine {
          pointer-events: none;
        }

        /* ROTATING ORBITS */

        .sd-orbit {
          position: absolute;
          z-index: 0;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          pointer-events: none;
        }

        .sd-orbit-a {
          width: 88%;
          height: 74%;
          border: 1px dashed rgba(176, 132, 59, 0.28);
          transform: translate(-50%, -50%);
        }

        .sd-orbit-b {
          width: 75%;
          height: 85%;
          border: 1px solid rgba(176, 132, 59, 0.17);
          transform: translate(-50%, -50%);
        }

        .sd-orbit-dot {
          position: absolute;
          top: 50%;
          left: -3px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c4a05c;
          box-shadow: 0 0 8px rgba(196, 160, 92, 0.75);
        }

        /* CALENDAR */

        .sd-calendar {
          position: relative;
          z-index: 2;
          flex: 0 0 auto;
          width: 49%;
          max-width: 165px;
          min-width: 0;
          margin-top: -3px;
          padding: 0;
          background: transparent;
          border: 0;
          box-shadow: none;
          overflow: visible;
          transform-origin: center top;
        }

        .sd-calendar-heading {
          margin: 0;
          color: #865c25;
          font-size: clamp(12px, 3.4vw, 15px);
          font-weight: 400;
          letter-spacing: 2.1px;
          line-height: 1.2;
        }

        .sd-year {
          margin: 3px 0 7px;
          color: #ad874b;
          font-size: 9px;
          letter-spacing: 3px;
          line-height: 1.1;
        }

        .sd-weekdays,
        .sd-calendar-grid {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          align-items: center;
          justify-items: center;
        }

        .sd-weekdays {
          margin-bottom: 3px;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(171, 126, 53, 0.3);
        }

        .sd-weekday {
          color: #ad874b;
          font-family: Arial, sans-serif;
          font-size: 8px;
          font-weight: 500;
          line-height: 1.2;
        }

        .sd-calendar-grid {
          row-gap: 0;
        }

        .sd-day {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 16px;
          min-width: 0;
          color: #816c50;
          font-family: Arial, sans-serif;
          font-size: 8px;
          font-weight: 400;
          line-height: 1;
        }

        .sd-day:nth-child(7n + 1) {
          color: #ac8140;
        }

        .sd-date-heart {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          transform-origin: center;
          filter: drop-shadow(0 1px 3px rgba(139, 91, 23, 0.28));
        }

        .sd-date-heart svg {
          position: absolute;
          width: 25px;
          height: 25px;
          overflow: visible;
        }

        .sd-date-heart span {
          position: relative;
          z-index: 1;
          margin-top: 1px;
          color: #fffdf5;
          font-family: Arial, sans-serif;
          font-size: 8px;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(83, 50, 10, 0.4);
        }

        /* FOOTER */

        .sd-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 0;
          color: #98723b;
          font-size: 8px;
          letter-spacing: 2.4px;
          line-height: 1.5;
          white-space: nowrap;
        }

        .sd-footer-line {
          width: 18px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #b89450);
        }

        .sd-footer-line:last-child {
          background: linear-gradient(90deg, #b89450, transparent);
        }

        .sd-bottom-decoration {
          width: 105px;
          height: 21px;
          margin-top: 10px;
          opacity: 0.65;
        }

        .sd-bottom-decoration svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* FLOATING PARTICLES */

        .sd-ambient {
          position: absolute;
          z-index: 0;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .sd-particle {
          position: absolute;
          top: var(--top);
          left: var(--left);
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background: #c6a05c;
          opacity: 0.45;
          box-shadow: 0 0 7px rgba(198, 160, 92, 0.55);
        }

        .sd-star {
          position: absolute;
          color: #b8914b;
          opacity: 0.55;
          text-shadow: 0 0 8px rgba(198, 157, 74, 0.5);
        }

        .sd-star-1 { top: 13%; left: 16%; font-size: 18px; }
        .sd-star-2 { top: 18%; right: 17%; font-size: 13px; }
        .sd-star-3 { top: 33%; left: 8%; font-size: 12px; }
        .sd-star-4 { top: 40%; right: 8%; font-size: 19px; }
        .sd-star-5 { top: 60%; left: 13%; font-size: 11px; }
        .sd-star-6 { top: 68%; right: 13%; font-size: 16px; }
        .sd-star-7 { top: 78%; left: 25%; font-size: 12px; }
        .sd-star-8 { top: 83%; right: 26%; font-size: 10px; }
        .sd-star-9 { top: 23%; left: 30%; font-size: 9px; }
        .sd-star-10 { top: 27%; right: 29%; font-size: 10px; }
        .sd-star-11 { top: 48%; left: 19%; font-size: 9px; }
        .sd-star-12 { top: 52%; right: 18%; font-size: 11px; }

        /* BOTANICAL DECORATION */

        .sd-vine {
          position: absolute;
          z-index: 1;
          top: 21%;
          width: clamp(56px, 15vw, 108px);
          height: 58%;
          overflow: visible;
          pointer-events: none;
        }

        .sd-vine-left { left: 2%; }
        .sd-vine-right { right: 2%; transform: scaleX(-1); }

        .sd-vine-stem {
          fill: none;
          stroke: #b18d50;
          stroke-width: 0.85;
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0.82;
        }

        .sd-vine-leaf {
          fill: rgba(198, 164, 100, 0.12);
          stroke: #b18d50;
          stroke-width: 0.75;
          transform-box: fill-box;
          transform-origin: center;
        }

        .sd-vine-dot {
          fill: #b18d50;
        }

        /* CORNER ORNAMENTS */

        .sd-frame-ornament {
          position: absolute;
          z-index: 3;
          width: 46px;
          height: 46px;
          color: #b18b4d;
          pointer-events: none;
        }

        .sd-frame-ornament svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        .sd-frame-ornament path {
          fill: none;
          stroke: currentColor;
          stroke-width: 0.9;
          stroke-linecap: round;
        }

        .sd-frame-tl { top: 19px; left: 19px; }
        .sd-frame-tr { top: 19px; right: 19px; transform: scaleX(-1); }
        .sd-frame-bl { bottom: 19px; left: 19px; transform: scaleY(-1); }
        .sd-frame-br { bottom: 19px; right: 19px; transform: scale(-1); }

        .sd-final-glint {
          position: absolute;
          z-index: 5;
          top: 25%;
          left: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          opacity: 0;
          transform: translateX(-50%) scale(0.5);
          background: #fff2c0;
          box-shadow: 0 0 14px 5px rgba(218, 177, 91, 0.55);
          pointer-events: none;
        }

        @media (min-width: 700px) {
          .sd-section {
            padding-top: 30px;
            padding-bottom: 25px;
          }

          .sd-content {
            width: 420px;
          }

          .sd-heart-stage {
            width: 340px;
          }

          .sd-vine {
            width: 105px;
            height: 60%;
            top: 20%;
          }

          .sd-vine-left { left: 7%; }
          .sd-vine-right { right: 7%; }
        }

        @media (max-width: 380px) {
          .sd-section {
            padding: 32px 12px 24px;
          }

          .sd-heart-stage {
            width: min(100%, 300px);
          }

          .sd-calendar {
            width: 49%;
            max-width: 148px;
          }

          .sd-calendar-heading {
            font-size: 11px;
            letter-spacing: 1.8px;
          }

          .sd-year {
            margin-bottom: 5px;
          }

          .sd-day {
            height: 15px;
            font-size: 7px;
          }

          .sd-vine {
            width: 51px;
            opacity: 0.7;
          }

          .sd-frame-ornament {
            width: 38px;
            height: 38px;
          }

          .sd-footer {
            gap: 5px;
            font-size: 7px;
            letter-spacing: 1.6px;
          }

          .sd-footer-line {
            width: 12px;
          }

          .sd-scroll-hint {
            top: 28px;
            bottom: auto;
          }

          .sd-scroll-hint-text {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 1.8px;
          }
        }

        @media (max-height: 650px) {
          .sd-scroll-hint {
            top: 25px;
            bottom: auto;
          }

          .sd-scroll-hint-arrow {
            width: 21px;
            height: 21px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sd-scroll-hint-arrow {
            animation: none;
          }
        }
      `}</style>

      {/* FLOATING GOLD PARTICLES */}

      <div className="sd-ambient" aria-hidden="true">
        {Array.from({ length: 44 }, (_, i) => (
          <span
            key={`particle-${i}`}
            className="sd-particle"
            style={{
              "--left": `${(i * 37 + 11) % 100}%`,
              "--top": `${(i * 23 + 7) % 100}%`,
              "--size": `${i % 7 === 0 ? 4 : i % 3 === 0 ? 3 : 2}px`,
            }}
          />
        ))}

        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={`star-${i}`}
            className={`sd-star sd-star-${i + 1}`}
          >
            ✦
          </span>
        ))}
      </div>

      {/* CORNER DECORATIONS */}

      {["tl", "tr", "bl", "br"].map((corner) => (
        <CornerOrnament
          key={corner}
          corner={corner}
        />
      ))}

      {/* BOTANICAL VINES */}

      <BotanicalVine side="left" />
      <BotanicalVine side="right" />

      {/* MAIN WEDDING CALENDAR */}

      <main className="sd-content">
        <p className="sd-eyebrow">
          A DAY TO REMEMBER
        </p>

        <div className="sd-heart-stage">
          <div className="sd-orbit sd-orbit-a">
            <span className="sd-orbit-dot" />
          </div>

          <div className="sd-orbit sd-orbit-b">
            <span className="sd-orbit-dot" />
          </div>

          <svg
            className="sd-heart-svg"
            viewBox="0 0 300 320"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="sdGoldGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#8b5a20" />
                <stop offset="20%" stopColor="#f8dfa0" />
                <stop offset="38%" stopColor="#bd8529" />
                <stop offset="52%" stopColor="#fff9dc" />
                <stop offset="70%" stopColor="#d3a044" />
                <stop offset="100%" stopColor="#89571c" />
              </linearGradient>

              <linearGradient
                id="sdShineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                <stop offset="50%" stopColor="#fffef0" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>

              <filter
                id="sdGoldGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="0.7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="sdGlowBlur"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="2.5" />
              </filter>

              <clipPath id="sdHeartClip">
                <path d={HEART_PATH} />
              </clipPath>
            </defs>

            <path
              className="sd-heart-glow"
              d={HEART_PATH}
            />

            <path
              ref={heartRef}
              className="sd-heart-outline"
              d={HEART_PATH}
            />

            <g clipPath="url(#sdHeartClip)">
              <rect
                className="sd-heart-shine"
                x="-300"
                y="0"
                width="300"
                height="320"
                fill="url(#sdShineGradient)"
              />
            </g>
          </svg>

          <span
            className="sd-final-glint"
            aria-hidden="true"
          />

          <div
            className="sd-calendar"
            ref={calendarRef}
          >
            <h3 className="sd-calendar-heading sd-calendar-item">
              NOVEMBER
            </h3>

            <p className="sd-year sd-calendar-item">
              2026
            </p>

            <div className="sd-weekdays">
              {weekdays.map((day, i) => (
                <span
                  key={`${day}-${i}`}
                  className="sd-weekday sd-calendar-item"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="sd-calendar-grid">
              {days.map((day) => (
                <div
                  key={day}
                  className="sd-day sd-calendar-item"
                >
                  {day === 24 ? (
                    <span
                      className="sd-date-heart"
                      ref={dateHeartRef}
                    >
                      <svg
                        viewBox="0 0 40 40"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="sdDateGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#fff0ae" />
                            <stop offset="45%" stopColor="#b67a26" />
                            <stop offset="70%" stopColor="#f8d982" />
                            <stop offset="100%" stopColor="#95601c" />
                          </linearGradient>
                        </defs>

                        <path
                          d="M20 35 C16 30 3 22 3 12 C3 2 15 1 20 10 C25 1 37 2 37 12 C37 22 24 30 20 35 Z"
                          fill="url(#sdDateGradient)"
                        />
                      </svg>

                      <span>24</span>
                    </span>
                  ) : (
                    day
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sd-footer">
          <span className="sd-footer-line" />
          THE BEGINNING OF FOREVER
          <span className="sd-footer-line" />
        </div>

        <div
          className="sd-bottom-decoration"
          aria-hidden="true"
        >
          <svg viewBox="0 0 112 22" fill="none">
            <path
              d="M3 11 H40 C45 11 47 5 52 5 C57 5 59 11 64 11 H109"
              stroke="#b7924f"
              strokeWidth="0.8"
            />

            <path
              d="M42 11 C46 17 51 18 56 11 C61 18 66 17 70 11"
              stroke="#b7924f"
              strokeWidth="0.8"
            />

            <path
              d="M50 5 C48 1 43 2 42 6 C46 7 48 7 50 5Z"
              fill="rgba(189,145,61,0.2)"
              stroke="#b7924f"
              strokeWidth="0.7"
            />

            <path
              d="M62 5 C64 1 69 2 70 6 C66 7 64 7 62 5Z"
              fill="rgba(189,145,61,0.2)"
              stroke="#b7924f"
              strokeWidth="0.7"
            />

            <circle cx="56" cy="11" r="2" fill="#bd913d" />
            <circle cx="3" cy="11" r="1.2" fill="#bd913d" />
            <circle cx="109" cy="11" r="1.2" fill="#bd913d" />
          </svg>
        </div>
      </main>

      {/* SCROLL TO REVEAL — ABOVE THE ARROW */}

      <div
        className="sd-scroll-hint"
        ref={hintRef}
        aria-label="Scroll to reveal the wedding date"
      >
        <span className="sd-scroll-hint-text">
          SCROLL TO REVEAL
        </span>

        <span
          className="sd-scroll-hint-arrow"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 3 V20" />
            <path d="M5 13 L12 20 L19 13" />
          </svg>
        </span>
      </div>
    </section>
  );
}