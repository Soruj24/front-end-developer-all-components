"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Stethoscope, Heart, Activity, Thermometer, Pill, Hospital, User, FileText } from "lucide-react";

const installCommand = `npx component-library@latest add stethoscope-med`;
const usageCode = `<HealthCheck patientId="PT-001" onComplete={handleComplete} />`;

function HealthCheck() {
  const [completed, setCompleted] = useState(false);
  const [checks, setChecks] = useState({ heart: false, lungs: false, bp: false });
  const toggleCheck = (key) => setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  const allDone = Object.values(checks).every(Boolean);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Stethoscope className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">Health Check</h3>
          <p className="text-sm text-muted-foreground">Complete all assessments</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { key: "heart", label: "Heart Exam", icon: <Heart className="h-4 w-4" /> },
          { key: "lungs", label: "Lung Auscultation", icon: <Activity className="h-4 w-4" /> },
          { key: "bp", label: "Blood Pressure", icon: <Stethoscope className="h-4 w-4" /> },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => toggleCheck(item.key)}
            className={`flex items-center gap-3 rounded-md border p-3 text-left text-sm transition-colors ${
              checks[item.key] ? "border-green-200 bg-green-50 text-green-700" : "hover:bg-muted"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
            {checks[item.key] && <span className="ml-auto text-green-600">✓</span>}
          </button>
        ))}
      </div>
      {allDone && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">All checks completed successfully</div>
      )}
    </div>
  );
}

function VitalSigns() {
  const [vitals] = useState({ heartRate: 72, temp: 98.6, o2: 98, bp: "120/80" });
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Vital Signs Monitor</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Heart Rate", value: `${vitals.heartRate} bpm`, icon: <Heart className="h-4 w-4 text-red-500" />, status: "normal" },
          { label: "Temperature", value: `${vitals.temp}°F`, icon: <Thermometer className="h-4 w-4 text-orange-500" />, status: "normal" },
          { label: "O₂ Saturation", value: `${vitals.o2}%`, icon: <Activity className="h-4 w-4 text-blue-500" />, status: "normal" },
          { label: "Blood Pressure", value: vitals.bp, icon: <Stethoscope className="h-4 w-4 text-purple-500" />, status: "normal" },
        ].map((v) => (
          <div key={v.label} className="flex items-center gap-3 rounded-md border p-3">
            {v.icon}
            <div>
              <p className="text-xs text-muted-foreground">{v.label}</p>
              <p className="font-medium text-foreground">{v.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PatientCard() {
  const [expanded, setExpanded] = useState(false);
  const patient = { name: "Jane Cooper", age: 34, id: "PT-2024-089", blood: "O+", condition: "Post-Op Recovery" };
  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <User className="h-7 w-7 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{patient.name}</h3>
          <p className="text-sm text-muted-foreground">ID: {patient.id} | Age: {patient.age}</p>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      <button onClick={() => setExpanded(!expanded)} className="text-sm text-primary hover:underline">
        {expanded ? "Show less" : "Show details"}
      </button>
      {expanded && (
        <div className="grid grid-cols-2 gap-2 rounded-md bg-muted/50 p-3 text-sm">
          <div><span className="text-muted-foreground">Blood Type:</span> {patient.blood}</div>
          <div><span className="text-muted-foreground">Condition:</span> {patient.condition}</div>
        </div>
      )}
    </div>
  );
}

function MedicationList() {
  const [meds, setMeds] = useState([
    { name: "Amoxicillin", dosage: "500mg", taken: false },
    { name: "Ibuprofen", dosage: "200mg", taken: true },
    { name: "Vitamin D", dosage: "1000IU", taken: false },
  ]);
  const toggleMed = (i) => setMeds((prev) => prev.map((m, idx) => idx === i ? { ...m, taken: !m.taken } : m));
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <Pill className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Medications</h3>
      </div>
      <div className="flex flex-col gap-2">
        {meds.map((med, i) => (
          <button
            key={med.name}
            onClick={() => toggleMed(i)}
            className={`flex items-center justify-between rounded-md border p-3 text-left text-sm transition-colors ${
              med.taken ? "border-green-200 bg-green-50" : "hover:bg-muted"
            }`}
          >
            <div>
              <p className="font-medium text-foreground">{med.name}</p>
              <p className="text-xs text-muted-foreground">{med.dosage}</p>
            </div>
            {med.taken ? <span className="text-green-600">✓ Taken</span> : <span className="text-muted-foreground">Pending</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function AppointmentSchedule() {
  const [selected, setSelected] = useState(null);
  const slots = [
    { time: "09:00 AM", doctor: "Dr. Smith", type: "Follow-up" },
    { time: "11:30 AM", doctor: "Dr. Lee", type: "Lab Work" },
    { time: "02:00 PM", doctor: "Dr. Patel", type: "Consultation" },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2">
        <Hospital className="h-5 w-5 text-primary" />
        <h3 className="font-medium text-foreground">Today's Appointments</h3>
      </div>
      <div className="flex flex-col gap-2">
        {slots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`flex items-center justify-between rounded-md border p-3 text-left text-sm transition-colors ${
              selected === i ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
          >
            <div>
              <p className="font-medium text-foreground">{slot.time} — {slot.doctor}</p>
              <p className="text-xs text-muted-foreground">{slot.type}</p>
            </div>
            <Badge variant={selected === i ? "primary" : "default"}>{selected === i ? "Selected" : "Book"}</Badge>
          </button>
        ))}
      </div>
    </div>
  );
}

