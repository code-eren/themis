import { CampaignFactory } from './factory';
import { sendToken, delay } from '../utils/utility';
import { register } from './keeper-registry/register';

(async () => {
  let cf = new CampaignFactory('kovan');
  await cf.init();

  // await delay(5000);

  let oracleAddr = '0xC25d00698c4c48557B363F35AFe09d8f7907296c';
  let gameId = 702;
  let teamId0 = 0;
  let teamId1 = 1;
  let odds0 = 410;
  let odds1 = 110;
  let odds2 = 120;
  let checkTime = 0;
  let interval = 15;
  // create new cloned Campaign
  let tx = await cf.createCampaign(
    oracleAddr,
    interval,
    gameId,
    teamId0,
    teamId1,
    odds0,
    odds1,
    odds2,
    checkTime
  );
  console.log(tx);
  console.log('Creating a new Campaign ...');
  // wait 10s for the transaction to be included
  await delay(10000);
  console.log('Campaign created');
  // get clone contract addresses
  let newAddress = await cf.getAddress(gameId);
  console.log('campaign address: ' + newAddress);
  console.log('Sending 5 LINK to ', newAddress, ' ...');
  // send some LINK to the contract as an EA consumer to pay the fee
  await sendToken(
    '0xa36085F69e2889c224210F603D836748e7dC0088',
    '5.0',
    18,
    newAddress,
    'kovan'
  );

  // wait 10s for the transaction to be included
  await delay(10000);
  console.log('Sent');

  // TODO test it! register upkeep for this deployed contract
  let res = await register(
    'wuzhengxun@outlook.com',
    'upkeep',
    newAddress,
    200000,
    25
  );
  // TODO: error handling here
  console.log(res);

  // 0xD0a20A089Eb3D61f6D8348c2487c03314dfd54AA
})();
