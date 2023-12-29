import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { MdMic } from "react-icons/md";
import { RespondProps } from "../types";

export function Respond({
  setCurrentState,
  question,
  setUserAnswer,
}: RespondProps) {
  const [transcribedText, setTranscribedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { video: false }
  );

  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
  };

  const handleSubmit = async () => {
    if (mediaBlobUrl) {
      const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      try {
        const response = await fetch("http://localhost:3001/transcribe", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTranscribedText(data.transcript);
        setUserAnswer(data.transcript);
        setCurrentState("results");
      } catch (error) {
        console.error("Error during transcription:", error);
      }
    }
  };

  const handleRestart = () => {
    setTranscribedText("");
    setUserAnswer("");
    setCurrentState("start");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col bg-white shadow-xl rounded-xl p-6 max-w-4xl text-center items-center"
        style={{ background: "linear-gradient(135deg, #E2E8F0, #EDF2F7)" }}
      >
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: "#2B6CB0" }}
        >
          Interview Question
        </h2>
        <p className="text-lg mb-6 font-medium">{question}</p>
        <MdMic
          className={`w-24 h-24 mb-4 transition duration-500 ease-in-out ${
            isRecording ? "text-red-500 animate-pulse" : "text-blue-500"
          }`}
        />
        <div className="flex flex-col space-y-4 w-full">
          {isRecording ? (
            <button
              onClick={handleStopRecording}
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Stop Recording
            </button>
          ) : (
            <button
              onClick={handleStartRecording}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Start Recording
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Submit Response
          </button>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Try Another Question
          </button>
        </div>
        {transcribedText && (
          <div className="mt-6 p-4 bg-blue-100 rounded-xl shadow-inner">
            <p className="text-sm font-medium text-gray-700">Your Answer:</p>
            <p className="text-sm text-gray-600">{transcribedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
