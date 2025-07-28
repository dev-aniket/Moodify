import { useState } from 'react'
import FaceDetection from './components/FacialExpress'
import MoodSongs from './components/MoodSongs'


function App() {
   const [Songs, setSongs] = useState([])

  return (
    <>
      <FaceDetection setSongs = {setSongs}/>
      <MoodSongs Songs = {Songs}/>
    </>
  )
}

export default App
