const dotenv = require("dotenv")
dotenv.config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nicco@6612",
  database: "blif_investments_db",
}); 
// const db = mysql.createConnection({
// host: "13.37.100.57",
// user: "Nicco99",
// password: "Nicco@6612",
// database: "INKWAVEDB",
// });

module.exports =  {db} ;