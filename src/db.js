const { JsonDB, Config } = require('node-json-db');

const db = new JsonDB(new Config("cocktailDatabase", true, false, '/'));

module.exports = db;
