/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("date_period").del();

  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(2022, 7, 25 + i));
  }

  for (const date of dates) {
    await knex("date_period").insert([
      { date: date, period: 1 },
      { date: date, period: 2 },
      { date: date, period: 3 },
      { date: date, period: 4 },
    ]);
  }
};
