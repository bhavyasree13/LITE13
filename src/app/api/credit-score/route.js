export default async function handler(req, res) {
  try {
    const response = await fetch("http://127.0.0.1:5000/credit-score");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch credit score" });
  }
}
