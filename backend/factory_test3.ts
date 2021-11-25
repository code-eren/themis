import { getContract, sendToken, delay } from '../utils/utility';
import { CampaignFactory } from './factory';

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
  let newCampaign = getContract('Campaign', 'kovan', newAddress);

  // should be 0
  console.log(await newCampaign.homescore());
  console.log(await newCampaign.awayscore());

  // register the keeper
  var axios = require('axios').default;

  await axios
  .post('http://localhost:5000/registerUpkeep', {
    email: 'wuzhengxun@outlook.com',
    upkeepName: "upkeep",
    upkeepAddr: "0xce603D6264e40e6D4Fad35AFcCEEF1Cd68c7a7C7",
    gasLimit: 200000,
    startLink: 25
  })
  .then(async (res) => {
    console.log(res)
  })

  // wait for keeper to execute
  await delay(10000);
  
  console.log(await newCampaign.homescore());
  console.log(await newCampaign.awayscore());
})();
