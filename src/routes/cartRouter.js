import express from "express";
import { addCart, openCart } from "./../controllers/cartController.js";
import { validateToken } from "./../middlewares/authMiddlewares.js";

const cartRouter = express.Router();

cartRouter.put("/cart", validateToken, addCart);
cartRouter.get("/cart", validateToken, openCart);

export default cartRouter;
