import { getContract, sendToken, delay } from '../utils/utility';
import { CampaignFactory } from './factory';

// assume campaignFactory has been deployed on kovan
(async () => {
  // get the deployed campaignFactory instance
  let cf = new CampaignFactory('kovan');
  let oracleAddr = '0xC25d00698c4c48557B363F35AFe09d8f7907296c';
  let gameId = 702;
  let odds0 = 410;
  let odds1 = 110;
  let odds2 = 120;
  let interval = 15;
  // create new cloned Campaign
  let tx = await cf.createCampaign(
    oracleAddr,
    interval,
    gameId,
    odds0,
    odds1,
    odds2,
    0
  );
  console.log(tx);
  console.log('Creating a new Campaign ...');
  // wait 10s for the transaction to be included
  await delay(10000);
  console.log('Campaign created');
  // get clone contract addresses
  let newAddress = await cf.getAddress(gameId);
  console.log('campaign address: ' + newAddress);
  let newCampaign = getContract('Campaign', 'kovan', newAddress);

  // should be 0
  console.log(await newCampaign.homescore());
  console.log(await newCampaign.awayscore());

  console.log('Sending 3 LINK to ', newAddress, ' ...');
  // send some LINK to the contract as an EA consumer to pay the fee
  await sendToken(
    '0xa36085F69e2889c224210F603D836748e7dC0088',
    '3.0',
    18,
    newAddress,
    'kovan'
  );

  // wait 10s for the transaction to be included
  await delay(10000);
  console.log('Sent');

  let jobId = '7bf0064504c04021a43b9ebadddfedfb';
  tx = await newCampaign.requestScore(jobId);

  console.log(tx);
  console.log('Requesting score from external adapter ...');
  // wait 10s for fulfillment takes place
  await delay(10000);
  console.log('Request finished');

  // should be 2 and 6, NOTE: sometimes data fulfillment may take longer than 10s, use factory_test2 to further check score...
  console.log(await newCampaign.homescore());
  console.log(await newCampaign.awayscore());
})();
