export default function handler(req, res) {
  res.status(200).json({
    creator: "ryezx",
    status: true,
    message: "API is working perfectly!"
  }, null, 2); // ini gak jalan, jadi kita ubah manual
}
