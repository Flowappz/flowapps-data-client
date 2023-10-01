import { db } from "../db";

async function getSiteByWebflowId(siteId: string) {
  const site = await db.site.findFirst({
    where: { siteId },
    include: {
      user: true,
    },
  });

  return site;
}

const siteService = {
  getSiteByWebflowId,
};

export default siteService;
