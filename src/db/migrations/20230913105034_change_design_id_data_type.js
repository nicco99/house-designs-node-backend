/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('images', function (table) {
      // Change the data type of the "design_id" column to integer
      table.integer('design_id').alter();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('images', function (table) {
      // If needed, you can define a rollback action here
      // For example, change the data type back to its original type
      table.string('design_id').alter();
    });
  };
  
