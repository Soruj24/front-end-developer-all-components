import type { ReactNode } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  ProgressBar,
  Rating,
  Select,
  Slider,
  Spinner,
  Switch,
  Textarea,
} from "@/components/ui";

/** Presentational element demos. Pure JSX — no client hooks. */
export const elements: Record<string, () => ReactNode> = {
  button: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),

  badge: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge dot variant="primary">
        Live
      </Badge>
    </div>
  ),

  avatar: () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Avatar alt="Alice" fallback="AL" status="online" />
      <Avatar alt="Bob" fallback="BO" status="busy" />
      <Avatar alt="Carol" fallback="CA" status="away" />
      <Avatar alt="Dave" fallback="DA" status="offline" />
      <Avatar
        alt="Eve"
        fallback="EV"
        src="https://i.pravatar.cc/80?img=5"
        size="xl"
        status="online"
      />
    </div>
  ),

  chip: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Chip>React</Chip>
      <Chip variant="primary" removable>
        TypeScript
      </Chip>
      <Chip variant="success">Stable</Chip>
      <Chip variant="warning">Beta</Chip>
      <Chip variant="error">Deprecated</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),

  card: () => (
    <Card className="w-full max-w-sm" padding="md">
      <CardHeader>
        <p className="text-sm font-semibold text-foreground">Weekly report</p>
        <p className="text-xs text-muted-foreground">Growth across all regions</p>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-foreground">+24.8%</p>
        <p className="mt-1 text-xs text-muted-foreground">vs. the previous 7 days</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Badge variant="success">On track</Badge>
        <Button size="sm">View details</Button>
      </CardFooter>
    </Card>
  ),

  input: () => (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Input type="text" placeholder="Full name" defaultValue="Ada Lovelace" />
      <Input type="email" placeholder="Email address" />
    </div>
  ),

  select: () => (
    <Select
      defaultValue="react"
      label="Framework"
      className="w-full max-w-xs"
      options={[
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
      ]}
    />
  ),

  textarea: () => (
    <Textarea
      className="w-full max-w-sm"
      rows={4}
      placeholder="Describe your use case…"
      defaultValue="Ship accessible, dependency-free components to your design system."
    />
  ),

  switch: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Airplane mode" defaultChecked />
      <Switch label="Notifications" description="Get updates about your account" defaultChecked />
      <Switch label="Dark mode" />
    </div>
  ),

  slider: () => (
    <div className="w-full max-w-sm">
      <Slider defaultValue={40} min={0} max={100} showValue />
    </div>
  ),

  rating: () => (
    <div className="flex flex-col items-center gap-3">
      <Rating value={4} size="lg" />
      <Rating value={2.5} />
      <Rating value={5} size="sm" disabled />
    </div>
  ),

  spinner: () => (
    <div className="flex items-center justify-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="md" color="oklch(0.55 0.17 255)" />
    </div>
  ),

  "progress-bar": () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <ProgressBar value={35} showLabel />
      <ProgressBar value={68} variant="success" showLabel animated />
      <ProgressBar value={92} variant="warning" />
      <ProgressBar value={100} variant="error" showLabel />
    </div>
  ),
};
