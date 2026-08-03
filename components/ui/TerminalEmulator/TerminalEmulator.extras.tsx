import type { TerminalCommand } from "./TerminalEmulator.types";
import { span, randomLine } from "./TerminalEmulator.fs";
import { TERMINAL_THEMES } from "./TerminalEmulator.themes";

export const EXTRA_COMMANDS: TerminalCommand[] = [
  { name: "theme", description: "Switch color theme", usage: "theme <name>", run: (args, ctx) => {
    if (!args[0]) return [{ spans: [span("usage: theme <name>", "warn")] }];
    const found = TERMINAL_THEMES.find((t) => t.id === args[0] || t.label.toLowerCase() === args[0].toLowerCase());
    if (!found) return [{ spans: [span(`theme: unknown theme '${args[0]}'. Try one of:`, "error")] }, { spans: TERMINAL_THEMES.map((t) => span(`${t.id} `, "accent")) }];
    ctx.setTheme(found.id);
    return [{ spans: [span(`theme set to ${found.label}`, "success")] }];
  } },
  { name: "themes", description: "List available themes", usage: "themes", run: (_args, ctx) => {
    const current = ctx.theme();
    return TERMINAL_THEMES.map((t) => {
      const marker = t.id === current ? span("*", "success", { bold: true }) : span(" ");
      return { spans: [marker, span(`  ${t.id.padEnd(10)}`, "accent"), span(t.label)] };
    });
  } },
  { name: "neofetch", description: "System information", usage: "neofetch", run: (_args, ctx) => {
    const art = ["   _______  _____  _____  _____   ______", "  |__   __||  __ \\|  __ \\|  __ \\ |  ____|", "     | |   | |__) | |  | | |__) || |__", "     | |   |  ___/| |  | |  ___/ |  __|", "     | |   | |    | |__| | |     | |____", "     |_|   |_|    |_____/|_|     |______|", ""];
    const info = [[span("  user", "dim"), span("  ada")], [span("  host", "dim"), span("  playground")], [span("  os", "dim"), span("  Browser 16.2 (zero-backend edition)")], [span("  kernel", "dim"), span("  javascript/engine")], [span("  shell", "dim"), span("  playground-terminal 1.2.0")], [span("  theme", "dim"), span(`  ${ctx.theme()}`)], [span("  uptime", "dim"), span("  since you clicked here")]];
    return [...art.map((line) => ({ spans: [span(line, "accent")] })), ...info.map((row) => ({ spans: row }))];
  } },
  { name: "ping", description: "Ping the localhost", usage: "ping [count]", run: (args) => {
    const count = Math.max(1, Math.min(6, parseInt(args[0] ?? "4", 10) || 4));
    const lines: import("./TerminalEmulator.types").TermLineOut[] = [{ spans: [span("PING 127.0.0.1 (127.0.0.1): 56 data bytes", "dim")] }];
    for (let i = 0; i < count; i += 1) { const ms = (0.02 + Math.random() * 0.03).toFixed(3); lines.push({ spans: [span(`64 bytes from 127.0.0.1: icmp_seq=${i} ttl=64 time=${ms} ms`)], delay: 340 }); }
    lines.push({ spans: [span("--- 127.0.0.1 ping statistics ---", "dim")] }, { spans: [span(`${count} packets transmitted, ${count} received, 0.0% packet loss`, undefined)] });
    return lines;
  } },
  { name: "matrix", description: "Feel the rain", usage: "matrix", run: () => Array.from({ length: 7 }, () => ({ spans: [span(randomLine(40 + Math.floor(Math.random() * 45)), "success")], delay: 70 })) },
  { name: "sudo", description: "Execute with privilege (simulated)", usage: "sudo <command>", run: (args) => {
    if (!args[0]) return [{ spans: [span("usage: sudo <command>", "warn")] }];
    if (args[0] === "rm") return [{ spans: [span("Nice try. There is no filesystem to delete.", "warn")] }];
    return [{ spans: [span("[sudo] password for ada: ", undefined)], type: "line", delay: 500 }, { spans: [span("ada is not in the sudoers file. ", "error"), span("This incident will be reported.", "error", { dim: true })], delay: 320 }];
  } },
  { name: "cowsay", description: "Let the cow speak", usage: "cowsay [text]", run: (args) => {
    const message = args.join(" ") || "moo"; const border = "-".repeat(message.length + 2);
    return [{ spans: [span(` ${border}`)], type: "line", delay: 40 }, { spans: [span(`< ${message} >`, "accent", { bold: true })], type: "line", delay: 40 }, { spans: [span(` ${border}`)], type: "line", delay: 40 }, { spans: [span(`        \\   ^__^`)], type: "line", delay: 40 }, { spans: [span(`         \\  (oo)\\_______`)], type: "line", delay: 40 }, { spans: [span(`            (__)\\       )\\/\\`)], type: "line", delay: 40 }, { spans: [span(`                ||----w |`)], type: "line", delay: 40 }, { spans: [span(`                ||     ||`)], type: "line", delay: 40 }];
  } },
  { name: "about", description: "About this terminal", usage: "about", run: () => [
    { spans: [span("playground-terminal v1.2.0", "accent", { bold: true })] },
    { spans: [span("A browser-based terminal emulator. No backend, no wires.")] },
    { spans: [span("Features: typing animation, history, autocomplete, 6 themes, resizable.")] },
    { spans: [span("Try: ", "dim"), span("help", "accent"), span(", ", undefined), span("neofetch", "accent"), span(", ", undefined), span("ping", "accent"), span(", ", undefined), span("matrix", "accent"), span(", ", undefined), span("secret", "accent")] },
  ] },
  { name: "exit", description: "Leave the terminal (nope)", usage: "exit", run: () => [
    { spans: [span("logout", "dim")] },
    { spans: [span("The terminal lives in the browser — it isn't going anywhere. Type 'help' to keep exploring.", undefined, { dim: true })] },
  ] },
  { name: "secret", description: "", usage: "secret", hidden: true, run: () => [{ spans: [span("You found the secret. 42 is the answer, as always.", "success")], type: "chars", delay: 18 }] },
];
