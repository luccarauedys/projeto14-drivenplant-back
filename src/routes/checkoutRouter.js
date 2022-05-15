import express from "express";
import { createOrder } from "../controllers/checkoutController.js";
import { validateToken } from "./../middlewares/authMiddlewares.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/checkout", validateToken, createOrder);

export default checkoutRouter;
