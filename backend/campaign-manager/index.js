const server = require("server");
const { get, post } = server.router;
const { header } = server.reply;
const { createDB } = require("../models/db");

console.log("Running campaign-manager")

const cors = [
    () => header("Access-Control-Allow-Origin", "*"),
    () => header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    () => header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, HEAD"),
    (ctx) => ctx.method.toLowerCase() === 'options' ? 200 : false
];

createDB();

// public port
server({ port: 8070 }, cors, [
    console.log,
    get('/campaigns', fetchCampaigns)
]);

// private port
server({ security: {csrf: false}, port: 8090 }, cors, [
    console.log,
    post('/campaign', createCampaign),
]);
