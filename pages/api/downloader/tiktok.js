import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Parameter 'url' tidak ditemukan"
    });
  }

  try {
    const apiUrl = `https://xskycode-api.vercel.app/download/tiktok?apikey=XSkycode&url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.result) {
      return res.status(500).json({
        status: false,
        message: "Gagal mengambil data dari XSky"
      });
    }

    const formatted = {
      creator: "RyezX",
      note: "Rest API's by RyezX",
      status: data.status,
      result: data.result
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).end(JSON.stringify(formatted, null, 2)); // Pretty printed
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat mengambil data",
      error: err.message
    });
  }
}
