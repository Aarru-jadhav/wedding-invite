import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import venueImage from "../assets/images/boho-farms.png";

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow cinematic image movement
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Decorative line
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
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
        bg-[#160908]
        text-[#f5ead7]
      "
    >
      {/* =================================================
          VENUE IMAGE
      ================================================= */}

      <div
        className="
          relative
          h-[680px]
          w-full
          overflow-hidden
          sm:h-[720px]
          md:h-[820px]
          lg:h-[900px]
        "
      >
        <img
          ref={imageRef}
          src={venueImage}
          alt="Boho Farms & Retreat, Indore"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* =================================================
            CINEMATIC OVERLAYS
        ================================================= */}

        {/* Overall warm darkening */}
        <div
          className="
            absolute
            inset-0
            bg-[#220c09]/20
          "
        />

        {/* Top gradient */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-[35%]
            bg-gradient-to-b
            from-[#160908]/60
            to-transparent
          "
        />

        {/* Bottom gradient */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[65%]
            bg-gradient-to-t
            from-[#160908]
            via-[#160908]/55
            to-transparent
          "
        />

        {/* Soft center vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_25%,rgba(20,7,6,0.28)_100%)]
          "
        />

        {/* =================================================
            TOP LABEL
        ================================================= */}

        <div
          className="
            absolute
            left-1/2
            top-10
            z-20
            -translate-x-1/2
            text-center
            md:top-14
          "
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#d5b36a]/70 md:w-16" />

            <span className="text-lg text-[#d5b36a]">
              ❦
            </span>

            <span className="h-px w-10 bg-[#d5b36a]/70 md:w-16" />
          </div>

          <p
            className="
              mt-4
              whitespace-nowrap
              text-[9px]
              uppercase
              tracking-[0.5em]
              text-[#ead4a7]
              md:text-xs
            "
          >
            The Venue
          </p>
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          ref={contentRef}
          className="
            absolute
            inset-x-0
            bottom-20
            z-20
            px-5
            text-center
            md:bottom-24
          "
        >
          <div className="mx-auto max-w-5xl">

            {/* Venue name */}

            <h2
              className="
                font-serif
                text-[38px]
                font-light
                leading-[1.05]
                tracking-[0.02em]
                text-[#fff3df]
                sm:text-5xl
                md:text-7xl
                lg:text-8xl
              "
            >
              Boho Farms
              <span className="mx-2 text-[#d5b36a] md:mx-4">
                &
              </span>
              Retreat
            </h2>

            {/* Location */}

            <p
              className="
                mt-4
                text-[9px]
                uppercase
                tracking-[0.5em]
                text-[#e1c78e]
                md:text-xs
              "
            >
              Indore
            </p>

            {/* Decorative line */}

            <div className="mx-auto my-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d5b36a]/50 md:w-12" />

              <span className="text-xs text-[#d5b36a]">
                ✦
              </span>

              <span className="h-px w-8 bg-[#d5b36a]/50 md:w-12" />
            </div>

            {/* Address */}

            <p
              className="
                mx-auto
                max-w-xl
                font-serif
                text-sm
                leading-relaxed
                text-[#f1dfc5]
                md:text-base
              "
            >
              199/2/1, Purshottam Agarwal Marg,
              <br />
              Next to Makwana Warehouse, Ambamoliya,
              <br className="sm:hidden" />
              Indore – 452016
            </p>

            {/* Button */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Boho+Farms+%26+Retreat+Indore"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-7
                inline-flex
                items-center
                gap-3
                border
                border-[#d5b36a]/70
                bg-[#1b0908]/35
                px-7
                py-3
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#f4e3c5]
                backdrop-blur-[3px]
                transition-all
                duration-500
                hover:bg-[#7d2630]
                hover:border-[#7d2630]
                md:px-9
                md:py-3.5
              "
            >
              <span>View Location</span>

              <span className="text-sm">
                →
              </span>
            </a>

          </div>
        </div>

        

      </div>

      {/* =================================================
          SMALL BOTTOM TRANSITION
      ================================================= */}

      <div
        ref={lineRef}
        className="
          mx-auto
          h-px
          w-24
          origin-center
          bg-[#d5b36a]/40
        "
      />

      <div className="h-16 bg-[#160908]" />
    </section>
  );
}