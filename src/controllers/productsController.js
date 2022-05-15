import db from "./../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const getProducts = async (req, res) => {
  const { category } = req.query || null;
  try {
    const allProducts = await db.collection("products").find().toArray();
    if (!category) return res.status(200).send(allProducts);

    const productsOfCategory = allProducts.filter(
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
    const product = await db.collection("products").findOne({ id });
    if (!product) return res.status(404).send("Product not found");
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};
