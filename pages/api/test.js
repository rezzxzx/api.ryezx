export default function handler(req, res) {
  res.status(200).json({
    status: true,
    message: "✅ API is working perfectly!",
    author: "RyezX"
  });
}
