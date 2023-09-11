/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("design_features", (table) => {
    table.integer("design_id").unsigned().notNullable();
    table
      .foreign("design_id")
      .references("design_id")
      .inTable("designs")
      .onDelete("CASCADE");
    table.integer("feature_id").unsigned().notNullable();
    table
      .foreign("feature_id")
      .references("feature_id")
      .inTable("features")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("design_features");
};
