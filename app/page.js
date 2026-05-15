"use client";

import { useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {

  const [objection, setObjection] = useState("");
  const [style, setStyle] = useState("Consultative");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const analyzeObjection = async () => {

    if (!objection) return;

    setLoading(true);

    try {

      const res = await fetch("/api/analyze", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          objection,
          style,
        }),
      });

      const data = await res.json();

      setResponse(data);

    } catch (error) {

      console.error(error);

      setResponse({
        objectionType: "Error",
        hiddenMeaning: "Something went wrong",
        emotionalState: "Unknown",
        buyingIntent: "0",
        recommendedStrategy: "Retry",
        bestResponse: "An error occurred.",
      });

    }

    setLoading(false);
  };

  const handleCheckout = async () => {

    try {

      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {

        window.location.href = data.url;

      } else {

        alert("Stripe checkout failed.");

      }

    } catch (error) {

      console.error(error);
      alert("Something went wrong.");

    }
  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">

          <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-600 bg-clip-text text-transparent">
            Closermind AI 🚀
          </h1>

          <p className="text-gray-400 text-2xl mt-5">
            AI-powered objection handling & elite sales psychology analysis
          </p>

        </div>

        {/* TOP BUTTONS */}
        <div className="flex justify-end gap-4 mb-8">

          <SignInButton mode="modal">
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-gradient-to-r from-purple-500 to-fuchsia-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Sign Up
            </button>
          </SignUpButton>

        </div>

        {/* MAIN CARD */}
        <div className="bg-[#0d0d0d] border border-purple-900/30 rounded-3xl p-8 shadow-2xl">

          {/* SELECT */}
          <div className="mb-6">

            <label className="text-gray-300 mb-3 block text-lg">
              Select Closing Style
            </label>

            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-2xl p-5 text-white text-lg"
            >
              <option>Consultative</option>
              <option>High Ticket</option>
              <option>Jordan Belfort</option>
              <option>Closer</option>
              <option>Straight Line</option>
            </select>

          </div>

          {/* TEXTAREA */}
          <textarea
            value={objection}
            onChange={(e) => setObjection(e.target.value)}
            placeholder="Paste customer objection here..."
            className="w-full h-64 bg-black border border-gray-700 rounded-3xl p-6 text-white text-xl placeholder-gray-500 outline-none"
          />

          {/* ANALYZE BUTTON */}
          <button
            onClick={analyzeObjection}
            disabled={loading}
            className="mt-8 w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 py-6 rounded-3xl text-3xl font-bold hover:scale-[1.01] transition-all"
          >
            {loading ? "Analyzing..." : "Analyze Objection"}
          </button>

          {/* STRIPE BUTTON */}
          <button
            onClick={handleCheckout}
            className="mt-5 w-full bg-white text-black py-5 rounded-3xl text-2xl font-bold hover:bg-gray-200 transition-all"
          >
            Upgrade to Pro 💎
          </button>

          {/* RESPONSE */}
          {response && (

            <div className="mt-10 space-y-5">

              <div className="bg-black border border-purple-800 rounded-3xl p-6">

                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  🎯 Objection Type
                </h2>

                <p className="text-gray-200 text-lg">
                  {response.objectionType}
                </p>

              </div>

              <div className="bg-black border border-purple-800 rounded-3xl p-6">

                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  🧠 Hidden Meaning
                </h2>

                <p className="text-gray-200 text-lg">
                  {response.hiddenMeaning}
                </p>

              </div>

              <div className="bg-black border border-purple-800 rounded-3xl p-6">

                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  ❤️ Emotional State
                </h2>

                <p className="text-gray-200 text-lg">
                  {response.emotionalState}
                </p>

              </div>

              <div className="bg-black border border-purple-800 rounded-3xl p-6">

                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  📈 Buying Intent
                </h2>

                <p className="text-gray-200 text-lg">
                  {response.buyingIntent}/100
                </p>

              </div>

              <div className="bg-black border border-purple-800 rounded-3xl p-6">

                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  ⚡ Recommended Strategy
                </h2>

                <p className="text-gray-200 text-lg">
                  {response.recommendedStrategy}
                </p>

              </div>

              <div className="bg-gradient-to-r from-purple-900/40 to-fuchsia-900/40 border border-fuchsia-700 rounded-3xl p-8">

                <h2 className="text-3xl font-bold text-fuchsia-400 mb-4">
                  🗣️ Best Response
                </h2>

                <p className="text-white text-xl leading-9 whitespace-pre-wrap">
                  {response.bestResponse}
                </p>

              </div>

            </div>

          )}

        </div>

        {/* FOOTER */}
        <div className="text-center text-gray-600 mt-12">
          Powered by Closermind AI
        </div>

      </div>

    </main>
  );
}