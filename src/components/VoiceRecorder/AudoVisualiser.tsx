import React, { useState } from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";
import MicIcon from "@mui/icons-material/Mic";

interface AudioFile {
  url: string;
  blob: Blob;
}

interface VoiceRecorderProps {
  message?: string;
  onSubmitAudioRecord: (audioFile: AudioFile) => void;
  setIsVoiceRecordingStarted: (isStared: boolean) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  message,
  onSubmitAudioRecord,
  setIsVoiceRecordingStarted,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
        setIsVoiceRecordingStarted(false);
      }
    } else {
      // Start recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioStream(stream);
      setIsRecording(true);
      setIsVoiceRecordingStarted(true);

      let audioChunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (audioChunks?.length > 0) {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);

          // Send only one file
          onSubmitAudioRecord({ url: audioUrl, blob: audioBlob });
        }

        // Cleanup
        setMediaRecorder(null);
        setAudioStream(null);
      };

      recorder.start();
    }
  };

  return (
    <div style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
      {isRecording && mediaRecorder && (
        <div
          style={{
            marginRight: 10,
            position: "absolute",
            left: "2%",
            top: "25%",
            // background: "#242427",

            background:
              "linear-gradient(2deg, rgba(0, 0, 0, 1) 85.77%, rgba(6, 6, 92, 1) 106.95%)",

            borderRadius: 10,
            width: "80%",
          }}
        >
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            width={"100%"}
            height={30}
            barColor="rgba(255, 255, 255, 0.50)"
          />
        </div>
      )}

      <div
        style={{
          opacity: message !== "" ? 0.3 : 1,
          width: "40px",
          height: "40px",
          backgroundColor: isRecording ? "#FF1616" : "transparent",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: isRecording ? "pulse 2s infinite" : "",
        }}
      >
        <MicIcon
          onClick={message !== "" ? () => {} : toggleRecording}
          style={{
            color: "white",
            cursor: message !== "" ? "default" : "pointer",
            pointerEvents: message !== "" ? "none" : "auto", // Prevent interaction when message is empty
          }}
        />
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default VoiceRecorder;
