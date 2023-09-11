/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('design_features').del()
  await knex('design_features').insert([
    {
      design_id: 1,
      feature_id: 1,
  }
  ]);
};
