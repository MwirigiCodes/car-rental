import express from "express";
import {
  signup,
  login,
  logout,
  refresh,
} from "../controllers/auth.controller.js";

import {
  loginValidation,
  signupValidation,
  validation,
} from "../middleware/validation.js";

const router = express.Router();

router.post("/signup", signupValidation, validation, signup);
router.post("/login", loginValidation, validation, login);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;
