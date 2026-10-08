import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Savethedate() {
  const sectionRef = useRef(null);

  const paperRef = useRef(null);
  const contentRef = useRef(null);

  const topRollRef = useRef(null);
  const bottomRollRef = useRef(null);

  const calendarRef = useRef(null);
  const heartRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const paper = paperRef.current;
    const content = contentRef.current;
    const topRoll = topRollRef.current;
    const bottomRoll = bottomRollRef.current;
    const calendar = calendarRef.current;
    const heart = heartRef.current;
    const shine = shineRef.current;

    if (!section || !paper || !content || !calendar) return;

    const calendarHeader = calendar.querySelector(".calendar-header");
    const calendarCells = calendar.querySelectorAll(".calendar-cell");
    const calendarLine = calendar.querySelector(".calendar-line");
    const weddingDate = calendar.querySelector(".wedding-date");

    let played = false;
    let animation = null;

    // -----------------------------
    // INITIAL STATE
    // -----------------------------

    gsap.set(paper, {
      height: 0,
      opacity: 1,
      transformOrigin: "top center",
      overflow: "hidden",
    });

    gsap.set(content, {
      opacity: 0,
      y: 25,
    });

    // Calendar starts completely hidden
    // and opens like a paper reveal
    gsap.set(calendar, {
      opacity: 1,
      y: -10,
      scale: 0.96,
      transformOrigin: "top center",
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.set(calendarHeader, {
      opacity: 0,
      y: -5,
    });

    gsap.set(calendarLine, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    gsap.set(calendarCells, {
      opacity: 0,
      y: 5,
      scale: 0.88,
      transformOrigin: "center center",
    });

    gsap.set(weddingDate, {
      opacity: 0,
      y: 12,
    });

    gsap.set(bottomRoll, {
      opacity: 0,
      y: -30,
    });

    gsap.set(heart, {
      opacity: 0,
      scale: 0.25,
      rotation: -15,
      transformOrigin: "center center",
    });

    gsap.set(shine, {
      xPercent: -150,
    });

    // -----------------------------
    // MAIN ANIMATION
    // -----------------------------

    const playAnimation = () => {
      if (played) return;

      played = true;

      animation = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // 1. Scroll opens / paper unrolls
      animation.to(paper, {
        height: "auto",
        duration: 1.65,
        ease: "power3.inOut",
      });

      // 2. Main heading
      animation.to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.85"
      );

      // 3. Calendar begins opening
      animation.to(
        calendar,
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.inOut",
        },
        "-=0.25"
      );

      // 4. Calendar header
      animation.to(
        calendarHeader,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.35"
      );

      // 5. Gold divider draws itself
      animation.to(
        calendarLine,
        {
          scaleX: 1,
          duration: 0.45,
          ease: "power2.inOut",
        },
        "-=0.15"
      );

      // 6. Dates appear one by one
      animation.to(
        calendarCells,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.22,
          stagger: 0.035,
          ease: "back.out(1.5)",
        },
        "-=0.15"
      );

      // 7. Wedding date
      animation.to(
        weddingDate,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.05"
      );

      // 8. Heart pops
      animation.to(
        heart,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.65,
          ease: "back.out(2.2)",
        },
        "-=0.3"
      );

      // 9. Bottom roll comes down
      animation.to(
        bottomRoll,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "back.out(1.7)",
        },
        "-=0.35"
      );

      // -----------------------------
      // CONTINUOUS ANIMATIONS
      // -----------------------------

      // Heart breathing
      gsap.to(heart, {
        scale: 1.07,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4,
      });

      // Top wooden/gold roll slight movement
      gsap.to(topRoll, {
        y: 2,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // Luxury shine passing over calendar
      gsap.to(shine, {
        xPercent: 250,
        duration: 4,
        repeat: -1,
        repeatDelay: 5,
        ease: "power2.inOut",
        delay: 3,
      });
    };

    // -----------------------------
    // INTERSECTION OBSERVER
    // -----------------------------

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              playAnimation();
            }, 250);

            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    // If already visible
    const rect = section.getBoundingClientRect();

    if (
      rect.top < window.innerHeight * 0.8 &&
      rect.bottom > window.innerHeight * 0.2
    ) {
      setTimeout(() => {
        playAnimation();
      }, 300);
    }

    return () => {
      observer.disconnect();

      if (animation) {
        animation.kill();
      }

      gsap.killTweensOf([
        heart,
        topRoll,
        shine,
        paper,
        content,
        calendar,
        calendarHeader,
        calendarLine,
        calendarCells,
        weddingDate,
        bottomRoll,
      ]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-16 sm:py-20"
      style={{
        background: "#eee2cf",
      }}
    >
      {/* --------------------------------
          SOFT BACKGROUND ORNAMENT
      -------------------------------- */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-[420px] h-[420px] sm:w-[600px] sm:h-[600px]
          rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(177,140,76,0.16) 0%, rgba(177,140,76,0) 70%)",
          }}
        />

        {/* Left ornament */}
        <div className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 opacity-30">
          <svg
            width="80"
            height="180"
            viewBox="0 0 80 180"
            fill="none"
          >
            <path
              d="M40 5C20 25 20 55 40 75C60 95 60 125 40 145C30 155 30 165 40 175"
              stroke="#9A7540"
              strokeWidth="1"
            />
            <path
              d="M40 35C25 45 25 60 40 70"
              stroke="#9A7540"
              strokeWidth="1"
            />
            <path
              d="M40 110C55 120 55 135 40 145"
              stroke="#9A7540"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Right ornament */}
        <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 opacity-30 scale-x-[-1]">
          <svg
            width="80"
            height="180"
            viewBox="0 0 80 180"
            fill="none"
          >
            <path
              d="M40 5C20 25 20 55 40 75C60 95 60 125 40 145C30 155 30 165 40 175"
              stroke="#9A7540"
              strokeWidth="1"
            />
            <path
              d="M40 35C25 45 25 60 40 70"
              stroke="#9A7540"
              strokeWidth="1"
            />
            <path
              d="M40 110C55 120 55 135 40 145"
              stroke="#9A7540"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* --------------------------------
          SCROLL
      -------------------------------- */}

      <div className="relative z-10 w-full max-w-[560px] px-4 sm:px-6">
        {/* TOP ROLL */}
        <div
          ref={topRollRef}
          className="relative mx-auto h-[44px] sm:h-[48px] w-[88%] sm:w-[92%] z-20"
        >
          {/* Main rod */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-full h-[18px] sm:h-[20px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #d9bd7b, #9a7135 45%, #e5c982 65%, #8d642f)",
              boxShadow:
                "0 5px 8px rgba(71,48,22,0.25), inset 0 1px 2px rgba(255,255,255,0.65)",
            }}
          />

          {/* Left knob */}
          <div
            className="absolute left-[-9px] sm:left-[-12px] top-1/2 -translate-y-1/2
            w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #f1dc9c, #a47736 60%, #70491e)",
              boxShadow: "0 3px 5px rgba(70,45,18,0.3)",
            }}
          />

          {/* Right knob */}
          <div
            className="absolute right-[-9px] sm:right-[-12px] top-1/2 -translate-y-1/2
            w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #f1dc9c, #a47736 60%, #70491e)",
              boxShadow: "0 3px 5px rgba(70,45,18,0.3)",
            }}
          />
        </div>

        {/* PAPER */}
        <div
          ref={paperRef}
          className="relative mx-auto w-[88%] sm:w-[92%] overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, #ead8bd 0%, #f8eddb 7%, #f8eddb 93%, #ead8bd 100%)",
            borderLeft: "1px solid rgba(151,112,55,0.5)",
            borderRight: "1px solid rgba(151,112,55,0.5)",
            boxShadow:
              "0 12px 30px rgba(70,48,26,0.14), inset 0 0 35px rgba(151,112,55,0.08)",
          }}
        >
          {/* Paper texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(100,70,30,0.14) 0.5px, transparent 0.5px)",
              backgroundSize: "7px 7px",
            }}
          />

          {/* Corner ornament */}
          <div className="absolute top-5 left-5 opacity-50">
            <svg width="38" height="38" viewBox="0 0 38 38">
              <path
                d="M3 30C10 28 11 20 11 15C11 9 16 4 25 4H34"
                stroke="#a27a3e"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M4 21C10 20 13 16 13 11"
                stroke="#a27a3e"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          <div className="absolute top-5 right-5 opacity-50 scale-x-[-1]">
            <svg width="38" height="38" viewBox="0 0 38 38">
              <path
                d="M3 30C10 28 11 20 11 15C11 9 16 4 25 4H34"
                stroke="#a27a3e"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M4 21C10 20 13 16 13 11"
                stroke="#a27a3e"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          {/* --------------------------------
              CONTENT
          -------------------------------- */}

          <div
            ref={contentRef}
            className="relative z-10 text-center pt-[95px] sm:pt-[115px] pb-[95px] sm:pb-[105px] px-5"
          >
            {/* Small heading */}
            <div
              className="text-[9px] sm:text-[10px] tracking-[0.38em] uppercase"
              style={{
                color: "#8c6838",
                fontFamily: "serif",
              }}
            >
              A Day To Remember
            </div>

            {/* Main title */}
            <h2
              className="mt-3 text-[28px] sm:text-[34px] tracking-[0.13em]"
              style={{
                color: "#4d3825",
                fontFamily: "Georgia, serif",
                fontWeight: 400,
              }}
            >
              SAVE THE DATE
            </h2>

            {/* Ornament */}
            <div className="flex items-center justify-center gap-3 mt-4 mb-7">
              <span className="w-[35px] h-[1px] bg-[#b28b4c] opacity-60" />

              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 2C9 2 13 6 13 9C13 12 11 14 9 16C7 14 5 12 5 9C5 6 9 2 9 2Z"
                  stroke="#9A7540"
                  strokeWidth="0.8"
                />
              </svg>

              <span className="w-[35px] h-[1px] bg-[#b28b4c] opacity-60" />
            </div>

            {/* --------------------------------
                MINI CALENDAR
            -------------------------------- */}

            <div
              ref={calendarRef}
              className="relative mx-auto w-full max-w-[160px] sm:max-w-[165px]"
              style={{
                color: "#4d3825",
              }}
            >
              {/* Shine */}
              <div
                ref={shineRef}
                className="absolute pointer-events-none z-20 top-0 bottom-0 w-[25px] opacity-30"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                  transform: "skewX(-18deg)",
                }}
              />

              {/* Calendar outer frame */}
              <div
                className="relative px-2.5 py-2.5 sm:px-3 sm:py-3"
                style={{
                  border: "1px solid rgba(154,117,64,0.65)",
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.22), rgba(183,145,85,0.04))",
                  boxShadow:
                    "0 5px 15px rgba(91,62,29,0.10), inset 0 0 10px rgba(154,117,64,0.05)",
                }}
              >
                {/* Inner border */}
                <div
                  className="absolute inset-[4px] pointer-events-none"
                  style={{
                    border: "1px solid rgba(154,117,64,0.22)",
                  }}
                />

                {/* Month */}
                <div
                  ref={(el) => {
                    if (el) el.classList.add("calendar-header");
                  }}
                  className="relative z-10 text-center"
                >
                  <div
                    className="text-[15px] sm:text-[16px] tracking-[0.15em] uppercase"
                    style={{
                      fontFamily: "Georgia, serif",
                      color: "#60472c",
                    }}
                  >
                    NOVEMBER
                  </div>

                  <div
                    className="text-[6px] sm:text-[7px] tracking-[0.25em] uppercase mt-1"
                    style={{
                      color: "#a17a40",
                    }}
                  >
                    TWO THOUSAND TWENTY SIX
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="calendar-line mt-2.5 mb-2"
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, #b18a4b, transparent)",
                  }}
                />

                {/* Weekdays */}
                <div
                  className="grid grid-cols-7 gap-0.5 mb-1.5"
                  style={{
                    color: "#9a7440",
                  }}
                >
                  {["S", "M", "T", "W", "T", "F", "S"].map(
                    (day, index) => (
                      <div
                        key={index}
                        className="text-center text-[5px] sm:text-[6px] tracking-wide"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-7 gap-y-1">
                  {/* Empty spaces */}
                  {Array.from({ length: 0 }).map((_, index) => (
                    <div key={`empty-${index}`} />
                  ))}

                  {Array.from({ length: 30 }, (_, index) => {
                    const date = index + 1;
                    const isWeddingDay = date === 24;

                    return (
                      <div
                        key={date}
                        className="calendar-cell relative flex items-center justify-center h-[20px] sm:h-[21px]"
                      >
                        {isWeddingDay && (
                          <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{
                              transform: "translateY(1px)",
                            }}
                          >
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                            >
                              <path
                                d="M12.5 21C12.5 21 4 15.8 4 9.5C4 6.3 6.1 4.2 8.8 4.2C10.6 4.2 11.8 5.2 12.5 6.6C13.2 5.2 14.4 4.2 16.2 4.2C18.9 4.2 21 6.3 21 9.5C21 15.8 12.5 21 12.5 21Z"
                                fill="rgba(158,63,54,0.08)"
                                stroke="#9d5b4f"
                                strokeWidth="0.8"
                              />
                            </svg>
                          </div>
                        )}

                        <span
                          className="relative z-10 text-[7px] sm:text-[7px]"
                          style={{
                            color: isWeddingDay ? "#8f4038" : "#5d4832",
                            fontWeight: isWeddingDay ? 600 : 400,
                          }}
                        >
                          {date}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Heart */}
              <div
                ref={heartRef}
                className="absolute left-1/2 -translate-x-1/2 -bottom-[13px] z-20"
              >
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="#f7eddd"
                    stroke="#a77b3e"
                    strokeWidth="1"
                  />

                  <path
                    d="M20 28C20 28 11 22.6 11 16.7C11 13.6 13 11.5 15.7 11.5C17.7 11.5 19.1 12.7 20 14.2C20.9 12.7 22.3 11.5 24.3 11.5C27 11.5 29 13.6 29 16.7C29 22.6 20 28 20 28Z"
                    fill="#9d5b4f"
                  />
                </svg>
              </div>
            </div>

            {/* Wedding date */}
            <div
              className="wedding-date mt-7"
              style={{
                color: "#63482d",
              }}
            >
              <div
                className="text-[17px] sm:text-[20px] tracking-[0.15em]"
                style={{
                  fontFamily: "Georgia, serif",
                }}
              >
                24 NOVEMBER 2026
              </div>

              <div
                className="mt-2 text-[8px] sm:text-[9px] tracking-[0.28em] uppercase"
                style={{
                  color: "#a17a40",
                }}
              >
                The Beginning Of Forever
              </div>
            </div>

            {/* Bottom ornament */}
            <div className="mt-6 flex justify-center">
              <svg
                width="95"
                height="20"
                viewBox="0 0 95 20"
                fill="none"
              >
                <path
                  d="M2 10H34C38 10 41 7 44 4C47 7 48 10 48 10C48 10 49 13 52 16C55 13 58 10 61 10H93"
                  stroke="#a47b40"
                  strokeWidth="0.8"
                />
                <circle
                  cx="48"
                  cy="10"
                  r="2"
                  fill="#a47b40"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* --------------------------------
            BOTTOM ROLL
        -------------------------------- */}

        <div
          ref={bottomRollRef}
          className="relative mx-auto h-[44px] sm:h-[48px] w-[88%] sm:w-[92%] z-20"
        >
          {/* Rod */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-full h-[18px] sm:h-[20px] rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #d9bd7b, #9a7135 45%, #e5c982 65%, #8d642f)",
              boxShadow:
                "0 5px 8px rgba(71,48,22,0.25), inset 0 1px 2px rgba(255,255,255,0.65)",
            }}
          />

          {/* Left knob */}
          <div
            className="absolute left-[-9px] sm:left-[-12px] top-1/2 -translate-y-1/2
            w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #f1dc9c, #a47736 60%, #70491e)",
              boxShadow: "0 3px 5px rgba(70,45,18,0.3)",
            }}
          />

          {/* Right knob */}
          <div
            className="absolute right-[-9px] sm:right-[-12px] top-1/2 -translate-y-1/2
            w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #f1dc9c, #a47736 60%, #70491e)",
              boxShadow: "0 3px 5px rgba(70,45,18,0.3)",
            }}
          />
        </div>
      </div>
    </section>
  )
}