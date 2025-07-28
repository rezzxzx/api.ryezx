import axios from "axios";

export default async function handler(req, res) {
  const { query } = req.query;

  res.setHeader("Content-Type", "application/json");

  if (!query) {
    return res.status(400).send(
      JSON.stringify({
        creator: "RyezX",
        note: "Rest API's by RyezX",
        status: false,
        message: "Masukkan parameter query.",
      }, null, 2)
    );
  }

  try {
    const response = await axios.get(`https://www.apis-anomaki.zone.id/search/pinsearch?query=${encodeURIComponent(query)}`);
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
        message: "Gagal mengambil data dari API Pinterest Search.",
      }, null, 2)
    );
  }
}
