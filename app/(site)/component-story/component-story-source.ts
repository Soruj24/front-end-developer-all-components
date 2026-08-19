export const COMPONENT_STORY_SOURCE =
  "use client;\n\n" +
  "import { useState } from \"react\";\n\n" +
  "interface StoryVariant {\n" +
  "  name: string;\n" +
  "  props: Record<string, string | number | boolean>;\n" +
  "}\n\n" +
  "function VariantSwitchingDemo() {\n" +
  "  const [activeVariant, setActiveVariant] = useState(0);\n" +
  "  const variants: StoryVariant[] = [\n" +
  "    { name: \"Default\", props: { size: \"md\", variant: \"primary\" } },\n" +
  "    { name: \"Small\", props: { size: \"sm\", variant: \"primary\" } },\n" +
  "    { name: \"Large\", props: { size: \"lg\", variant: \"primary\" } },\n" +
  "    { name: \"Outline\", props: { size: \"md\", variant: \"outline\" } },\n" +
  "    { name: \"Ghost\", props: { size: \"md\", variant: \"ghost\" } },\n" +
  "    { name: \"Destructive\", props: { size: \"md\", variant: \"destructive\" } },\n" +
  "  ];\n\n" +
  "  const v = variants[activeVariant];\n\n" +
  "  const sizeClasses = {\n" +
  "    sm: \"text-xs px-3 py-1.5\",\n" +
  "    md: \"text-sm px-4 py-2\",\n" +
  "    lg: \"text-base px-6 py-2.5\",\n" +
  "  };\n\n" +
  "  const variantClasses = {\n" +
  "    primary: \"bg-foreground text-background hover:bg-foreground/90\",\n" +
  "    outline: \"border border-black/[.08] bg-transparent hover:bg-muted dark:border-white/[.145]\",\n" +
  "    ghost: \"bg-transparent hover:bg-muted\",\n" +
  "    destructive: \"bg-red-500 text-white hover:bg-red-600\",\n" +
  "  };\n\n" +
  "  return (\n" +
  "    <div className=\"w-full max-w-md\">\n" +
  "      <div className=\"rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]\">\n" +
  "        <div className=\"border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]\">\n" +
  "          <div className=\"flex items-center justify-between\">\n" +
  "            <span className=\"text-sm font-semibold\">Button</span>\n" +
  "            <span className=\"rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground\">\n" +
  "              {variants.length} variants\n" +
  "            </span>\n" +
  "          </div>\n" +
  "        </div>\n" +
  "        <div className=\"flex flex-wrap gap-1 border-b border-black/[.06] px-4 py-2 dark:border-white/[.1]\">\n" +
  "          {variants.map((var_, i) => (\n" +
  "            <button\n" +
  "              key={var_.name}\n" +
  "              onClick={() => setActiveVariant(i)}\n" +
  "              className={\"rounded-lg px-3 py-1.5 text-xs font-medium transition-colors \" + (\n" +
  "                activeVariant === i\n" +
  "                  ? \"bg-foreground text-background\"\n" +
  "                  : \"text-muted-foreground hover:bg-muted\"\n" +
  "              )}\n" +
  "            >\n" +
  "              {var_.name}\n" +
  "            </button>\n" +
  "          ))}\n" +
  "        </div>\n" +
  "        <div className=\"flex items-center justify-center p-10\">\n" +
  "          <button className={\"rounded-lg font-medium transition-colors \" + (\n" +
  "            sizeClasses[v.props.size as keyof typeof sizeClasses] + \" \" +\n" +
  "            variantClasses[v.props.variant as keyof typeof variantClasses]\n" +
  "          )}> Button </button>\n" +
  "        </div>\n" +
  "        <div className=\"border-t border-black/[.06] bg-muted/30 px-4 py-3 dark:border-white/[.08]\">\n" +
  "          <p className=\"font-mono text-[11px] text-muted-foreground\">{JSON.stringify(v.props, null, 2)}</p>\n" +
  "        </div>\n" +
  "      </div>\n" +
  "    </div>\n" +
  "  );\n" +
  "}\n\n" +
  "function InteractiveControlsDemo() {\n" +
  "  const [controls, setControls] = useState({\n" +
  "    disabled: false,\n" +
  "    loading: false,\n" +
  "    variant: \"primary\",\n" +
  "    size: \"md\",\n" +
  "    icon: false,\n" +
  "  });\n\n" +
  "  const sizeClasses = {\n" +
  "    sm: \"text-xs px-3 py-1.5 gap-1\",\n" +
  "    md: \"text-sm px-4 py-2 gap-1.5\",\n" +
  "    lg: \"text-base px-6 py-2.5 gap-2\",\n" +
  "  };\n\n" +
  "  const variantClasses = {\n" +
  "    primary: \"bg-foreground text-background hover:bg-foreground/90\",\n" +
  "    secondary: \"bg-muted text-foreground hover:bg-muted/80\",\n" +
  "    outline: \"border border-black/[.08] bg-transparent hover:bg-muted dark:border-white/[.145]\",\n" +
  "    ghost: \"bg-transparent hover:bg-muted\",\n" +
  "  };\n\n" +
  "  return (\n" +
  "    <div className=\"w-full max-w-sm\">\n" +
  "      <div className=\"rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]\">\n" +
  "        <div className=\"border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]\">\n" +
  "          <div className=\"flex items-center gap-2\">\n" +
  "            <Settings className=\"h-4 w-4\" />\n" +
  "            <span className=\"text-sm font-semibold\">Controls</span>\n" +
  "          </div>\n" +
  "        </div>\n" +
  "        <div className=\"grid grid-cols-2 gap-px bg-black/[.06] dark:bg-white/[.08]\">\n" +
  "          <div className=\"bg-card p-3\">\n" +
  "            <label className=\"text-[10px] font-medium text-muted-foreground\">Variant</label>\n" +
  "            <select\n" +
  "              value={controls.variant}\n" +
  "              onChange={(e) => setControls((c) => ({ ...c, variant: e.target.value }))}\n" +
  "              className=\"mt-1 w-full rounded-lg border border-black/[.08] bg-background px-2.5 py-1.5 text-xs dark:border-white/[.145]\">\n" +
  "              <option value=\"primary\">Primary</option>\n" +
  "              <option value=\"secondary\">Secondary</option>\n" +
  "              <option value=\"outline\">Outline</option>\n" +
  "              <option value=\"ghost\">Ghost</option>\n" +
  "            </select>\n" +
  "          </div>\n" +
  "          <div className=\"bg-card p-3\">\n" +
  "            <label className=\"text-[10px] font-medium text-muted-foreground\">Size</label>\n" +
  "            <select\n" +
  "              value={controls.size}\n" +
  "              onChange={(e) => setControls((c) => ({ ...c, size: e.target.value }))}\n" +
  "              className=\"mt-1 w-full rounded-lg border border-black/[.08] bg-background px-2.5 py-1.5 text-xs dark:border-white/[.145]\">\n" +
  "              <option value=\"sm\">Small</option>\n" +
  "              <option value=\"md\">Medium</option>\n" +
  "              <option value=\"lg\">Large</option>\n" +
  "            </select>\n" +
  "          </div>\n" +
  "          <div className=\"bg-card p-3\">\n" +
  "            <label className=\"flex items-center gap-2 text-xs\">\n" +
  "              <button\n" +
  "                onClick={() => setControls((c) => ({ ...c, disabled: !c.disabled }))}\n" +
  "                className={\"flex h-5 w-9 items-center rounded-full p-0.5 transition-colors \" + (\n" +
  "                  controls.disabled ? \"bg-foreground\" : \"bg-muted\"\n" +
  "                )}> <div className={\"h-4 w-4 rounded-full bg-background shadow-sm transition-transform \" + (\n" +
  "                  controls.disabled ? \"translate-x-4\" : \"\"\n" +
  "                )} /> Disabled</label>\n" +
  "          </div>\n" +
  "          <div className=\"bg-card p-3\">\n" +
  "            <label className=\"flex items-center gap-2 text-xs\">\n" +
  "              <button\n" +
  "                onClick={() => setControls((c) => ({ ...c, loading: !c.logging }))}\n" +
  "                className={\"flex h-5 w-9 items-center rounded-full p-0.5 transition-colors \" + (\n" +
  "                  controls.loading ? \"bg-foreground\" : \"bg-muted\"\n" +
  "                )}> <div className={\"h-4 w-4 rounded-full bg-background shadow-sm transition-transform \" + (\n" +
  "                  controls.loading ? \"translate-x-4\" : \"\"\n" +
  "                )} /> Loading</label>\n" +
  "          </div>\n" +
  "        </div>\n" +
  "        <div className=\"flex items-center justify-center p-8\">\n" +
  "          <button\n" +
  "            disabled={controls.disabled || controls.loading}\n" +
  "            className={\"flex items-center rounded-lg font-medium transition-all \" + (\n" +
  "              sizeClasses[controls.size as keyof typeof sizeClasses] + \" \" +\n" +
  "              variantClasses[controls.variant as keyof typeof variantClasses] + \" \" +\n" +
  "              (controls.disabled || controls.loading ? \"opacity-50 cursor-not-allowed\" : \"\")\n" +
  "            )}> {controls.loading ? (\"Loading...\") : (\"Button\")}</button>\n" +
  "        </div>\n" +
  "      </div>\n" +
  "    </div>\n" +
  "  );\n" +
  "}\n\n" +
  "function LifecycleTimelineDemo() {\n" +
  "  const [activeStep, setActiveStep] = useState(0);\n" +
  "  const steps = [\n" +
  "    { label: \"Mount\", time: \"0ms\", desc: \"Component enters DOM\", color: \"bg-emerald-500\" },\n" +
  "    { label: \"Render\", time: \"16ms\", desc: \"Initial paint complete\", color: \"bg-blue-500\" },\n" +
  "    { label: \"Hydrate\", time: \"45ms\", desc: \"Event listeners attached\", color: \"bg-purple-500\" },\n" +
  "    { label: \"Interact\", time: \"150ms\", desc: \"User input processed\", color: \"bg-amber-500\" },\n" +
  "    { label: \"Update\", time: \"200ms\", desc: \"State change re-render\", color: \"bg-pink-500\" },\n" +
  "    { label: \"Unmount\", time: \"∞\", desc: \"Cleanup and remove\", color: \"bg-red-500\" },\n" +
  "  ];\n\n" +
  "  return (\n" +
  "    <div className=\"w-full max-w-lg\">\n" +
  "      <div className=\"rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]\">\n" +
  "        <div className=\"flex items-center justify-between mb-4\">\n" +
  "          <span className=\"text-sm font-semibold\">Lifecycle Timeline</span>\n" +
  "          <span className=\"text-[10px] text-muted-foreground\">Step {activeStep + 1}/{steps.length}</span>\n" +
  "        </div>\n" +
  "        <div className=\"flex items-start gap-0 mb-4\">\n" +
  "          {steps.map((s, i) => (\n" +
  "            <div key={s.label} className=\"flex items-start\">\n" +
  "              <button\n" +
  "                onClick={() => setActiveStep(i)}\n" +
  "                className=\"flex flex-col items-center gap-1.5\">\n" +
  "                <div className={\"flex h-8 w-8 items-center justify-center rounded-full transition-all \" + (\n" + "i <= activeStep\n" + "    ? \"{\" + s.color + \" text-white}\"\n" + "    : \"bg-muted text-muted-foreground\")}> {i < activeStep ? <Check className=\"h-4 w-4\" /> : <span className=\"text-xs font-bold\">{i + 1}</span>}</div> <span className=\"text-[10px] font-medium \" + (\n" + "i === activeStep ? \"text-foreground\" : \"text-muted-foreground\") + \">\" + s.label + \"</span>\">}\n" + "              </button>\n" + "              {i < steps.length - 1 && (<div className={\"mx-1 mt-4 h-0.5 w-8 \" + (\n" + "i < activeStep ? \"bg-foreground/30\" : \"bg-muted\") + \"}>\"}>}</div>)}\n" + "            </div>\n" + "          ))}\n" + "        </div>\n" + "        <div className=\"rounded-lg bg-muted/50 p-4\">\n" + "          <div className=\"flex items-center gap-2 mb-1\">\n" + "            <div className={\"h-2 w-2 rounded-full \" + \"{\" + steps[activeStep].color + \"}\">} /> <span className=\"text-sm font-semibold\">\" + steps[activeStep].label + \"</span> <span className=\"ml-auto font-mono text-xs text-muted-foreground\">\" + steps[activeStep].time + \"</span></div>\n" + "          <p className=\"text-xs text-muted-foreground\">\" + steps[activeStep].desc + \"</p>\n" + "        </div>\n" + "      </div>\n" + "    </div>\n" + "  );\n" +
  "}\n\n" +
  "function ThemePreviewDemo() {\n" +
  "  const [theme, setTheme] = useState<\"light\" | \"dark\" | \"system\">(\"light\");\n" + "  const themes = [\n" + "    { id: \"light\" as const, label: \"Light\", icon: Sun },\n" + "    { id: \"dark\" as const, label: \"Dark\", icon: Moon },\n" + "    { id: \"system\" as const, label: \"System\", icon: Monitor },\n" + "  ];\n\n" + "  const isDark = theme === \"dark\" || (theme === \"system\" && false);\n\n" + "  return (\n" + "    <div className=\"w-full max-w-md\">\n" + "      <div className=\"rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]\">\n" + "        <div className=\"flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]\">\n" + "          <span className=\"text-sm font-semibold\">Theme Preview</span>\n" + "          <div className=\"flex gap-1\">\n" + "            {themes.map((t) => (\n" + "              <button\n" + "                key={t.id}\n" + "                onClick={() => setTheme(t.id)}\n" + "                className={\"flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors \" + (\n" + "                theme === t.id ? \"bg-foreground text-background\" : \"text-muted-foreground hover:bg-muted\")}> <t.icon className=\"h-3 w-3\" /> {t.label}</button>\n" + "            ))}</div>" + "        </div>" + "        <div className={\"p-6 \" + (isDark ? \"bg-zinc-900\" : \"bg-zinc-50\")}> <div className={\"rounded-xl border p-4 shadow-sm \" + (isDark ? \"border-white/[.145] bg-zinc-800\" : \"border-black/[.08] bg-white\")}> <div className=\"flex items-center gap-3 mb-3\"> <div className={\"h-10 w-10 rounded-full \" + (isDark ? \"bg-zinc-700\" : \"bg-zinc-200\")} /> <div> <p className={\"text-sm font-semibold \" + (isDark ? \"text-white\" : \"text-zinc-900\")}>John Doe</p> <p className={\"text-xs \" + (isDark ? \"text-zinc-400\" : \"text-zinc-500\")}>john@example.com</p></div></div> <div className=\"flex gap-2\"> <button className={\"rounded-lg px-3 py-1.5 text-xs font-medium \" + (isDark ? \"bg-white text-zinc-900\" : \"bg-zinc-900 text-white\")}>Follow</button> <button className={\"rounded-lg px-3 py-1.5 text-xs font-medium \" + (isDark ? \"border border-white/[.145] text-zinc-300\" : \"border border-black/[.08] text-zinc-600\")}>Message</button></div></div></div></div></div></div></div></div>);