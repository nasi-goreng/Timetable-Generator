/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("subjects").del();
  await knex("subjects").insert([
    { subject: "Japanese" },
    { subject: "Math" },
    { subject: "Science" },
    { subject: "Social Studies" },
    { subject: "English" },
  ]);
};
