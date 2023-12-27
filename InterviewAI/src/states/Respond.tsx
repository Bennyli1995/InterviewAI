import { useEffect, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { useReactMediaRecorder } from "react-media-recorder";

import { MdMic } from "react-icons/md";

export function Respond(props) {
  const [transcribedText, setTranscribedText] = useState("");

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });

  async function makeAPICall() {
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });

    const resp = await props.openai.createTranscription(audioFile, "whisper-1");

    console.log(resp);

    setTranscribedText(resp.data.text);
    props.setUserAnswer(resp.data.text);

    console.log(resp.data.text);
    props.setCurrentState("results");
  }

  useReactMediaRecorder({ video: false });

  useEffect(() => {
    startRecording();
  }, []);

  return (
    <div>
      <p>Question:</p>
      <p className="text-3xl">{props.question}</p>
      {/* <p>this is the respond page component</p>
        <p>would be cool to have a mic graphic here that responded
            to voice
        </p>
        <h1>{transcribedText}</h1> */}
      <div className="flex flex-col align-middle justify-center items-center">
        {/* <p>{status}</p> */}
        {/* <button onClick={startRecording}>Start Recording</button> */}
        {/* <p>below thing is for debugging</p> */}
        {/* <audio src={mediaBlobUrl} controls autoPlay loop /> */}
        {/* <button onClick = {stopRecording}>stop recording!!!</button> */}
        <MdMic className="w-48 h-1/4 animate-pulse bg-red-600 rounded-full m-10" />
        <button onClick={stopRecording}>Stop recording</button>
        <button
          onClick={() => {
            makeAPICall();
          }}
        >
          See results
        </button>
      </div>
    </div>
  );
}
