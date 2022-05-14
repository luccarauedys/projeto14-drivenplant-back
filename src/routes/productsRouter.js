import express from "express";

import { getProducts, openProduct } from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.get("/products", getProducts);

productsRouter.get("/product", openProduct);

export default productsRouter;
