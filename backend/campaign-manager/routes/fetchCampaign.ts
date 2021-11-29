import { status } from 'server/reply';
import { Campaign } from '../../db/entity/campaign';
import { Database } from '../../db/db';

export interface FetchCampaignByGameIdRequest {
  data: {
    gameId: number;
  };
}

// global data
// db for db interaction
let db = new Database();
/**
 *
 * @returns all deployed campaigns with their metadata in db
 */
export const fetchCampaigns = async () => {
  let joinedCampaigns = await (await db.getConnection('default'))
    .getRepository(Campaign)
    .createQueryBuilder('Campaign')
    .innerJoinAndSelect(
      'Schedule',
      'schedule',
      'Campaign.ScheduleId = schedule.Id'
    )
    .getRawMany();

  return status(200).json({
    joinedCampaigns
  });
};

/**
 *
 * @param ctx gameId
 * @returns campaign with gameId in db
 */
export const fetchCampaignByGameId = async (
  ctx: FetchCampaignByGameIdRequest
) => {
  let joinedCampaign = await (await db.getConnection('default'))
    .getRepository(Campaign)
    .createQueryBuilder('Campaign')
    .where(`Campaign.GameId = ${ctx.data.gameId}`)
    .innerJoinAndSelect(
      'Schedule',
      'schedule',
      'Campaign.ScheduleId = schedule.Id'
    )
    .getRawMany();
  return status(200).json({
    joinedCampaign
  });
};

// (async ()=>(await fetchCampaignByGameId({data: {gameId: 39370}})))();
