import { env } from "@/env.mjs";
import Webflow from "webflow-api";
import { SupportedScope } from "webflow-api/dist/core";

const webflowClient = new Webflow();

const authorizeUrl = webflowClient.authorizeUrl({
  client_id: process.env.WEBFLOW_CLIENT_ID as string,
  redirect_uri: process.env.WEBFLOW_REDIRECT_URL as string,
  scopes: process.env.WEBFLOW_SCOPES?.split(",") as SupportedScope[],
});

const getAccessToken = async (code: string) => {
  const token = await webflowClient.accessToken({
    client_id: env.WEBFLOW_CLIENT_ID,
    client_secret: env.WEBFLOW_CLIENT_SECRET,
    code,
    redirect_uri: env.WEBFLOW_REDIRECT_URL,
  });

  return token.access_token;
};

const webflowAuth = {
  authorizeUrl,
  getAccessToken,
};

export default webflowAuth;
