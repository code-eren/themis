var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  params: {id: '157201'},
  headers: {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': 'a93b69e966mshef4a4011aac62ccp1717bejsn36c60c6bd4e5'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data.response[0]['goals']);
}).catch(function (error) {
	console.error(error);
});


//https://api-football-v1.p.rapidapi.com/v3/fixtures?id=157201?key=a93b69e966mshef4a4011aac62ccp1717bejsn36c60c6bd4e5//