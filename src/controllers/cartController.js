import db from "./../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const addCart = async (req, res) => {
  const { product, email } = req.body;
  // const { email } = res.locals.session;

  try {
    await db
      .collection("users")
      .updateOne({ email }, { $push: { cart: product } });

    const { cart } = await db.collection("users").findOne({ email });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const openCart = async (req, res) => {
  // const { email } = res.locals.session;
  const {authorization} = req.headers;

  try {
    const {cart} = await db.collection("users").findOne({ email:authorization });
    console.log(cart);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
