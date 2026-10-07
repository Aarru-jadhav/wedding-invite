
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const days = [
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28,
  29, 30,
];

export default function SaveTheDate() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const contentRef = useRef(null);
  const heartRef = useRef(null);
  const shineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        frameRef.current,
        {
          opacity: 0,
          scale: 0.94,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
        }
      ).fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7"
      );

      gsap.fromTo(
        heartRef.current,
        {
          scale: 0.5,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(heartRef.current, {
        scale: 1.08,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(shineRef.current, {
        x: "120%",
        duration: 4,
        repeat: -1,
        repeatDelay: 3,
        ease: "power2.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        min-h-[670px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#eee3d5]
        px-4
        py-8
        text-[#51443c]
        md:min-h-[720px]
      "
    >
      {/* =====================================================
          BACKGROUND DEPTH
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* warm center light */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[560px]
            w-[560px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#d2bea8]/35
            blur-[80px]
          "
        />

        {/* large soft radial ornament */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[620px]
            w-[620px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#9b8b7f]/10
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[570px]
            w-[570px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#9b8b7f]/10
          "
        />

      </div>

      {/* =====================================================
          LARGE SIDE ORNAMENTS
      ===================================================== */}

      <SideFloral
        side="left"
        className="
          absolute
          left-[-30px]
          top-1/2
          hidden
          h-[500px]
          w-[180px]
          -translate-y-1/2
          text-[#81736a]/35
          md:block
        "
      />

      <SideFloral
        side="right"
        className="
          absolute
          right-[-30px]
          top-1/2
          hidden
          h-[500px]
          w-[180px]
          -translate-y-1/2
          rotate-180
          text-[#81736a]/35
          md:block
        "
      />

      {/* =====================================================
          TOP CORNER FLOURISH
      ===================================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          h-[190px]
          w-[190px]
          text-[#81736a]/35
        "
      >
        <CornerFlourish />
      </div>

      <div
        className="
          absolute
          right-0
          top-0
          h-[190px]
          w-[190px]
          rotate-90
          text-[#81736a]/35
        "
      >
        <CornerFlourish />
      </div>

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[190px]
          w-[190px]
          -rotate-90
          text-[#81736a]/35
        "
      >
        <CornerFlourish />
      </div>

      <div
        className="
          absolute
          bottom-0
          right-0
          h-[190px]
          w-[190px]
          rotate-180
          text-[#81736a]/35
        "
      >
        <CornerFlourish />
      </div>

      {/* =====================================================
          MAIN FRAME
      ===================================================== */}

      <div
        ref={frameRef}
        className="
          relative
          z-10
          w-full
          max-w-[500px]
        "
      >

        {/* Outer frame */}

        <div
          className="
            relative
            border
            border-[#8c7e73]/45
            p-[5px]
            shadow-[0_15px_50px_rgba(95,77,62,0.12)]
          "
        >

          {/* Inner frame */}

          <div
            className="
              relative
              overflow-hidden
              border
              border-[#9c8d82]/30
              bg-[#f4ebe1]/85
              px-7
              py-8
              sm:px-10
              md:px-12
              md:py-9
            "
          >

            {/* =================================================
                EMBOSSED INNER ORNAMENT
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                inset-3
                border
                border-[#9b8c81]/15
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                inset-6
                border
                border-dashed
                border-[#9b8c81]/10
              "
            />

            {/* =================================================
                TOP FLORAL
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[-3px]
                w-[92%]
                -translate-x-1/2
                text-[#81736a]/45
              "
            >
              <LargeFloral />
            </div>

            {/* =================================================
                BOTTOM FLORAL
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-3px]
                left-1/2
                w-[92%]
                -translate-x-1/2
                rotate-180
                text-[#81736a]/45
              "
            >
              <LargeFloral />
            </div>

            {/* =================================================
                CONTENT
            ================================================= */}

            <div
              ref={contentRef}
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                text-center
              "
            >

              {/* small title */}

              <p
                className="
                  mt-4
                  text-[7px]
                  uppercase
                  tracking-[0.5em]
                  text-[#8b7c71]
                "
              >
                Save The Date
              </p>

              {/* Month */}

              <h2
                className="
                  mt-3
                  font-serif
                  text-[45px]
                  font-normal
                  italic
                  leading-none
                  tracking-[-0.02em]
                  text-[#51443c]
                  sm:text-[50px]
                "
              >
                November
              </h2>

              {/* Year */}

              <p
                className="
                  mt-1
                  font-serif
                  text-[19px]
                  tracking-[0.25em]
                  text-[#76685f]
                "
              >
                2026
              </p>

              {/* =================================================
                  ORNAMENT DIVIDER
              ================================================= */}

              <div className="my-5 flex items-center gap-3">

                <span className="h-px w-12 bg-[#9a8b80]/35" />

                <span className="text-[9px] text-[#9a7139]">
                  ❦
                </span>

                <span className="h-px w-12 bg-[#9a8b80]/35" />

              </div>

              {/* =================================================
                  CALENDAR
              ================================================= */}

              <div className="w-full max-w-[330px]">

                {/* Week */}

                <div
                  className="
                    grid
                    grid-cols-7
                    border-b
                    border-[#9b8c81]/25
                    pb-2
                  "
                >
                  {[
                    "S",
                    "M",
                    "T",
                    "W",
                    "T",
                    "F",
                    "S",
                  ].map((day, index) => (
                    <div
                      key={`${day}-${index}`}
                      className="
                        text-[8px]
                        font-medium
                        tracking-[0.15em]
                        text-[#81736a]
                      "
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Dates */}

                <div className="grid grid-cols-7">

                  {days.map((day) => {
                    const wedding = day === 24;

                    return (
                      <div
                        key={day}
                        className="
                          relative
                          flex
                          h-9
                          items-center
                          justify-center
                        "
                      >

                        <span
                          className={`
                            relative
                            z-10
                            font-serif
                            text-[10px]
                            ${
                              wedding
                                ? "font-medium text-[#51443c]"
                                : "text-[#70635a]"
                            }
                          `}
                        >
                          {day}
                        </span>

                        {wedding && (
                          <div
                            ref={heartRef}
                            className="
                              absolute
                              left-1/2
                              top-1/2
                              h-9
                              w-10
                              -translate-x-1/2
                              -translate-y-1/2
                            "
                          >
                            <svg
                              viewBox="0 0 50 45"
                              className="h-full w-full"
                            >
                              <path
                                d="
                                  M25 40
                                  C22 37 5 27 5 15
                                  C5 8 10 4 16 4
                                  C20 4 23 6 25 10
                                  C27 6 30 4 34 4
                                  C40 4 45 8 45 15
                                  C45 27 28 37 25 40Z
                                "
                                fill="none"
                                stroke="#85776d"
                                strokeWidth="1.15"
                              />
                            </svg>
                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* =================================================
                  WEDDING DATE
              ================================================= */}

              <div className="mt-5">

                <div className="flex items-center justify-center gap-3">

                  <span className="h-px w-9 bg-[#a68149]/35" />

                  <span className="text-[8px] text-[#9a7139]">
                    ✦
                  </span>

                  <span className="h-px w-9 bg-[#a68149]/35" />

                </div>

                <p
                  className="
                    mt-3
                    text-[7px]
                    uppercase
                    tracking-[0.4em]
                    text-[#8b7c71]
                  "
                >
                  Our Wedding Day
                </p>

                <p
                  className="
                    mt-2
                    font-serif
                    text-lg
                    tracking-[0.08em]
                    text-[#51443c]
                  "
                >
                  24 November 2026
                </p>

                <p
                  className="
                    mt-1
                    font-serif
                    text-[9px]
                    italic
                    text-[#85776d]
                  "
                >
                  The day our forever begins
                </p>

              </div>

            </div>

            {/* =================================================
                GOLD SHIMMER
            ================================================= */}

            <div
              ref={shineRef}
              className="
                pointer-events-none
                absolute
                -left-[30%]
                top-0
                h-full
                w-[15%]
                -skew-x-12
                bg-gradient-to-r
                from-transparent
                via-white/20
                to-transparent
              "
            />

          </div>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   LARGE FLORAL ORNAMENT
============================================================ */

function LargeFloral() {
  return (
    <svg
      viewBox="0 0 600 130"
      className="h-auto w-full"
      fill="none"
    >
      <path
        d="
          M10 105
          C45 98 42 70 70 73
          C95 76 92 102 118 89
          C145 75 142 40 170 45
          C195 50 195 80 220 68
          C240 58 245 28 260 25

          M590 105
          C555 98 558 70 530 73
          C505 76 508 102 482 89
          C455 75 458 40 430 45
          C405 50 405 80 380 68
          C360 58 355 28 340 25
        "
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {/* Center flower */}

      <ellipse
        cx="300"
        cy="48"
        rx="12"
        ry="20"
        stroke="currentColor"
      />

      <ellipse
        cx="300"
        cy="48"
        rx="20"
        ry="12"
        stroke="currentColor"
      />

      <circle
        cx="300"
        cy="48"
        r="4"
        stroke="currentColor"
      />

      {/* left leaves */}

      <path
        d="
          M170 45
          C155 25 130 20 120 27
          C133 42 151 48 170 45Z

          M118 89
          C98 68 75 68 66 78
          C79 92 99 97 118 89Z
        "
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* right leaves */}

      <path
        d="
          M430 45
          C445 25 470 20 480 27
          C467 42 449 48 430 45Z

          M482 89
          C502 68 525 68 534 78
          C521 92 501 97 482 89Z
        "
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* tiny flowers */}

      <circle cx="205" cy="62" r="3" stroke="currentColor" />
      <circle cx="395" cy="62" r="3" stroke="currentColor" />

      <circle cx="145" cy="77" r="2.5" stroke="currentColor" />
      <circle cx="455" cy="77" r="2.5" stroke="currentColor" />

    </svg>
  );
}


/* ============================================================
   CORNER FLOURISH
============================================================ */

function CornerFlourish() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-full w-full"
      fill="none"
    >
      <path
        d="
          M10 190
          C10 120 20 65 70 25
          C105 0 145 8 185 10

          M30 190
          C32 130 45 90 82 55
          C112 27 145 25 180 28
        "
        stroke="currentColor"
        strokeWidth="1.1"
      />

      <path
        d="
          M68 28
          C60 12 45 7 36 12
          C42 27 54 35 68 28Z

          M84 54
          C76 38 61 34 51 40
          C58 54 70 61 84 54Z

          M48 84
          C35 72 20 73 15 82
          C27 93 38 96 48 84Z
        "
        stroke="currentColor"
        strokeWidth="1"
      />

      <circle
        cx="68"
        cy="28"
        r="3"
        stroke="currentColor"
      />

      <circle
        cx="84"
        cy="54"
        r="2.5"
        stroke="currentColor"
      />

    </svg>
  );
}


/* ============================================================
   SIDE FLORAL
============================================================ */

function SideFloral({ className, side }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 500"
      fill="none"
    >
      <path
        d="
          M90 500
          C80 430 105 385 78 330
          C55 283 68 230 105 195
          C130 172 125 130 92 100
          C72 82 72 45 100 10
        "
        stroke="currentColor"
        strokeWidth="1.2"
      />

      <path
        d="
          M78 330
          C48 315 30 290 35 270
          C58 273 76 293 78 330Z

          M105 195
          C135 183 153 162 149 143
          C125 147 108 166 105 195Z

          M92 100
          C65 88 50 66 55 48
          C78 55 91 75 92 100Z
        "
        stroke="currentColor"
        strokeWidth="1"
      />

      <circle
        cx="35"
        cy="270"
        r="4"
        stroke="currentColor"
      />

      <circle
        cx="149"
        cy="143"
        r="4"
        stroke="currentColor"
      />

      <circle
        cx="55"
        cy="48"
        r="4"
        stroke="currentColor"
      />
    </svg>
  );
}