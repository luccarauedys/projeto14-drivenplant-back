import express from "express";

import { 
  signUp, 
  signIn, 
  getProducts,
  openProduct, 
  addCart,
  openCart
} from "./../controllers/authController.js";

import {
  validateSignUpSchema,
  validateSignInSchema,
  validateIfUserAlreadyExists,
  validateToken,
} from "./../middlewares/authMiddlewares.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateSignUpSchema,
  validateIfUserAlreadyExists,
  signUp
);

authRouter.post("/signin", validateSignInSchema, signIn);

authRouter.get("/products", getProducts);

authRouter.get("/product", openProduct);

authRouter.post("/cart", validateToken, addCart);

authRouter.get("/cart", validateToken, openCart)

export default authRouter;
