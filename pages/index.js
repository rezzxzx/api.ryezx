export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">🔥 Ryezx API Tester</h1>
      <p className="mb-6 text-center text-gray-300">Paste endpoint kamu di bawah buat langsung test</p>

      <input
        type="text"
        placeholder="Contoh: downloader/tiktok?url=https://..."
        className="w-full max-w-xl p-3 rounded-lg bg-zinc-800 text-white outline-none mb-4"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            const path = e.target.value;
            if (path) {
              window.location.href = `/${path}`;
            }
          }
        }}
      />

      <p className="text-sm text-gray-500">Tekan Enter buat akses API langsung 🚀</p>
    </div>
  );
}
