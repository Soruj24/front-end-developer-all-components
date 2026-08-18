"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import ComponentPreview from "@/components/preview";
import CodeBlock from "@/components/home/CodeBlock";
import { Circle, Mic, Video, Radio, Eye, Bell, AlertCircle } from "lucide-react";

const installCommand = "npx ui-add recording-dot";
const usageCode = `import { RecordingDot } from "@/components/ui/recording-dot";

<RecordingDot variant="live" />
`;

function LiveDot() {
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setIsLive(!isLive)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Circle className={`h-3 w-3 ${isLive ? "fill-red-500 text-red-500 animate-pulse" : "text-muted-foreground"}`} />
        {isLive ? "Live" : "Start Live"}
      </button>
      {isLive && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          Broadcasting live
        </div>
      )}
    </div>
  );
}

function RecordingIndicator() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {isRecording && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-sm font-medium text-red-500">REC</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ActiveCall() {
  const [isInCall, setIsInCall] = useState(false);
  const [duration, setDuration] = useState(0);

  const toggleCall = () => {
    if (!isInCall) {
      setIsInCall(true);
      const interval = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsInCall(false);
      setDuration(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
        <div className="flex items-center gap-2">
          <Video className={`h-5 w-5 ${isInCall ? "text-green-500" : "text-muted-foreground"}`} />
          <span className="font-medium">{isInCall ? "Active Call" : "No Active Call"}</span>
        </div>
        {isInCall && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-muted-foreground">{formatTime(duration)}</span>
          </div>
        )}
      </div>
      <button
        onClick={toggleCall}
        className={`px-4 py-2 rounded-lg transition-colors ${
          isInCall
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isInCall ? "End Call" : "Join Call"}
      </button>
    </div>
  );
}

function BroadcastLive() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [viewers, setViewers] = useState(0);

  const toggleBroadcast = () => {
    if (!isBroadcasting) {
      setIsBroadcasting(true);
      setViewers(Math.floor(Math.random() * 100) + 1);
    } else {
      setIsBroadcasting(false);
      setViewers(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative p-6 rounded-xl border bg-card overflow-hidden">
        {isBroadcasting && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
        )}
        <div className="flex items-center gap-4 relative">
          <Radio className={`h-6 w-6 ${isBroadcasting ? "text-red-500" : "text-muted-foreground"}`} />
          <div>
            <p className="font-medium">{isBroadcasting ? "Broadcasting" : "Offline"}</p>
            {isBroadcasting && (
              <p className="text-sm text-muted-foreground">{viewers} viewers</p>
            )}
          </div>
        </div>
        {isBroadcasting && (
          <div className="absolute top-2 right-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
          </div>
        )}
      </div>
      <button
        onClick={toggleBroadcast}
        className={`px-4 py-2 rounded-lg transition-colors ${
          isBroadcasting
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {isBroadcasting ? "End Broadcast" : "Start Broadcast"}
      </button>
    </div>
  );
}

function ScreenRecord() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-md aspect-video rounded-lg border bg-muted flex items-center justify-center relative overflow-hidden">
        {isRecording ? (
          <div className="flex flex-col items-center gap-2">
            <Eye className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Screen capture active</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Eye className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">No screen share</span>
          </div>
        )}
        {isRecording && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/70 text-white px-2 py-1 rounded text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            REC
          </div>
        )}
      </div>
      <button
        onClick={() => setIsRecording(!isRecording)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          isRecording
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {isRecording ? "Stop Recording" : "Record Screen"}
      </button>
    </div>
  );
}

function AudioRecord() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4 p-4 rounded-xl border bg-card">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
            isRecording
              ? "bg-red-500 text-white animate-pulse"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          <Mic className="h-5 w-5" />
        </button>
        <div>
          <p className="font-medium">{isRecording ? "Recording..." : "Tap to record"}</p>
          <p className="text-sm text-muted-foreground">
            {isRecording ? "Audio is being captured" : "Ready to record audio"}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge() {
  const [status, setStatus] = useState<"live" | "recording" | "offline">("offline");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Badge
          variant={status === "live" ? "destructive" : status === "recording" ? "default" : "secondary"}
        >
          <span className="relative flex h-2 w-2 mr-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              status === "live" ? "bg-red-400" : status === "recording" ? "bg-blue-400" : "bg-gray-400"
            } opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              status === "live" ? "bg-red-500" : status === "recording" ? "bg-blue-500" : "bg-gray-500"
            }`} />
          </span>
          {status === "live" ? "LIVE" : status === "recording" ? "REC" : "OFFLINE"}
        </Badge>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setStatus("live")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            status === "live" ? "bg-red-500 text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          Live
        </button>
        <button
          onClick={() => setStatus("recording")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            status === "recording" ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          Recording
        </button>
        <button
          onClick={() => setStatus("offline")}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            status === "offline" ? "bg-gray-500 text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          Offline
        </button>
      </div>
    </div>
  );
}

export default function RecordingDotPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Recording Dot</h1>
          <Badge variant="secondary">UI Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Animated recording indicators for live streams, calls, and screen capture.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Live Dot</h3>
            <ComponentPreview>
              <LiveDot />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Recording Indicator</h3>
            <ComponentPreview>
              <RecordingIndicator />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Active Call</h3>
            <ComponentPreview>
              <ActiveCall />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Broadcast Live</h3>
            <ComponentPreview>
              <BroadcastLive />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Screen Record</h3>
            <ComponentPreview>
              <ScreenRecord />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Audio Record</h3>
            <ComponentPreview>
              <AudioRecord />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Status Badge</h3>
            <ComponentPreview>
              <StatusBadge />
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Prop</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Default</th>
                <th className="text-left py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">variant</td>
                <td className="py-2">"live" | "recording" | "offline"</td>
                <td className="py-2">"live"</td>
                <td className="py-2">The visual state of the recording dot</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">size</td>
                <td className="py-2">"sm" | "md" | "lg"</td>
                <td className="py-2">"md"</td>
                <td className="py-2">Size of the indicator dot</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">pulse</td>
                <td className="py-2">boolean</td>
                <td className="py-2">true</td>
                <td className="py-2">Enable pulse animation</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">label</td>
                <td className="py-2">string</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Optional text label</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
