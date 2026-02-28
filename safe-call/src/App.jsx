import React, { useState, useRef } from "react";
import './App.css'

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handleClick = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        chunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/webm" });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          audio.play(); // Automatically plays after stopping
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      <div>
        <h2>This is where the talking would go.</h2>
        <h2>For example:</h2>
        <h3> Dispatch: Where are you?</h3>
        <h3> You: (then it would show what you say)</h3>
        <h3> Dispatch: (then it would show what Mistral generates)</h3>
        <h3> etc. etc.</h3>
        <button onClick={handleClick}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </>
  );
}
