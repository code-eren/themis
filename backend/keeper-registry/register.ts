const PythonShell = require('python-shell').PythonShell;

export async function register(
  email: string,
  upkeepName: string,
  upkeepAddr: string,
  gasLimit: number,
  startLink: number
) {
  var options = {
    mode: 'text',
    scriptPath: '/mnt/c/users/16073/desktop/clhackathon/themis/backend/keeper-registry', // should be path to where script lives
    args: [email, upkeepName, upkeepAddr, gasLimit, startLink]
  };

  PythonShell.run('register.py', options, function (err, results) {
    if (err) throw err;
    // Results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
}

// small test
// (async () => {
//   await register(
//     'wuzhengxun@outlook.com',
//     'upkeep',
//     '0xce603D6264e40e6D4Fad35AFcCEEF1Cd68c7a7C7',
//     200000,
//     25
//   );
// })();
