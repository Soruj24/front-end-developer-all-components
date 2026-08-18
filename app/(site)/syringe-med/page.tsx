"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Syringe, Pill, Heart, Activity, Calendar, Clock, CheckCircle } from "lucide-react";

const installCommand = `npx component-library@latest add syringe-med`;
const usageCode = `<SyringeMed dosage={5} unit="ml" />`;

function VaccinationCard() {
  const [vaccines, setVaccines] = useState([
    { name: "COVID-19", date: "2024-01-15", done: true },
    { name: "Flu Shot", date: "2024-02-20", done: true },
    { name: "Booster", date: "2024-06-01", done: false },
  ]);

  const toggleVaccine = (index: number) => {
    setVaccines(vaccines.map((v, i) => i === index ? { ...v, done: !v.done } : v));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Syringe className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium">Vaccination Card</h3>
      </div>
      <div className="space-y-2">
        {vaccines.map((v, i) => (
          <div
            key={i}
            onClick={() => toggleVaccine(i)}
            className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
              v.done ? "bg-green-50 dark:bg-green-950" : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <CheckCircle className={`h-5 w-5 ${v.done ? "text-green-500" : "text-muted-foreground"}`} />
            <div className="flex-1">
              <p className="font-medium">{v.name}</p>
              <p className="text-sm text-muted-foreground">{v.date}</p>
            </div>
            <Badge variant={v.done ? "success" : "secondary"}>
              {v.done ? "Completed" : "Pending"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoseTracker() {
  const [doses, setDoses] = useState(3);
  const maxDoses = 5;

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Pill className="h-5 w-5 text-purple-500" />
        <h3 className="font-medium">Dose Tracker</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          {Array.from({ length: maxDoses }, (_, i) => (
            <button
              key={i}
              onClick={() => setDoses(i + 1)}
              className={`h-12 w-12 rounded-lg border-2 transition-all ${
                i < doses
                  ? "border-purple-500 bg-purple-500 text-white"
                  : "border-border hover:border-purple-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{doses}/{maxDoses}</p>
          <p className="text-sm text-muted-foreground">doses administered</p>
        </div>
        <div className="h-3 rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-purple-500 transition-all"
            style={{ width: `${(doses / maxDoses) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function MedicationSchedule() {
  const [meds, setMeds] = useState([
    { name: "Aspirin", time: "08:00", taken: false },
    { name: "Vitamin D", time: "12:00", taken: true },
    { name: "Calcium", time: "20:00", taken: false },
  ]);

  const toggleMed = (index: number) => {
    setMeds(meds.map((m, i) => i === index ? { ...m, taken: !m.taken } : m));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-5 w-5 text-orange-500" />
        <h3 className="font-medium">Medication Schedule</h3>
      </div>
      <div className="space-y-2">
        {meds.map((med, i) => (
          <div
            key={i}
            onClick={() => toggleMed(i)}
            className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
              med.taken ? "bg-green-50 dark:bg-green-950" : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <Clock className={`h-5 w-5 ${med.taken ? "text-green-500" : "text-orange-500"}`} />
            <div className="flex-1">
              <p className="font-medium">{med.name}</p>
              <p className="text-sm text-muted-foreground">{med.time}</p>
            </div>
            <span className={`text-xs font-medium ${med.taken ? "text-green-600" : "text-orange-600"}`}>
              {med.taken ? "Taken" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthRecord() {
  const [records] = useState([
    { label: "Blood Pressure", value: "120/80", status: "normal" },
    { label: "Heart Rate", value: "72 bpm", status: "normal" },
    { label: "Temperature", value: "98.6°F", status: "normal" },
    { label: "Blood Sugar", value: "95 mg/dL", status: "normal" },
  ]);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="h-5 w-5 text-red-500" />
        <h3 className="font-medium">Health Record</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {records.map((r, i) => (
          <div key={i} className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">{r.label}</p>
            <p className="text-lg font-bold">{r.value}</p>
            <Badge variant={r.status === "normal" ? "success" : "warning"}>
              {r.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentRemind() {
  const [reminders, setReminders] = useState([
    { appointment: "Annual Checkup", date: "2024-03-15", reminded: true },
    { appointment: "Dental Cleaning", date: "2024-04-20", reminded: false },
    { appointment: "Eye Exam", date: "2024-05-10", reminded: false },
  ]);

  const toggleReminder = (index: number) => {
    setReminders(reminders.map((r, i) => i === index ? { ...r, reminded: !r.reminded } : r));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-5 w-5 text-indigo-500" />
        <h3 className="font-medium">Appointment Reminders</h3>
      </div>
      <div className="space-y-2">
        {reminders.map((r, i) => (
          <div
            key={i}
            onClick={() => toggleReminder(i)}
            className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
              r.reminded ? "bg-indigo-50 dark:bg-indigo-950" : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <Calendar className={`h-5 w-5 ${r.reminded ? "text-indigo-500" : "text-muted-foreground"}`} />
            <div className="flex-1">
              <p className="font-medium">{r.appointment}</p>
              <p className="text-sm text-muted-foreground">{r.date}</p>
            </div>
            <span className={`text-xs font-medium ${r.reminded ? "text-indigo-600" : "text-muted-foreground"}`}>
              {r.reminded ? "Reminded" : "Set Reminder"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DosageForm() {
  const [dosage, setDosage] = useState(5);
  const [unit, setUnit] = useState<"ml" | "mg" | "units">("ml");

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Syringe className="h-5 w-5 text-teal-500" />
        <h3 className="font-medium">Dosage Form</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Amount:</label>
          <input
            type="number"
            value={dosage}
            onChange={(e) => setDosage(Number(e.target.value))}
            min="0"
            max="100"
            className="w-24 rounded-md border bg-background px-3 py-2 text-sm"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as "ml" | "mg" | "units")}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="ml">ml</option>
            <option value="mg">mg</option>
            <option value="units">units</option>
          </select>
        </div>
        <div className="rounded-lg bg-teal-50 dark:bg-teal-950 p-4 text-center">
          <p className="text-3xl font-bold text-teal-600">
            {dosage} {unit}
          </p>
          <p className="text-sm text-muted-foreground">prescribed dosage</p>
        </div>
        <div className="h-4 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-teal-500 transition-all"
            style={{ width: `${Math.min(100, (dosage / 50) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function MedicalID() {
  const [id] = useState({
    name: "John Doe",
    dob: "1985-06-15",
    bloodType: "O+",
    allergies: "Penicillin",
    emergencyContact: "+1 (555) 123-4567",
  });

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Heart className="h-5 w-5 text-red-500" />
        <h3 className="font-medium">Medical ID</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground w-24">Name</span>
          <span className="font-medium">{id.name}</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground w-24">DOB</span>
          <span className="font-medium">{id.dob}</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground w-24">Blood Type</span>
          <Badge variant="danger">{id.bloodType}</Badge>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground w-24">Allergies</span>
          <span className="font-medium text-orange-600">{id.allergies}</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <span className="text-sm text-muted-foreground w-24">Emergency</span>
          <span className="font-medium">{id.emergencyContact}</span>
        </div>
      </div>
    </div>
  );
}

export default function SyringeMedPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Syringe Med</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A data display component for medical syringe data including dosage, volume levels, and measurement indicators.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SyringeMedVaccination" />
          <ComponentPreview component="SyringeMedDoseTracker" />
          <ComponentPreview component="SyringeMedSchedule" />
          <ComponentPreview component="SyringeMedHealthRecord" />
        </div>
        <ComponentPreview component="SyringeMedAppointment" />
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SyringeMedDosageForm" />
          <ComponentPreview component="SyringeMedMedicalID" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">dosage</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">unit</td>
                <td className="px-4 py-3 text-muted-foreground">{'"ml" | "mg" | "units"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"ml"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxDosage</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showLabel</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
