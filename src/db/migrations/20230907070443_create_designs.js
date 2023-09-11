/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("designs", (table) => {
    table.increments("design_id").primary();
    table.string("no_of_bathrooms");
    table.string("no_of_bedrooms");
    table.string("county");
    table.string("neighbourhood");
    table.string("location");
    table.string("property_size");
    table.string("property_type");
    table.string("duration");
    table.string("property_name");
    table.string("price_per_sqm");
    table.string("total_price");
    table.string("class_of_finishes");
    table.string("status");
    table.string("plinth_area");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("designs");
};
