import webflowAuth from "@/server/webflow/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const authorizeUrl = webflowAuth.authorizeUrl;

    return res.status(200).json({ authorizeUrl });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
}
