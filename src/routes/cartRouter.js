import express from "express";

import { addCart, openCart } from "./../controllers/cartController.js";

import { validateToken } from "./../middlewares/authMiddlewares.js";

const cartRouter = express.Router();

// cartRouter.use(validateToken);

cartRouter.put("/cart", addCart);
cartRouter.get("/cart", validateToken, openCart);

export default cartRouter;
