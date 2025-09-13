import { body, validationResult } from "express-validator";
import { handleError } from "../helpers/handleError.js";

export const validateRegistration = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(handleError(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validateLogin = [
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(handleError(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validateBlogCreate = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters"),
  body("content")
    .trim()
    .isLength({ min: 50 })
    .withMessage("Content must be at least 50 characters"),
  body("category").notEmpty().withMessage("Category is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(handleError(400, errors.array()[0].msg));
    }
    next();
  },
];

export const validateCommentCreate = [
  body("content")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Comment must be at least 2 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(handleError(400, errors.array()[0].msg));
    }
    next();
  },
];
