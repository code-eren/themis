const { status } = require("server/reply");
const CampaignFactoryABI = require('../../../build/contracts/CampaignFactory.json');
const {CampaignFactory} = require("../../factory");

const campaignFactory = new CampaignFactory("local");

// const createCampaign = async (ctx) => {
//     // should be admin endpoint
//     let addr = await contract.createCampaign(
//         ctx.ga,
//         ctx.data.awayTeamID,
//         ctx.data.homeTeamID,
//         ctx.data.awayOdds,
//         ctx.data.homeOdds
//     );
//     const conn = getConnection();
//     let campaign = new Campaign();
//     campaign.matchID = ctx.data.matchID;
//     campaign.awayTeamID = ctx.data.awayTeamID;
//     campaign.homeTeamID = ctx.data.homeTeamID;
//     campaign.awayTeamOdds = ctx.data.awayOdds;
//     campaign.homeTeamOdds = ctx.data.homeOdds;
//     campaign.address = addr;
//     conn.manager.save(campaign);
//     return status(200).json({
//         addr
//     });
// }