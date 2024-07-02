import { Router } from 'express';

import { list,create,read,destroy,update } from "../controllers/categories.js"
import methodNotAllowed from "../errors/methodNotAllowed.js"

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(list)
  .post(create)
  .all(methodNotAllowed);
router
  .route("/:categoryId")
  .get(read)
  .patch(update)
  .delete(destroy)
  .all(methodNotAllowed);

export default router;