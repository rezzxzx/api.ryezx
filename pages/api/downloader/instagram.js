// api/downloader/instagram.js
import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      creator: "RyezX",
      note: "Rest API's by RyezX",
      status: false,
      message: "Parameter 'url' tidak ditemukan!",
    });
  }

  try {
    const response = await axios.get(
      `https://xskycode-api.vercel.app/download/instagram?apikey=XSkycode&url=${encodeURIComponent(url)}`
    );

    const data = response.data;

    if (!data.status || !data.result) {
      res.setHeader("Content-Type", "application/json");
res.status(200).send(
  JSON.stringify({
    creator: "RyezX",
    note: "Rest API's by RyezX",
    status: true,
    result: data.result,
  }, null, 2) // << ini bikin JSON-nya rapi (pretty printed)
);

    res.status(200).json({
      creator: "RyezX",
      note: "Rest API's by RyezX",
      status: true,
      result: data.result, // biar sesuai seperti yang Sky kasih langsung
    });
  } catch (err) {
    console.error("Error:", err.message);

    res.status(500).json({
      creator: "RyezX",
      note: "Rest API's by RyezX",
      status: false,
      message: "Gagal mengambil data dari API (axios error).",
      debug: err.message,
    });
  }
}
