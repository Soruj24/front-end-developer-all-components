"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Trophy, Award, Medal, Star, Crown, Target, CheckCircle } from "lucide-react";

const installCommand = "npx shadcn@latest add trophy-award";
const usageCode = "import { TrophyCard } from \"@/components/trophy-award\";\n\nexport default function Page() {\n  return <TrophyCard />;\n}";

function TrophyCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={["relative rounded-lg border p-6 transition-all", hovered ? "shadow-lg scale-[1.02]" : "shadow-sm"].join(" ")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute -top-3 -right-3">
        <Badge className="bg-amber-500 text-white">Gold</Badge>
      </div>
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={["p-4 rounded-full bg-amber-100 dark:bg-amber-900/30 transition-transform", hovered ? "scale-110 rotate-12" : ""].join(" ")}>
          <Trophy className="h-10 w-10 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Employee of the Year</h3>
          <p className="text-sm text-muted-foreground">Awarded for exceptional contributions</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <p className="font-bold">2024</p>
            <p className="text-xs text-muted-foreground">Year</p>
          </div>
          <div className="text-center">
            <p className="font-bold">156</p>
            <p className="text-xs text-muted-foreground">Nominees</p>
          </div>
          <div className="text-center">
            <p className="font-bold">1</p>
            <p className="text-xs text-muted-foreground">Winner</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementBadge() {
  const [selected, setSelected] = useState<string | null>(null);
  const achievements = [
    { id: "first", label: "First Steps", icon: Star, earned: true },
    { id: "speed", label: "Lightning Fast", icon: Target, earned: true },
    { id: "streak", label: "7-Day Streak", icon: CheckCircle, earned: true },
    { id: "master", label: "Code Master", icon: Award, earned: false },
  ];
  return (
    <div className="space-y-3">
      <h3 className="font-medium flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        Achievements
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {achievements.map((ach) => {
          const Icon = ach.icon;
          return (
            <button key={ach.id} onClick={() => setSelected(ach.id)} disabled={!ach.earned} className={["p-3 rounded-lg border text-left transition-all", selected === ach.id ? "border-primary ring-1 ring-primary" : ach.earned ? "hover:border-primary" : "opacity-50 cursor-not-allowed"].join(" ")}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={["h-4 w-4", ach.earned ? "text-amber-500" : "text-muted-foreground"].join(" ")} />
                <span className="text-sm font-medium">{ach.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{ach.earned ? "Earned" : "Locked"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MedalDisplay() {
  const [view, setView] = useState("grid");
  const medals = [
    { type: "Gold", icon: Medal, color: "from-yellow-400 to-yellow-600", count: 3 },
    { type: "Silver", icon: Medal, color: "from-gray-300 to-gray-500", count: 5 },
    { type: "Bronze", icon: Medal, color: "from-orange-400 to-orange-600", count: 8 },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Medal className="h-5 w-5 text-amber-600" />
          Medal Collection
        </h3>
        <div className="flex gap-1">
          <button onClick={() => setView("grid")} className={["p-1 rounded", view === "grid" ? "bg-muted" : ""].join(" ")}>Grid</button>
          <button onClick={() => setView("list")} className={["p-1 rounded", view === "list" ? "bg-muted" : ""].join(" ")}>List</button>
        </div>
      </div>
      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-2">
          {medals.map((medal) => {
            const Icon = medal.icon;
            return (
              <div key={medal.type} className="flex flex-col items-center p-3 rounded-lg border">
                <div className={["w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center mb-2", medal.color].join(" ")}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">{medal.type}</p>
                <p className="text-lg font-bold">{medal.count}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {medals.map((medal) => {
            const Icon = medal.icon;
            return (
              <div key={medal.type} className="flex items-center gap-3 p-2 rounded-md border">
                <div className={["w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center", medal.color].join(" ")}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm flex-1">{medal.type}</span>
                <span className="text-lg font-bold">{medal.count}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WinnerBoard() {
  const [period, setPeriod] = useState("monthly");
  const winners = [
    { rank: 1, name: "Alice Chen", score: 2450, avatar: "AC" },
    { rank: 2, name: "Bob Smith", score: 2180, avatar: "BS" },
    { rank: 3, name: "Carol Lee", score: 1950, avatar: "CL" },
    { rank: 4, name: "David Park", score: 1720, avatar: "DP" },
    { rank: 5, name: "Eva Green", score: 1500, avatar: "EG" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Crown className="h-5 w-5 text-amber-500" />
          Winner Board
        </h3>
        <div className="flex gap-1">
          {["weekly", "monthly", "yearly"].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={["px-2 py-1 rounded text-xs", period === p ? "bg-primary text-primary-foreground" : "border"].join(" ")}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        {winners.map((winner) => (
          <div key={winner.rank} className={["flex items-center gap-3 p-2 rounded-md", winner.rank === 1 ? "bg-amber-50 dark:bg-amber-950/20" : "hover:bg-muted/50"].join(" ")}>
            <span className={["w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
              winner.rank === 1 ? "bg-amber-500 text-white" :
              winner.rank === 2 ? "bg-gray-400 text-white" :
              winner.rank === 3 ? "bg-orange-500 text-white" :
              "bg-muted text-muted-foreground"
            ].join(" ")}>
              {winner.rank}
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-primary/10 text-primary">
              {winner.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{winner.name}</p>
            </div>
            <span className="text-sm font-mono font-medium">{winner.score.toLocaleString()}</span>
            {winner.rank === 1 && <Trophy className="h-4 w-4 text-amber-500" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardCeremony() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Nominations", "Voting", "Announcement", "Celebration"];
  return (
    <div className="space-y-3">
      <h3 className="font-medium flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        Award Ceremony
      </h3>
      <div className="flex gap-1">
        {steps.map((step, i) => (
          <div key={step} className="flex-1">
            <div className={["h-2 rounded-full", i <= currentStep ? "bg-primary" : "bg-muted"].join(" ")} />
            <p className={["text-xs mt-1 text-center", i === currentStep ? "font-medium text-primary" : "text-muted-foreground"].join(" ")}>{step}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted/50 text-center space-y-2">
        {currentStep === 0 && <p className="text-sm">Open for nominations until March 15th</p>}
        {currentStep === 1 && <p className="text-sm">Voting closes in 3 days</p>}
        {currentStep === 2 && <p className="text-sm">Winner announced on March 20th</p>}
        {currentStep === 3 && <p className="text-sm">Join us for the celebration!</p>}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="px-3 py-1.5 rounded-md border text-xs disabled:opacity-50">Previous</button>
        <button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))} disabled={currentStep === 3} className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}

function Leaderboard() {
  const [selectedCategory, setSelectedCategory] = useState("code");
  const categories = [
    { id: "code", label: "Code Quality" },
    { id: "speed", label: "Speed" },
    { id: "bugs", label: "Bug Fixes" },
  ];
  const leaders = [
    { name: "Alice Chen", value: 98 },
    { name: "Bob Smith", value: 94 },
    { name: "Carol Lee", value: 91 },
  ];
  return (
    <div className="space-y-3">
      <h3 className="font-medium flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        Leaderboard
      </h3>
      <div className="flex gap-2">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={["px-3 py-1.5 rounded-md text-sm", selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "border"].join(" ")}>
            {cat.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {leaders.map((leader, i) => (
          <div key={leader.name} className="flex items-center gap-3">
            <span className={["w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
              i === 0 ? "bg-amber-500 text-white" : i === 1 ? "bg-gray-400 text-white" : "bg-orange-500 text-white"
            ].join(" ")}>
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{leader.name}</p>
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: leader.value + "%" }} />
              </div>
            </div>
            <span className="text-sm font-mono">{leader.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressAward() {
  const [milestones, setMilestones] = useState([
    { id: 1, label: "10 Commits", done: true },
    { id: 2, label: "50 Commits", done: true },
    { id: 3, label: "100 Commits", done: false },
    { id: 4, label: "500 Commits", done: false },
  ]);
  const completed = milestones.filter(m => m.done).length;
  const percentage = (completed / milestones.length) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Progress Awards
        </h3>
        <Badge variant="outline">{completed}/{milestones.length}</Badge>
      </div>
      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: percentage + "%" }} />
      </div>
      <div className="space-y-1">
        {milestones.map((m) => (
          <label key={m.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-muted/50 cursor-pointer">
            <input type="checkbox" checked={m.done} onChange={() => { setMilestones(milestones.map(ms => ms.id === m.id ? { ...ms, done: !ms.done } : ms)); }} className="rounded" />
            <span className={["text-sm", m.done ? "line-through text-muted-foreground" : ""].join(" ")}>{m.label}</span>
            {m.done && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function TrophyAwardPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-amber-600" />
          <h1 className="text-3xl font-bold">Trophy & Award</h1>
          <Badge variant="secondary">New</Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Trophy, achievement, and leaderboard components for gamification and recognition.
        </p>
      </header>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Trophy className="h-5 w-5" /> Trophy Card</h3>
          <ComponentPreview code={TrophyCard.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Award className="h-5 w-5" /> Achievement Badge</h3>
          <ComponentPreview code={AchievementBadge.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Medal className="h-5 w-5" /> Medal Display</h3>
          <ComponentPreview code={MedalDisplay.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Crown className="h-5 w-5" /> Winner Board</h3>
          <ComponentPreview code={WinnerBoard.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Award className="h-5 w-5" /> Award Ceremony</h3>
          <ComponentPreview code={AwardCeremony.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Target className="h-5 w-5" /> Leaderboard</h3>
          <ComponentPreview code={Leaderboard.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Trophy className="h-5 w-5" /> Progress Award</h3>
          <ComponentPreview code={ProgressAward.toString()} />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-3"><code>trophy</code></td><td className="p-3">TrophyData</td><td className="p-3">-</td><td className="p-3">Trophy details including name, year, and category</td></tr>
              <tr className="border-t"><td className="p-3"><code>medals</code></td><td className="p-3">MedalData[]</td><td className="p-3">[]</td><td className="p-3">Array of medal counts by type (gold, silver, bronze)</td></tr>
              <tr className="border-t"><td className="p-3"><code>achievements</code></td><td className="p-3">Achievement[]</td><td className="p-3">[]</td><td className="p-3">User achievements with earned status</td></tr>
              <tr className="border-t"><td className="p-3"><code>winners</code></td><td className="p-3">Winner[]</td><td className="p-3">[]</td><td className="p-3">Leaderboard entries with rank, name, and score</td></tr>
              <tr className="border-t"><td className="p-3"><code>ceremonyStep</code></td><td className="p-3">number</td><td className="p-3">0</td><td className="p-3">Current step in the award ceremony timeline</td></tr>
              <tr className="border-t"><td className="p-3"><code>onMilestoneToggle</code></td><td className="p-3">(id: number) =&gt; void</td><td className="p-3">-</td><td className="p-3">Callback when a progress milestone is toggled</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
