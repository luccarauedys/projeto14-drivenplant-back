import express from "express";
import { createOrder, deleteItem } from "../controllers/checkoutController.js";
import { validateToken } from "./../middlewares/authMiddlewares.js";

const checkoutRouter = express.Router();

checkoutRouter.use(validateToken);
checkoutRouter.post("/checkout", createOrder);

checkoutRouter.put("/checkout", deleteItem);

export default checkoutRouter;
