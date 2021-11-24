var axios = require('axios').default;

export async function register(email: string, upkeepName: string, upkeepAddr: string, gasLimit: number, startLink: number) {
  await axios
  .post('http://localhost:5000/registerUpkeep', {
    email: email,
    upkeepName: upkeepName,
    upkeepAddr: upkeepAddr,
    gasLimit: gasLimit,
    startLink: startLink
  })
  .then(async (res) => {
    return res
  })
}

// small test
(async () => {
  await register("wuzhengxun@outlook.com", "upkeep", "0xce603D6264e40e6D4Fad35AFcCEEF1Cd68c7a7C7", 200000, 25)
})()
