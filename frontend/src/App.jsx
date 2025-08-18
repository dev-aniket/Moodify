import { useState, useRef } from "react";
import FacialExpression from "./components/FacialExpress";
import MoodSongs from "./components/MoodSongs";

function App() {
  const [Songs, setSongs] = useState([]);
  const songsRef = useRef();

  return (
    <>
      <FacialExpression setSongs={setSongs} songsRef={songsRef} />
      <MoodSongs ref={songsRef} Songs={Songs} />
    </>
  );
}

export default App;
