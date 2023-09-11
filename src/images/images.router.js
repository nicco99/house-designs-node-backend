const router = require("express").Router({ mergeParams: true });
const controller = require("./images.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:imageId").get(controller.read).all(methodNotAllowed);

module.exports = router;
