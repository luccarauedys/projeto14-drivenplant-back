import express from "express";
import { signUp, signIn } from "./../controllers/authController.js";
import {
  validateSignUpSchema,
  validateSignInSchema,
} from "./../middlewares/schemasMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignUpSchema, signUp);
authRouter.post("/signin", validateSignInSchema, signIn);

export default authRouter;
