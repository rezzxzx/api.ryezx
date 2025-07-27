import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(
      JSON.stringify({
        creator: "ryezx",
        status: false,
        message: "Masukkan parameter ?url="
      }),
      { status: 400 }
    );
  }

  try {
    const { data } = await axios.get(
      `https://xskycode-api.vercel.app/download/tiktok?apikey=XSkycode&url=${encodeURIComponent(
        url
      )}`
    );

    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        creator: "ryezx",
        status: false,
        message: "Gagal mengambil data dari XSkycode.",
        error: e.message
      }),
      { status: 500 }
    );
  }
}
