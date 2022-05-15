import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

export const addCart = async (req, res) => {
  const product = req.body;
  const { session } = res.locals;

  try {
    const client = await db
      .collection("users")
      .findOne({ email: session.email });

    if (!client) return res.sendStatus(404);

    await db
      .collection("users")
      .updateOne({ _id: client._id }, { $push: { cart: product } });

    res.status(200).send(client.cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const openCart = async (req, res) => {
  const { session } = res.locals;
  try {
    const client = await db
      .collection("users")
      .findOne({ email: session.email });

    res.status(200).send(client.cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
