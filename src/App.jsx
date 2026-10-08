import { useEffect, useRef, useState } from "react";

import Loader from "./Sections/Loader";
import Hero from "./Sections/Hero";
import Story from "./Sections/Story";
import Event from "./Sections/Event";
import Savethedate from "./Sections/Savethedate";
import Location from "./Sections/Location";

import weddingMusic from "./assets/music/wedding-music.mp3";

function App() {
  const [loading, setLoading] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const audioRef = useRef(null);

  // --------------------------------
  // START MUSIC AFTER USER INTERACTION
  // --------------------------------

  useEffect(() => {
    const startMusic = async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        console.log("Music waiting for user interaction");
      }
    };

    window.addEventListener("weddingMusicStart", startMusic);

    return () => {
      window.removeEventListener("weddingMusicStart", startMusic);
    };
  }, []);

  // --------------------------------
  // MUSIC TOGGLE
  // --------------------------------

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        console.log("Unable to play music");
      }
    } else {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  return (
    <>
      {/* --------------------------------
          WEDDING MUSIC
      -------------------------------- */}

      <audio
        ref={audioRef}
        src={weddingMusic}
        loop
        preload="auto"
      />

      {/* --------------------------------
          LOADER
      -------------------------------- */}

      {loading && (
        <Loader
          onComplete={() => {
            setLoading(false);
          }}
        />
      )}

      {/* --------------------------------
          WEBSITE
      -------------------------------- */}

      {!loading && (
        <>
          <Hero />
          <Story />
          <Event />
          <Savethedate />
          <Location />
        </>
      )}

      {/* --------------------------------
          MUSIC BUTTON
      -------------------------------- */}

      {!loading && (
        <button
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause music" : "Play music"}
          className="
            fixed
            right-5
            bottom-5
            z-[9999]
            w-12
            h-12
            rounded-full
            flex
            items-center
            justify-center
            backdrop-blur-md
            transition-all
            duration-300
            hover:scale-110
          "
          style={{
            background: "rgba(255,248,235,0.82)",
            border: "1px solid rgba(170,130,70,0.55)",
            boxShadow: "0 6px 20px rgba(80,50,20,0.18)",
            color: "#8F6735",
          }}
        >
          {musicPlaying ? (
            <div className="flex items-end gap-[3px] h-4">
              <span
                className="w-[2px] bg-[#8F6735] rounded-full animate-pulse"
                style={{ height: "9px" }}
              />
              <span
                className="w-[2px] bg-[#8F6735] rounded-full animate-pulse"
                style={{ height: "15px", animationDelay: "0.15s" }}
              />
              <span
                className="w-[2px] bg-[#8F6735] rounded-full animate-pulse"
                style={{ height: "11px", animationDelay: "0.3s" }}
              />
              <span
                className="w-[2px] bg-[#8F6735] rounded-full animate-pulse"
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