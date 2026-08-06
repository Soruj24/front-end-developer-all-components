export function FeatureHoverCards() {
  const features = [
    { name: "Unlimited Projects", desc: "Create as many projects as you need with no cap on active or archived projects." },
    { name: "Priority Support", desc: "Get responses within 1 hour during business hours. Dedicated Slack channel available." },
    { name: "Advanced Analytics", desc: "Detailed dashboards with custom reports, user behavior tracking, and exportable data." },
    { name: "SSO & SCIM", desc: "Single Sign-On via SAML/OIDC and automated user provisioning with SCIM." },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {features.map((f) => (
        <div key={f.name} className="group relative">
          <div className="cursor-pointer rounded-xl border border-border bg-white px-6 py-4 text-sm font-medium shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">{f.name}</div>
          <div className="invisible absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 rounded-xl border bg-white p-4 text-left shadow-lg opacity-0 transition group-hover:visible group-hover:opacity-100 dark:border-border dark:bg-zinc-900">
            <p className="text-sm font-semibold">{f.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
