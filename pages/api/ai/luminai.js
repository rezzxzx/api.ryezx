import axios from "axios";

export default async function handler(req, res) {
  const { text } = req.query;

  res.setHeader("Content-Type", "application/json");

  if (!text) {
    return res.status(400).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Masukkan parameter text.",
      }, null, 2)
    );
  }

  try {
    const response = await axios.get(`https://www.apis-anomaki.zone.id/ai/ai-lumin?text=${encodeURIComponent(text)}`);
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
        message: "Gagal mengambil data dari API LuminAI.",
      }, null, 2)
    );
  }
}
