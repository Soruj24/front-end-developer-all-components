"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { MIC_RECORDING_SOURCE } from "./mic-recording-source";
import {
  RECORD_BUTTON_EXAMPLE,
  AUDIO_WAVEFORM_EXAMPLE,
  VOICE_MEMO_EXAMPLE,
  PODCAST_PLAYER_EXAMPLE,
  TRANSCRIPTION_VIEW_EXAMPLE,
  AUDIO_LEVEL_EXAMPLE,
  MEETING_RECORDER_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./mic-recording-examples";
import {
  RecordButton,
  AudioWaveform,
  VoiceMemo,
  PodcastPlayer,
  TranscriptionView,
  AudioLevel,
  MeetingRecorder,
  PlaygroundDemo,
} from "./demos";

export default function MicRecordingPage() {
  return (
    <ComponentDocPage
      name="Mic Recording"
      category="Audio"
      description="Audio recording components including record buttons, waveforms, voice memos, podcast players, and transcription views for audio capture and playback."
    >
      <PreviewPanel filename="mic-recording.tsx">
        <RecordButton />
      </PreviewPanel>

      <SourceCodeViewer
        source={MIC_RECORDING_SOURCE}
        filename="components/ui/MicRecording/RecordButton.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all mic recording variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Record Button" description="Central record button with timer and status indicator." code={RECORD_BUTTON_EXAMPLE}>
          <RecordButton />
        </ExampleBlock>
        <ExampleBlock title="Audio Waveform" description="Animated waveform visualization with play/pause controls." code={AUDIO_WAVEFORM_EXAMPLE}>
          <AudioWaveform />
        </ExampleBlock>
        <ExampleBlock title="Voice Memo" description="Record and save voice memos with title input and list." code={VOICE_MEMO_EXAMPLE}>
          <VoiceMemo />
        </ExampleBlock>
        <ExampleBlock title="Podcast Player" description="Full podcast player with episodes, speed controls, and progress bar." code={PODCAST_PLAYER_EXAMPLE}>
          <PodcastPlayer />
        </ExampleBlock>
        <ExampleBlock title="Transcription View" description="Interactive transcription segments with speaker labels." code={TRANSCRIPTION_VIEW_EXAMPLE}>
          <TranscriptionView />
        </ExampleBlock>
        <ExampleBlock title="Audio Level" description="Real-time audio level meters with volume controls." code={AUDIO_LEVEL_EXAMPLE}>
          <AudioLevel />
        </ExampleBlock>
        <ExampleBlock title="Meeting Recorder" description="Multi-participant meeting recorder with speaking indicators." code={MEETING_RECORDER_EXAMPLE}>
          <MeetingRecorder />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
