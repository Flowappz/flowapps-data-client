import Webflow from "webflow-api";
import { SupportedScope } from "webflow-api/dist/core";

const webflowClient = new Webflow();

const authorizeUrl = webflowClient.authorizeUrl({
  client_id: process.env.WEBFLOW_CLIENT_ID as string,
  redirect_uri: process.env.WEBFLOW_REDIRECT_URL as string,
  scopes: process.env.WEBFLOW_SCOPES?.split(",") as SupportedScope[],
});

const webflowAuth = {
  authorizeUrl,
};

export default webflowAuth;
