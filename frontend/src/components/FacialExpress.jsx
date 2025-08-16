import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import "./FacialExpression.css";
import axios from 'axios'

export default function FacialExpression({setSongs}) {
  const videoRef = useRef();

  const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood(){
     const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

      const expressions = detections[0].expressions;
      let mostProbable = 0;
      let _expession = "";

      for (const expression in expressions) {
        if (expressions[expression] > mostProbable) {
          mostProbable = expressions[expression];
          _expession = expression;
        }
      }
    
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/songs?mood=${_expession}`)
      .then(response =>{
        console.log(response.data)
        setSongs(response.data.songs)
      })
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, [500]);

  return (
    <div className='mood-element'>
      <video
        ref={videoRef}
        autoPlay
        muted
        className='user-video-feed'
      />
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
}
