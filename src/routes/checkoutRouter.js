import express from "express";
import { createOrder } from "../controllers/checkoutController.js";
// import { validateToken } from "./../middlewares/authMiddlewares.js";

const checkoutRouter = express.Router();

// checkoutRouter.use(validateToken);
checkoutRouter.post("/checkout", createOrder);

export default checkoutRouter;
