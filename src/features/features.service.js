const db = require("../db/dbConnection");

function list() {
  return "Hello World!"
}
function read(featureId) {
  return knex("features").select("*").where({ feature_id: featureId }).first();
}

module.exports = {
  list,
  read,

};
