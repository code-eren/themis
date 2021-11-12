import { createCampaign, fetchCampaigns } from './campaign';
import 'reflect-metadata';
import { createDB } from './db';

// Include it and extract some methods for convenience
const server = require('server');
const { get, post } = server.router;

const { header } = server.reply; // OR server.reply;

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

createDB();

// public port
server({ port: 8070 }, cors, [console.log, get('/campaigns', fetchCampaigns)]);

// private port
server({ security: { csrf: false }, port: 8090 }, cors, [
  post('/campaign', createCampaign)
]);
