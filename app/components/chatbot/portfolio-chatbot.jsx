"use client";

import { useEffect, useRef, useState } from "react";
import "./portfolio-chatbot.scss";

const initialMessage = {
  role: "assistant",
  content:
    "Hey! I'm Atul's AI Assistant. Ask me about his projects, skills, IEEE research, hackathons, or education.",
};

const suggestions = [
  "Tell me about your projects",
  "What are your AI/ML skills?",
  "Show your research work",
  "How can I contact Atul?",
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  async function sendMessage(text = input) {
    const content = text.trim();
    if (!content || isLoading) return;

    if (content.length > 1500) {
      setError("Please keep your message under 1,500 characters.");
      return;
    }

    const nextMessages = [
      ...messages.slice(-9),
      { role: "user", content },
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get a response. Please try again."
        );
      }

      if (typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error("The assistant returned an invalid response.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className="portfolio-chat">
      {isOpen && (
        <section
          className="portfolio-chat__panel animate-fadeIn"
          role="dialog"
          aria-label="Atul's portfolio assistant"
          aria-modal="false"
        >
          <header className="portfolio-chat__header">
            <div className="portfolio-chat__identity">
              <span className="portfolio-chat__avatar" aria-hidden="true">
                A
              </span>
              <div>
                <strong>Atul&apos;s AI Assistant</strong>
                <p>Portfolio • Gemini AI</p>
              </div>
            </div>
            <button
              type="button"
              className="portfolio-chat__icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div className="portfolio-chat__messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${index}-${message.role}`}
                className={`portfolio-chat__message portfolio-chat__message--${message.role}`}
              >
                <span className="portfolio-chat__role">
                  {message.role === "assistant" ? "Assistant" : "You"}
                </span>
                <p>{message.content}</p>
              </div>
            ))}

            {isLoading && (
              <div className="portfolio-chat__typing" role="status">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span>Thinking…</span>
              </div>
            )}

            {error && (
              <div className="portfolio-chat__error" role="alert">
                <p>{error}</p>
                <button
                  type="button"
                  onClick={() =>
                    sendMessage(
                      messages[messages.length - 1]?.content || input
                    )
                  }
                  disabled={isLoading}
                >
                  Retry
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="portfolio-chat__suggestions">
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <form className="portfolio-chat__form" onSubmit={handleSubmit}>
            <label className="portfolio-chat__sr-only" htmlFor="portfolio-chat-input">
              Your message
            </label>
            <textarea
              id="portfolio-chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Atul's work, projects, research…"
              rows={2}
              maxLength={1500}
              disabled={isLoading}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmit(event);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? "…" : "Send"}
            </button>
          </form>

          <p className="portfolio-chat__disclaimer">
            AI-generated answers may be inaccurate. Verify important details.
          </p>
        </section>
      )}

      <button
        type="button"
        className={`portfolio-chat__launcher ${isOpen ? "portfolio-chat__launcher--open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close portfolio chat" : "Open portfolio chat"}
        aria-expanded={isOpen}
      >
        <span className="portfolio-chat__launcher-icon">{isOpen ? "×" : "✦"}</span>
        {!isOpen && <span className="portfolio-chat__launcher-text">Ask AI</span>}
      </button>
    </div>
  );
}
