import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Gagal fetch API" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 flex flex-col items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          🧪 API Tester - Ryezx APIs
        </h1>

        <input
          type="text"
          className="w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Masukkan URL API..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleTest}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
        >
          {loading ? "Loading..." : "🔍 Tes API"}
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2 text-blue-500">📦 Hasil:</h2>
          <pre className="bg-blue-100 p-4 rounded-xl overflow-x-auto text-sm text-gray-800 max-h-[400px]">
            {result ? JSON.stringify(result, null, 2) : "Belum ada hasil"}
          </pre>
        </div>
      </div>
    </div>
  );
}
