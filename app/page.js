"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const analyzeObjection = () => {
    if (input.toLowerCase().includes("expensive")) {
      setResult(`
Objection Type: Budget

Hidden Meaning:
The prospect is interested but unsure about the ROI.

Recommended Response:
I completely understand. Most people felt the same initially until they saw the long-term value and results.

Closing Direction:
Reframe value instead of defending price.
      `);
    } else if (input.toLowerCase().includes("think")) {
      setResult(`
Objection Type: Trust / Uncertainty

Hidden Meaning:
The prospect needs reassurance before committing.

Recommended Response:
Of course, that makes sense. Just so I understand better, what part would you like to think through more carefully?

Closing Direction:
Clarify the real hesitation.
      `);
    } else {
      setResult(`
Objection Type: General Objection

Recommended Response:
Can you tell me a bit more about your concern so I can better help?
      `);
    }
  };

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
        onClick={analyzeObjection}
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

      {result && (
        <div
          style={{
            marginTop: "30px",
            background: "#111827",
            padding: "20px",
            borderRadius: "10px",
            whiteSpace: "pre-wrap"
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}

