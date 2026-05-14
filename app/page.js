"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <div
      style={{
        background: "#0B0F19",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1>CloserMind AI</h1>

      <p>AI Objection & Closing Assistant</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste objection here..."
        style={{
          width: "100%",
          height: "150px",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "10px",
          border: "none",
          fontSize: "16px"
        }}
      />

      <button
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#6D5EF6",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        Analyze Objection
      </button>
    </div>
  );
}
