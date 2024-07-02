import { Router } from 'express';

const router = Router({ mergeParams: true });

import controller from "./auth.controller.js"

import methodNotAllowed  from "../errors/methodNotAllowed.js"

router.route("/").post(controller.create).all(methodNotAllowed);

export default router
