require("dotenv").config();

const path = require("path");

const { DATABASE_URL } = process.env;
module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL || "postgres://fnhcvyqd:6VqR20wMSsBQdEhCMfwN8TA4_8ogV3kJ@bubble.db.elephantsql.com/fnhcvyqd",
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },
};
