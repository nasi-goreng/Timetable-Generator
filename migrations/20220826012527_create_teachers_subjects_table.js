/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
  return knex.schema.createTable("teachers_subjects", (table) => {
    table.integer("teacher_id").references("id").inTable("teachers");
    table.integer("subject_id").references("id").inTable("subjects");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("teachers_subjects");
};
