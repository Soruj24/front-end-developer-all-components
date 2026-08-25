"use client";

import { useState, useEffect } from "react";
import { Send, Mic, Moon, Sun, } from "lucide-react";

import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ChatMessage, TypingIndicator } from "./Chat";
import { ImagesPanel } from "./ImagesPanel";
import { InputArea } from "./InputArea";
import { ErrorBanner, RateLimitBanner, ClearDialog } from "./Banners";
import { quickPrompts } from "./data";
import type { Message } from "./data";

export function useAiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [darkMode, setDarkMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rateLimited, setRateLimited] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [contextTokens, setContextTokens] = useState(0);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [exportFeedback, setExportFeedback] = useState(false);
  const [fileInputRef, setFileInputRef] = useState(null);
  const [imageInputRef, setImageInputRef] = useState(null);
  const [messagesEndRef, setMessagesEndRef] = useState(null);
  const [handleSend, setHandleSend] = useState(() => () => {});
  const [handleKeyDown, setHandleKeyDown] = useState(() => (e: { key: string }) => {
    if (e.key === "Enter") handleSend();
  });
  const [handleRegenerate, setHandleRegenerate] = useState(() => () => {});
  const [handleEdit, setHandleEdit] = useState(() => () => {});
  const [handleDelete, setHandleDelete] = useState(() => () => {});
  const [handleFeedback, setHandleFeedback] = useState(() => () => {});
  const [handleGenerateCode, setHandleGenerateCode] = useState(() => () => {});
  const [codeInput, setCodeInput] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("typescript");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toggleRecording, setToggleRecording] = useState(() => () => {});
  const [getRandomFollowUps, setGetRandomFollowUps] = useState(() => () => []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop
  };

  const followUpsFor = (msg: Message, latest: boolean) =>
    latest && msg.role === "assistant" ? getRandomFollowUps() : [];

  return {
    messages,
    input,
    setInput,
    isTyping,
    handleSend,
    handleKeyDown,
    handleRegenerate,
    handleEdit,
    handleDelete,
    handleFeedback,
    handleGenerateCode,
    codeInput,
    setCodeInput,
    codeLanguage,
    setCodeLanguage,
    generatedCode,
    showSidebar,
    setShowSidebar,
    darkMode,
    setDarkMode,
    errorMessage,
    setErrorMessage,
    rateLimited,
    cooldown,
    contextTokens,
    systemPrompt,
    setSystemPrompt,
    isRecording,
    dragOver,
    setDragOver,
    webSearch,
    setWebSearch,
    analyzingImage: false,
    imagePreview: null,
    showClearConfirm,
    setShowClearConfirm,
    shareFeedback,
    exportFeedback,
    fileInputRef,
    imageInputRef,
    messagesEndRef,
    handleSend,
    handleKeyDown,
    handleRegenerate,
    handleEdit,
    handleDelete,
    handleFeedback,
    handleGenerateCode,
    handleClear: () => setShowClearConfirm(false),
    handleShare: () => {},
    handleExport: () => {},
    toggleRecording,
    getRandomFollowUps,
  };
}

function ChatMessageDemo({ msg, isStreaming, streamingText, followUps, onCopy, onRegenerate, onEdit, onDelete, onFeedback, onFollowUp }: any) {
  return (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-md flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary">
          <Send className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground">{msg.role === "assistant" ? "Assistant" : "User"}</p>
          <p className="mt-1 text-muted-foreground">{msg.content}</p>
        </div>
      </div>
    </div>
  );
}

function SidebarDemo({ visible, onClose, onClear }: any) {
  return (
    <div className="w-64 border-right border-border bg-muted flex-shrink-0">
      <div className="p-4">
        <h3 className="font-semibold text-sidebar">Sidebar</h3>
        <button onClick={onClose} className="mt-4 w-full rounded border border-border px-3 py-1 text-sm hover:bg-muted">Close</button>
        <button onClick={onClear} className="mt-2 w-full rounded border border-border px-3 py-1 text-sm text-red-500 hover:bg-red-500/10">Clear</button>
      </div>
    </div>
  );
}

function TopBarDemo({ sidebarVisible, onToggleSidebar, model, onModelChange, webSearch, onToggleWebSearch, darkMode, onToggleDark, shareFeedback, exportFeedback, onShare, onExport }: any) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">AI Chat</h2>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">Model: {model}</span>
          <button onClick={onToggleSidebar} className="rounded-md px-3 py-1 text-xs text-muted-foreground hover:bg-muted">Sidebar</button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={onShare} className="rounded-md px-3 py-1 text-xs text-muted-foreground hover:bg-muted">Share</button>
        <button onClick={onExport} className="rounded-md px-3 py-1 text-xs text-muted-foreground hover:bg-muted">Export</button>
      </div>
    </div>
  );
}

function ImagesPanelDemo({ analyzingImage, imagePreview }: any) {
  return <div className="mt-4 p-4 rounded bg-muted/50">Images Panel</div>;
}

