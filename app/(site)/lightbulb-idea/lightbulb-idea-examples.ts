export const TIP_CARD_EXAMPLE = `<TipCard title="Pro Tip" badge="Best Practice">
  <p>Always write tests before implementation.</p>
</TipCard>`;

export const SUGGESTION_ALERT_EXAMPLE = `<div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
  <Sparkles className="h-4 w-4 text-blue-500" />
  <h4 className="text-sm font-semibold text-blue-900">Suggestion</h4>
  <p className="text-sm text-blue-700">Consider using a debounce hook.</p>
</div>`;

export const IDEA_GENERATOR_EXAMPLE = `<div className="flex items-center gap-3 rounded-lg bg-zinc-50 p-4">
  <Zap className="h-5 w-5 text-zinc-900" />
  <p className="text-sm">{current.text}</p>
</div>
<button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
  Generate Idea
</button>`;

export const PRO_TIPS_LIST_EXAMPLE = `<ul className="space-y-2.5">
  {tips.map((tip, i) => (
    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600">
      <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-500" />
      <span>{tip}</span>
    </li>
  ))}
</ul>`;

export const QUICK_TIP_EXAMPLE = `<div className="inline-flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-1.5">
  <Zap className="h-4 w-4 text-yellow-600" />
  <span className="text-sm font-medium text-yellow-800">Quick Tip: Use CSS Grid.</span>
</div>`;

export const INSIGHT_CARD_EXAMPLE = `<TipCard title="Insight" badge="Analytics">
  <p>Components used most frequently are simple and composable.</p>
</TipCard>`;

export const CREATIVE_PROMPT_EXAMPLE = `<div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
  <MessageCircle className="h-4 w-4 text-purple-500" />
  <h4 className="text-sm font-semibold">Creative Prompt</h4>
  <div className="rounded-lg bg-zinc-50 p-4">
    <p className="text-sm italic text-zinc-600">"Design a dashboard widget..."</p>
  </div>
</div>`;

export const PLAYGROUND_EXAMPLE = `<TipCard title="Pro Tip" badge="Best Practice">
  <p>Always write tests before implementation.</p>
</TipCard>`;
