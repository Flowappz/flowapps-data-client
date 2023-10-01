import {
  CUSTOM_SCRIPTS_CONFIG,
  customScriptName,
} from "@/config/customScripts";
import siteService from "@/server/services/siteService";
import webflowClient from "@/server/webflow/client";
import { NextApiRequest, NextApiResponse } from "next";

interface AttachCustomScriptRequest extends NextApiRequest {
  body: {
    siteId: string;
    scriptName: customScriptName;
  };
}

export default async function handler(
  req: AttachCustomScriptRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { siteId, scriptName } = req.body;

    const webflowSite = await siteService.getSiteByWebflowId(siteId);

    if (webflowSite && webflowSite.user) {
      const script = await webflowClient.registerAndAddCustomCode(
        siteId,
        webflowSite.user.accessToken,
        CUSTOM_SCRIPTS_CONFIG[scriptName],
      );

      res.status(200).json({ siteId, status: "OK", script });
    } else {
      res.status(400).json({ message: "Site isn't found!" });
    }
  } catch (err: any) {
    console.log("Error in /api/app/attach-custom-script", err);

    res.status(500).json(err.response.data);
  }
}
