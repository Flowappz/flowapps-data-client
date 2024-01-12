import { db } from "@/server/db";
import webflowDataSerializer from "@/server/serializer/webflowDataSerializer";
import userService from "@/server/services/userService";
import webflowAuth from "@/server/webflow/auth";
import webflowClient from "@/server/webflow/client";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const saveTargetSiteWithUser = async (
  user: Prisma.UserCreateInput,
  siteId: string,
) => {
  const site = await webflowClient.getSite(user.accessToken, siteId);
  const serializedSite =
    webflowDataSerializer.serializeWeblfowSiteToDbSite(site);

  await userService.upsertUserAndSites(user, [serializedSite]);
};

const saveAllSitesWithUser = async (user: Prisma.UserCreateInput) => {
  const sites = await webflowClient.getSitesList(user.accessToken);
  const serializedSites =
    webflowDataSerializer.serializedWebflowSitesListToDbSites(sites);

  await userService.upsertUserAndSites(user, serializedSites);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { code, state, error, error_description } = req.query;

    if (error) {
      console.log("Error returned from webflow auth callback");
      console.log(
        "Error code: ",
        error,
        "Error description: ",
        error_description,
      );
      return res.status(400).json({ message: "You didn't authorize the app." });
    }

    const accessToken = await webflowAuth.getAccessToken(code as string);
    const webflowUser = await webflowClient.getAuthenticatedUser(accessToken);

    const serializedUser =
      webflowDataSerializer.serializeWebflowAuthenticatedUserToDbUser(
        webflowUser,
        accessToken,
      );

    if (state) {
      const { siteId, returnUrl } = JSON.parse(
        Buffer.from(state as string, "base64").toString(),
      );
      await saveTargetSiteWithUser(serializedUser, siteId);
      saveAllSitesWithUser(serializedUser);
      res.redirect(returnUrl);
    } else {
      await saveAllSitesWithUser(serializedUser);
      res.redirect("https://webflow.com/dashboard");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
}
