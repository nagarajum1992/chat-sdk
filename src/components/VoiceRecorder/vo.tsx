import React, { useEffect, useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

interface AudioFile {
  url: string;
  blob: Blob;
}

export default function VoiceRecorder({ onSubmitAudioRecord }: any) {
  const handleRecordingComplete = (blob: Blob) => {
    console.log("Recording completed...");

    // Create a new audio file object from the Blob
    const newAudioFile = { url: URL.createObjectURL(blob), blob };

    // Send the Blob directly to the onSubmitAudioRecord function
    onSubmitAudioRecord(newAudioFile);
  };

  return (
    <>
      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={false} // Set to false as we're handling this manually
      />
    </>
  );
}
