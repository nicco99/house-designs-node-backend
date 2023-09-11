/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("images").del();
  await knex("images").insert([
    {
      src: "https://www.inuua.net/_next/image?url=%2Fimages%2Ftmp%2FplanImages%2F3152_Front.jpg.webp&w=1920&q=50",
    },
    {
      src: "https://www.inuua.net/_next/image?url=%2Fimages%2Ftmp%2FplanImages%2F3152_Front.jpg.webp&w=1920&q=50",
    },

    {
      src: "https://www.inuua.net/_next/image?url=%2Fimages%2Ftmp%2FplanImages%2F3152_Back.jpg.webp&w=1920&q=50",
    },

    {
      src: "https://www.inuua.net/_next/image?url=%2Fimages%2Ftmp%2FplanImages%2F3152_Interior.jpg.webp&w=1920&q=50",
    },
  ]);
};
