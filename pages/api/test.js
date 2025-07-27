export default function handler(req, res) {
  const data = {
    creator: "ryezx",
    status: true,
    message: "API is working perfectly!"
  };

  res.setHeader("Content-Type", "application/json");
  res.status(200).end(JSON.stringify(data, null, 2));
}
