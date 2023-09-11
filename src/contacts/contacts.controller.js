const contactsService = require("./contacts.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res) {
  const data = await contactsService.create(req.body);
  res.status(201).json({ data });
}

module.exports = {
  create: [asyncErrorBoundary(create)],
};
