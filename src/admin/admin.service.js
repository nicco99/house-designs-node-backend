const db = require("../db/dbConnection.js");
const mapProperties = require("../utils/map-properties");
function list() {
  return "list of admins"
}

function create(admins) {
  return 'create an admin'
}

function update(updatedAdmin) {
  return "Update an admin"
}

function destroy(adminId) {
  return "Delete an admin"
}

function read(adminId) {
  return 'read an admin'
}

module.exports = {
  list,
  read,
  update,
  create,
  destroy,
};
