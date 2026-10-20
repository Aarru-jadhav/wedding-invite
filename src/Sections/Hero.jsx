
// import { useRef, useState, useEffect } from "react";
// import { gsap } from "gsap";

// import openingImage from "../assets/images/wed1.png";
// import weddingVideo from "../assets/video/wedding-intro.mp4";

// export default function Hero() {
//   const [opened, setOpened] = useState(false);
//   const [videoReady, setVideoReady] = useState(false);

//   const envelopeCover = useRef(null);
//   const tapButton = useRef(null);
//   const videoRef = useRef(null);
//   const weddingContent = useRef(null);
//   const startedRef = useRef(false);
//   const timelineRef = useRef(null);

//   useEffect(() => {
//     const video = videoRef.current;

//     if (video) {
//       video.pause();
//       video.currentTime = 0;
//     }

//     return () => {
//       timelineRef.current?.kill();
//     };
//   }, []);

//   const handleOpen = () => {
//     if (opened || startedRef.current) return;

//     setOpened(true);
//     startedRef.current = true;

//     // Start wedding music using the existing App.jsx listener.
//     window.dispatchEvent(new Event("weddingMusicStart"));

//     const video = videoRef.current;

//     // Start the wedding video underneath the envelope.
//     if (video) {
//       video.currentTime = 0;

//       video.play().catch((error) => {
//         console.error("Video playback failed:", error);
//       });
//     }

//     const tl = gsap.timeline();
//     timelineRef.current = tl;

//     // Lift the complete envelope upwards.
//     tl.to(
//       envelopeCover.current,
//       {
//         yPercent: -110,
//         scale: 0.96,
//         opacity: 0,
//         duration: 2.2,
//         ease: "power3.inOut",
//       },
//       0
//     );

//     // Reveal the wedding names after the envelope opens.
//     tl.fromTo(
//       weddingContent.current,
//       {
//         opacity: 0,
//         y: 35,
//         scale: 0.98,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 1.4,
//         ease: "power3.out",
//       },
//       "-=0.15"
//     );
//   };

//   const handleVideoPlaying = () => {
//     setVideoReady(true);
//   };

//   return (
//     <section className="relative h-[100svh] min-h-[550px] w-full overflow-hidden bg-[#190505]">

//       {/* WEDDING VIDEO BACKGROUND */}
//       <div className="absolute inset-0 z-0 overflow-hidden bg-[#190505]">
//         <video
//           ref={videoRef}
//           src={weddingVideo}
//           muted
//           loop
//           playsInline
//           disablePictureInPicture
//           controls={false}
//           preload="auto"
//           onPlaying={handleVideoPlaying}
//           onError={(event) => {
//             console.error(
//               "Wedding video error:",
//               event.currentTarget.error
//             );
//           }}
//           className="absolute inset-0 h-full w-full object-cover"
//           style={{
//             opacity: videoReady ? 1 : 0,
//             transition: "opacity 0.8s ease",
//           }}
//         />

//         {!videoReady && (
//           <div className="absolute inset-0 bg-[#190505]" />
//         )}
//       </div>

//       {/* WEDDING NAMES */}
//       <div
//         ref={weddingContent}
//         className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 text-center text-[#49351f] opacity-0"
//       >
//         <div className="w-full max-w-5xl">

//           <div className="mb-6 flex items-center justify-center gap-5">
//             <span className="h-px w-12 bg-[#8d6a3e]/80 md:w-20" />

//             <span className="text-2xl text-[#8d6a3e]">
//               ❦
//             </span>

//             <span className="h-px w-12 bg-[#8d6a3e]/80 md:w-20" />
//           </div>

//           <p className="mb-7 font-serif text-sm tracking-[0.12em] text-[#49351f] md:text-xl">
//             Mark your Calendars to rejoice in the Wedding of
//           </p>

//           <h1 className="font-serif text-4xl font-medium tracking-wide text-[#49351f] drop-shadow-lg sm:text-5xl md:text-7xl lg:text-8xl">
//             Siddharth Vaishnav
//           </h1>

//           <div className="my-3 font-serif text-4xl text-[#80633c] md:text-5xl">
//             &
//           </div>

//           <h2 className="font-serif text-4xl font-medium tracking-wide text-[#49351f] drop-shadow-lg sm:text-5xl md:text-7xl lg:text-8xl">
//             Shreshi Parashar
//           </h2>

//           <div className="mt-12">
//   <p className="text-xl font-bold uppercase tracking-[0.4em] text-[#49351f]">
//     Scroll
//   </p>

//   <div className="mt-2 animate-bounce text-xl font-bold text-[#49351f]">
//     ↓
//   </div>
// </div>

//         </div>
//       </div>

//       {/* FULL ENVELOPE COVER */}
//       <div
//         ref={envelopeCover}
//         className="absolute inset-0 z-50 overflow-hidden bg-[#f4e4c9]"
//         style={{
//           transformOrigin: "top center",
//           willChange: "transform, opacity",
//         }}
//       >
//         <img
//           src={openingImage}
//           alt="Wedding invitation envelope"
//           draggable="false"
//           className="absolute inset-0 h-full w-full select-none object-cover object-center"
//         />

