import { status } from 'server/reply';

export interface FetchCampaignsRequest {
  data: {
    gameId: number;
  };
}

// export const fetchCampaigns = async (ctx: any) => {
//   const conn = getConnection();
//   let campaignRepo = conn.getRepository(Campaign);
//   const campaigns = campaignRepo.find();
//   return status(200).json({
//       campaigns
//   });
// }
