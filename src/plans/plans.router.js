const router = require("express").Router({ mergeParams: true });
const controller = require("./plans.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);
router
  .route("/:planId")
  .get(controller.read)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
