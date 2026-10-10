
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

import openingImage from "../assets/images/wed1.png";
import weddingVideo from "../assets/video/wedding-intro.mp4";

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const leftPanel = useRef(null);
  const rightPanel = useRef(null);
  const button = useRef(null);
  const background = useRef(null);
  const weddingContent = useRef(null);
  const videoRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const resetVideo = () => {
      video.currentTime = 0;
    };

    if (video.readyState >= 1) {
      resetVideo();
    } else {
      video.addEventListener("loadedmetadata", resetVideo, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", resetVideo);
    };
  }, []);

  const handleOpen = () => {
    if (opened) return;

    setOpened(true);

    // Start wedding music
    window.dispatchEvent(new Event("weddingMusicStart"));

    const tl = gsap.timeline();

    // Fade out tap area
    tl.to(button.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // Open left door
    tl.to(
      leftPanel.current,
      {
        xPercent: -100,
        duration: 3.5,
        ease: "power3.inOut",
      },
      0.4
    );

    // Open right door
    tl.to(
      rightPanel.current,
      {
        xPercent: 100,
        duration: 3.5,
        ease: "power3.inOut",
      },
      "<"
    );

    // Start video from the beginning
    tl.call(
      () => {
        const video = videoRef.current;
        if (!video || startedRef.current) return;

        startedRef.current = true;

        const playFromBeginning = () => {
          video.currentTime = 0;

          video.play().catch((error) => {
            console.error("Video playback failed:", error);
          });
        };

        if (video.readyState >= 2) {
          playFromBeginning();
        } else {
          video.addEventListener("canplay", playFromBeginning, {
            once: true,
          });
          video.load();
        }
      },
      [],
      "-=0.2"
    );

    // Reveal background
    tl.to(
      background.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=0.1"
    );

    // Reveal names
    tl.fromTo(
      weddingContent.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
      },
      "-=0.6"
    );
  };

  const handleVideoPlaying = () => {
    setVideoReady(true);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#190505]">

      {/* BACKGROUND */}
      <div
        ref={background}
        className="absolute inset-0 z-0 scale-[1.03] opacity-0"
      >
        {/* POSTER: visible while video loads */}
        <img
          src={openingImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoReady ? 0 : 1,
            transition: "opacity 0.8s ease-in-out",
          }}
        />

        {/* VIDEO */}
        <video
          ref={videoRef}
          src={weddingVideo}
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          onPlaying={handleVideoPlaying}
          onError={(event) => {
            console.error("Video error:", event.currentTarget.error);
          }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
          }}
        />
      </div>

      {/* WEDDING TEXT */}
      <div
        ref={weddingContent}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center text-[#49351f] opacity-0"
      >
        <div className="w-full max-w-5xl">

          <div className="mb-7 flex items-center justify-center gap-5">
            <span className="h-px w-14 bg-[#8d6a3e]/50" />
            <span className="text-xl text-[#8d6a3e]">❦</span>
            <span className="h-px w-14 bg-[#8d6a3e]/50" />
          </div>

          <p className="mb-7 font-serif text-base tracking-[0.08em] md:text-xl">
            Mark your Calendars to rejoice in the Wedding of
          </p>

          <h1 className="font-serif text-5xl font-medium tracking-[0.06em] md:text-7xl lg:text-8xl">
            MANAV PARIDHI
          </h1>

          <div className="my-3 font-serif text-4xl text-[#80633c] md:text-5xl">
            &
          </div>

          <h2 className="font-serif text-5xl font-medium tracking-[0.06em] md:text-7xl lg:text-8xl">
            RAAG PRANVI
          </h2>

          <div className="mt-14">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#705a3c] md:text-xs">
              Scroll
            </p>
            <div className="mt-2 text-lg text-[#705a3c]">↓</div>
          </div>

        </div>
      </div>

      {/* LEFT DOOR */}
      <div
        ref={leftPanel}
        className="absolute left-0 top-0 z-50 h-full w-1/2 overflow-hidden"
      >
        <img
          src={openingImage}
          alt=""
          className="absolute left-0 top-0 h-full w-[200%] max-w-none object-cover"
        />
      </div>

      {/* RIGHT DOOR */}
      <div
        ref={rightPanel}
        className="absolute right-0 top-0 z-50 h-full w-1/2 overflow-hidden"
      >
        <img
          src={openingImage}
          alt=""
          className="absolute right-0 top-0 h-full w-[200%] max-w-none object-cover"
        />
      </div>

      {/* INVITATION TAP AREA */}
      {!opened && (
        <button
          ref={button}
          onClick={handleOpen}
          aria-label="Open invitation"
          className="absolute left-1/2 top-1/2 z-[100] h-40 w-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-transparent outline-none"
        />
      )}

    </section>
  );
}
