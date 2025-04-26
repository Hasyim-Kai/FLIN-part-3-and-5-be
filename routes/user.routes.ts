const router = require("express").Router();
import user from "../controllers/user.controller";
import auth from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth";
import { createValidationFor, checkValidationResult } from "../middlewares/validator";

router.get("/", authenticate, user.getAll)
  .post("/", authenticate, createValidationFor('register'), checkValidationResult, auth.signUp)


export = router;