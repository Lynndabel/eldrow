import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import { baseWordDaily } from "./blockchain/baseWordDaily";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

interface FrameRequestBody {
  untrustedData: {
    fid: number;
    buttonIndex?: number;
    inputText?: string;
    castId?: {
      fid: number;
      hash: string;
    };
  };
}

app.post("/frames/main", async (req: Request<unknown, unknown, FrameRequestBody>, res: Response) => {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="og:title" content="Base Word Daily" />
    <meta name="fc:frame" content="vNext" />
    <meta name="fc:frame:image" content="${process.env.FRAME_IMAGE_URL ?? ""}" />
    <meta name="fc:frame:button:1" content="Play today" />
    <meta name="fc:frame:post_url" content="${process.env.FRAME_POST_URL ?? ""}" />
  </head>
  <body></body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/verify", async (req: Request, res: Response) => {
  try {
    const { day, word } = req.query;

    if (!day || !word) {
      res.status(400).json({ error: "Missing day or word" });
      return;
    }

    const dayNum = Number(day);
    if (!Number.isInteger(dayNum)) {
      res.status(400).json({ error: "Invalid day format" });
      return;
    }

    const isValid: boolean = await baseWordDaily.verifyWord(dayNum, String(word));
    res.json({ day: dayNum, word: String(word), valid: isValid });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("BaseWordDaily backend – Farcaster miniapp integration and off-chain gameplay live here.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
