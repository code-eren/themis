const server = require('server');
const { get, post } = server.router;
const { header } = server.reply;

import { createCampaign } from './routes/createCampaign';
console.log('Running campaign-manager');

const cors = [
  (_: any) => header('Access-Control-Allow-Origin', '*'),
  (_: any) =>
    header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    ),
  (_: any) =>
    header(
      'Access-Control-Allow-Methods',
      'GET, PUT, PATCH, POST, DELETE, HEAD'
    ),
  (ctx: any) => (ctx.method.toLowerCase() === 'options' ? 200 : false)
];

// public port
// server({ port: 8070 }, cors, [
//     console.log,
//     get('/campaigns', fetchCampaigns)
// ]);

// private port
server({ security: { csrf: false }, port: 8090 }, cors, [
  console.log,
  post('/createCampaign', createCampaign)
]);
