/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("admins", function (table) {
      table.increments("id");
      table.string("first_name", 255).notNullable();
      table.string("last_name", 255).notNullable();
      table.string("email", 255).unique().notNullable();
      table.string("p_number", 255).notNullable();
      table.string("pasword", 255).unique().notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("admins");
  };