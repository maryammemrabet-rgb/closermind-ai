"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const analyzeObjection = () => {
    const text = input.toLowerCase();

    // BUDGET
    if (
      text.includes("expensive") ||
      text.includes("budget") ||
      text.includes("too much") ||
      text.includes("price")
    ) {
      setResult({
        objectionType: "Budget Resistance",
        emotionalState: "Interested but financially cautious",
        intentScore: "78%",
        hiddenMeaning:
          "The prospect likely sees value, but emotionally associates the investment with risk.",
        strategy:
          "Increase certainty and reframe the investment around outcomes.",
        bestResponse:
          "I completely understand — and honestly, most people who ended up getting the strongest results initially felt the exact same way.",
        closingDirection:
          "Shift the conversation away from price and toward transformation and ROI."
      });

    // THINK ABOUT IT
    } else if (
      text.includes("think") ||
      text.includes("let me think")
    ) {
      setResult({
        objectionType: "Trust / Internal Uncertainty",
        emotionalState: "Cautious but emotionally engaged",
        intentScore: "72%",
        hiddenMeaning:
          "The prospect is looking for emotional certainty before committing.",
        strategy:
          "Lower pressure while uncovering the real hesitation.",
        bestResponse:
          "Absolutely, that makes complete sense. Usually when someone says they want to think about it, there’s one specific thing they still want clarity on.",
        closingDirection:
          "Help the prospect verbalize the true concern."
      });

    // TIMING
    } else if (
      text.includes("later") ||
      text.includes("not now") ||
      text.includes("bad timing")
    ) {
      setResult({
        objectionType: "Timing Objection",
        emotionalState: "Interested but low urgency",
        intentScore: "65%",
        hiddenMeaning:
          "The prospect does not emotionally connect the issue with immediate action.",
        strategy:
          "Increase urgency carefully without sounding pushy.",
        bestResponse:
          "Totally understandable. Usually when people say later, it’s because the issue hasn’t become painful enough yet.",
        closingDirection:
          "Help the prospect connect future consequences to present action."
      });

    // BUSY
    } else if (
      text.includes("busy") ||
      text.includes("too much going on")
    ) {
      setResult({
        objectionType: "Priority Overload",
        emotionalState: "Mentally overwhelmed",
        intentScore: "60%",
        hiddenMeaning:
          "The prospect feels overloaded and unable to process another decision.",
        strategy:
          "Position the solution as relief and simplification.",
        bestResponse:
          "I completely understand. The busiest people are often the ones who benefit the most from reducing friction and wasted energy.",
        closingDirection:
          "Frame the solution as support, not additional work."
      });

    // NOT INTERESTED
    } else if (
      text.includes("not interested") ||
      text.includes("no interest")
    ) {
      setResult({
        objectionType: "Low Perceived Value",
        emotionalState: "Dismissive or disconnected",
        intentScore: "32%",
        hiddenMeaning:
          "The prospect does not yet see the emotional relevance of the solution.",
        strategy:
          "Rebuild curiosity instead of pushing harder.",
        bestResponse:
          "Totally fair. Most people only become interested once they clearly see how something connects to a real challenge they care about.",
        closingDirection:
          "Move the conversation toward self-discovery."
      });

    // SEND INFO
    } else if (
      text.includes("send") ||
      text.includes("information") ||
      text.includes("email")
    ) {
      setResult({
        objectionType: "Information Request / Soft Avoidance",
        emotionalState: "Interested but disengaging",
        intentScore: "64%",
        hiddenMeaning:
          "The prospect wants psychological distance before committing.",
        strategy:
          "Keep engagement active while lowering pressure.",
        bestResponse:
          "Absolutely — happy to send everything over. Before I do, what specifically would you like to better understand first?",
        closingDirection:
          "Avoid losing momentum before the interaction ends."
      });

    // AUTHORITY
    } else if (
      text.includes("partner") ||
      text.includes("boss") ||
      text.includes("wife") ||
      text.includes("husband")
    ) {
      setResult({
        objectionType: "Authority / External Validation",
        emotionalState: "Interested but dependent on approval",
        intentScore: "74%",
        hiddenMeaning:
          "The prospect wants external reassurance before deciding.",
        strategy:
          "Help the prospect internally justify the decision.",
        bestResponse:
          "Of course — that makes complete sense. What do you think will matter most to them when evaluating this?",
        closingDirection:
          "Turn the prospect into an internal advocate."
      });

    // COMPETITOR
    } else if (
      text.includes("already using") ||
      text.includes("another provider") ||
      text.includes("already have")
    ) {
      setResult({
        objectionType: "Existing Solution / Competitor",
        emotionalState: "Comfortable but open-minded",
        intentScore: "67%",
        hiddenMeaning:
          "The prospect fears switching risk more than missing improvement.",
        strategy:
          "Identify dissatisfaction and hidden frustrations.",
        bestResponse:
          "That makes sense. If you could improve one thing about your current solution, what would it be?",
        closingDirection:
          "Shift focus toward gaps in the current setup."
      });

    // DEFAULT
    } else {
      setResult({
        objectionType: "Complex / Unclear Objection",
        emotionalState: "Undetermined",
        intentScore: "50%",
        hiddenMeaning:
          "The objection contains multiple emotional layers that require clarification.",
        strategy:
          "Slow the conversation down and gather context.",
        bestResponse:
          "Just so I can respond in the most helpful way possible, what specifically is making you hesitate right now?",
        closingDirection:
          "Gather emotional context before persuading."
      });
    }
  };

  const copyResult = async () => {
    const textToCopy = `
Objection Type: ${result.objectionType}

Emotional State: ${result.emotionalState}

Intent Score: ${result.intentScore}

Hidden Meaning: ${result.hiddenMeaning}

Strategy: ${result.strategy}

Best Response: ${result.bestResponse}

Closing Direction: ${result.closingDirection}
    `;

    await navigator.clipboard.writeText(textToCopy);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
      <h1 style={{ fontSize: "42px" }}>
        CloserMind AI
      </h1>

      <p
        style={{
          color: "#9CA3AF",
          marginTop: "-10px",
          marginBottom: "30px"
        }}
      >
        AI Objection & Closing Assistant
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste objection here..."
        style={{
          width: "100%",
          height: "180px",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #1F2937",
          fontSize: "16px",
          background: "#111827",
          color: "white",
          outline: "none"
        }}
      />

      <button
        onClick={analyzeObjection}
        style={{
          marginTop: "20px",
          padding: "14px 24px",
          background: "#6D5EF6",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        Analyze Objection
      </button>

      {result && (
        <div
          style={{
            marginTop: "35px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}
        >
          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px"
            }}
          >
            <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
              Objection Type
            </div>

            <div
              style={{
                marginTop: "8px",
                color: "#A78BFA",
                fontSize: "22px",
                fontWeight: "bold"
              }}
            >
              {result.objectionType}
            </div>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px"
            }}
          >
            <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
              Emotional State
            </div>

            <div style={{ marginTop: "8px" }}>
              {result.emotionalState}
            </div>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px"
            }}
          >
            <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
              Intent Score
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "24px",
                fontWeight: "bold"
              }}
            >
              {result.intentScore}
            </div>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px"
            }}
          >
            <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
              Strategy
            </div>

            <div style={{ marginTop: "8px" }}>
              {result.strategy}
            </div>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px",
              gridColumn: "span 2"
            }}
          >
            <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
              Hidden Meaning
            </div>

            <div style={{ marginTop: "8px", lineHeight: "1.7" }}>
              {result.hiddenMeaning}
            </div>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px",
              gridColumn: "span 2"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
                Best Response
              </div>

              <button
                onClick={copyResult}
                style={{
                  background: "#6D5EF6",
                  color: "white",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {copied ? "Copied!" : "Copy Response"}
              </button>
            </div>

            <div
              style={{
                marginTop: "12px",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap"
              }}
            >
              {result.bestResponse}
            </div>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px",
              gridColumn: "span 2"
            }}
          >
            <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
              Closing Direction
            </div>

            <div style={{ marginTop: "8px" }}>
              {result.closingDirection}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
       
