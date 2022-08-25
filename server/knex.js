const knex = require("knex");
require("dotenv").config({
  path: "./.env.local",
});

const db = knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:5432/schedule`,
  searchPath: "public",
});

module.exports = db;