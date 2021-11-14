import {CampaignFactory} from "../backend/factory";

(async () => {
  let cf = new CampaignFactory("kovan");
  console.log(await cf.getImplementationContractAddr());
})();
