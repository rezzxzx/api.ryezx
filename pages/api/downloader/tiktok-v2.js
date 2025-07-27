import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter url',
    });
  }

  try {
    const response = await axios.get(`https://xskycode-api.vercel.app/download/tiktok-v2?apikey=XSkycode&url=${encodeURIComponent(url)}`);
    const data = response.data;

    if (!data.status || !data.result || !data.result.data) {
      return res.status(500).json({
        status: false,
        message: 'Gagal mengambil data dari API XSky',
      });
    }

    const result = data.result.data;

    res.status(200).json({
      creator: 'RyezX',
      note: "Rest API's by RyezX",
      status: true,
      result: {
        id: result.id,
        region: result.region,
        desc: result.desc,
        duration: result.duration,
        create_time: result.create_time,
        author: result.author,
        music: {
          title: result.music_title,
          url: result.music_url,
        },
        cover: result.cover,
        origin_cover: result.origin_cover,
        play: result.play,         // URL tampilan video
        download: result.download, // URL langsung download tanpa wm
        hd: result.hd              // HD video URL
      }
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: '❌ Gagal mengambil data dari API.',
    });
  }
}
