import Webflow from "webflow-api";
import { IAuthenticatedUser, Site } from "webflow-api/dist/api";

export type AuthenticatedUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type WebflowSite = {
  id: string;
  workspaceId: string;
  displayName: string;
  shortName: string;
  previewUrl: string;
};

const webflow = (accessToken: string) => {
  return new Webflow({ token: accessToken, beta: true });
};

const getAuthenticatedUser = async (
  accessToken: string,
): Promise<AuthenticatedUser> => {
  const client = webflow(accessToken);

  const { data } = await client.get("/token/authorized_by");

  return data as AuthenticatedUser;
};

const getSitesList = async (accessToken: string): Promise<WebflowSite[]> => {
  const {
    data: { sites },
  } = await webflow(accessToken).get("/sites");

  return sites;
};

const webflowClient = {
  getAuthenticatedUser,
  getSitesList,
};

export default webflowClient;
