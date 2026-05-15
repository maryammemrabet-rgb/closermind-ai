"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import {
  Brain,
  BadgeDollarSign,
  HeartHandshake,
  Target,
  MessageSquareQuote,
  Download,
  Copy,
} from "lucide-react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

export default function Home() {

  const { user } = useUser();

  const [objection, setObjection] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("Consultative");
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  // LOAD HISTORY FROM FIREBASE

  useEffect(() => {

    const loadHistory = async () => {

      if (!user) return;

      try {

        const q = query(
          collection(db, "analyses"),
          where("userId", "==", user.id)
        );

        const querySnapshot = await getDocs(q);

        const items = [];

        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        setHistory(items.reverse());

      } catch (error) {

        console.error(error);

      }

    };

    loadHistory();

  }, [user]);

  // ANALYZE

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
          tone,
        }),
      });

      const data = await res.json();

      const aiResult = data.result || data;

      setAnalysis(aiResult);

      const newItem = {
        objection,
        tone,
        result: aiResult,
        date: new Date().toLocaleString(),
        userId: user?.id || "guest",
      };

      // SAVE TO FIREBASE

      if (user) {

        await addDoc(
          collection(db, "analyses"),
          newItem
        );

      }

      setHistory((prev) => [newItem, ...prev]);

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  };

  // EXPORT PDF

  const exportPDF = () => {

    if (!analysis) return;

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Closermind AI Report", 20, 20);

    doc.setFontSize(14);

    doc.text(`Tone: ${tone}`, 20, 40);

    doc.text(
      `Objection Type: ${analysis.objectionType}`,
      20,
      60
    );

    doc.text(
      `Emotional State: ${analysis.emotionalState}`,
      20,
      80
    );

    const hiddenMeaning = doc.splitTextToSize(
      analysis.hiddenMeaning || "",
      170
    );

    doc.text("Hidden Meaning:", 20, 100);
    doc.text(hiddenMeaning, 20, 110);

    const strategy = doc.splitTextToSize(
      analysis.recommendedStrategy || "",
      170
    );

    doc.text("Recommended Strategy:", 20, 150);
    doc.text(strategy, 20, 160);

    const response = doc.splitTextToSize(
      analysis.bestResponse || "",
      170
    );

    doc.text("Best Response:", 20, 210);
    doc.text(response, 20, 220);

    doc.save("closermind-analysis.pdf");

  };

  // COPY ANALYSIS

  const copyAnalysis = async () => {

    if (!analysis) return;

    const text = `
Objection Type:
${analysis.objectionType}

Hidden Meaning:
${analysis.hiddenMeaning}

Emotional State:
${analysis.emotionalState}

Buying Intent:
${analysis.buyingIntent}

Recommended Strategy:
${analysis.recommendedStrategy}

Best Response:
${analysis.bestResponse}
`;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* AUTH */}

        <div className="flex justify-end items-center gap-4 mb-8">

          <SignedOut>

            <SignInButton mode="modal">
              <button className="bg-white/10 hover:bg-white/20 transition-all px-5 py-2 rounded-xl border border-white/10">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="bg-purple-600 hover:bg-purple-700 transition-all px-5 py-2 rounded-xl font-bold">
                Sign Up
              </button>
            </SignUpButton>

          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

        </div>

        {/* HEADER */}

        <div className="text-center mb-16">

          <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent mb-6">
            Closermind AI 🚀
          </h1>

          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            AI-powered objection handling & elite sales psychology analysis
          </p>

        </div>

        {/* INPUT */}

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[40px] p-10 shadow-2xl mb-16">

          <div className="mb-6">

            <label className="block text-gray-300 mb-3 text-lg">
              Select Closing Style
            </label>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-5 rounded-2xl bg-black/40 border border-white/10 text-white text-lg outline-none"
            >

              <option>Consultative</option>
              <option>Aggressive Closer</option>
              <option>Luxury Sales</option>
              <option>B2B SaaS</option>
              <option>Empathetic</option>
              <option>Straight Line</option>

            </select>

          </div>

          <textarea
            value={objection}
            onChange={(e) => setObjection(e.target.value)}
            placeholder="Paste customer objection here..."
            className="w-full h-56 bg-black/40 border border-white/10 rounded-3xl p-6 text-xl text-white mb-8 outline-none resize-none"
          />

          <button
            onClick={analyzeObjection}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:scale-[1.01] transition-all duration-300 rounded-3xl py-6 text-3xl font-bold shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >

            {loading ? "Analyzing..." : "Analyze Objection"}

          </button>

        </div>

        {/* RESULTS */}

        {analysis && (

          <div className="space-y-8 mb-20">

            {/* ACTIONS */}

            <div className="flex flex-wrap justify-center gap-4">

              <div className="bg-purple-600/20 border border-purple-500/20 px-6 py-3 rounded-full font-bold text-lg backdrop-blur-xl">
                {tone} Mode
              </div>

              <button
                onClick={exportPDF}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-all px-6 py-3 rounded-full font-bold text-lg"
              >

                <Download size={20} />
                Export PDF

              </button>

              <button
                onClick={copyAnalysis}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-full font-bold text-lg"
              >

                <Copy size={20} />
                {copied ? "Copied!" : "Copy Analysis"}

              </button>

            </div>

            {/* GRID */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-5">

                  <Brain className="text-purple-400" size={32} />

                  <h3 className="text-3xl font-bold text-purple-400">
                    Objection Type
                  </h3>

                </div>

                <p className="text-2xl text-gray-100">
                  {analysis.objectionType}
                </p>

              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-5">

                  <HeartHandshake className="text-pink-400" size={32} />

                  <h3 className="text-3xl font-bold text-pink-400">
                    Emotional State
                  </h3>

                </div>

                <p className="text-2xl text-gray-100 leading-relaxed">
                  {analysis.emotionalState}
                </p>

              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-5">

                  <BadgeDollarSign className="text-green-400" size={32} />

                  <h3 className="text-3xl font-bold text-green-400">
                    Buying Intent
                  </h3>

                </div>

                <div className="text-7xl font-black mb-6">
                  {analysis.buyingIntent}
                </div>

              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">

                <div className="flex items-center gap-3 mb-5">

                  <Target className="text-blue-400" size={32} />

                  <h3 className="text-3xl font-bold text-blue-400">
                    Hidden Meaning
                  </h3>

                </div>

                <p className="text-xl text-gray-100 leading-relaxed">
                  {analysis.hiddenMeaning}
                </p>

              </div>

            </div>

            {/* STRATEGY */}

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10">

              <div className="flex items-center gap-3 mb-6">

                <Brain className="text-purple-400" size={34} />

                <h3 className="text-4xl font-bold text-purple-400">
                  Recommended Strategy
                </h3>

              </div>

              <p className="text-2xl leading-relaxed text-gray-100">
                {analysis.recommendedStrategy}
              </p>

            </div>

            {/* BEST RESPONSE */}

            <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-3xl p-10">

              <div className="flex items-center gap-3 mb-6">

                <MessageSquareQuote size={34} />

                <h3 className="text-4xl font-bold">
                  Best Response
                </h3>

              </div>

              <p className="text-3xl leading-relaxed font-medium">
                {analysis.bestResponse}
              </p>

            </div>

          </div>

        )}

        {/* HISTORY */}

        <div className="mt-24">

          <h2 className="text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent mb-10">
            History
          </h2>

          <div className="space-y-6">

            {history.map((item, index) => (

              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6"
              >

                <div className="flex justify-between items-start mb-4">

                  <div className="text-purple-400 font-bold text-xl">
                    {item.tone}
                  </div>

                  <div className="text-gray-500 text-sm">
                    {item.date}
                  </div>

                </div>

                <p className="text-xl text-white mb-4">
                  {item.objection}
                </p>

                {item.result && (

                  <div className="grid md:grid-cols-2 gap-4 mt-6">

                    <div className="bg-black/30 rounded-2xl p-4">
                      <div className="text-purple-400 font-bold mb-2">
                        Objection Type
                      </div>

                      <div>
                        {item.result.objectionType}
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-4">
                      <div className="text-pink-400 font-bold mb-2">
                        Emotional State
                      </div>

                      <div>
                        {item.result.emotionalState}
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-4">
                      <div className="text-green-400 font-bold mb-2">
                        Buying Intent
                      </div>

                      <div>
                        {item.result.buyingIntent}
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-4">
                      <div className="text-blue-400 font-bold mb-2">
                        Hidden Meaning
                      </div>

                      <div>
                        {item.result.hiddenMeaning}
                      </div>
                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

  );

}