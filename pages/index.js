import { useState, useEffect } from "react";
import axios from "axios";

const apis = [
  {
    name: "TikTok Downloader",
    endpoint: "/api/downloader/tiktok?url=",
    placeholder: "Masukkan URL TikTok",
  },
  {
    name: "YouTube Search",
    endpoint: "/api/search/youtube?q=",
    placeholder: "Cari video YouTube",
  },
  {
    name: "ChatGPT AI",
    endpoint: "/api/ai/chatgpt?question=",
    placeholder: "Tulis pertanyaan...",
  },
];

export default function Home() {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    apis.forEach((api) => {
      axios
        .get(api.endpoint + "ping")
        .then(() => setStatuses((s) => ({ ...s, [api.name]: true })))
        .catch(() => setStatuses((s) => ({ ...s, [api.name]: false })));
    });
  }, []);

  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleTest = async (name, endpoint) => {
    try {
      const url = endpoint + encodeURIComponent(inputs[name] || "");
      const res = await axios.get(url);
      setResults({ ...results, [name]: res.data });
    } catch {
      setResults({ ...results, [name]: { error: "Gagal Fetch API." } });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-400">⚙️ RyezX API Tester</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {apis.map((api) => (
          <div
            key={api.name}
            className="backdrop-blur-md bg-white/5 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold">{api.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statuses[api.name] ? "bg-green-500 text-black" : "bg-red-600 text-white"
                }`}
              >
                {statuses[api.name] ? "Online" : "Offline"}
              </span>
            </div>

            <input
              className="w-full p-3 bg-gray-800 rounded-lg border border-gray-600 mb-4 text-white focus:outline-none"
              placeholder={api.placeholder}
              onChange={(e) => handleInputChange(api.name, e.target.value)}
            />

            <button
              onClick={() => handleTest(api.name, api.endpoint)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110 py-2 rounded-lg font-bold text-white transition-all duration-200"
            >
              🚀 Test API
            </button>

            <pre className="mt-4 bg-black/70 text-green-400 text-sm p-3 rounded-lg max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {results[api.name]
                ? JSON.stringify(results[api.name], null, 2)
                : "// Hasil akan muncul di sini"}
            </pre>
          </div>
        ))}
      </div>
    </main>
  );
}
