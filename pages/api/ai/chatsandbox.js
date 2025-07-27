import axios from "axios";

export default async function handler(req, res) {
  const { prompt } = req.query;

  res.setHeader("Content-Type", "application/json");

  if (!prompt) {
    return res.status(400).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Masukkan parameter prompt.",
      }, null, 2)
    );
  }

  try {
    const response = await axios.get(`https://www.apis-anomaki.zone.id/ai/ai-chatsandbox?prompt=${encodeURIComponent(prompt)}`);
    const data = response.data;

    res.status(200).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: data.status ?? true,
        result: data.result,
      }, null, 2)
    );
  } catch (err) {
    res.status(500).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Gagal mengambil data dari API.",
      }, null, 2)
    );
  }
}