function DoctorVisit() {
  const [status, setStatus] = useState("waiting");
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
        status === "done" ? "bg-green-100" : status === "in-progress" ? "bg-blue-100" : "bg-muted"
      }`}>
        <Stethoscope className={`h-8 w-8 ${
          status === "done" ? "text-green-600" : status === "in-progress" ? "text-blue-600" : "text-muted-foreground"
        }`} />
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground">
          {status === "done" ? "Visit Complete" : status === "in-progress" ? "In Progress" : "Waiting for Doctor"}
        </p>
        <p className="text-sm text-muted-foreground">Room 204 — Dr. Garcia</p>
      </div>
      <div className="flex gap-2">
        {["waiting", "in-progress", "done"].map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              status === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s === "waiting" ? "Waiting" : s === "in-progress" ? "In Progress" : "Done"}
          </button>
        ))}
      </div>
    </div>
  );
}

function MedicalReport() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-medium text-foreground">Medical Report</h3>
        </div>
        <Badge variant="success">Finalized</Badge>
      </div>
      <div className="rounded-md bg-muted/50 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Patient:</span>
          <span className="text-foreground">Jane Cooper</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Date:</span>
          <span className="text-foreground">Aug 15, 2026</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Diagnosis:</span>
          <span className="text-foreground">Post-Op Recovery</span>
        </div>
      </div>
      <button onClick={() => setOpen(!open)} className="text-sm text-primary hover:underline">
        {open ? "Hide notes" : "View physician notes"}
      </button>
      {open && (
        <div className="rounded-md border bg-white p-3 text-sm text-muted-foreground">
          Patient is recovering well. Continue current medication regimen. Follow-up in 2 weeks.
        </div>
      )}
    </div>
  );
}

export default function StethoscopeMedPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Stethoscope Med</h1>
          <Badge variant="primary">Medical</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A medical UI component set for health checks, vital signs monitoring, patient cards, medication tracking, and appointment scheduling.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Health Check</h2>
        <ComponentPreview component="StethoscopeMedHealth" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Vital Signs</h2>
        <ComponentPreview component="StethoscopeMedVitals" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Patient Card</h2>
        <ComponentPreview component="StethoscopeMedPatient" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Medication List</h2>
        <ComponentPreview component="StethoscopeMedMeds" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Appointment Schedule</h2>
        <ComponentPreview component="StethoscopeMedAppointment" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Doctor Visit</h2>
        <ComponentPreview component="StethoscopeMedVisit" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Medical Report</h2>
        <ComponentPreview component="StethoscopeMedReport" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">patientId</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{'"vitals" | "checkup" | "report"'}</td><td className="px-4 py-3 text-muted-foreground">{'"checkup"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showDetails</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onComplete</td><td className="px-4 py-3 text-muted-foreground">{'() => void'}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">compact</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr><tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
