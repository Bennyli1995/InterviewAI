import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { MdMic } from "react-icons/md";
import { RespondProps } from "../types";

export function Respond({
  setCurrentState,
  question,
  setUserAnswer,
  setFeedback,
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
    setFeedback({});
    setCurrentState("start");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 p-6">
      <div className="flex flex-col bg-white shadow-xl rounded-lg p-6 max-w-md w-full text-center items-center">
        <p className="text-xl font-semibold mb-4">Question:</p>
        <p className="text-lg mb-6">{question}</p>
        <MdMic
          className={`w-24 h-24 ${
            isRecording ? "text-red-600" : "text-gray-600"
          } mb-4`}
        />
        {isRecording ? (
          <button
            onClick={handleStopRecording}
            className="px-4 py-2 bg-red-600 text-white rounded-md mb-4 hover:bg-red-700 transition duration-200"
          >
            Stop Recording
          </button>
        ) : (
          <button
            onClick={handleStartRecording}
            className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4 hover:bg-blue-700 transition duration-200"
          >
            Start Recording
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 mb-4"
        >
          Submit Response
        </button>
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
        >
          Try Another Question
        </button>
        {transcribedText && (
          <div className="mt-6 p-4 bg-gray-200 rounded-md">
            <p className="text-sm font-medium">Transcribed Text:</p>
            <p className="text-sm">{transcribedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
