import express from "express";

import { signUp, signIn } from "./../controllers/authController.js";

import {
  validateSignUpSchema,
  validateSignInSchema,
  validateIfUserAlreadyExists,
} from "./../middlewares/authMiddlewares.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateSignUpSchema,
  validateIfUserAlreadyExists,
  signUp
);

authRouter.post("/signin", validateSignInSchema, signIn);

export default authRouter;
