const router = require("express").Router({ mergeParams: true });
const controller = require("./designs.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);
router
  .route("/:designId")
  .get(controller.read)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
