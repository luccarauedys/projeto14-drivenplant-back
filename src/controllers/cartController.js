import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

export const addCart = async (req, res) => {
  const product = req.body;
  const { email } = res.locals.session;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.sendStatus(404);

    await db
      .collection("users")
      .updateOne({ _id: user._id }, { $push: { cart: product } });

    const { cart } = user;
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const openCart = async (req, res) => {
  const { email } = res.locals.session;
  try {
    const { cart } = await db.collection("users").findOne({ email });
    if (!cart) return res.sendStatus(404);
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
