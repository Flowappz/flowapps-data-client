import { NextApiResponse } from "next";

export const addCorsHeader = (res: NextApiResponse): NextApiResponse => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
  );

  return res;
};
