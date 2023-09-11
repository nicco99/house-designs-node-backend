const bcrypt = require("bcrypt");
const adminService = require("./admin.service");
const hasProperties = require("../errors/hasProperties");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "email",
  "p_number",
  "pasword",
];
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "email",
  "p_number",
  "pasword"
);
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

async function adminExists(req, res, next) {
  const admin = await adminService.read(req.params.adminId);

  if (admin) {
    res.locals.admin = admin;
    return next();
  }
  next({ status: 404, message: "Admin not found" });
}

async function create(req, res, next) {
  const { pasword, ...userData } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(pasword, 10);

    // Create the user with the hashed password
    const user = {
      ...userData,
      pasword: hashedPassword,
    };

    // Call the service to create the user
    const createdUser = await adminService.create(user);

    res.status(201).json({ data: createdUser });
  } catch (error) {
    next(error);
  }
}

async function read(req, res, next) {
  const { admin } = res.locals;
  res.json({ data: admin });
}

async function list(req, res) {
  const data = await adminService.list();
  res.json({ data });
}
async function update(req, res, next) {
  const updateAdmin = {
    ...req.body,
    id: res.locals.admin.id,
  };
  const admin = await adminService.update(updateAdmin);
  res.json({ data: admin });
}
async function destroy(req, res, next) {
  const { admin } = res.locals;
  await adminService.destroy(admin.id);
  res.sendStatus(204);
}

module.exports = {
  create: [hasRequiredProperties, create],
  list: [asyncErrorBoundary(list)],
  read: [hasOnlyValidProperties, asyncErrorBoundary(adminExists), read],
  update: [
    asyncErrorBoundary(adminExists),
    hasOnlyValidProperties,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(adminExists), asyncErrorBoundary(destroy)],
};
