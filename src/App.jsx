
import { useEffect, useRef, useState } from "react";

import Loader from "./Sections/Loader";
import Hero from "./Sections/Hero";
import Story from "./Sections/Story";
import Event from "./Sections/Event";
import Savethedate from "./Sections/Savethedate";
import Location from "./Sections/Location";
import Joinus from "./Sections/Joinus";

import weddingMusic from "./assets/music/wedding-music.mp3";

function App() {
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  // Start the single shared audio element after the envelope is opened.
  useEffect(() => {
    const startMusic = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      try {
        await audio.play();
        setMusicPlaying(true);
      } catch (error) {
        console.error("Music playback failed:", error);
        setMusicPlaying(false);
      }
    };

    window.addEventListener("weddingMusicStart", startMusic);

    return () => {
      window.removeEventListener("weddingMusicStart", startMusic);
    };
  }, []);

  // Play / pause the shared audio.
  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch (error) {
        console.error("Unable to play music:", error);
        setMusicPlaying(false);
      }
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  return (
    <>
      {/* SINGLE SHARED WEDDING MUSIC PLAYER */}
      <audio
        ref={audioRef}
        src={weddingMusic}
        loop
        preload="auto"
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
        onEnded={() => setMusicPlaying(false)}
      />

      {/* LOADER */}
      {loading && (
        <Loader
          onComplete={() => {
            setLoading(false);
          }}
        />
      )}

      {/* WEBSITE */}
      {!loading && (
        <>
          <Hero />
          <Story />
          <Event />
          <Savethedate />
          <Location />
          <Joinus />
        </>
      )}

      {/* MUSIC BUTTON */}
      {!loading && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
          title={musicPlaying ? "Pause music" : "Play music"}
          className="
            fixed bottom-5 right-5 z-[9999]
            flex h-12 w-12 items-center justify-center
            rounded-full backdrop-blur-md
            transition-all duration-300 hover:scale-110
          "
          style={{
            background: "rgba(255,248,235,0.82)",
            border: "1px solid rgba(170,130,70,0.55)",
            boxShadow: "0 6px 20px rgba(80,50,20,0.18)",
            color: "#8F6735",
          }}
        >
          {musicPlaying ? (
            <div className="flex h-4 items-end gap-[3px]">
              <span
                className="w-[2px] animate-pulse rounded-full bg-[#8F6735]"
                style={{ height: "9px" }}
              />
              <span
                className="w-[2px] animate-pulse rounded-full bg-[#8F6735]"
                style={{ height: "15px", animationDelay: "0.15s" }}
              />
              <span
                className="w-[2px] animate-pulse rounded-full bg-[#8F6735]"
                style={{ height: "11px", animationDelay: "0.3s" }}
              />
              <span
                className="w-[2px] animate-pulse rounded-full bg-[#8F6735]"
                style={{ height: "16px", animationDelay: "0.45s" }}
              />
            </div>
          ) : (
            <span className="text-[18px]">♫</span>
          )}
        </button>
      )}
    </>
  );
}

export default App;
