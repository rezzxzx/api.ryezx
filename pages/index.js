import { useState } from "react";
import axios from "axios";

const endpoints = [
  {
    name: "TikTok Downloader",
    placeholder: "https://vt.tiktok.com/...",
    path: "downloader/tiktok?url=",
  },
  {
    name: "YouTube Search",
    placeholder: "ex: lofi music",
    path: "search/youtube?q=",
  },
  {
    name: "AI Chat (Chatsandbox)",
    placeholder: "ex: siapa presiden indonesia?",
    path: "ai/ai-chatsandbox?prompt=",
  },
  {
    name: "Pinterest Search",
    placeholder: "ex: aesthetic wallpaper",
    path: "search/pinsearch?query=",
  },
  // tambahin endpoint lain tinggal tambah object baru aja di sini bro 👇
];

export default function Home() {
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState({});

  const handleInput = (e, key) => {
    setInputs({ ...inputs, [key]: e.target.value });
  };

  const handleTest = async (endpoint) => {
  const baseURL = typeof window !== "undefined" ? window.location.origin + "/" : "/";
  const fullURL = baseURL + endpoint.path + encodeURIComponent(inputs[endpoint.name] || "");
  try {
    const res = await axios.get(fullURL);
    setResults({ ...results, [endpoint.name]: res.data });
  } catch (err) {
    setResults({ ...results, [endpoint.name]: { error: "Gagal fetch data." } });
  }
};

  return (
    <div className="min-h-screen bg-blue-950 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-8">🔗 Ryezx API Playground</h1>

      <div className="grid gap-8 max-w-3xl mx-auto">
        {endpoints.map((ep, idx) => (
          <div key={idx} className="bg-blue-900 p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">{ep.name}</h2>
            <input
              type="text"
              placeholder={ep.placeholder}
              value={inputs[ep.name] || ""}
              onChange={(e) => handleInput(e, ep.name)}
              className="w-full p-2 rounded text-black mb-3"
            />
            <button
              onClick={() => handleTest(ep)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
            >
              Test
            </button>

            {results[ep.name] && (
              <pre className="bg-gray-800 mt-4 p-3 rounded text-sm overflow-auto max-h-64 whitespace-pre-wrap">
                {JSON.stringify(results[ep.name], null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
