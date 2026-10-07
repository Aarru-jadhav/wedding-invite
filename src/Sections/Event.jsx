import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    number: "I",
    title: "HALDI",
    date: "DATE TO BE UPDATED",
    time: "TIME TO BE UPDATED",
    venue: "Boho Farms & Retreat",
  },
  {
    number: "II",
    title: "MEHENDI",
    date: "DATE TO BE UPDATED",
    time: "TIME TO BE UPDATED",
    venue: "Boho Farms & Retreat",
  },
  {
    number: "III",
    title: "SANGEET",
    date: "DATE TO BE UPDATED",
    time: "TIME TO BE UPDATED",
    venue: "Boho Farms & Retreat",
  },
  {
    number: "IV",
    title: "WEDDING",
    date: "24 NOVEMBER 2026",
    time: "TIME TO BE UPDATED",
    venue: "Boho Farms & Retreat",
  },
  {
    number: "V",
    title: "RECEPTION",
    date: "DATE TO BE UPDATED",
    time: "TIME TO BE UPDATED",
    venue: "Boho Farms & Retreat",
  },
];

export default function Events() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const ornamentRef = useRef(null);
  const eventRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ==========================================
         CENTER LINE
      ========================================== */

      gsap.fromTo(
        lineRef.current,
        {
          scaleY: 0,
        },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      /* ==========================================
         MOVING GOLD ORNAMENT
      ========================================== */

      gsap.to(ornamentRef.current, {
        y: () => timelineRef.current.offsetHeight - 90,
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 65%",
          end: "bottom 65%",
          scrub: 1,
        },
      });

      /* ==========================================
         EVENT REVEALS
      ========================================== */

      eventRefs.current.forEach((item, index) => {
        if (!item) return;

        const content = item.querySelector(".event-card");

        gsap.fromTo(
          content,
          {
            opacity: 0,
            x: index % 2 === 0 ? -70 : 70,
            y: 25,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#21090e]
        py-28
        text-[#f5ead7]
        md:py-36
      "
    >
      {/* =================================================
          LUXURY BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">

        {/* Center glow */}

        <div
          className="
            absolute
            left-1/2
            top-[20%]
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#8c4b39]/15
            blur-[130px]
          "
        />

        {/* Gold ambient light */}

        <div
          className="
            absolute
            left-[15%]
            top-[40%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-[#c49a52]/8
            blur-[100px]
          "
        />

        {/* Fine texture */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.055]
            [background-image:radial-gradient(#d4b06b_0.6px,transparent_0.6px)]
            [background-size:18px_18px]
          "
        />

        {/* Top vignette */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-72
            bg-gradient-to-b
            from-[#100406]
            to-transparent
          "
        />

        {/* Bottom vignette */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-72
            bg-gradient-to-t
            from-[#100406]
            to-transparent
          "
        />

      </div>

      {/* =================================================
          DECORATIVE CORNERS
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-5
          top-5
          h-24
          w-24
          border-l
          border-t
          border-[#c9a45c]/30
          md:left-10
          md:top-10
          md:h-36
          md:w-36
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          h-24
          w-24
          border-r
          border-t
          border-[#c9a45c]/30
          md:right-10
          md:top-10
          md:h-36
          md:w-36
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          left-5
          h-24
          w-24
          border-b
          border-l
          border-[#c9a45c]/30
          md:bottom-10
          md:left-10
          md:h-36
          md:w-36
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          h-24
          w-24
          border-b
          border-r
          border-[#c9a45c]/30
          md:bottom-10
          md:right-10
          md:h-36
          md:w-36
        "
      />

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center">

        <div className="mb-7 flex items-center justify-center gap-4">

          <span className="h-px w-14 bg-[#c9a45c]/50 md:w-24" />

          <span className="text-xl text-[#d2ad64]">
            ❦
          </span>

          <span className="h-px w-14 bg-[#c9a45c]/50 md:w-24" />

        </div>

        <p
          className="
            text-[9px]
            uppercase
            tracking-[0.55em]
            text-[#d0ac67]
            md:text-xs
          "
        >
          A Celebration Of Love
        </p>

        <h2
          className="
            mt-5
            font-serif
            text-5xl
            font-light
            tracking-[0.04em]
            text-[#f7ead4]
            sm:text-6xl
            md:text-8xl
          "
        >
          The Celebrations
        </h2>

        <p
          className="
            mx-auto
            mt-6
            max-w-md
            font-serif
            text-sm
            italic
            leading-relaxed
            text-[#cdbb9d]
            md:text-base
          "
        >
          Join us as we celebrate every beautiful
          chapter leading to our forever.
        </p>

      </div>

      {/* =================================================
          TIMELINE
      ================================================= */}

      <div
        ref={timelineRef}
        className="
          relative
          z-10
          mx-auto
          mt-20
          max-w-6xl
          px-4
          md:mt-28
          md:px-8
        "
      >

        {/* CENTER LINE */}

        <div
          ref={lineRef}
          className="
            absolute
            bottom-0
            left-1/2
            top-0
            z-0
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-transparent
            via-[#c9a45c]/70
            to-transparent
          "
        />

        {/* MOVING ORNAMENT */}

        <div
          ref={ornamentRef}
          className="
            absolute
            left-1/2
            top-0
            z-30
            -translate-x-1/2
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-[#d0aa5e]
              bg-[#21090e]
              shadow-[0_0_0_7px_#21090e]
              md:h-20
              md:w-20
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#c9a45c]/50
                md:h-14
                md:w-14
              "
            >
              <span className="text-xl text-[#d0aa5e] md:text-2xl">
                ❦
              </span>
            </div>
          </div>
        </div>

        {/* EVENTS */}

        <div className="relative">

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={event.title}
                ref={(el) => {
                  eventRefs.current[index] = el;
                }}
                className="
                  relative
                  grid
                  min-h-[220px]
                  grid-cols-2
                  md:min-h-[270px]
                "
              >

                {/* ======================================
                    LEFT
                ====================================== */}

                <div
                  className={`
                    flex
                    min-w-0
                    items-center
                    ${
                      isLeft
                        ? "justify-end pr-7 text-right md:pr-20"
                        : "justify-end pr-7 md:pr-20"
                    }
                  `}
                >

                  {isLeft && (
                    <EventCard event={event} />
                  )}

                </div>

                {/* ======================================
                    RIGHT
                ====================================== */}

                <div
                  className={`
                    flex
                    min-w-0
                    items-center
                    ${
                      !isLeft
                        ? "justify-start pl-7 text-left md:pl-20"
                        : "justify-start pl-7 md:pl-20"
                    }
                  `}
                >

                  {!isLeft && (
                    <EventCard event={event} />
                  )}

                </div>

                {/* CENTER JEWEL */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    z-20
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                >
                  <div
                    className="
                      flex
                      h-7
                      w-7
                      rotate-45
                      items-center
                      justify-center
                      border
                      border-[#c9a45c]
                      bg-[#21090e]
                    "
                  >
                    <div className="h-2 w-2 bg-[#c9a45c]" />
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* =================================================
          BOTTOM
      ================================================= */}

      <div className="relative z-10 mt-16 px-5 text-center md:mt-20">

        <div className="mb-7 flex items-center justify-center gap-4">

          <span className="h-px w-12 bg-[#c9a45c]/40" />

          <span className="text-lg text-[#d0aa5e]">
            ❦
          </span>

          <span className="h-px w-12 bg-[#c9a45c]/40" />

        </div>

        <p
          className="
            font-serif
            text-base
            italic
            text-[#cdbb9d]
            md:text-xl
          "
        >
          Every celebration is a chapter of our story.
        </p>

      </div>

    </section>
  );
}


/* ======================================================
   EVENT CARD
====================================================== */

function EventCard({ event }) {
  return (
    <div
      className="
        event-card
        relative
        w-full
        max-w-[155px]
        py-5
        md:max-w-[330px]
        md:py-7
      "
    >

      {/* Gold vertical accent */}

      <div
        className="
          absolute
          top-0
          h-full
          w-px
          bg-gradient-to-b
          from-transparent
          via-[#c9a45c]/40
          to-transparent
        "
      />

      {/* CONTENT */}

      <div className="relative px-4 md:px-7">

        {/* Roman number */}

        <p
          className="
            mb-2
            font-serif
            text-[10px]
            tracking-[0.3em]
            text-[#c9a45c]
            md:text-xs
          "
        >
          {event.number}
        </p>

        {/* Date */}

        <p
          className="
            whitespace-nowrap
            text-[7px]
            uppercase
            tracking-[0.15em]
            text-[#bfae91]
            md:text-[9px]
            md:tracking-[0.3em]
          "
        >
          {event.date}
        </p>

        {/* Title */}

        <h3
          className="
            mt-2
            whitespace-nowrap
            font-serif
            text-[25px]
            font-light
            tracking-[0.08em]
            text-[#f5e8d4]
            sm:text-[28px]
            md:text-5xl
          "
        >
          {event.title}
        </h3>

        {/* Ornament */}

        <div className="my-3 flex items-center gap-2 md:my-4">

          <span className="h-px w-6 bg-[#c9a45c]/50 md:w-10" />

          <span className="text-[9px] text-[#d0aa5e]">
            ✦
          </span>

        </div>

        {/* Time */}

        <p
          className="
            font-serif
            text-xs
            italic
            text-[#d4c4a8]
            md:text-base
          "
        >
          {event.time}
        </p>

        {/* Venue */}

        <p
          className="
            mt-1
            max-w-[140px]
            text-[7px]
            uppercase
            tracking-[0.12em]
            text-[#a9987d]
            md:max-w-none
            md:text-[9px]
            md:tracking-[0.2em]
          "
        >
          {event.venue}
        </p>

      </div>

    </div>
  );
}