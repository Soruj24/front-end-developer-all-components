export const AI_SOURCE = `"use client";

import { useState } from "react";
import { Send, Mic } from "lucide-react";

export function AiChatSource() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: "Hello! How can I help?" }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={\`p-3 rounded-xl \${
            msg.role === "user"
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "border border-border/60 bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
          }\`}
        >
          <p className={msg.role === "user" ? "text-right" : ""}>
            {msg.content}
          </p>
        </div>
      ))}
      {isTyping && <p className="text-muted-foreground">AI is typing...</p>}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border border-border/60 bg-background p-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]"
        />
        <button
          onClick={sendMessage}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.97]"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}`;
