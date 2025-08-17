import React, { useState, useRef } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRef = useRef(null);

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
    <div className="mood-songs">
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
};

export default MoodSongs;
