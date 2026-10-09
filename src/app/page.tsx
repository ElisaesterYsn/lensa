export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-medium text-trust-700">Lensa</h1>
        <p className="text-sm text-zinc-500 mt-2">
          Tailwind v4 tokens are working.
        </p>
        <div className="mt-6 flex gap-2 justify-center">
          <span className="px-3 py-1 rounded-card bg-trust-50 text-trust-700 text-xs">
            trust-50
          </span>
          <span className="px-3 py-1 rounded-card bg-trust-500 text-white text-xs">
            trust-500
          </span>
          <span className="px-3 py-1 rounded-card bg-signal-amber text-white text-xs">
            signal-amber
          </span>
        </div>
      </div>
    </main>
  );
}
