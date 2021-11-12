import { getContract, sendToken, delay } from '../utils/utility';
(async () => {
  let newCampaign = getContract('Campaign', 'kovan', "0x316D3cc0916B827be51B76bB604b1a1A1f798327");
  // should be 2 and 6
  console.log(await newCampaign.homescore());
  console.log(await newCampaign.awayscore());
})();
