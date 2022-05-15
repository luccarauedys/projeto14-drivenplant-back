import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

export const getProducts = async (req, res) => {
  const category = req.query.category || null;
  try {
    const allProducts = await db.collection("products").find().toArray();
    if (!category) return res.status(200).send(allProducts);
    const productsOfCategory = products.filter(
      (product) => product.category === category
    );
    res.status(200).send(productsOfCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

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
