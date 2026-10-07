import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import storyBackground from "../assets/images/story-image.png";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);
  const letterRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#ead8bd]
      "
    >

      {/* =====================================
          FULL SCREEN LETTER BACKGROUND
      ===================================== */}

      <div
        ref={letterRef}
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${storyBackground})`,
        }}
      />

      {/* =====================================
          SOFT WARM OVERLAY
      ===================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[#f5e8d2]/10
        "
      />

      {/* =====================================
          LETTER CONTENT
      ===================================== */}

      <div
        ref={contentRef}
        className="
          relative
          z-10
          flex
          min-h-screen
          w-full
          items-center
          justify-center
          px-8
          py-20
          text-center
        "
      >

        <div className="w-full max-w-2xl">

          {/* OUR STORY */}

          <p
            className="
              mb-8
              font-serif
              text-sm
              uppercase
              tracking-[0.35em]
              text-[#8b632d]
              md:text-base
            "
          >
            Our Story
          </p>

          {/* GREETING */}

          <p
            className="
              mb-8
              font-serif
              text-lg
              italic
              text-[#4d3825]
              md:text-xl
            "
          >
            Dear Family & Friends,
          </p>

          {/* MESSAGE */}

          <div
            className="
              font-serif
              text-[15px]
              leading-[1.9]
              text-[#4d3825]
              md:text-lg
            "
          >

            <p className="mb-7">
              Our journey is a beautiful collection of
              little moments, shared smiles, endless
              conversations and countless memories.
            </p>

            <p className="mb-7">
              What began as two individual paths slowly
              became one beautiful journey. Through every
              chapter, we found friendship, comfort and
              a love that feels like home.
            </p>

            <p>
              And now, as we begin this beautiful new
              chapter together, we would love to have
              our favourite people by our side as we
              celebrate this special beginning.
            </p>

          </div>

          {/* SIGNATURE */}

          <div className="mt-10">

            <p
              className="
                font-serif
                text-sm
                italic
                text-[#80633c]
              "
            >
              With Love,
            </p>

            <p
              className="
                mt-3
                font-serif
                text-2xl
                tracking-[0.12em]
                text-[#8b632d]
                md:text-3xl
              "
            >
              MANAV & RAAG PRANVI
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}