//         {/* INVITATION TAP AREA */}
//         {!opened && (
//           <button
//             ref={tapButton}
//             onClick={handleOpen}
//             aria-label="Open wedding invitation"
//             className="absolute inset-0 z-10 h-full w-full cursor-pointer bg-transparent outline-none"
//           />
//         )}
//       </div>

//     </section>
//   );
// }

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

import openingImage from "../assets/images/wed1.png";
import weddingVideo from "../assets/video/wedding-intro.mp4";

export default function Hero() {
  const [opened, setOpened] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const leftEnvelope = useRef(null);
  const rightEnvelope = useRef(null);
  const tapButton = useRef(null);
  const videoRef = useRef(null);
  const weddingContent = useRef(null);
  const startedRef = useRef(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const handleOpen = () => {
    if (startedRef.current) return;

    startedRef.current = true;
    setOpened(true);

    // Start existing wedding music listener.
    window.dispatchEvent(new Event("weddingMusicStart"));

    // Start video behind the envelope.
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0;

      video.play().catch((error) => {
        console.error("Video playback failed:", error);
      });
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // 1. Fade out the transparent tap area.
    tl.to(
      tapButton.current,
      {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      },
      0
    );

    // 2. Open the envelope from the center to both sides.
    tl.to(
      leftEnvelope.current,
      {
        xPercent: -105,
        duration: 2.1,
        ease: "power3.inOut",
      },
      0.25
    );

    tl.to(
      rightEnvelope.current,
      {
        xPercent: 105,
        duration: 2.1,
        ease: "power3.inOut",
      },
      0.25
    );

    // 3. Reveal wedding names.
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
  };

  const handleVideoPlaying = () => {
    setVideoReady(true);
  };

  return (
    <section className="relative h-[100svh] min-h-[550px] w-full overflow-hidden bg-[#190505]">

      {/* WEDDING VIDEO BACKGROUND */}
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
          onPlaying={handleVideoPlaying}
          onError={(event) => {
            console.error(
              "Wedding video error:",
              event.currentTarget.error
            );
          }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        />

        {!videoReady && (
          <div className="absolute inset-0 bg-[#190505]" />
        )}
      </div>

      {/* WEDDING NAMES */}
      <div
        ref={weddingContent}
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 text-center text-[#49351f] opacity-0"
      >
        <div className="w-full max-w-5xl">

          <div className="mb-6 flex items-center justify-center gap-5">
            <span className="h-px w-12 bg-[#8d6a3e]/80 md:w-20" />
            <span className="text-2xl text-[#8d6a3e]">❦</span>
            <span className="h-px w-12 bg-[#8d6a3e]/80 md:w-20" />
          </div>

          <p className="mb-7 font-serif text-sm tracking-[0.12em] text-[#49351f] md:text-xl">
            Mark your Calendars to rejoice in the Wedding of
          </p>

          <h1 className="font-serif text-4xl font-medium tracking-wide text-[#49351f] drop-shadow-lg sm:text-5xl md:text-7xl lg:text-8xl">
            Siddharth Vaishnav
          </h1>

          <div className="my-3 font-serif text-4xl text-[#80633c] md:text-5xl">
            &amp;
          </div>

          <h2 className="font-serif text-4xl font-medium tracking-wide text-[#49351f] drop-shadow-lg sm:text-5xl md:text-7xl lg:text-8xl">
            Shreshi Parashar
          </h2>

          <div className="mt-12">
            <p className="text-xl font-bold uppercase tracking-[0.4em] text-[#49351f]">
              Scroll
            </p>

            <div className="mt-2 animate-bounce text-xl font-bold text-[#49351f]">
              ↓
            </div>
          </div>

        </div>
      </div>

      {/* LEFT ENVELOPE PANEL */}
      <div
        ref={leftEnvelope}
        className="absolute left-0 top-0 z-50 h-full w-1/2 overflow-hidden"
        style={{
          transformOrigin: "left center",
          willChange: "transform",
        }}
      >
        <img
          src={openingImage}
          alt="Wedding invitation envelope left"
          draggable="false"
          className="absolute left-0 top-0 h-full w-[200%] max-w-none select-none"
          style={{
            objectFit: "fill",
            objectPosition: "left center",
          }}
        />
      </div>

      {/* RIGHT ENVELOPE PANEL */}
      <div
        ref={rightEnvelope}
        className="absolute right-0 top-0 z-50 h-full w-1/2 overflow-hidden"
        style={{
          transformOrigin: "right center",
          willChange: "transform",
        }}
      >
        <img
          src={openingImage}
          alt="Wedding invitation envelope right"
          draggable="false"
          className="absolute right-0 top-0 h-full w-[200%] max-w-none select-none"
          style={{
            objectFit: "fill",
            objectPosition: "right center",
          }}
        />
      </div>

      {/* INVITATION TAP AREA */}
      {!opened && (
        <button
          ref={tapButton}
          type="button"
          onClick={handleOpen}
          aria-label="Open wedding invitation"
          className="absolute inset-0 z-[100] h-full w-full cursor-pointer bg-transparent outline-none"
        />
      )}

    </section>
  );
}
