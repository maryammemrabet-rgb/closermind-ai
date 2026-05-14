"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
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
      setResult(`
Objection Type: Budget Resistance

Emotional State:
Interested but financially cautious

Intent Score:
78/100

Hidden Meaning:
The prospect likely sees value, but emotionally associates the investment with risk.
This objection is rarely about pure affordability — it is usually about certainty and perceived ROI.

Recommended Strategy:
Increase certainty and reframe the investment around outcomes.

Best Response:
I completely understand — and honestly, most people who ended up getting the strongest results initially felt the exact same way.

Usually when someone says it's expensive, it’s not necessarily that they can’t do it — it’s that they want to feel fully confident the investment will truly pay off.

Out of curiosity, what part are you trying to make sure is worth it for you?

Closing Direction:
Shift the conversation away from price and toward transformation, outcomes, and certainty.
      `);

    // THINK ABOUT IT
    } else if (
      text.includes("think") ||
      text.includes("let me think")
    ) {
      setResult(`
Objection Type: Trust / Internal Uncertainty

Emotional State:
Cautious but emotionally engaged

Intent Score:
72/100

Hidden Meaning:
The prospect is rarely asking for time alone — they are usually asking for emotional certainty.
There is likely an unresolved concern they haven’t fully verbalized yet.

Recommended Strategy:
Lower pressure while uncovering the real hesitation.

Best Response:
Absolutely, that makes complete sense.

And usually when someone says they want to think about it, there’s normally one specific part they’re still trying to feel fully comfortable with.

For you personally, what do you feel is the biggest thing still on your mind right now?

Closing Direction:
Help the prospect verbalize the true concern instead of ending the conversation prematurely.
      `);

    // TIMING
    } else if (
      text.includes("later") ||
      text.includes("not now") ||
      text.includes("bad timing")
    ) {
      setResult(`
Objection Type: Timing Objection

Emotional State:
Interested but low urgency

Intent Score:
65/100

Hidden Meaning:
The prospect does not yet emotionally connect the problem with immediate action.
This is often a priority positioning issue rather than a true timing issue.

Recommended Strategy:
Increase urgency carefully without sounding pushy.

Best Response:
Totally understandable.

Usually when people say “later,” it’s because the problem hasn’t yet become painful enough to feel urgent right now.

Out of curiosity, what would realistically need to happen for this to become more important sooner rather than later?

Closing Direction:
Help the prospect connect future consequences to present action.
      `);

    // BUSY
    } else if (
      text.includes("busy") ||
      text.includes("too much going on")
    ) {
      setResult(`
Objection Type: Priority Overload

Emotional State:
Mentally overwhelmed

Intent Score:
60/100

Hidden Meaning:
The prospect may actually be interested, but emotionally feels overloaded and unable to process another decision right now.

Recommended Strategy:
Position your solution as simplification and relief.

Best Response:
I completely understand.

Honestly, the busiest people are usually the ones who benefit the most from solving problems that are already draining their time, energy, or focus.

The goal here wouldn’t be to add more to your plate — it would actually be to remove friction and make things easier long term.

Closing Direction:
Reduce emotional overwhelm and frame the solution as support rather than additional effort.
      `);

    // NOT INTERESTED
    } else if (
      text.includes("not interested") ||
      text.includes("no interest")
    ) {
      setResult(`
Objection Type: Low Perceived Value

Emotional State:
Dismissive or emotionally disconnected

Intent Score:
32/100

Hidden Meaning:
The prospect likely does not yet understand the personal relevance or emotional impact of the solution.

Recommended Strategy:
Rebuild curiosity instead of pushing harder.

Best Response:
Totally fair.

And honestly, most people are not immediately interested in something until they clearly see how it directly connects to a problem, frustration, or goal they actually care about.

Out of curiosity, what’s currently your biggest challenge around this area right now?

Closing Direction:
Move the conversation from rejection toward self-discovery and relevance.
      `);

    // SEND INFO
    } else if (
      text.includes("send") ||
      text.includes("information") ||
      text.includes("email")
    ) {
      setResult(`
Objection Type: Information Request / Soft Avoidance

Emotional State:
Interested but emotionally disengaging from commitment

Intent Score:
64/100

Hidden Meaning:
The prospect is curious, but wants psychological distance before making a decision.
This is often a polite way to avoid pressure while keeping the conversation open.

Recommended Strategy:
Keep control of the conversation while lowering pressure.

Best Response:
Absolutely — happy to send everything over.

Just before I do, usually when someone asks for information, there’s one specific thing they’re trying to better understand before feeling comfortable moving forward.

For you, what would that be?

Closing Direction:
Avoid losing momentum. Re-engage the prospect emotionally before ending the interaction.
      `);

    // AUTHORITY
    } else if (
      text.includes("partner") ||
      text.includes("boss") ||
      text.includes("wife") ||
      text.includes("husband")
    ) {
      setResult(`
Objection Type: Authority / External Validation

Emotional State:
Interested but dependent on reassurance from others

Intent Score:
74/100

Hidden Meaning:
The prospect may emotionally want the solution, but seeks safety through external approval before committing.

Recommended Strategy:
Help them emotionally prepare to present the decision internally.

Best Response:
Of course — that makes complete sense.

And usually when someone wants to discuss it with a partner or decision-maker, there are normally a few key things that person will care most about.

What do you think would matter most to them when evaluating this?

Closing Direction:
Turn the prospect into an internal advocate instead of losing momentum.
      `);

    // COMPETITOR
    } else if (
      text.includes("already using") ||
      text.includes("another provider") ||
      text.includes("already have")
    ) {
      setResult(`
Objection Type: Existing Solution / Competitor

Emotional State:
Comfortable but open-minded

Intent Score:
67/100

Hidden Meaning:
The prospect fears the risk and inconvenience of switching more than they value potential improvement.

Recommended Strategy:
Expose emotional dissatisfaction and identify gaps.

Best Response:
That actually makes a lot of sense.

And usually when companies already have a solution in place, the biggest opportunities come from the things they’ve simply learned to tolerate over time.

Out of curiosity, if you could improve one thing about your current solution, what would it be?

Closing Direction:
Shift the focus from loyalty to unmet needs and hidden frustrations.
      `);

    // DEFAULT
    } else {
      setResult(`
Objection Type: Complex / Unclear Objection

Emotional State:
Undetermined

Intent Score:
50/100

Hidden Meaning:
The objection may contain multiple emotional layers that require clarification before responding strategically.

Recommended Strategy:
Slow the conversation down and gather context.

Best Response:
I completely understand.

Just so I respond in the most helpful way possible, can you walk me through what specifically is making you hesitate right now?

Closing Direction:
Gather emotional context before attempting to persuade.
      `);
    }
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);

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
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <div
            style={{
              background: "#111827",
              padding: "24px",
              borderRadius: "18px",
              border: "1px solid #1F2937"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h2 style={{ color: "#A78BFA" }}>
                AI Analysis
              </h2>

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
                whiteSpace: "pre-wrap",
                lineHeight: "1.8",
                color: "#E5E7EB",
                marginTop: "15px"
              }}
            >
              {result}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
       
