import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

export const getProducts = async (req, res) => {
    db.collection("products")
      .find({})
      .toArray()
      .then((products) => res.send(products));
  }
  
  export const openProduct = async (req, res) => {
    const { id } = req.query;
  
    try {
      const products = db.collection("products");
      const product = await products.findOne({ id });
      if (!product) {
        res.status(404).send("Product not found");
        return;
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  };