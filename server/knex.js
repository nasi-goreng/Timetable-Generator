// original working code

const knex = require("knex");
require("dotenv").config({
  path: "./.env.local",
});

const db = knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@127.0.0.1:5432/schedule2`,
  searchPath: "public",
});

module.exports = db;

// from sprint knex
// const config = require("../knexfile");
// const knex = require("knex")(config);

// module.exports = knex;

// changed knex to db from above code 
// const config = require("../knexfile");
// const db = require("knex")(config);

// module.exports = db;