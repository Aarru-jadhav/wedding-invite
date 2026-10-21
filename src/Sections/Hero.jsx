
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

import openingImage from "../assets/images/wed1.png";
import weddingVideo from "../assets/video/wedding-intro.mp4";

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const leftEnvelope = useRef(null);
  const rightEnvelope = useRef(null);
  const tapButton = useRef(null);
  const videoRef = useRef(null);
  const weddingContent = useRef(null);
  const startedRef = useRef(false);
  const timelineRef = useRef(null);

  // Lock scrolling until the envelope-opening animation completes.
  useEffect(() => {
    if (!canScroll) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [canScroll]);

  // Reset the video on mount and clean up on unmount.
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      timelineRef.current?.kill();

      if (video) {
        video.pause();
      }
    };
  }, []);

  const handleOpen = () => {
    if (startedRef.current) return;

    startedRef.current = true;

    const video = videoRef.current;

    if (!video) {
      startedRef.current = false;
      return;
    }

    video.muted = true;
    video.playsInline = true;

    try {
      video.currentTime = 0;

      // Animate both envelope halves before removing the cover.
      const tl = gsap.timeline({
        onComplete: () => {
          setOpened(true);
          setCanScroll(true);

          // Begin playback after the envelope has finished opening.
          video.play()
            .then(() => {
              setVideoStarted(true);
              window.dispatchEvent(new Event("weddingMusicStart"));
            })
            .catch((error) => {
              console.error("Wedding video playback failed:", error);
              startedRef.current = false;
            });
        },
      });

      timelineRef.current = tl;

      // Fade out the click overlay.
      tl.to(
        tapButton.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      // Open the left envelope half.
      tl.to(
        leftEnvelope.current,
        {
          xPercent: -105,
          duration: 2.1,
          ease: "power3.inOut",
        },
        0.25
      );

      // Open the right envelope half.
      tl.to(
        rightEnvelope.current,
        {
          xPercent: 105,
          duration: 2.1,
          ease: "power3.inOut",
        },
        0.25
      );

      // Reveal the wedding names.
      tl.fromTo(
        weddingContent.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.6"
      );
    } catch (error) {
      console.error("Wedding video playback failed:", error);
      startedRef.current = false;
    }
  };

  const handleVideoReady = () => {
    setVideoReady(true);
  };

  const handleVideoError = (event) => {
    console.error(
      "Wedding video loading error:",
      event.currentTarget.error
    );
  };

  return (
    <section className="relative h-[100svh] min-h-[550px] w-full overflow-hidden bg-[#f4e4c9]">

      {/* BACKGROUND WEDDING VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#190505]">
        <video
          ref={videoRef}
          src={weddingVideo}
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onError={handleVideoError}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoStarted && videoReady ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />
      </div>

      {/* WEDDING NAMES */}
      <div
        ref={weddingContent}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center text-[#49351f] opacity-0 sm:px-6"
      >
        <div className="relative flex h-full w-full max-w-5xl flex-col items-center justify-center pb-20">

          <div className="mb-5 flex items-center justify-center gap-4 sm:mb-6 sm:gap-5">
            <span className="h-px w-10 bg-[#8d6a3e]/80 sm:w-20" />
            <span className="text-2xl text-[#8d6a3e]">❦</span>
            <span className="h-px w-10 bg-[#8d6a3e]/80 sm:w-20" />
          </div>

          <p className="mb-6 font-serif text-xs tracking-[0.1em] text-[#49351f] sm:text-sm md:mb-7 md:text-xl">
            Mark your Calendars to Celebrate the Wedding of
          </p>

          <h1 className="break-words font-serif text-3xl font-medium tracking-wide text-[#49351f] sm:text-5xl md:text-7xl lg:text-8xl">
            Siddharth Vaishnav
          </h1>

          <div className="my-2 font-serif text-3xl text-[#80633c] sm:my-3 sm:text-4xl md:text-5xl">
            &amp;
          </div>

          <h2 className="break-words font-serif text-3xl font-medium tracking-wide text-[#49351f] sm:text-5xl md:text-7xl lg:text-8xl">
            Shreshi Parashar
          </h2>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-5 left-0 w-full text-center sm:bottom-8">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#49351f] sm:text-xl sm:tracking-[0.4em]">
              Scroll
            </p>

            <div className="mt-2 animate-bounce text-xl font-bold text-[#49351f]">
              ↓
            </div>
          </div>
        </div>
      </div>

      {/* RESPONSIVE ENVELOPE COVER */}
      {!opened && (
        <div className="absolute inset-0 z-50 overflow-hidden bg-[#f4e4c9]">

          {/* LEFT HALF */}
          <div
            ref={leftEnvelope}
            className="envelope-half absolute inset-0 z-10 overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              willChange: "transform",
            }}
          >
            <img
              src={openingImage}
              alt="Wedding invitation envelope"
              draggable="false"
              className="envelope-image absolute select-none"
            />
          </div>

          {/* RIGHT HALF */}
          <div
            ref={rightEnvelope}
            className="envelope-half absolute inset-0 z-10 overflow-hidden"
            style={{
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
              willChange: "transform",
            }}
          >
            <img
              src={openingImage}
              alt="Wedding invitation envelope"
              draggable="false"
              className="envelope-image absolute select-none"
            />
          </div>
        </div>
      )}

      {/* TAP TO OPEN */}
      {!opened && (
        <button
          ref={tapButton}
          type="button"
          onClick={handleOpen}
          aria-label="Open wedding invitation"
          className="absolute inset-0 z-[100] h-full w-full cursor-pointer bg-transparent outline-none"
        />
      )}

      {/* RESPONSIVE ENVELOPE IMAGE */}
      <style>{`
        .envelope-half {
          background: #f4e4c9;
        }

        .envelope-image {
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          object-position: center center;
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }

        /* MOBILE: fill the screen */
        @media (max-width: 767px) {
          .envelope-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }
        }

        /* DESKTOP: responsive full-screen envelope */
        @media (min-width: 768px) {
          .envelope-half {
            left: 0;
            right: 0;
            width: 100%;
            transform: none;
          }

          .envelope-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .envelope-image {
            -webkit-user-drag: none;
          }
        }
      `}</style>
    </section>
  );
}
