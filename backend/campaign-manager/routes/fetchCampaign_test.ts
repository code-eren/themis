import axios from 'axios';

axios
  .get('http://localhost:8070/campaigns')
  .then(function (response) {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });

// axios
//   .get('http://localhost:8070/campaignsByGameId', {
//     data: { gameId: 39405 }
//   })
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
