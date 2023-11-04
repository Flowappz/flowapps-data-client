import {
  CUSTOM_SCRIPTS_CONFIG,
  CUSTOM_SCRIPTS_NAME,
  customScriptName,
} from "@/config/customScripts";
import siteService from "@/server/services/siteService";
import webflowClient from "@/server/webflow/client";
import { NextApiRequest, NextApiResponse } from "next";

interface AttachCustomScriptRequest extends NextApiRequest {
  body: {
    siteId: string;
    // scriptName: customScriptName;
  };
}

export default async function handler(
  req: AttachCustomScriptRequest,
  res: NextApiResponse<any>,
) {
  try {
    const { siteId } = req.body;

    const webflowSite = await siteService.getSiteByWebflowId(siteId);

    if (webflowSite && webflowSite.user) {
      console.log(
        `Registering ${
          CUSTOM_SCRIPTS_CONFIG[CUSTOM_SCRIPTS_NAME.FORM_FIELDS_PRO_CDN_SCRIPT]
            .displayName
        } to site ${siteId}`,
      );

      await webflowClient.registerAndAddCustomCode(
        siteId,
        webflowSite.user.accessToken,
        CUSTOM_SCRIPTS_CONFIG[CUSTOM_SCRIPTS_NAME.FORM_FIELDS_PRO_CDN_SCRIPT],
      );

      console.log("Done!");

      res.status(200).json({ siteId, status: "OK" });
    } else {
      res.status(400).json({ message: "Site isn't found!" });
    }
  } catch (err: any) {
    console.log("Error in /api/app/attach-custom-script", err.response.data);

    res.status(500).json(err.response.data);
  }
}
