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
    const result = response.data;

    if (!result || !result.result) {
      return res.status(500).json({
        status: false,
        message: "Gagal mengambil data dari XSky"
      });
    }

    const data = result.result;

    const formatted = {
      creator: "ryezx",
      status: true,
      data: {
        title: data.title,
        thumbnail: data.thumbnail,
        duration: data.duration,
        play_count: data.play_count,
        like_count: data.like_count,
        share_count: data.share_count,
        comment_count: data.comment_count,
        region: data.region,
        video_display: data.video,
        video_hd: data.video_hd,
        music_display: data.music,
        music_download: data.music_url
      }
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).end(JSON.stringify(formatted, null, 2));
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan saat mengambil data",
      error: err.message
    });
  }
}
