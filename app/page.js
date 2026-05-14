"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const analyzeObjection = () => {
    const text = input.toLowerCase();

    // BUDGET
    if (text.includes("expensive") || text.includes("budget")) {
      setResult(`
Objection Type: Budget

Emotional State:
Interested but hesitant

Intent Score:
78/100

Hidden Meaning:
The prospect sees potential value but is unsure about ROI.

Recommended Strategy:
Value reframing + ROI focus

Best Response:
I completely understand. Most people initially felt the same way until they saw how quickly the investment translated into results.

Closing Direction:
Focus on long-term value instead of price.
      `);

    // THINK
    } else if (text.includes("think")) {
      setResult(`
Objection Type: Trust / Uncertainty

Emotional State:
Cautious but interested

Intent Score:
72/100

Hidden Meaning:
The prospect needs reassurance before committing.

Recommended Strategy:
Clarify hesitation

Best Response:
Absolutely, that makes sense. Just so I understand better, what part would you like to think through more carefully?

Closing Direction:
Identify the real concern behind the hesitation.
      `);

    // TIMING
    } else if (text.includes("later") || text.includes("not now")) {
      setResult(`
Objection Type: Timing

Emotional State:
Interested but low urgency

Intent Score:
65/100

Hidden Meaning:
The prospect does not yet see why action is urgent.

Recommended Strategy:
Create urgency carefully

Best Response:
Totally understand. Out of curiosity, what usually changes between now and later that would make this more relevant?

Closing Direction:
Increase urgency without pressure.
      `);

    // DEFAULT
    } else {
      setResult(`
Objection Type: General Objection

Emotional State:
Unclear

Intent Score:
50/100

Recommended Strategy:
Clarify concern

Best Response:
Can you tell me a bit more about your concern so I can better help?

Closing Direction:
Gather more context before responding.
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
