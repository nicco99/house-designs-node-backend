/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("design_images", (table) => {
    table.integer("design_id").unsigned().notNullable();
    table
      .foreign("design_id")
      .references("design_id")
      .inTable("designs")
      .onDelete("CASCADE");
    table.integer("image_id").unsigned().notNullable();
    table
      .foreign("image_id")
      .references("image_id")
      .inTable("images")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("design_images");
};
