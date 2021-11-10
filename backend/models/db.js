require("reflect-metadata");
const { createConnection } = require("typeorm")
const { Campaign }= require('./campaign');

const createDB = () => createConnection({
    type: "sqlite",
    database: "../themis.db",
    entities: [
        Campaign
    ],
    synchronize: true,
    logging: false
});

module.exports = {createDB};