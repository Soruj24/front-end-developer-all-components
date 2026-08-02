"use client";

import { useAiChat } from "./useAi";
import { ChatMessage, TypingIndicator } from "./Chat";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ImagesPanel } from "./ImagesPanel";
import { InputArea } from "./InputArea";
import { ErrorBanner, RateLimitBanner, ClearDialog } from "./Banners";
import { quickPrompts } from "./data";
import type { Message } from "./data";

export default function AiPage() {
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
  } = useAiChat();

  const isLatest = (idx: number) => idx === messages.length - 1;
  const followUpsFor = (msg: Message, latest: boolean) =>
    latest && msg.role === "assistant" && streamingMsgId !== msg.id ? getRandomFollowUps() : [];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl">
        <Sidebar
          visible={showSidebar}
          onClose={() => setShowSidebar(false)}
          onClear={() => setShowClearConfirm(true)}
        />

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
                    <button
                      key={p}
                      onClick={() => setInput(p)}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-border dark:bg-muted dark:text-muted-foreground dark:hover:border-blue-600 dark:hover:text-blue-400"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, idx) => (
                <ChatMessage
                  key={msg.id}
                  msg={msg}
                  isStreaming={streamingMsgId === msg.id && isLatest(idx)}
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

          <ErrorBanner
            message={errorMessage}
            onRetry={() => {
              setErrorMessage("");
              handleSend(input || messages[messages.length - 1]?.text);
            }}
          />
          <RateLimitBanner visible={rateLimited} cooldown={cooldown} />

          <InputArea
            contextTokens={contextTokens}
            selectedTone={selectedTone}
            onToneChange={setSelectedTone}
            systemPrompt={systemPrompt}
            onSystemPromptChange={setSystemPrompt}
            input={input}
            onInputChange={setInput}
            onKeyDown={handleKeyDown}
            dragOver={dragOver}
            onDragOver={(e) => {
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

        <ImagesPanel analyzingImage={analyzingImage} imagePreview={imagePreview} />
      </div>

      <ClearDialog
        visible={showClearConfirm}
        onCancel={() => setShowClearConfirm(false)}
        onConfirm={handleClear}
      />
    </div>
  );
}