function InputAreaDemo({ contextTokens, selectedTone, onToneChange, systemPrompt, onSystemPromptChange, input, onInputChange, onKeyDown, dragOver, onDragOver, onDragLeave, onDrop, fileInputRef, imageInputRef, onImageUpload, isRecording, onToggleRecording, onSend, canSend, temperature, onTemperatureChange, maxTokens, onMaxTokensChange, codeInput, onCodeInputChange, onGenerateCode, generatedCode }: any) {
  return (
    <div className="mt-6 p-4 rounded bg-muted/50">
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="w-full rounded border p-2 focus:outline-none focus:border-primary"
      />
      <button onClick={onSend} disabled={!canSend} className="mt-2 rounded bg-primary text-primary-foreground px-3 py-1 text-sm hover:bg-primary/90">
        Send
      </button>
    </div>
  );
}

function ErrorBannerDemo({ message, onRetry }: any) {
  return (
    <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/20">
      <p className="text-sm text-red-400">{message}</p>
      <button onClick={onRetry} className="mt-2 rounded bg-red-500/20 px-3 py-1 text-sm">Retry</button>
    </div>
  );
}

function RateLimitBannerDemo({ visible, cooldown }: any) {
  return visible ? (
    <div className="mt-4 p-3 rounded bg-orange-500/10 border border-orange-500/20">
      <p className="text-sm text-orange-400">Rate limited. Try again in {cooldown}s.</p>
    </div>
  ) : null;
}

function ClearDialogDemo({ visible, onCancel, onConfirm }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded border flex flex-col gap-4">
        <p>Clear conversation?</p>
        <button onClick={onConfirm} className="rounded bg-primary text-primary-foreground px-4 py-2">Clear</button>
        <button onClick={onCancel} className="rounded border border-border px-4 py-2">Cancel</button>
      </div>
    </div>
  );
}

function QuickPromptsDemo({ prompt }: any) {
  return (
    <button
      key={prompt}
      onClick={() => {}}
      className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-blue-300 dark:border-border dark:bg-muted dark:text-muted-foreground dark:hover:border-blue-600 dark:hover:text-blue-400"
    >
      {prompt}
    </button>
  );
}

export default function AiDemos() {
  const aiHook = useAiChat();
  const {
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
  } = aiHook;

  const isLatest = (idx: number) => idx === messages.length - 1;
  const followUpsFor = (msg: Message, latest: boolean) =>
    latest && msg.role === "assistant" && streamingMsgId !== msg.id ? getRandomFollowUps() : [];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">AI Chat</h1>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">Interactive</span>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Full-featured AI chat interface with streaming, multiple models, code generation,
          file uploads, and voice recording. Try it out below.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <div className="rounded-xl border border-border bg-muted/50 p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-xs">{`import { useAiChat } from "@/features/ai";`}</pre>
        </div>
      </section>

      <Sidebar visible={showSidebar} onClose={() => setShowSidebar(false)} onClear={() => setShowClearConfirm(true)} />

      <div className="flex flex-1 flex-col">
        <TopBar
          sidebarVisible={showSidebar}
          onToggleSidebar={() => setShowSidebar(true)}
          model={selectedModel}
          onModelChange={setSelectedModel}
          webSearch={webSearch}
          onToggleWebSearch={() => setWebSearch((w) => !w)}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
          shareFeedback={shareFeedback}
          exportFeedback={exportFeedback}
          onShare={handleShare}
          onExport={handleExport}
        />

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.length <= 1 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {quickPrompts.map((p) => (
                  <QuickPromptsDemo key={p} prompt={p} />
                ))}
              </div>
            )}

            {messages.map((msg, idx) => (
              <ChatMessageDemo
                key={msg.id}
                msg={msg}
                isStreaming={streamingText === msg.content && isLatest(idx)}
                streamingText={streamingText}
                followUps={followUpsFor(msg, isLatest(idx))}
                onCopy={handleCopy}
                onRegenerate={handleRegenerate}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onFeedback={handleFeedback}
                onFollowUp={handleSend}
              />
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <ErrorBannerDemo message={errorMessage} onRetry={() => {
          setErrorMessage("");
          handleSend(input || messages[messages.length - 1]?.content);
        }} />
        <RateLimitBannerDemo visible={rateLimited} cooldown={cooldown} />

        <InputAreaDemo
          contextTokens={contextTokens}
          selectedTone={selectedTone}
          onToneChange={setSelectedTone}
          systemPrompt={systemPrompt}
          onSystemPromptChange={setSystemPrompt}
          input={input}
          onInputChange={setInput}
          onKeyDown={handleKeyDown}
          dragOver={dragOver}
          onDragOver={(e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
          fileInputRef={fileInputRef}
          imageInputRef={imageInputRef}
          onImageUpload={handleImageUpload}
          isRecording={isRecording}
          onToggleRecording={toggleRecording}
          onSend={() => handleSend()}
          canSend={!!input.trim()}
          temperature={temperature}
          onTemperatureChange={setTemperature}
          maxTokens={maxTokens}
          onMaxTokensChange={setMaxTokens}
          codeInput={codeInput}
          onCodeInputChange={setCodeInput}
          codeLanguage={codeLanguage}
          onCodeLanguageChange={setCodeLanguage}
          onGenerateCode={handleGenerateCode}
          generatedCode={generatedCode}
        />
      </div>

      <ImagesPanelDemo analyzingImage={analyzingImage} imagePreview={imagePreview} />

      <ClearDialogDemo visible={showClearConfirm} onCancel={() => setShowClearConfirm(false)} onConfirm={handleClear} />
    </div>
  );
}