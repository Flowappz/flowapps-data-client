import { db } from "@/server/db";
import webflowDataSerializer from "@/server/serializer/webflowDataSerializer";
import userService from "@/server/services/userService";
import webflowAuth from "@/server/webflow/auth";
import webflowClient from "@/server/webflow/client";
import { NextApiRequest, NextApiResponse } from "next";

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
      return;
    }

    const accessToken = await webflowAuth.getAccessToken(code as string);
    // const accessToken = "8edd0fbe8b6af5b3526516d310ca87743ee8a43fe7400d8d8ca93c4d8ce5fdf8";

    const webflowUser = await webflowClient.getAuthenticatedUser(accessToken);
    const serializedUser =
      webflowDataSerializer.serializeWebflowAuthenticatedUserToDbUser(
        webflowUser,
        accessToken,
      );

    const sites = await webflowClient.getSitesList(accessToken);
    const serializedSites =
      webflowDataSerializer.serializedWebflowSitesListToDbSites(sites);

    console.log(
      "authcallback --> user: ",
      serializedUser,
      "sites: ",
      serializedSites,
    );

    const user = await userService.upsertUserAndSites(
      serializedUser,
      serializedSites,
    );

    res.redirect("https://webflow.com/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
}
