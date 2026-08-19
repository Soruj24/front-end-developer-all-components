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
        <div key={i} className="p-3 rounded bg-muted">
          <p className={msg.role === "user" ? "text-right text-foreground" : "text-foreground"}>
            {msg.content}
          </p>
        </div>
      ))}
      {isTyping && <p className="text-muted-foreground">AI is typing...</p>}
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded border p-2"
        />
        <button onClick={sendMessage} className="px-3 rounded bg-primary text-primary-foreground">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}"`;