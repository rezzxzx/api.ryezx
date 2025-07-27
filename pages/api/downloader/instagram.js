import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      creator: "RyezX",
      note: "Rest API's by RyezX",
      status: false,
      message: "Masukkan parameter url",
    });
  }

  try {
    const { data } = await axios.get(`https://xskycode-api.vercel.app/download/instagram?apikey=XSkycode&url=${encodeURIComponent(url)}`);

    if (!data.status || !data.result || !data.result.data) {
      return res.status(500).json({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Gagal mengambil data dari API XSky",
      });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({
      creator: "RyezX",
      note: "Rest API's by RyezX",
      status: true,
      result: data.result.data
    }, null, 2));
  } catch (e) {
    res.status(500).json({
      creator: "RyezX",
      note: "Rest API's by RyezX",
      status: false,
      message: "❌ Terjadi kesalahan saat mengambil data dari API",
    });
  }
}
