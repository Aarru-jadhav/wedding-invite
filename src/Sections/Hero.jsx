
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

import openingImage from "../assets/images/wed1.png";
import weddingVideo from "../assets/video/wedding-intro.mp4";
import weddingMusic from "../assets/music/wedding-music.mp3";

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const leftEnvelope = useRef(null);
  const rightEnvelope = useRef(null);
  const tapButton = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
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

  // Reset video and music on mount; clean up on unmount.
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      timelineRef.current?.kill();

      if (video) video.pause();
      if (audio) audio.pause();
    };
  }, []);

  const handleOpen = async () => {
    if (startedRef.current) return;

    startedRef.current = true;

    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video) {
      startedRef.current = false;
      return;
    }

    video.muted = true;
    video.playsInline = true;

    try {
      video.currentTime = 0;

      // Start the video, but keep the envelope visible.
      await video.play();

      setVideoStarted(true);

      // Start background wedding music after the user clicks.
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 0.7;

        audio.play().catch((error) => {
          console.error("Wedding music playback failed:", error);
        });
      }

      window.dispatchEvent(new Event("weddingMusicStart"));

      // Animate both envelope halves before removing the cover.
      const tl = gsap.timeline({
        onComplete: () => {
          // Remove the envelope only after it has fully opened.
          setOpened(true);
          setCanScroll(true);
        },
      });

      timelineRef.current = tl;

      tl.to(
        tapButton.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      // Left side slides away.
      tl.to(
        leftEnvelope.current,
        {
          xPercent: -105,
          duration: 2.1,
          ease: "power3.inOut",
        },
        0.25
      );

      // Right side slides away.
      tl.to(
        rightEnvelope.current,
        {
          xPercent: 105,
          duration: 2.1,
          ease: "power3.inOut",
        },
        0.25
      );

      // Reveal wedding names as the envelope opens.
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

  const handleAudioError = (event) => {
    console.error(
      "Wedding music loading error:",
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

      {/* BACKGROUND WEDDING MUSIC */}
      <audio
        ref={audioRef}
        src={weddingMusic}
        loop
        preload="auto"
        onError={handleAudioError}
      />

      {/* WEDDING NAMES */}
      <div
        ref={weddingContent}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4 text-center text-[#49351f] opacity-0 sm:px-6"
      >
        <div className="w-full max-w-5xl">
          <div className="mb-5 flex items-center justify-center gap-4 sm:mb-6 sm:gap-5">
            <span className="h-px w-10 bg-[#8d6a3e]/80 sm:w-20" />
            <span className="text-2xl text-[#8d6a3e]">❦</span>
            <span className="h-px w-10 bg-[#8d6a3e]/80 sm:w-20" />
          </div>

          <p className="mb-6 font-serif text-xs tracking-[0.1em] text-[#49351f] sm:text-sm md:mb-7 md:text-xl">
            Mark your Calendars to rejoice in the Wedding of
          </p>

          <h1 className="font-serif text-3xl font-medium tracking-wide text-[#49351f] sm:text-5xl md:text-7xl lg:text-8xl">
            Siddharth Vaishnav
          </h1>

          <div className="my-2 font-serif text-3xl text-[#80633c] sm:my-3 sm:text-4xl md:text-5xl">
            &amp;
          </div>

          <h2 className="font-serif text-3xl font-medium tracking-wide text-[#49351f] sm:text-5xl md:text-7xl lg:text-8xl">
            Shreshi Parashar
          </h2>

          {/* SCROLL INDICATOR */}
          <div className="absolute bottom-8 left-0 w-full text-center sm:bottom-10">
            <p className="text-base font-bold uppercase tracking-[0.3em] text-[#49351f] sm:text-xl sm:tracking-[0.4em]">
              Scroll
            </p>

            <div className="mt-2 animate-bounce text-xl font-bold text-[#49351f]">
              ↓
            </div>
          </div>
        </div>
      </div>

      {/* ENVELOPE COVER — STAYS MOUNTED DURING ANIMATION */}
      {!opened && (
        <div className="absolute inset-0 z-50 overflow-hidden bg-[#f4e4c9]">
          {/* LEFT ENVELOPE HALF */}
          <div
            ref={leftEnvelope}
            className="absolute inset-0 z-10 overflow-hidden"
            style={{
              clipPath:
                "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
              willChange: "transform",
            }}
          >
            <img
              src={openingImage}
              alt="Wedding invitation envelope"
              draggable="false"
              className="envelope-cover-image absolute inset-0 h-full w-full max-w-none select-none"
            />
          </div>

          {/* RIGHT ENVELOPE HALF */}
          <div
            ref={rightEnvelope}
            className="absolute inset-0 z-10 overflow-hidden"
            style={{
              clipPath:
                "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
              willChange: "transform",
            }}
          >
            <img
              src={openingImage}
              alt="Wedding invitation envelope"
              draggable="false"
              className="envelope-cover-image absolute inset-0 h-full w-full max-w-none select-none"
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

      <style>{`
        .envelope-cover-image {
          object-fit: cover;
          object-position: center;
        }

        @media (min-width: 768px) {
          .envelope-cover-image {
            object-fit: contain;
          }
        }
      `}</style>
    </section>
  );
}
