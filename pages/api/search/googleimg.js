import axios from "axios";

export default async function handler(req, res) {
  const { q } = req.query;

  res.setHeader("Content-Type", "application/json");

  if (!q) {
    return res.status(400).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Masukkan parameter q.",
      }, null, 2)
    );
  }

  try {
    const response = await axios.get(`https://xskycode-api.vercel.app/search/gimage?apikey=XSkycode&q=${encodeURIComponent(q)}`);
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
        message: "Gagal mengambil data dari API Google Image.",
      }, null, 2)
    );
  }
}
