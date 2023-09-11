const knex = require("../db/fixtures/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function create(req, res, next) {
  const { pasword, email } = req.body;

  try {
    const admin = await knex("admins")
      .select("*")
      .where({ email: email })
      .first();

    if (admin) {
      const isPasswordMatch = await bcrypt.compare(pasword, admin.pasword);
      if (isPasswordMatch) {
        // Passwords match
        const token = jwt.sign({ id: admin.id }, "3ecret", {
          expiresIn: "1h", // Set token expiration time
        });
        res.json({ token: token, admin: admin });
      } else {
        // Passwords do not match
        res.status(401).json({ message: "Invalid password" });
      }
    } else {
      // Landlord not found
      res.status(404).json({ message: "Email invalid" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create: [create],
};
