"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { VolumeX } from "lucide-react";

const TARGET_VOLUME = 0.20; // 20% of original volume

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/assets/audio/sound-background.mp3");
    audio.volume = TARGET_VOLUME; // 20% of original volume
    audio.loop = true; // loop when finished playing
    audioRef.current = audio;

    let cleanupListeners: (() => void) | null = null;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was blocked by browser policy without user gesture
          setIsPlaying(false);

          const startAudioOnInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
              audioRef.current.volume = TARGET_VOLUME;
              audioRef.current.play().then(() => {
                setIsPlaying(true);
                setHasInteracted(true);
              }).catch(() => {});
            }
            if (cleanupListeners) {
              cleanupListeners();
            }
          };

          cleanupListeners = () => {
            window.removeEventListener("click", startAudioOnInteraction);
            window.removeEventListener("touchstart", startAudioOnInteraction);
            window.removeEventListener("keydown", startAudioOnInteraction);
          };

          window.addEventListener("click", startAudioOnInteraction, { once: true });
          window.addEventListener("touchstart", startAudioOnInteraction, { once: true });
          window.addEventListener("keydown", startAudioOnInteraction, { once: true });
        });
    }

    return () => {
      if (cleanupListeners) {
        cleanupListeners();
      }
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = TARGET_VOLUME;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-16 md:bottom-5 right-4 md:right-7 z-40 select-none">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause healing sound" : "Play healing sound"}
        title={isPlaying ? "Healing Sound · Playing (20% volume)" : "Healing Sound · Click to Play"}
        className="group relative flex items-center gap-2 px-3 py-2 rounded-full border border-[#cfc3ad] bg-[#f8f4eb]/90 hover:bg-[#efe6d5] shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105"
      >
        {/* Animated Sound Wave or Music Note Indicator */}
        <div className="relative flex items-center justify-center size-5 text-[#865d36]">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[2.5px] h-2 bg-[#865d36] rounded-full animate-bounce" style={{ animationDuration: '0.6s' }} />
              <span className="w-[2.5px] h-3.5 bg-[#865d36] rounded-full animate-bounce" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }} />
              <span className="w-[2.5px] h-2.5 bg-[#865d36] rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.4s' }} />
            </div>
          ) : (
            <VolumeX className="size-4 text-[#8a7a67]" />
          )}
        </div>

        {/* Vintage Label */}
        <span className="font-serif italic text-xs tracking-wider text-[#63513f] hidden sm:inline">
          {isPlaying ? "Healing Sound" : "Sound Off"}
        </span>

        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full border border-[#865d36]/30 animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }} />
        )}
      </button>
    </div>
  );
}
