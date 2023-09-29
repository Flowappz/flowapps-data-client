import { Prisma, User } from "@prisma/client";
import type { AuthenticatedUser, WebflowSite } from "../webflow/client";

const serializeWebflowAuthenticatedUserToDbUser = (
  user: AuthenticatedUser,
  accessToken: string,
): Prisma.UserCreateInput => {
  const { id, ...rest } = user;

  return {
    webflowUserId: id,
    ...rest,
    accessToken,
  };
};

const serializedWebflowSitesListToDbSites = (
  sites: WebflowSite[],
): Prisma.SiteCreateInput[] => {
  return sites.map((site) => {
    const { id, displayName, previewUrl, workspaceId } = site;

    return {
      siteId: id,
      displayName,
      previewUrl,
      workspaceId,
    };
  });
};

const webflowDataSerializer = {
  serializeWebflowAuthenticatedUserToDbUser,
  serializedWebflowSitesListToDbSites,
};

export default webflowDataSerializer;
