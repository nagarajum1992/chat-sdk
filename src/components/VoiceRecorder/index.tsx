import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

interface AudioFile {
  url: string;
  blob: Blob;
}

export default function VoiceRecorder({ onSubmitAudioRecord }: any) {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordingComplete = (blob: Blob) => {
    console.log("Recording completed...");

    const newAudioFile = { url: URL.createObjectURL(blob), blob };
    onSubmitAudioRecord(newAudioFile);

    // Reset recording state
    setIsRecording(false);
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false}
        showVisualizer={true}
        // The AudioRecorder manages its own internal state, so no additional props for start/stop are needed.
      />
    </div>
  );
}
