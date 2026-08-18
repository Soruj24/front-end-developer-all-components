"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Stamp, CheckCircle, Shield, Award, FileText, BadgeCheck, Star } from "lucide-react";

const installCommand = `npx component-library@latest add stamp-official`;
const usageCode = `<StampOfficial label="APPROVED" variant="success" />`;

function OfficialStamp() {
  const [stamped, setStamped] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8">
      <button
        onClick={() => setStamped(!stamped)}
        className={`flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed transition-all ${
          stamped
            ? "border-green-500 bg-green-50 text-green-600 scale-110"
            : "border-muted-foreground/30 bg-muted/50 text-muted-foreground hover:border-primary hover:text-primary"
        }`}
      >
        <Stamp className="h-10 w-10" />
      </button>
      <div className="text-center">
        <p className="font-medium text-foreground">{stamped ? "Official Stamp Applied" : "Click to Stamp"}</p>
        <p className="text-sm text-muted-foreground">{stamped ? "Document has been officially stamped" : "Apply an official stamp to this document"}</p>
      </div>
      {stamped && (
        <div className="flex items-center gap-2 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-700">
          <CheckCircle className="h-4 w-4" />
          Stamp applied successfully
        </div>
      )}
    </div>
  );
}

function VerifiedBadge() {
  const [verified, setVerified] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8">
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        {verified && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground">{verified ? "Verified Account" : "Unverified"}</p>
        <p className="text-sm text-muted-foreground">Identity verification status</p>
      </div>
      <button
        onClick={() => setVerified(!verified)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {verified ? "Revoke Verification" : "Verify Account"}
      </button>
    </div>
  );
}

function ApprovalSeal() {
  const [level, setLevel] = useState("none");
  const levels = ["none", "bronze", "silver", "gold"];
  const colors = { none: "bg-muted text-muted-foreground", bronze: "bg-orange-100 text-orange-700", silver: "bg-gray-100 text-gray-700", gold: "bg-yellow-100 text-yellow-700" };
  const icons = { none: null, bronze: <Award className="h-5 w-5" />, silver: <Award className="h-5 w-5" />, gold: <Star className="h-5 w-5" /> };
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8">
      <div className={`flex h-20 w-20 items-center justify-center rounded-full ${colors[level]} transition-all`}>
        {level === "none" ? <Stamp className="h-8 w-8" /> : icons[level]}
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground">Approval Level: {level.charAt(0).toUpperCase() + level.slice(1)}</p>
        <p className="text-sm text-muted-foreground">Select an approval tier</p>
      </div>
      <div className="flex gap-2">
        {levels.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              level === l ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function CertifiedLabel() {
  const [certified, setCertified] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8">
      <div className="relative overflow-hidden rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <BadgeCheck className={`h-6 w-6 ${certified ? "text-green-600" : "text-muted-foreground"}`} />
          <div>
            <p className="text-sm font-medium text-foreground">ISO 9001:2015 Certified</p>
            <p className="text-xs text-muted-foreground">Quality Management System</p>
          </div>
        </div>
        {certified && (
          <div className="absolute -right-6 -top-6 rotate-45 bg-green-500 px-8 py-1 text-xs font-bold text-white">
            CERTIFIED
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">Toggle certification status</p>
      <button
        onClick={() => setCertified(!certified)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {certified ? "Revoke Certification" : "Grant Certification"}
      </button>
    </div>
  );
}

function DocumentStamp() {
  const [stamps, setStamps] = useState([]);
  const stampTypes = [
    { label: "Received", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { label: "Approved", color: "bg-green-100 text-green-700 border-green-200" },
    { label: "Confidential", color: "bg-red-100 text-red-700 border-red-200" },
  ];
  const addStamp = (type) => {
    if (!stamps.includes(type.label)) {
      setStamps([...stamps, type.label]);
    }
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-8">
      <div className="relative min-h-[160px] rounded-md border bg-white p-4">
        <p className="text-sm text-muted-foreground">Document Content Area</p>
        <p className="mt-2 text-xs text-muted-foreground/60">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        {stamps.map((s) => (
          <span
            key={s}
            className="absolute rotate-[-12deg] rounded border px-2 py-0.5 text-xs font-bold"
            style={{ top: `${30 + stamps.indexOf(s) * 40}px`, right: "20px" }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        {stampTypes.map((type) => (
          <button
            key={type.label}
            onClick={() => addStamp(type)}
            disabled={stamps.includes(type.label)}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              stamps.includes(type.label)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-muted"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
      {stamps.length > 0 && (
        <button onClick={() => setStamps([])} className="text-sm text-destructive hover:underline">
          Clear all stamps
        </button>
      )}
    </div>
  );
}

function QualityMark() {
  const [rating, setRating] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star === rating ? 0 : star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
            />
          </button>
        ))}
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground">{rating > 0 ? `${rating}/5 Quality Score` : "Rate Quality"}</p>
        <p className="text-sm text-muted-foreground">{rating >= 4 ? "Excellent quality" : rating >= 2 ? "Average quality" : "Select a rating"}</p>
      </div>
      {rating > 0 && (
        <Badge variant={rating >= 4 ? "success" : rating >= 2 ? "warning" : "danger"}>
          {rating >= 4 ? "High Quality" : rating >= 2 ? "Standard" : "Needs Improvement"}
        </Badge>
      )}
    </div>
  );
}

function AuthenticatedIcon() {
  const [authed, setAuthed] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-8">
      <div className="relative">
        <div className={`flex h-20 w-20 items-center justify-center rounded-full transition-all ${
          authed ? "bg-green-100 ring-4 ring-green-200" : "bg-muted"
        }`}>
          <FileText className={`h-10 w-10 ${authed ? "text-green-600" : "text-muted-foreground"}`} />
        </div>
        {authed && (
          <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
            <CheckCircle className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground">{authed ? "Document Authenticated" : "Not Authenticated"}</p>
        <p className="text-sm text-muted-foreground">Digital authentication status</p>
      </div>
      <button
        onClick={() => setAuthed(!authed)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        {authed ? "Revoke Authentication" : "Authenticate Document"}
      </button>
    </div>
  );
}

export default function StampOfficialPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Stamp Official</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A feedback component for displaying official stamps, seals, and approval badges with customizable labels and variants.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Official Stamp</h2>
        <ComponentPreview component="StampOfficialApproval" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Verified Badge</h2>
        <ComponentPreview component="StampOfficialRejection" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Approval Seal</h2>
        <ComponentPreview component="StampOfficialPending" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Certified Label</h2>
        <ComponentPreview component="StampOfficialCertified" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Document Stamp</h2>
        <ComponentPreview component="StampOfficialDocument" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Quality Mark</h2>
        <ComponentPreview component="StampOfficialQuality" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Authenticated Icon</h2>
        <ComponentPreview component="StampOfficialAuthenticated" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">label</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'""'}</td><td className="px-4 py-3">Yes</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{'"success" | "error" | "warning"'}</td><td className="px-4 py-3 text-muted-foreground">{'"success"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td><td className="px-4 py-3 text-muted-foreground">{'"md"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">icon</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">null</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">stampDate</td><td className="px-4 py-3 text-muted-foreground">Date</td><td className="px-4 py-3 text-muted-foreground">new Date()</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">rotated</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr><tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
