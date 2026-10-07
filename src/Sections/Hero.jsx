import { useRef, useState } from "react";
import { gsap } from "gsap";

import openingImage from "../assets/images/wed1.png";
import weddingGif from "../assets/video/wedding-intro.gif";

export default function Hero() {
  const [opened, setOpened] = useState(false);

  const leftPanel = useRef(null);
  const rightPanel = useRef(null);
  const button = useRef(null);

  const gifSection = useRef(null);
  const weddingContent = useRef(null);

  const handleOpen = () => {
    if (opened) return;

    setOpened(true);

    const tl = gsap.timeline();

    // =========================================
    // 1. INVISIBLE TAP BUTTON DISAPPEARS
    // =========================================

    tl.to(button.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    })

      // =========================================
      // 2. LEFT DOOR OPENS
      // =========================================

      .to(
        leftPanel.current,
        {
          xPercent: -100,
          duration: 3.5,
          ease: "power3.inOut",
        },
        0.4
      )

      // =========================================
      // 3. RIGHT DOOR OPENS
      // =========================================

      .to(
        rightPanel.current,
        {
          xPercent: 100,
          duration: 3.5,
          ease: "power3.inOut",
        },
        "<"
      )

      // =========================================
      // 4. GIF APPEARS AFTER OPENING
      // =========================================

      .to(
        gifSection.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        "-=0.3"
      )

      // =========================================
      // 5. TEXT APPEARS
      // =========================================

      .fromTo(
        weddingContent.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8"
      );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#190505]">

      {/* =========================================
          GIF BACKGROUND
      ========================================== */}

      <div
        ref={gifSection}
        className="
          absolute
          inset-0
          z-0
          scale-[1.04]
          opacity-0
        "
      >

        <img
          src={weddingGif}
          alt=""
          className="
            h-full
            w-full
            object-cover
          "
        />

      </div>


      {/* =========================================
          TEXT OVER GIF
      ========================================== */}

      <div
        ref={weddingContent}
        className="
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center
          px-6
          text-center
          text-[#49351f]
          opacity-0
        "
      >

        <div className="max-w-5xl">

          {/* TOP DECORATION */}

          <div className="mb-7 flex items-center justify-center gap-5">

            <span className="h-px w-14 bg-[#8d6a3e]/50" />

            <span className="text-xl text-[#8d6a3e]">
              ❦
            </span>

            <span className="h-px w-14 bg-[#8d6a3e]/50" />

          </div>


          {/* INTRO */}

          <p className="
            mb-7
            font-serif
            text-base
            tracking-[0.08em]
            md:text-xl
          ">
            Mark your Calendars to rejoice in the Wedding of
          </p>


          {/* NAME 1 */}

          <h1 className="
            font-serif
            text-5xl
            font-medium
            tracking-[0.06em]
            md:text-7xl
            lg:text-8xl
          ">
            MANAV PARIDHI
          </h1>


          {/* & */}

          <div className="
            my-3
            font-serif
            text-4xl
            text-[#80633c]
            md:text-5xl
          ">
            &
          </div>


          {/* NAME 2 */}

          <h2 className="
            font-serif
            text-5xl
            font-medium
            tracking-[0.06em]
            md:text-7xl
            lg:text-8xl
          ">
            RAAG PRANVI
          </h2>


          {/* SCROLL */}

          <div className="mt-14">

            <p className="
              text-[10px]
              uppercase
              tracking-[0.4em]
              text-[#705a3c]
              md:text-xs
            ">
              Scroll
            </p>

            <div className="
              mt-2
              text-lg
              text-[#705a3c]
            ">
              ↓
            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          ORIGINAL ENVELOPE — LEFT
      ========================================== */}

      <div
        ref={leftPanel}
        className="
          absolute
          left-0
          top-0
          z-50
          h-full
          w-1/2
          overflow-hidden
        "
      >

        <img
          src={openingImage}
          alt=""
          className="
            absolute
            left-0
            top-0
            h-full
            w-screen
            max-w-none
            object-cover
          "
        />

      </div>


      {/* =========================================
          ORIGINAL ENVELOPE — RIGHT
      ========================================== */}

      <div
        ref={rightPanel}
        className="
          absolute
          right-0
          top-0
          z-50
          h-full
          w-1/2
          overflow-hidden
        "
      >

        <img
          src={openingImage}
          alt=""
          className="
            absolute
            right-0
            top-0
            h-full
            w-screen
            max-w-none
            object-cover
          "
        />

      </div>


      {/* =========================================
          INVISIBLE TAP AREA
          NO EXTRA TEXT
      ========================================== */}

      <button
        ref={button}
        onClick={handleOpen}
        aria-label="Open invitation"
        className="
          absolute
          left-1/2
          top-1/2
          z-[100]
          h-40
          w-40
          -translate-x-1/2
          -translate-y-1/2
          cursor-pointer
          bg-transparent
          outline-none
        "
      />

    </section>
  );
}