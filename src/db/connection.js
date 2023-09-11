const env =  "development";
const pEnv = "production"
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

module.exports = knex;