import express from "express";
import { validateToken } from "./../middlewares/authMiddlewares.js";
import { createOrder } from "../controllers/checkoutController.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/checkout", validateToken, createOrder);

export default checkoutRouter;