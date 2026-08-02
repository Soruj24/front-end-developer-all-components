"use client";

import { useState, useRef, useEffect, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";
import { createInitialMessages } from "./data";
import { generateCode, getMockResponse, nextId, suggestedFollowUps } from "./mock";
import type { Message, Model, Tone } from "./data";

export function useAiChat() {
  const [messages, setMessages] = useState<Message[]>(createInitialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [streamingMsgId, setStreamingMsgId] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model>("GPT-4");
  const [selectedTone, setSelectedTone] = useState<Tone>("Professional");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [codeInput, setCodeInput] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("JavaScript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [contextTokens, setContextTokens] = useState(2456);
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant. Be concise and accurate.");
  const [isRecording, setIsRecording] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [shareFeedback, setShareFeedback] = useState("");
  const [exportFeedback, setExportFeedback] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, streamingText]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => {
      setCooldown((c) => c - 1);
      if (cooldown === 1) setRateLimited(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  function simulateStream(msgId: number, fullText: string) {
    setStreamingMsgId(msgId);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setStreamingText(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(interval);
        setStreamingMsgId(null);
        setStreamingText("");
      }
    }, 15 + Math.random() * 20);
  }

  function simulateTyping(delay = 800) {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, delay);
    });
  }

  function addMessage(role: "user" | "assistant", text: string) {
    const msg: Message = { id: nextId(), role, text, timestamp: Date.now() };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }

  function simulateRateLimit() {
    if (Math.random() < 0.15) {
      setRateLimited(true);
      setCooldown(15);
      return true;
    }
    return false;
  }

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput("");

    if (simulateRateLimit()) return;

    addMessage("user", content);

    const delay = 800 + Math.random() * 1200;
    await simulateTyping(delay);

    const response = getMockResponse(content, selectedTone);
    if (selectedModel === "Llama 3") {
      setErrorMessage("Llama 3 API is currently unavailable. Please try a different model.");
      return;
    }
    setErrorMessage("");

    const assistantMsg = addMessage("assistant", response);
    setContextTokens((prev) => Math.min(prev + Math.floor(content.length / 2) + Math.floor(response.length / 2), 8192));

    simulateStream(assistantMsg.id, response);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleRegenerate(msgId: number) {
    const msg = messages.find((m) => m.id === msgId);
    if (!msg) return;
    const newText = getMockResponse(msg.text, selectedTone);
    setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, text: newText } : m)));
    simulateStream(msgId, newText);
  }

  function handleEdit(msgId: number, newText: string) {
    setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, text: newText } : m)));
  }

  function handleDelete(msgId: number) {
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
  }

  function handleFeedback(msgId: number, type: "up" | "down") {
    setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, feedback: m.feedback === type ? undefined : type } : m)));
  }

  function handleGenerateCode() {
    if (!codeInput.trim()) return;
    setGeneratedCode(generateCode(codeLanguage));
  }

  function handleClear() {
    setMessages([
      { id: nextId(), role: "assistant", text: "Chat cleared. How can I help you?", timestamp: Date.now() },
    ]);
    setShowClearConfirm(false);
    setContextTokens(0);
  }

  function handleFileDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setAnalyzingImage(true);
    setTimeout(() => {
      setAnalyzingImage(false);
      addMessage("user", "[Uploaded an image for analysis]");
      const response = "I've analyzed the image. Here's what I found:\n\n- **Content**: The image appears to contain visual elements\n- **Composition**: Well-balanced with good contrast\n- **Text detected**: No readable text found\n\nWould you like me to describe it in more detail or suggest edits?";
      const assistantMsg = addMessage("assistant", response);
      simulateStream(assistantMsg.id, response);
    }, 2000);
  }

  function handleShare() {
    setShareFeedback("Link copied!");
    setTimeout(() => setShareFeedback(""), 2000);
  }

  function handleExport() {
    setExportFeedback("Downloaded as .md");
    setTimeout(() => setExportFeedback(""), 2000);
  }

  function toggleRecording() {
    setIsRecording((r) => !r);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInput("Tell me about the latest advancements in AI");
      }, 3000);
    }
  }

  function getRandomFollowUps(count = 3): string[] {
    const shuffled = [...suggestedFollowUps].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  return {
    messages, input, setInput, isTyping, streamingText, streamingMsgId,
    selectedModel, setSelectedModel, selectedTone, setSelectedTone,
    temperature, setTemperature, maxTokens, setMaxTokens,
    codeInput, setCodeInput, codeLanguage, setCodeLanguage, generatedCode,
    showSidebar, setShowSidebar, darkMode, setDarkMode,
    errorMessage, setErrorMessage, rateLimited, cooldown, contextTokens,
    systemPrompt, setSystemPrompt, isRecording, dragOver, setDragOver,
    webSearch, setWebSearch, analyzingImage, imagePreview,
    showClearConfirm, setShowClearConfirm, shareFeedback, exportFeedback,
    fileInputRef, imageInputRef, messagesEndRef,
    handleSend, handleKeyDown, handleRegenerate, handleEdit, handleDelete, handleCopy,
    handleFeedback, handleGenerateCode, handleClear, handleFileDrop, handleImageUpload,
    handleShare, handleExport, toggleRecording, getRandomFollowUps,
  };
}
