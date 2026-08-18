module.exports = async function handler(req, res) {
  try {
    const base = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const [pcRes, quettaRes] = await Promise.all([
      fetch(`${base}/get/downloads:pc`, { headers }),
      fetch(`${base}/get/downloads:quetta`, { headers })
    ]);

    const pcData = await pcRes.json();
    const quettaData = await quettaRes.json();

    res.setHeader("Cache-Control", "no-store");

    res.status(200).json({
      pc: Number(pcData.result || 0),
      quetta: Number(quettaData.result || 0)
    });
  } catch (error) {
    console.error("Stats failed:", error);

    res.status(500).json({
      pc: 0,
      quetta: 0
    });
  }
};
