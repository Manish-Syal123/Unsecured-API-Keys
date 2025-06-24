const express = require("express");
const router = express.Router();
const prisma = require("../utils/prismaconnection.js");
const { UpdateProviders } = require("../controllers/UpdateProviders.js");

// to post a new API key
router.post("/keys", async (req, res) => {
  const {
    key,
    provider,
    context,
    line_number,
    repo_name,
    owner,
    file_path,
    first_found,
    status = "unverified",
  } = req.body;

  try {
    const result = await prisma.apiKey.create({
      data: {
        key,
        provider,
        context,
        lineNumber: line_number,
        repoName: repo_name,
        owner,
        filePath: file_path,
        firstFound: new Date(first_found),
        status,
      },
    });
    if (!result) {
      return res.status(500).json({ error: "Failed to insert API key" });
    }
    console.log("Inserted API key:", result);
    await UpdateProviders(provider);
    res.json({ success: true, id: result.id, data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB insert failed" });
  }
});

// to get all API keys
router.get("/keys/getall", async (req, res) => {
  try {
    const keys = await prisma.apiKey.findMany({
      orderBy: {
        firstFound: "desc",
      },
    });
    res.json(keys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB fetch failed" });
  }
});

// GET /keys?provider=openai  // to get API keys by provider
router.get("/keys", async (req, res) => {
  const provider = req.query.provider;
  try {
    const keys = await prisma.apiKey.findMany({
      where: provider ? { provider } : {},
      orderBy: { firstFound: "desc" },
    });
    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch keys" });
  }
});

// GET /key/:id  // to get metadata of a specific API key by ID
router.get("/key/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const key = await prisma.apiKey.findUnique({
      where: { id: parseInt(id) },
    });
    if (!key) return res.status(404).json({ error: "Key not found" });
    res.json(key);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch key metadata" });
  }
});

// POST /key/:id/view
// Increment view count for analytics
// so in the frontend, we initially hide the api key and only show it when the user clicks on "View Key" button and then we call this endpoint with the key ID
router.post("/key/:id/view", async (req, res) => {
  const { id } = req.params;
  try {
    const key = await prisma.apiKey.update({
      where: { id: parseInt(id) },
      data: { views: { increment: 1 } },
    });
    res.json({ success: true, views: key.views });
  } catch (err) {
    res.status(500).json({ error: "Failed to increment view count" });
  }
});

// POST /key/:id/verify
// Verify if the API key is valid
// in the frontend, we call this endpoint with the key ID and the API key value
// router.post("/key/:id/verify", async (req, res) => {
// });

module.exports = router;
