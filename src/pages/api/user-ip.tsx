import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ip =
      (req.headers["x-real-ip"] as string) ||
      (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
      "Unknown";

    res.status(200).json({ ip });
  } catch (err) {
    console.log(`Error in '/api/user-ip' endpoint: `, err);
    res.status(500);
  }
}
