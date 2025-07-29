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
    placeholder: "Masukkan kata kunci",
  },
  {
    name: "ChatGPT AI",
    endpoint: "/api/ai/chatgpt?question=",
    placeholder: "Tulis pertanyaan...",
  },
  // Tambah sendiri di sini bro 👇
  // {
  //   name: "Nama API",
  //   endpoint: "/api/xxxxx?param=",
  //   placeholder: "Masukkan parameter"
  // },
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
    } catch (err) {
      setResults({ ...results, [name]: { error: "Gagal Fetch API." } });
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🧪 RyezX API Tester</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {apis.map((api) => (
          <div key={api.name} className="bg-gray-800 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">{api.name}</h2>
              <span className={`text-sm px-2 py-1 rounded-full ${statuses[api.name] ? "bg-green-600" : "bg-red-600"}`}>
                {statuses[api.name] ? "Online" : "Offline"}
              </span>
            </div>
            <input
              className="w-full p-2 mb-3 bg-gray-700 rounded text-white"
              placeholder={api.placeholder}
              onChange={(e) => handleInputChange(api.name, e.target.value)}
            />
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold"
              onClick={() => handleTest(api.name, api.endpoint)}
            >
              Test API
            </button>
            <pre className="mt-4 p-2 bg-black rounded text-sm overflow-x-auto">
              {JSON.stringify(results[api.name], null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </main>
  );
                                  }
