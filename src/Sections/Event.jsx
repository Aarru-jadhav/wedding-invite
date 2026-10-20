
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    number: "I",
    title: "HALDI",
    date: "23rd NOVEMBER 2026",
    time: "2:30 PM",
  },
  {
    number: "II",
    title: "MEHNDI",
    date: "23rd NOVEMBER 2026",
    time: "7:00 PM",
  },
  {
    number: "III",
    title: "BARAT",
    date: "24th NOVEMBER 2026",
    time: "9:30 AM",
  },
  {
    number: "IV",
    title: "PHERE",
    date: "24th NOVEMBER 2026",
    time: "11:00 AM",
  },
  {
    number: "V",
    title: "BHOJAN",
    date: "24th NOVEMBER 2026",
    time: "12:30 PM ONWARDS",
  },
  {
    number: "VI",
    title: "VARMALA",
    date: "24th NOVEMBER 2026",
    time: "2:30 PM",
  },
  {
    number: "VII",
    title: "VIDAI",
    date: "24th NOVEMBER 2026",
    time: "4:30 PM",
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
      // CENTER LINE ANIMATION
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
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

      // MOVING GOLD ORNAMENT
      gsap.to(ornamentRef.current, {
        y: () =>
          timelineRef.current.offsetHeight -
          (window.innerWidth >= 768 ? 65 : 45),
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 65%",
          end: "bottom 65%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // EVENT CARD REVEALS
      eventRefs.current.forEach((item) => {
        if (!item) return;

        const content = item.querySelector(".event-card");
        if (!content) return;

        gsap.fromTo(
          content,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
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
        overflow-x-clip
        overflow-y-hidden
        bg-[#21090e]
        py-20
        text-[#f5ead7]
        sm:py-24
        md:py-32
      "
    >
      {/* LUXURY BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
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

        <div
          className="
            absolute
            left-[15%]
            top-[40%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-[#c49a52]/[0.08]
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.055]
            [background-image:radial-gradient(#d4b06b_0.6px,transparent_0.6px)]
            [background-size:18px_18px]
          "
        />

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

      {/* DECORATIVE CORNERS */}
      <div className="pointer-events-none absolute left-5 top-5 h-20 w-20 border-l border-t border-[#c9a45c]/30 sm:h-24 sm:w-24 md:left-10 md:top-10 md:h-36 md:w-36" />

      <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 border-r border-t border-[#c9a45c]/30 sm:h-24 sm:w-24 md:right-10 md:top-10 md:h-36 md:w-36" />

      <div className="pointer-events-none absolute bottom-5 left-5 h-20 w-20 border-b border-l border-[#c9a45c]/30 sm:h-24 sm:w-24 md:bottom-10 md:left-10 md:h-36 md:w-36" />

      <div className="pointer-events-none absolute bottom-5 right-5 h-20 w-20 border-b border-r border-[#c9a45c]/30 sm:h-24 sm:w-24 md:bottom-10 md:right-10 md:h-36 md:w-36" />

      {/* HEADER */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-14 bg-[#c9a45c]/50 md:w-24" />
          <span className="text-xl text-[#d2ad64]">❦</span>
          <span className="h-px w-14 bg-[#c9a45c]/50 md:w-24" />
        </div>

        <p className="text-[9px] uppercase tracking-[0.35em] text-[#d0ac67] sm:tracking-[0.55em] md:text-xs">
          A Celebration Of Love
        </p>

        <h2 className="mt-4 font-serif text-4xl font-light tracking-[0.02em] text-[#f7ead4] sm:text-6xl md:text-8xl">
          The Celebrations
        </h2>

        <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-relaxed text-[#cdbb9d] md:text-base">
          Join us as we celebrate every beautiful
          chapter leading to our forever.
        </p>
      </div>

      {/* TIMELINE */}
      <div
        ref={timelineRef}
        className="relative z-10 mx-auto mt-14 max-w-6xl px-1 sm:mt-16 sm:px-4 md:mt-24 md:px-8"
      >
        {/* CENTER LINE */}
        <div
          ref={lineRef}
          className="absolute bottom-0 left-1/2 top-0 z-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c9a45c]/70 to-transparent"
        />

        {/* MOVING GOLD ORNAMENT */}
        <div
          ref={ornamentRef}
          className="pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d0aa5e] bg-[#21090e] shadow-[0_0_0_4px_#21090e] sm:h-12 sm:w-12 md:h-16 md:w-16 md:shadow-[0_0_0_6px_#21090e]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c9a45c]/50 sm:h-8 sm:w-8 md:h-11 md:w-11">
              <span className="text-sm text-[#d0aa5e] md:text-lg">
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
                key={event.number}
                ref={(el) => {
                  eventRefs.current[index] = el;
                }}
                className="
                  relative
                  grid
                  min-h-[155px]
                  grid-cols-2
                  sm:min-h-[180px]
                  md:min-h-[230px]
                "
              >
                {/* LEFT COLUMN */}
                <div
                  className={`
                    flex min-w-0 items-center
                    ${
                      isLeft
                        ? "justify-end pr-5 text-right sm:pr-7 md:pr-20"
                        : "justify-end pr-5 sm:pr-7 md:pr-20"
                    }
                  `}
                >
                  {isLeft && <EventCard event={event} />}
                </div>

                {/* RIGHT COLUMN */}
                <div
                  className={`
                    flex min-w-0 items-center
                    ${
                      !isLeft
                        ? "justify-start pl-5 text-left sm:pl-7 md:pl-20"
                        : "justify-start pl-5 sm:pl-7 md:pl-20"
                    }
                  `}
                >
                  {!isLeft && <EventCard event={event} />}
                </div>

                {/* SMALL CENTER DIAMOND */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-4 w-4 rotate-45 items-center justify-center border border-[#c9a45c] bg-[#21090e] sm:h-5 sm:w-5 md:h-7 md:w-7">
                    <div className="h-1.5 w-1.5 bg-[#c9a45c]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 mt-10 px-5 text-center sm:mt-12 md:mt-16">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-[#c9a45c]/40" />
          <span className="text-lg text-[#d0aa5e]">❦</span>
          <span className="h-px w-12 bg-[#c9a45c]/40" />
        </div>

        <p className="font-serif text-base italic text-[#cdbb9d] md:text-xl">
          Every celebration is a chapter of our story.
        </p>
      </div>
    </section>
  );
}

/* EVENT CARD */
function EventCard({ event }) {
  return (
    <div className="event-card relative w-full min-w-0 max-w-[175px] py-3 sm:max-w-[220px] sm:py-4 md:max-w-[330px] md:py-5">
      {/* GOLD VERTICAL ACCENT */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#c9a45c]/40 to-transparent" />

      {/* CONTENT */}
      <div className="relative min-w-0 px-2 sm:px-4 md:px-7">
        {/* SEQUENCE NUMBER */}
        <p className="mb-1.5 font-serif text-xs tracking-[0.3em] text-[#c9a45c] sm:mb-2 md:text-sm">
          {event.number}
        </p>

        {/* DATE */}
        <p className="break-words text-[11px] uppercase leading-relaxed tracking-[0.04em] text-[#bfae91] sm:text-sm sm:tracking-[0.1em] md:text-base md:tracking-[0.16em]">
          {event.date}
        </p>

        {/* EVENT NAME */}
        <h3 className="mt-1.5 break-words font-serif text-[clamp(17px,4.5vw,24px)] font-light leading-tight tracking-[0.01em] text-[#f5e8d4] sm:mt-2 sm:text-2xl sm:tracking-[0.04em] md:text-5xl md:tracking-[0.08em]">
          {event.title}
        </h3>

        {/* GOLD ORNAMENT */}
        <div className="my-2 flex items-center gap-2 sm:my-3 md:my-4">
          <span className="h-px w-6 bg-[#c9a45c]/50 md:w-10" />
          <span className="text-[9px] text-[#d0aa5e]">✦</span>
        </div>

        {/* TIME */}
        <p className="font-serif text-sm italic leading-relaxed text-[#d4c4a8] sm:text-base md:text-lg">
          {event.time}
        </p>
      </div>
    </div>
  );
}
