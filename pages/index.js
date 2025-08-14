import { useState, useEffect } from "react";
import axios from "axios";

const endpoints = [
  // Downloader APIs
  {
    name: "TikTok Downloader",
    placeholder: "https://vt.tiktok.com/...",
    path: "downloader/tiktok?url=",
    category: "Downloader",
    description: "Download TikTok video tanpa watermark dengan kualitas HD",
    icon: "🎵"
  },
  {
    name: "TikTok Downloader V2",
    placeholder: "https://vt.tiktok.com/...",
    path: "downloader/tiktok-v2?url=",
    category: "Downloader",
    description: "Download TikTok video versi 2 dengan metadata lengkap",
    icon: "🎭"
  },
  {
    name: "YouTube Downloader",
    placeholder: "https://youtube.com/watch?v=...",
    path: "downloader/youtube?url=",
    category: "Downloader",
    description: "Download video YouTube dengan berbagai resolusi",
    icon: "📺"
  },
  {
    name: "Instagram Downloader",
    placeholder: "https://instagram.com/p/...",
    path: "downloader/instagram?url=",
    category: "Downloader",
    description: "Download foto/video Instagram stories & posts",
    icon: "📸"
  },
  {
    name: "Facebook Downloader",
    placeholder: "https://facebook.com/...",
    path: "downloader/facebook?url=",
    category: "Downloader",
    description: "Download video Facebook dengan kualitas original",
    icon: "📘"
  },
  {
    name: "Pinterest Downloader",
    placeholder: "https://pinterest.com/pin/...",
    path: "downloader/pinterest?url=",
    category: "Downloader",
    description: "Download gambar Pinterest resolusi tinggi",
    icon: "📌"
  },
  {
    name: "X (Twitter) Downloader",
    placeholder: "https://x.com/.../status/...",
    path: "downloader/x?url=",
    category: "Downloader",
    description: "Download video/GIF dari X (Twitter)",
    icon: "🐦"
  },
  {
    name: "CapCut Downloader",
    placeholder: "https://capcut.com/...",
    path: "downloader/capcut?url=",
    category: "Downloader",
    description: "Download template CapCut tanpa watermark",
    icon: "✂️"
  },
  {
    name: "SnackVideo Downloader",
    placeholder: "https://s.snackvideo.com/...",
    path: "downloader/snackvideo?url=",
    category: "Downloader",
    description: "Download video SnackVideo berkualitas tinggi",
    icon: "🍿"
  },
  {
    name: "BiliBili Downloader",
    placeholder: "https://bilibili.com/video/...",
    path: "downloader/bstation?url=",
    category: "Downloader",
    description: "Download video dari BiliBili platform",
    icon: "📱"
  },
  {
    name: "AIO Downloader",
    placeholder: "https://example.com/video...",
    path: "downloader/aio?url=",
    category: "Downloader",
    description: "All-in-One downloader untuk multiple platform",
    icon: "🌐"
  },
  {
    name: "AIO Downloader V2",
    placeholder: "https://example.com/video...",
    path: "downloader/aio2?url=",
    category: "Downloader",
    description: "All-in-One downloader versi 2 yang lebih canggih",
    icon: "🚀"
  },

  // Search APIs
  {
    name: "YouTube Search",
    placeholder: "ex: lofi music",
    path: "search/youtube?q=",
    category: "Search",
    description: "Cari video di YouTube dengan metadata lengkap",
    icon: "🔍"
  },
  {
    name: "Pinterest Search",
    placeholder: "ex: aesthetic wallpaper",
    path: "search/pinterest?query=",
    category: "Search",
    description: "Cari gambar di Pinterest dengan filter",
    icon: "🖼️"
  },
  {
    name: "TikTok Search",
    placeholder: "ex: dance viral",
    path: "search/tiktok?q=",
    category: "Search",
    description: "Cari video trending di TikTok",
    icon: "🔥"
  },
  {
    name: "Google Image Search",
    placeholder: "ex: cute cat",
    path: "search/googleimg?q=",
    category: "Search",
    description: "Cari gambar di Google dengan filter advanced",
    icon: "🖥️"
  },
  {
    name: "BiliBili Search",
    placeholder: "ex: anime music",
    path: "search/bstation?q=",
    category: "Search",
    description: "Cari konten di platform BiliBili",
    icon: "🎌"
  },

  // AI APIs
  {
    name: "AI ChatSandbox",
    placeholder: "ex: siapa presiden indonesia?",
    path: "ai/chatsandbox?query=",
    category: "AI",
    description: "Chat dengan AI ChatSandbox yang powerful",
    icon: "🤖"
  },
  {
    name: "AI LuminAI",
    placeholder: "ex: explain quantum physics",
    path: "ai/luminai?text=",
    category: "AI",
    description: "Chat dengan AI LuminAI untuk analisis mendalam",
    icon: "✨"
  },
  {
    name: "AI Grok",
    placeholder: "ex: what is machine learning?",
    path: "ai/grok?question=",
    category: "AI",
    description: "Chat dengan AI Grok dari X untuk insight terbaru",
    icon: "🧠"
  },
  {
    name: "AI ChatGPT",
    placeholder: "ex: write a poem about nature",
    path: "ai/chatgpt?question=",
    category: "AI",
    description: "Chat dengan ChatGPT untuk berbagai kebutuhan",
    icon: "💬"
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // States for the new integrated API test feature
  const [expandedApi, setExpandedApi] = useState(null); // Stores the index of the expanded API card
  const [apiInputs, setApiInputs] = useState({}); // Stores input values for each API
  const [apiResults, setApiResults] = useState({}); // Stores results for each API
  const [apiLoading, setApiLoading] = useState({}); // Stores loading state for each API

  const categories = ["All", ...new Set(endpoints.map(ep => ep.category))];

  const filteredEndpoints = endpoints.map((ep, index) => ({
    ...ep,
    originalIndex: index // Keep track of original index for state management
  })).filter(ep => {
    const matchesCategory = activeCategory === "All" || ep.category === activeCategory;
    const matchesSearch = ep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ep.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleApiExpansion = (index) => {
    setExpandedApi(expandedApi === index ? null : index);
    // Reset input/result/loading for the expanded/collapsed API if needed
    if (expandedApi === index) {
        setApiInputs(prev => ({ ...prev, [index]: "" }));
        setApiResults(prev => ({ ...prev, [index]: null }));
        setApiLoading(prev => ({ ...prev, [index]: false }));
    } else if (expandedApi !== null && expandedApi !== index) {
        // Ensure previous expanded API state is clean when expanding a new one
        setApiInputs(prev => ({ ...prev, [expandedApi]: "" }));
        setApiResults(prev => ({ ...prev, [expandedApi]: null }));
        setApiLoading(prev => ({ ...prev, [expandedApi]: false }));
    }
  };

  const handleApiTest = async (index, endpoint) => {
    const input = apiInputs[index];
    if (!input || !input.trim()) {
      alert("Harap masukkan input terlebih dahulu!");
      return;
    }

    const baseURL = typeof window !== "undefined" ? window.location.origin + "/api/" : "/api/";
    const fullURL = baseURL + endpoint.path + encodeURIComponent(input);

    setApiLoading(prev => ({ ...prev, [index]: true }));
    setApiResults(prev => ({ ...prev, [index]: null })); // Clear previous result

    try {
      const res = await axios.get(fullURL);
      setApiResults(prev => ({ ...prev, [index]: res.data }));
    } catch (err) {
      setApiResults(prev => ({ ...prev, [index]: { 
        error: "Gagal fetch data.", 
        details: err.response?.data || err.message 
      }}));
    } finally {
      setApiLoading(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Animated Background with Infinite Scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Scrolling Elements */}
        <div className="absolute top-10 left-0 w-[200%] h-32 opacity-20">
          <div className="flex gap-8 animate-scroll-left">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex-shrink-0"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex-shrink-0 mt-4"></div>
            <div className="w-40 h-40 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full flex-shrink-0"></div>
            <div className="w-28 h-28 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex-shrink-0 mt-6"></div>
            <div className="w-36 h-36 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex-shrink-0 mt-2"></div>
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full flex-shrink-0"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex-shrink-0 mt-4"></div>
            <div className="w-40 h-40 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full flex-shrink-0"></div>
          </div>
        </div>

        <div className="absolute bottom-20 right-0 w-[200%] h-32 opacity-15">
          <div className="flex gap-6 animate-scroll-right">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 rounded-full flex-shrink-0"></div>
            <div className="w-36 h-36 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-full flex-shrink-0"></div>
            <div className="w-28 h-28 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex-shrink-0 mt-4"></div>
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex-shrink-0"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500/25 to-blue-500/25 rounded-full flex-shrink-0 mt-3"></div>
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 rounded-full flex-shrink-0"></div>
            <div className="w-36 h-36 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-full flex-shrink-0"></div>
          </div>
        </div>

        {/* Vertical Scrolling Elements */}
        <div className="absolute left-10 top-0 w-32 h-[200%] opacity-10">
          <div className="flex flex-col gap-12 animate-scroll-up">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg flex-shrink-0 transform rotate-45"></div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg flex-shrink-0 transform -rotate-12"></div>
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/25 to-blue-500/25 rounded-lg flex-shrink-0 transform rotate-12"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-teal-500/30 rounded-lg flex-shrink-0 transform -rotate-45"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-lg flex-shrink-0 transform rotate-45"></div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-lg flex-shrink-0 transform -rotate-12"></div>
          </div>
        </div>

        <div className="absolute right-16 top-0 w-32 h-[200%] opacity-10">
          <div className="flex flex-col gap-16 animate-scroll-down">
            <div className="w-18 h-18 bg-gradient-to-br from-emerald-500/25 to-green-500/25 rounded-full flex-shrink-0"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full flex-shrink-0"></div>
            <div className="w-22 h-22 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex-shrink-0"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/25 to-blue-500/25 rounded-full flex-shrink-0"></div>
            <div className="w-18 h-18 bg-gradient-to-br from-emerald-500/25 to-green-500/25 rounded-full flex-shrink-0"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-full flex-shrink-0"></div>
          </div>
        </div>

        {/* Original Static Background Elements */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-500/5 to-blue-500/5 rounded-full animate-pulse-slow delay-1000"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-blue-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Professional API Logo */}
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-500 group-hover:scale-110 logo-glow border border-blue-400/30">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded"></div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white transition-all duration-300">
                  RyezX API
                </h1>
                <p className="text-xs text-blue-300 font-medium">Professional Platform</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#apis" className="text-gray-300 hover:text-blue-400 transition-colors">APIs</a>
              <a href="#docs" className="text-gray-300 hover:text-blue-400 transition-colors">Documentation</a>
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 px-4 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl mb-6 backdrop-blur-sm border border-blue-500/30 animate-float">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 logo-glow border border-blue-400/40">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded"></div>
                </div>
              </div>
            </div>
            <h2 className="text-5xl font-extrabold mb-6 text-white leading-tight">
              Advanced API Testing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Platform
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Platform testing API terlengkap dengan koleksi premium untuk downloader, search engine, dan AI tools. 
              Dibangun khusus untuk developer profesional.
            </p>
          </div>



          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-400">{endpoints.length}</div>
              <div className="text-sm text-gray-400">Total APIs</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-2xl border border-green-500/20 backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-400">{endpoints.filter(ep => ep.category === 'Downloader').length}</div>
              <div className="text-sm text-gray-400">Downloaders</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400">{endpoints.filter(ep => ep.category === 'Search').length}</div>
              <div className="text-sm text-gray-400">Search APIs</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 rounded-2xl border border-orange-500/20 backdrop-blur-sm">
              <div className="text-3xl font-bold text-orange-400">{endpoints.filter(ep => ep.category === 'AI').length}</div>
              <div className="text-sm text-gray-400">AI Models</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <input
              type="text"
              placeholder="🔍 Cari API yang kamu butuhkan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full px-8 py-4 bg-slate-900/40 border border-blue-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-500 backdrop-blur-sm text-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Category Filter - Horizontal Scroll */}
        <div className="mb-12" id="apis">
          <div className="overflow-x-auto scrollbar-hide scroll-smooth">
            <div className="flex gap-4 px-4 min-w-max justify-start md:justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`group relative px-8 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-2xl shadow-blue-500/25 scale-105"
                      : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 hover:text-white border border-slate-700/50"
                  }`}
                >
                  <span className="relative">{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* API Cards Grid */}
        <div className="grid gap-8 max-w-7xl mx-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredEndpoints.map((ep, idx) => (
            <div 
              key={ep.originalIndex} 
              className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
                      ep.category === 'Downloader' ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                      ep.category === 'Search' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                      'bg-gradient-to-br from-purple-500 to-violet-600'
                    }`}>
                      <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
                        <div className={`w-4 h-4 rounded ${
                          ep.category === 'Downloader' ? 'bg-gradient-to-br from-green-600 to-emerald-700' :
                          ep.category === 'Search' ? 'bg-gradient-to-br from-blue-600 to-cyan-700' :
                          'bg-gradient-to-br from-purple-600 to-violet-700'
                        }`}></div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                      ep.category === 'Downloader' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      ep.category === 'Search' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {ep.category}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                  {ep.name}
                </h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {ep.description}
                </p>

                {/* Test Button */}
                <button
                  onClick={() => toggleApiExpansion(ep.originalIndex)}
                  className={`w-full relative overflow-hidden px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    expandedApi === ep.originalIndex 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {expandedApi === ep.originalIndex ? '❌' : '🧪'}
                    {expandedApi === ep.originalIndex ? ' Close Test' : ' Test API'}
                  </span>
                </button>

                {/* Integrated Test Area */}
                {expandedApi === ep.originalIndex && (
                  <div className="mt-6 pt-6 border-t border-slate-700/50 animate-fade-in">
                    {/* API URL Display */}
                    <div className="mb-4 p-3 bg-slate-950/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-semibold text-blue-300 flex items-center">
                          <span className="mr-1">🔗</span>API Endpoint
                        </span>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded-lg">
                        <code className="text-xs text-green-300 font-mono break-all">
                          {typeof window !== "undefined" ? window.location.origin : ""}/api/{ep.path}
                        </code>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-400 mb-1">Input:</label>
                      <input
                        type="text"
                        placeholder={ep.placeholder}
                        value={apiInputs[ep.originalIndex] || ""}
                        onChange={(e) => setApiInputs(prev => ({ ...prev, [ep.originalIndex]: e.target.value }))}
                        className="w-full p-3 rounded-lg bg-slate-900/50 border border-blue-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all text-sm"
                      />
                    </div>

                    {/* Test Button */}
                    <button
                      onClick={() => handleApiTest(ep.originalIndex, ep)}
                      disabled={apiLoading[ep.originalIndex]}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                    >
                      {apiLoading[ep.originalIndex] ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Testing...
                        </div>
                      ) : (
                        <span className="flex items-center justify-center">
                          <span className="mr-2">🚀</span>
                          Execute
                        </span>
                      )}
                    </button>

                    {/* Results */}
                    {apiResults[ep.originalIndex] && (
                      <div className="mt-4 animate-fade-in">
                        <div className="flex items-center mb-2">
                          <div className="text-xs font-semibold text-gray-300 flex items-center">
                            <span className="mr-1">📊</span>API Response
                          </div>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-lg max-h-60 overflow-auto border border-slate-700/50">
                          <pre className="text-xs text-gray-300 whitespace-pre-wrap break-all font-mono">
                            {typeof apiResults[ep.originalIndex] === "object"
                              ? JSON.stringify(apiResults[ep.originalIndex], null, 2)
                              : String(apiResults[ep.originalIndex])}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEndpoints.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Tidak ada API yang ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 py-12 border-t border-slate-800/50 backdrop-blur-sm" id="about">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-500 hover:scale-110 border border-blue-400/30">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded"></div>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white">
                RyezX API Hub
              </h4>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Platform testing API profesional dengan koleksi lengkap tools untuk developer modern. 
              Dibangun dengan teknologi Next.js dan dipersembahkan untuk komunitas developer Indonesia.
            </p>
            <div className="flex flex-wrap justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>API Status: Online</span>
              </div>
              <span>•</span>
              <span>Total APIs: {endpoints.length}</span>
              <span>•</span>
              <span>Created by RyezX</span>
              <span>•</span>
              <span>v4.0 Professional</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
