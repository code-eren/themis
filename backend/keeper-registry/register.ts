import { Database } from '../db/db';
const PythonShell = require('python-shell').PythonShell;

const db = new Database();

// return registered upkeepID
export async function register(
  email: string,
  upkeepName: string,
  upkeepAddr: string,
  gasLimit: number,
  startLink: number
) {
  var options = {
    mode: 'text',
    scriptPath:
      '/mnt/c/users/16073/desktop/clhackathon/themis/backend/keeper-registry', // should be path to where script lives
    args: [email, upkeepName, upkeepAddr, gasLimit, startLink]
  };

  // synchronously run the python script
  const {
    success,
    err = '',
    results
  } = await new Promise((resolve, reject) => {
    PythonShell.run('register.py', options, function (err, results) {
      if (err) {
        reject({ success: false, err });
      }

      console.log('PythonShell results: %j', results);

      resolve({ success: true, results });
    });
  });

  console.log('python call ends');

  if (!success) {
    console.log('Test Error: ' + err);
    return;
  }

  console.log('The result is: ' + results);

  return results[0];
}

// small test
// (async () => {
//   let res = await register(
//     'wuzhengxun@outlook.com',
//     'upkeep',
//     '0xce603D6264e40e6D4Fad35AFcCEEF1Cd68c7a7C7',
//     200000,
//     25
//   );
//   console.log("id is", res)
// })();
