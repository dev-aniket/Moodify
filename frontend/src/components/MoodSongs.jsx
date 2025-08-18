import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import "./MoodSongs.css";

const MoodSongs = forwardRef(({ Songs }, ref) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToSongs: () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const y = rect.top + window.scrollY;
      const h = containerRef.current.offsetHeight;
      const target =
        h < window.innerHeight
          ? Math.max(0, y - (window.innerHeight - h) / 2)
          : Math.max(0, y - 80);
      window.scrollTo({ top: target, behavior: "smooth" });
    },
  }));

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayPause = (index, audioUrl) => {
    if (isPlaying === index) {
      audioRef.current?.pause();
      setIsPlaying(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
    setIsPlaying(index);

    audioRef.current.onended = () => setIsPlaying(null);
  };

  // Render nothing if there are no songs
  if (!Songs || Songs.length === 0) {
    return null;
  }

  return (
    <section ref={containerRef} className="mood-songs-container">
      {Songs.map((song, index) => (
        <article key={song._id ?? index} className="song-card">
          {song.poster && (
            <img
              src={song.poster}
              alt={song.title}
              className="song-card__poster"
              loading="lazy"
            />
          )}

          <div className="song-card__title">{song.title}</div>
          <div className="song-card__artist">{song.artist}</div>

          <div className="song-card__player">
            <button
              className="song-card__button"
              onClick={() => handlePlayPause(index, song.audio)}
            >
              {isPlaying === index ? "Pause" : "Play"}
            </button>
          </div>
        </article>
      ))}
    </section>
  );
});

export default MoodSongs;