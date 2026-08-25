import { body, validationResult } from "express-validator";

export const signupValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isAlpha()
    .withMessage("Name contains invalid characters")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isStrongPassword()
    .withMessage("Enter a strong password")
    .escape(),
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail()
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .escape(),
];

export const carValidation = [
  body("brand")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isAlpha()
    .withMessage("Brand contains invalid characters")
    .escape(),
  body("model")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isAlphanumeric()
    .withMessage("Model contains invalid characters")
    .escape(),
  body("cc")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isAlphanumeric()
    .withMessage("Cc contains invalid characters"),
  body("year")
    .trim()
    .notEmpty()
    .withMessage("All fields are required")
    .isNumeric()
    .withMessage("Year must be numerics only")
    .escape(),
];

export const validation = (req, res, next) => {
  try {
    const results = validationResult(req);
    if (!results.isEmpty())
      return res.status(400).json(results.array().map((err) => err.msg));

    next();
  } catch (error) {
    console.log("Error in validation middleware: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
