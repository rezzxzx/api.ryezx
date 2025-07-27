import axios from "axios";

export default async function handler(req, res) {
  const { question } = req.query;

  res.setHeader("Content-Type", "application/json");

  if (!question) {
    return res.status(400).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Masukkan parameter question.",
      }, null, 2)
    );
  }

  try {
    const response = await axios.get(`https://xskycode-api.vercel.app/ai/grok?apikey=XSkycode&question=${encodeURIComponent(question)}`);
    const data = response.data;

    res.status(200).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: data.status,
        result: data.result,
      }, null, 2)
    );
  } catch (err) {
    res.status(500).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Gagal mengambil data dari API XSky.",
      }, null, 2)
    );
  }
}
