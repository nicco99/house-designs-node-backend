const db = require("../db/dbConnection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//            :::ADMIN LOGIN LOGIC                     //

async function create(req, res, next) {
  const { pasword, email } = req.body;

  try {
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create: [create],
};
