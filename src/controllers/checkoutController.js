import db from "./../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const deleteItem = async (req, res) => {
  const {id}  = req.body;
  const { authorization } = req.headers;

  try {
    await db
      .collection("users")
      .updateOne({ email: authorization }, { $pull: { cart: { id } } });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createOrder = async (req, res) => {
  const order = req.body;

  try {
    const {cart} = await db.collection("orders").insertOne(order);
    res.status(201).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
