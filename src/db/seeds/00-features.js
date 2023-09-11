/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("features").del();
  await knex("features").insert([
    {
      name: "Kitchen with Pantry",
    },
    {
      name: "Master bathroom Bathtub",
    },
    {
      name: "Entry poches",
    },
  ]);
};
