module.exports = async function handler(req, res) {
  const type = req.query.type;

  const files = {
    pc: "/downloads/orbit-kiet-pc.zip",
    quetta: "/downloads/orbit-kiet-quetta-v1.0.16.zip"
  };

  const keys = {
    pc: "downloads:pc",
    quetta: "downloads:quetta"
  };

  if (!files[type]) {
    return res.status(400).json({
      error: "Invalid download type"
    });
  }

  try {
    const url =
      `${process.env.KV_REST_API_URL}/incr/${keys[type]}`;

    await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`
      }
    });
  } catch (error) {
    console.error("Download counter failed:", error);
  }

  res.writeHead(302, {
    Location: files[type]
  });

  res.end();
};
