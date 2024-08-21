import sqlite3 from 'sqlite3';

// Enable verbose mode
const sqlite3Verbose = sqlite3.verbose();

// Create a new SQLite database
const db = new sqlite3Verbose.Database('./database.db');

// Create tables
db.serialize(() => {
  // Create 'plans' table
  db.run(`CREATE TABLE IF NOT EXISTS plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_name TEXT NOT NULL,
    plan_size INTEGER,
    no_of_bedrooms INTEGER,
    no_of_bathrooms INTEGER,
    category_id INTEGER,
    floors INTEGER,
    plinth_area INTEGER,
    price_per_sqm INTEGER,
    price INTEGER,
    plan_length INTEGER,
    plan_height INTEGER,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`);

  // Create 'categories' table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
  )`);

  // Create 'features' table
  db.run(`CREATE TABLE IF NOT EXISTS features (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL
  )`);

  // Create 'images' table
  db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_path TEXT NOT NULL,
    image_name TEXT NOT NULL,
    plan_id INTEGER,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
  )`);

  // Create 'planfeatures' table
 // Create 'planfeatures' table (join table)
db.run(`CREATE TABLE IF NOT EXISTS planfeatures (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  plan_id INTEGER,
  feature_id INTEGER,
  FOREIGN KEY (plan_id) REFERENCES plans(id),
  FOREIGN KEY (feature_id) REFERENCES features(id)
)`);
});

export default db





// import dotenv from "dotenv"
// import mysql from "mysql2"

// dotenv.config();

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Nicco@6612",
//   database: "blif_investments_db",
// }); 
// const db = mysql.createConnection({
// host: "13.37.100.57",
// user: "Nicco99", 
// password: "Nicco@6612",
// database: "blif_investments_db",
// });

// export default db