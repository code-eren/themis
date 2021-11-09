var axios = require("axios").default;
require('dotenv').config();


if (!process.env.SPORTSDATAIO_API_KEY) {
  console.error("please set the api key!");
}
// to_do: add more data providers and match by date and name
api_key = process.env.SPORTSDATAIO_API_KEY;

async function getSchedule(date) {
  var options = {
    method: 'GET',
    url: `https://api.sportsdata.io/v3/soccer/scores/json/GamesByDate/${date}?key=${api_key}`,
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

// (async () => {
//   await getSchedule("2021-11-07");
// })();

module.exports = {getSchedule}


