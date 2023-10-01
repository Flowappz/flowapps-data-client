import { env } from "@/env.mjs";

export const validateBasicAuth = (headers: Headers) => {
  const authHeader = headers.get("authorization");

  if (authHeader?.indexOf("Basic") === 0) {
    const base64Credentials = authHeader.split(" ")[1];
    if (!base64Credentials) return false;

    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii",
    );
    const [username, password] = credentials.split(":");
    if (
      username === env.BASIC_AUTH_USER &&
      password === env.BASIC_AUTH_PASSWORD
    )
      return true;
  }

  return false;
};
