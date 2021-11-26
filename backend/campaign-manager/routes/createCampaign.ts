import { CampaignFactory } from '../../factory';
import { status } from 'server/reply';
import {
  delay,
  checkTransactionConfirmed,
  sendToken
} from '../../../utils/utility';
import { moneyLine2contractOdds } from '../../../utils/math';
import { register } from '../../keeper-registry/register';

// global data
// map from sport to factory later when support mulitple support
let factory = new CampaignFactory('kovan');

export interface CreateCampaignRequest {
  data: {
    oracleAddr: string;
    interval: number;
    gameId: number;
    teamId0: number;
    teamId1: number;
    team0MoneyLine: number;
    team1MoneyLine: number;
    drawMoneyLine: number;
    expectedFulfillTime: number;
    // nonce: number;
  };
}

export const createCampaign = async (ctx: CreateCampaignRequest) => {
  await factory.init();
  // should be admin endpoint
  let tx = await factory.createCampaign(
    ctx.data.oracleAddr,
    ctx.data.interval,
    ctx.data.gameId,
    ctx.data.teamId0,
    ctx.data.teamId1,
    moneyLine2contractOdds(ctx.data.team0MoneyLine),
    moneyLine2contractOdds(ctx.data.team1MoneyLine),
    moneyLine2contractOdds(ctx.data.drawMoneyLine),
    ctx.data.expectedFulfillTime,
    // {
    //   nonce: ctx.data.nonce
    // }
  );
  console.log(tx);
  await delay(15000);
  // wait for tx to be confirmed
  // number of time to retry
  // total wait 4 * 5 = 20s
  let recheckTime = 4;
  let confirmed = false;
  while (recheckTime > 0) {
    // wait for 5 seconds
    await delay(5000);
    if (await checkTransactionConfirmed(tx.hash, 'kovan')) {
      confirmed = true;
      break;
    }
    recheckTime--;
  }
  if (confirmed) {
    let deployedAddr = await factory.getAddress(ctx.data.gameId);

    // wait 30s
    await delay(30000);
    // send 5 link to the deployed contract
    await sendToken(
      '0xa36085F69e2889c224210F603D836748e7dC0088',
      '5.0',
      18,
      deployedAddr,
      'kovan'
    );
    console.log(`5 link sent to ${deployedAddr}`)

    // wait 60s for the transaction to be included
    // TODO add error handling, retry, ...
    await delay(60000);

    // TODO test it! register upkeep for this deployed contract
    let res = await register(
      'wuzhengxun@outlook.com',
      'upkeep',
      deployedAddr,
      200000,
      25
    );
    // TODO: error handling here
    console.log(res);

    // wait another 60s for the transaction to be included
    // TODO add error handling, retry, ...
    await delay(60000);

    return status(200).json({
      deployedAddr: deployedAddr
    });
  }
  // something potentially went wrong...
  return status(500);
};
