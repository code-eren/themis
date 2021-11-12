import { getContract, sendToken, delay } from '../utils/utility';
(async () => {
  let newCampaign = getContract('Campaign', 'kovan', "0x72bDc3B484c2205344b201d0D7F727d42c85d8e2");
  // should be 2 and 6
  console.log(await newCampaign.homescore());
  console.log(await newCampaign.awayscore());
})();
