import { CampaignFactory } from './factory';
import { delay } from '../utils/utility';
import { ethers } from 'ethers';

(async () => {
  let cf = new CampaignFactory('kovan');
  await cf.init();

  // await delay(5000);

  let oracleAddr = '0xC25d00698c4c48557B363F35AFe09d8f7907296c';
  let gameId = 702;
  let odds0 = 410;
  let odds1 = 110;
  let odds2 = 120;
  let checkTime = 0;
  let riskMode = 0;
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
    riskMode,
    {
      value: ethers.utils.parseEther('0.01')
    }
  );
  console.log(tx);
  console.log('Creating a new Campaign ...');
  // wait 10s for the transaction to be included
  await delay(15000);
  console.log('Campaign created');
  // get clone contract addresses
  let newAddress = await cf.getAddress(gameId);
  console.log('campaign address: ' + newAddress);
})();
