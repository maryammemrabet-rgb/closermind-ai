"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I’m CloseMind AI. Tell me the objection you’re dealing with."
    }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    const aiMessage = {
      role: "assistant",
      text: "I’m analyzing this objection... Here’s a strong response: Focus on value, ROI, and reduce risk for the buyer."
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b border-zinc-800 text-center font-semibold">
        CloseMind AI Chat
      </div>

      {/* CHAT MESSAGES */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl p-3 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-white text-black"
                : "bg-zinc-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-zinc-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type an objection..."
          className="flex-1 p-3 rounded-lg bg-zinc-900 border border-zinc-700"
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-white text-black rounded-lg"
        >
          Send
        </button>
      </div>

    </main>
  );
}

