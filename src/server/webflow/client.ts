import Webflow from "webflow-api";
import fs from "node:fs/promises";
import path from "node:path";
import { ScriptConfig } from "@/config/customScripts";

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

export type WebflowCustomScript = {
  id: string;
  displayName: string;
  hostedLocation: string;
  integrityHash: string;
  canCopy: boolean;
  version: string;
};

export type WebflowCustomCode = {
  id: string;
  location: "header" | "footer";
  version: string;
  attributes: { key: string };
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

const registerHostedScript = async (
  siteId: string,
  accessToken: string,
  scriptConfig: ScriptConfig,
): Promise<WebflowCustomScript> => {
  const { displayName, version, hostedLocation, integrityHash } = scriptConfig;

  const { status, script } = await checkScriptRegistrationStatus(
    siteId,
    accessToken,
    scriptConfig,
  );

  if (status && script) {
    return script;
  }

  const { data } = await webflow(accessToken).post(
    `/sites/${siteId}/registered_scripts/hosted`,
    {
      displayName,
      version,
      hostedLocation,
      integrityHash,
    },
  );

  return data;
};

const registerScript = async (
  siteId: string,
  accessToken: string,
  scriptConfig: ScriptConfig,
): Promise<WebflowCustomScript> => {
  const { displayName, version, path: scriptPath } = scriptConfig;

  const { status, script } = await checkScriptRegistrationStatus(
    siteId,
    accessToken,
    scriptConfig,
  );

  if (status && script) {
    return script;
  }

  const sourceCode = await fs.readFile(
    path.join(process.cwd(), scriptPath as string),
    {
      encoding: "utf-8",
    },
  );

  const { data } = await webflow(accessToken).post(
    `/sites/${siteId}/registered_scripts/inline`,
    {
      sourceCode,
      version,
      displayName,
    },
  );

  return data;
};

const checkScriptRegistrationStatus = async (
  siteId: string,
  accessToken: string,
  scriptConfig: ScriptConfig,
): Promise<{ status: boolean; script?: WebflowCustomScript }> => {
  const { registeredScripts } = await getListOfRegisteredScripts(
    siteId,
    accessToken,
  );

  for (let script of registeredScripts) {
    if (
      script.displayName === scriptConfig.displayName &&
      script.version === scriptConfig.version
    ) {
      return {
        status: true,
        script,
      };
    }
  }

  return { status: false };
};

const registerAndAddCustomCode = async (
  siteId: string,
  accessToken: string,
  scriptConfig: ScriptConfig,
): Promise<WebflowCustomCode> => {
  const { id, version } = await registerScript(
    siteId,
    accessToken,
    scriptConfig,
  );

  const client = webflow(accessToken);

  const { data } = await client.put(`/sites/${siteId}/custom_code`, {
    scripts: [
      {
        id,
        version,
        location: scriptConfig.location,
      },
    ],
  });

  return data.scripts[0];
};

const deleteCustomCode = async (
  siteId: string,
  accessToken: string,
): Promise<boolean> => {
  const { status } = await webflow(accessToken).delete(
    `/sites/${siteId}/custom_code`,
  );

  return status === 204;
};

const getListOfCustomCodes = async (
  siteId: string,
  accessToken: string,
): Promise<WebflowCustomCode[]> => {
  const { data } = await webflow(accessToken).get(
    `/sites/${siteId}/custom_code`,
  );

  return data;
};

const getListOfRegisteredScripts = async (
  siteId: string,
  accessToken: string,
): Promise<{ registeredScripts: WebflowCustomScript[]; pagination: any }> => {
  const { data } = await webflow(accessToken).get(
    `/sites/${siteId}/registered_scripts`,
  );

  return data;
};

const webflowClient = {
  getAuthenticatedUser,
  getSitesList,
  registerAndAddCustomCode,
  deleteCustomCode,
  getListOfCustomCodes,
  getListOfRegisteredScripts,
  registerScript,
  checkScriptRegistrationStatus,
  registerHostedScript,
};

export default webflowClient;
