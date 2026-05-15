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

  // STRIPE CHECKOUT

  const handleCheckout = async () => {

    try {

      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await response.json();

      window.location.href = data.url;

    } catch (error) {

      console.log(error);

    }

  };

  // LOAD HISTORY

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

          {/* STRIPE BUTTON */}

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-500 hover:bg-green-600 transition-all duration-300 rounded-3xl py-6 text-3xl font-bold"
          >
            Upgrade To Pro — $29
          </button>

        </div>

      </div>

    </main>

  );

}