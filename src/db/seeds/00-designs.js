/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("designs").del();
  
  await knex("designs").insert([
    {
      no_of_bathrooms: 2,
      no_of_bedrooms: 3,
      duration: "3 months",
      county: "Nairobi",
      neighbourhood: "dc",
      location: "Ngong rd",
      property_size: "50000 sq ft",
      property_type: "Bungalow",
      property_name: "3 Bedroom",
      price_per_sqm: 150,
      total_price: 3000000,
      class_of_finishes: "High-end",
      status: "completed",
      plinth_area: 160,
    },
  ]);
};
