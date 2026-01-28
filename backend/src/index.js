const express = require("express");
require("dotenv").config();
const { baseWordDaily } = require("./blockchain/baseWordDaily");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Public verification endpoint: anyone can verify fairness after reveal
app.get("/verify", async (req, res) => {
  try {
    const { day, word } = req.query;

    if (!day || !word) {
      return res.status(400).json({ error: "Missing day or word" });
    }

    const dayNum = Number(day);
    if (!Number.isInteger(dayNum)) {
      return res.status(400).json({ error: "Invalid day format" });
    }

    const isValid = await baseWordDaily.verifyWord(dayNum, String(word));
    res.json({ day: dayNum, word: String(word), valid: isValid });
  } catch (err) {
    console.error("Error in /verify:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Placeholder root route for Farcaster miniapp / Frames integration
app.get("/", (req, res) => {
  res.send(
    "BaseWordDaily backend – Farcaster miniapp integration goes here (off-chain gameplay, attempts, emoji grid)."
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
