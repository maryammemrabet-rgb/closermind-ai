export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* NAVBAR */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-xl font-bold tracking-tight">
          CloseMind AI
        </h1>

        <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium">
          Get Started
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="text-center mt-20 max-w-3xl">
        <h2 className="text-5xl font-bold leading-tight">
          Turn objections into closed deals with AI
        </h2>

        <p className="text-gray-400 mt-6 text-lg">
          CloseMind AI helps sales teams handle objections, personalize responses,
          and close more deals faster using AI-powered intelligence.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-6 py-3 rounded-full bg-white text-black font-medium">
            Start Free Trial
          </button>

          <button className="px-6 py-3 rounded-full border border-gray-600 text-white">
            View Demo
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">

        <div className="p-6 rounded-2xl bg-zinc-900">
          <h3 className="font-semibold text-lg">AI Objection Handler</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Instantly generate perfect responses to any sales objection.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900">
          <h3 className="font-semibold text-lg">Sales Intelligence</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Understand buyer psychology and increase conversion rates.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900">
          <h3 className="font-semibold text-lg">Real-time Coaching</h3>
          <p className="text-gray-400 mt-2 text-sm">
            Get AI feedback during calls and improve your closing skills.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-32 text-gray-500 text-sm">
        © 2026 CloseMind AI. All rights reserved.
      </footer>

    </main>
  );
}
};
