import { ethers } from 'ethers';
import { getContract, sendToken, delay } from '../utils/utility';
import { CampaignFactory } from './factory';
import { register } from './keeper-registry/register';

// assume campaignFactory has been deployed on kovan
(async () => {
  // get the deployed campaignFactory instance
  let cf = new CampaignFactory('kovan');
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
    odds0,
    odds1,
    odds2,
    checkTime,
    0,
    {
      value: ethers.utils.parseEther("0.1")
    }
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

  // register the keeper
  let res = await register(
    'wuzhengxun@outlook.com',
    'upkeep',
    newAddress,
    200000,
    25
  );

  console.log(res);
  // wait for keeper to execute
  await delay(10000);

  console.log(await newCampaign.homescore());
  console.log(await newCampaign.awayscore());
})();
