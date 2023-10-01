import Webflow from "webflow-api";
import fs from "node:fs/promises";
import path from "node:path";

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

const registerAndAddCustomCode = async ({
  siteId,
  accessToken,
}: {
  siteId: string;
  accessToken: string;
}) => {
  const client = webflow(accessToken);

  // console.log("cwd: ", process.cwd());
  // const sourceCode = await fs.readFile(
  //   path.join(process.cwd(), "/src/server/webflow/scripts/test.js"),
  //   { encoding: "utf-8" },
  // );

  // console.log("sourceCode: ", sourceCode);

  // const { data } = await client.post(
  //   `/sites/${siteId}/registered_scripts/inline`,
  //   {
  //     sourceCode,
  //     version: "0.0.1",
  //     displayName: "test script",
  //   },
  // );

  // console.log("data: ", data);

  const { data: res } = await client.put(`/sites/${siteId}/custom_code`, {
    scripts: [
      {
        id: "test_script",
        location: "header",
        version: "0.0.1",
      },
    ],
  });

  return res;
};

const webflowClient = {
  getAuthenticatedUser,
  getSitesList,
  registerAndAddCustomCode,
};

export default webflowClient;
