/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("students_subjects", (table) => {
    table.integer("student_id").references("id").inTable("students");
    table.integer("subject_id").references("id").inTable("subjects");
    table.integer("num");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("students_subjects");
};
