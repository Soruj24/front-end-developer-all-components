"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HELMET_SHIELD_SOURCE } from "./helmet-shield-source";
import {
  SECURITY_STATUS_EXAMPLE,
  FIREWALL_MONITOR_EXAMPLE,
  ANTIVIRUS_DASHBOARD_EXAMPLE,
  PASSWORD_STRENGTH_EXAMPLE,
  VPN_STATUS_EXAMPLE,
  BREACH_ALERTS_EXAMPLE,
  COMPLIANCE_SCORE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./helmet-shield-examples";
import {
  SecurityStatusDemo,
  FirewallMonitorDemo,
  AntivirusDashboardDemo,
  PasswordStrengthDemo,
  VpnStatusDemo,
  BreachAlertsDemo,
  ComplianceScoreDemo,
  PlaygroundDemo,
} from "./demos";

export default function HelmetShieldPage() {
  return (
    <ComponentDocPage
      name="Helmet Shield"
      category="Feedback"
      description="A helmet shield component for safety feedback and protection status indicators."
    >
      <PreviewPanel filename="helmet-shield.tsx">
        <SecurityStatusDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HELMET_SHIELD_SOURCE}
        filename="components/ui/HelmetShield/HelmetShield.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch protection levels and test password strength." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Security Status" description="Protection level indicator with selectable states." code={SECURITY_STATUS_EXAMPLE}>
          <SecurityStatusDemo />
        </ExampleBlock>
        <ExampleBlock title="Firewall Monitor" description="Network security dashboard with blocked connections and active rules." code={FIREWALL_MONITOR_EXAMPLE}>
          <FirewallMonitorDemo />
        </ExampleBlock>
        <ExampleBlock title="Antivirus Dashboard" description="Threat detection with animated scan progress." code={ANTIVIRUS_DASHBOARD_EXAMPLE}>
          <AntivirusDashboardDemo />
        </ExampleBlock>
        <ExampleBlock title="Password Strength" description="Password security indicator with real-time strength meter." code={PASSWORD_STRENGTH_EXAMPLE}>
          <PasswordStrengthDemo />
        </ExampleBlock>
        <ExampleBlock title="VPN Status" description="Connection security display with server info." code={VPN_STATUS_EXAMPLE}>
          <VpnStatusDemo />
        </ExampleBlock>
        <ExampleBlock title="Breach Alerts" description="Security incident log with status indicators." code={BREACH_ALERTS_EXAMPLE}>
          <BreachAlertsDemo />
        </ExampleBlock>
        <ExampleBlock title="Compliance Score" description="Security rating display with category breakdown." code={COMPLIANCE_SCORE_EXAMPLE}>
          <ComplianceScoreDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
