import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/authRouter.js";

const app = express().use(cors()).use(express.json());

app.use(authRouter);

app.get("/home", (req, res) => {
  db.collection("products")
    .find({})
    .toArray()
    .then((products) => res.send(products));
});

app.get("/product", async (req, res) => {
  const { id } = req.query;

  try {
    const products = db.collection("products");
    const product = await products.findOne({ id: id });
    if (!product) {
      res.sendStatus(404);
      return;
    }
    console.log(product, "CADE");
    res.status(200).send(product);
  } catch (error) {
    res.sendStatus(500);
  }
});

const port = process.env.PORT || 5000;
app.listen(port);
