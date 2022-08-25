/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("teacher_availability", (table) => {
    table.increments("id").primary();
    table.integer("teacher_id").references("id").inTable("teachers");
    table.boolean("isAvailable");
    table.integer("date_period_id").references("id").inTable("date_period");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("teacher_availability");
};
