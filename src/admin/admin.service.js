const knex = require("../db/fixtures/connection");
const mapProperties = require("../utils/map-properties");
function list() {
  return knex("admins").select(
    "id",
    "first_name",
    "last_name",
    "email",
    "p_number"
  );
}

function create(admins) {
  return knex("admins")
    .insert(admins)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedAdmin) {
  return knex("admins")
    .where({ id: updatedAdmin.id })
    .update(updatedAdmin, "*");
}

function destroy(adminId) {
  return knex("admins").where({ id: adminId }).del();
}

function read(adminId) {
  return knex("admins").select("*").where({ id: adminId }).first();
}

module.exports = {
  list,
  read,
  update,
  create,
  destroy,
};
