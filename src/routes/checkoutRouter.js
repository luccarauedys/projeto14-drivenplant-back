import express from "express";

import { createOrder } from "../controllers/checkoutController";

const checkoutRouter = express.Router();

checkoutRouter.post("/checkout", createOrder);

export default checkoutRouter;