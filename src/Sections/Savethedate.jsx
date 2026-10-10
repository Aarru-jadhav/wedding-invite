```jsx
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Savethedate.css";

gsap.registerPlugin(ScrollTrigger);

function BotanicalBranch({ className = "" }) {
  return (
    <div className={`sd-branch ${className}`}>
      <div className="sd-stem" />

      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className={`sd-leaf sd-leaf-${i + 1}`}
        />
      ))}

      <div className="sd-blossom sd-blossom-one">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`sd-petal sd-petal-${i + 1}`} />
        ))}
        <span className="sd-flower-center" />
      </div>

      <div className="sd-blossom sd-blossom-two">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`sd-petal sd-petal-${i + 1}`} />
        ))}
        <span className="sd-flower-center" />
      </div>
    </div>
  );
}

function MarbleArtwork() {
  return (
    <div className="sd-artwork">
      <div className="sd-marble-wash sd-wash-one" />
      <div className="sd-marble-wash sd-wash-two" />
      <div className="sd-marble-wash sd-wash-three" />

      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className={`sd-vein sd-vein-${i + 1}`} />
      ))}

      <BotanicalBranch className="sd-branch-top" />
      <BotanicalBranch className="sd-branch-bottom" />

      <div className="sd-art-dust">
        {Array.from({ length: 28 }).map((_, i) => (
          <span key={i} className={`sd-dust sd-dust-${i + 1}`} />
        ))}
      </div>

      <div className="sd-art-shine" />
    </div>
  );
}

export default function Savethedate() {
  const sectionRef = useRef(null);

  // November 2026 starts on Sunday and has 30 days.
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .from(".sd-artwork", {
          opacity: 0,
          x: -35,
          duration: 1.2,
          ease: "power2.out",
        })
        .from(
          ".sd-eyebrow",
          { opacity: 0, y: 12, duration: 0.6 },
          "-=0.5"
        )
        .from(
          ".sd-top-decoration",
          { opacity: 0, scaleX: 0, duration: 0.6 },
          "-=0.2"
        )
        .from(
          ".sd-save",
          {
            opacity: 0,
            y: 35,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .from(
          ".sd-the",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .from(
          ".sd-date",
          {
            opacity: 0,
            y: 30,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".sd-calendar-heading",
          { opacity: 0, y: 15, duration: 0.7 },
          "-=0.2"
        )
        .from(
          ".sd-weekday, .sd-day",
          {
            opacity: 0,
            y: 7,
            duration: 0.3,
            stagger: 0.025,
          },
          "-=0.15"
        )
        .from(
          ".sd-footer",
          { opacity: 0, y: 12, duration: 0.7 },
          "-=0.1"
        );

      gsap.to(".sd-vein", {
        opacity: 0.9,
        duration: 1.8,
        stagger: 0.18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".sd-art-shine", {
        x: "180%",
        duration: 4.5,
        repeat: -1,
        repeatDelay: 1.5,
        ease: "none",
      });

      gsap.to(".sd-dust", {
        y: -9,
        opacity: 0.9,
        duration: 2,
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".sd-date-heart",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: ".sd-calendar",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sd-section" ref={sectionRef}>
      <MarbleArtwork />

      <div className="sd-content">
        <p className="sd-eyebrow">A DAY TO REMEMBER</p>

        <div className="sd-top-decoration">
          <span />
          <span className="sd-small-heart">♥</span>
          <span />
        </div>

        <div className="sd-title">
          <h1 className="sd-save">SAVE</h1>
          <p className="sd-the">the</p>
          <h2 className="sd-date">DATE</h2>
        </div>

        <div className="sd-floral-divider">
          <span />
          <span className="sd-ornament">✳</span>
          <span />
        </div>

        <h3 className="sd-calendar-heading">NOVEMBER</h3>

        <div className="sd-year-row">
          <span />
          <p>2026</p>
          <span />
        </div>

        <div className="sd-calendar">
          <div className="sd-weekdays">
            {["S", "M", "T", "W", "T", "F", "S"].map(
              (day, i) => (
                <span key={i} className="sd-weekday">
                  {day}
                </span>
              )
            )}
          </div>

          <div className="sd-calendar-grid">
            {days.map((day) => (
              <div
                key={day}
                className={`sd-day ${
                  day === 24 ? "sd-selected" : ""
                }`}
              >
                {day === 24 ? (
                  <span className="sd-date-heart">
                    <span>24</span>
                    <i>♥</i>
                  </span>
                ) : (
                  day
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sd-footer">
          <span className="sd-footer-line" />
          <p>THE BEGINNING OF FOREVER</p>
        </div>
      </div>
    </section>
  );
}
```