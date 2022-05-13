import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

export const addCart = async (req, res) => {
  const product = req.body;
  const { user } = req.headers;

  try {
    const users = db.collection("users");
    const client = await users.findOne({ email: user });

    if (!client) {
      res.sendStatus(404);
      return;
    };

    await users.updateOne(
      { _id: client._id }, { $push: { cart: product } }
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const openCart = async (req, res) => {
  const { user } = req.headers;

  try {
    const users = db.collection("users");
    const client = await users.findOne({ email: user });
    const { cart } = client;

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};