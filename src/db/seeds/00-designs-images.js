/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("design_images").del();
  await knex("design_images").insert([
    {
      design_id: 1,
      image_id: 1,
    },
    {
      design_id: 1,
      image_id: 2,
    },
    {
      design_id: 1,
      image_id: 3,
    },
  ]);
};
