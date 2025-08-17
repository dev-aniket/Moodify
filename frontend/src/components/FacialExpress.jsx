import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";
import axios from "axios";

export default function FacialExpression({ setSongs }) {
  const videoRef = useRef();
  const [expression, setExpression] = useState("");
  const [loading, setLoading] = useState(false);

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  async function detectMood() {
    setLoading(true);
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      let mostProbable = 0;
      let _expression = "";

      for (const exp in expressions) {
        if (expressions[exp] > mostProbable) {
          mostProbable = expressions[exp];
          _expression = exp;
        }
      }

      setExpression(_expression);

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/songs?mood=${_expression}`)
        .then((response) => {
          setSongs(response.data.songs);
        })
        .catch((err) => console.error(err));
    }
    setLoading(false);
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-element">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />

      {expression && (
        <div className="expression-label">Expression: {expression}</div>
      )}

      <button onClick={detectMood} disabled={loading}>
        {loading ? <div className="loader"></div> : "Detect Mood"}
      </button>
    </div>
  );
}
