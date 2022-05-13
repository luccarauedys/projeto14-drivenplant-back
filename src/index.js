import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js";

const app = express().use(cors()).use(express.json());

app.use(authRouter);
app.use(productsRouter);
app.use(cartRouter);
app.use(checkoutRouter);

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});

const port = process.env.PORT || 5000;
app.listen(port);
