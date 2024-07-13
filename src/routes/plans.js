import { Router } from 'express';

import { list,create,read,destroy } from "../controllers/plans.js"
import methodNotAllowed from "../errors/methodNotAllowed.js"

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(list)
  .post(create)
  .all(methodNotAllowed);
router
  .route("/:planId")
  .get(read)
  .delete(destroy)
  .all(methodNotAllowed);

export default router;