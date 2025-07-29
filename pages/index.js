import { useState, useEffect } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Input } from "@/components/ui/input"; import { Button } from "@/components/ui/button"; import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const apiList = [ { name: "TikTok Downloader", endpoint: "/downloader/tiktok?url=https://vm.tiktok.com/example" }, { name: "YouTube Downloader", endpoint: "/downloader/ytdl?url=https://youtube.com/watch?v=example" }, { name: "Pinterest Search", endpoint: "/search/pinsearch?query=nature" }, { name: "ChatGPT AI", endpoint: "/ai/chatgpt?question=Halo, apa kabar?" } ];

export default function ApiDashboard() { const [results, setResults] = useState({}); const [loading, setLoading] = useState({});

const callApi = async (endpoint) => { setLoading((prev) => ({ ...prev, [endpoint]: true })); try { const res = await fetch(endpoint); const data = await res.json(); setResults((prev) => ({ ...prev, [endpoint]: data })); } catch (err) { setResults((prev) => ({ ...prev, [endpoint]: { error: true } })); } finally { setLoading((prev) => ({ ...prev, [endpoint]: false })); } };

useEffect(() => { apiList.forEach((api) => callApi(api.endpoint)); }, []);

return ( <div className="min-h-screen bg-blue-50 p-6"> <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">📡 Ryezx API Monitor</h1> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {apiList.map((api) => ( <Card key={api.name} className="bg-white border border-blue-200 shadow-md"> <CardContent className="p-4"> <h2 className="text-lg font-semibold text-blue-700 mb-2">{api.name}</h2> <p className="text-sm text-gray-500 break-all mb-3">{api.endpoint}</p> <div className="flex items-center gap-2"> {loading[api.endpoint] ? ( <Loader2 className="animate-spin text-blue-500" /> ) : results[api.endpoint]?.error ? ( <XCircle className="text-red-500" /> ) : ( <CheckCircle2 className="text-green-500" /> )} <span className="text-sm"> {loading[api.endpoint] ? "Loading..." : results[api.endpoint]?.error ? "Error" : "Online"} </span> </div> <Button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => callApi(api.endpoint)} > Test API </Button> </CardContent> </Card> ))} </div> </div> ); }

