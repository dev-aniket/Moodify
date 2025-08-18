import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import "./MoodSongs.css";

const MoodSongs = forwardRef(({ Songs }, ref) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  // Expose scroll function to parent
  useImperativeHandle(ref, () => ({
    scrollToSongs: () => {
      if (containerRef.current) {
        const top = containerRef.current.getBoundingClientRect().top + window.scrollY;
        // 👇 scroll with extra offset (e.g., 100px above songs)
        window.scrollTo({
          top: top - 500,
          behavior: "smooth",
        })
      }
    },
  }));

  const handlePlayPause = (index, audioUrl) => {
    if (isPlaying === index) {
      audioRef.current.pause();
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(index);
    }
  };

  return (
    <div ref={containerRef} className="mood-songs">
      {Songs.map((song, index) => (
        <div key={index} className="song-card">
          {song.poster && (
            <img src={song.poster} alt={song.title} className="song-poster" />
          )}
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>

          <div className="play-pause-button">
            <button onClick={() => handlePlayPause(index, song.audio)}>
              {isPlaying === index ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

export default MoodSongs;
