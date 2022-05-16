import db from "./../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const createOrder = async (req, res) => {
  const order  = req.body;

  try {
    await db.collection("orders").insertOne(order);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};
