import { createCampaign, fetchCampaigns } from "./campaign";
import 'reflect-metadata';

// Include it and extract some methods for convenience
const server = require('server');
const { get, post } = server.router;

// public port
server({ port: 8090 }, [
  get('/campaigns', fetchCampaigns)
]);

// private port
server({ port: 8091 }, [
  post('/campaign', createCampaign),
]);