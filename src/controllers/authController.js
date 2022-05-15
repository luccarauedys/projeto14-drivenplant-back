import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

export const signUp = async (req, res) => {
  const { name, email, password } = res.locals.user;
  try {
    const passwordHash = bcrypt.hashSync(password, 10);
    await db.collection("users").insertOne({
      name,
      email,
      password: passwordHash,
      cart: [],
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = res.locals.login;
  try {
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      const session = { email, token };
      await db.collection("sessions").insertOne(session);
      return res.status(200).send({ token });
    }
    return user
      ? res.status(401).send("Invalid email or password.")
      : res.status(404).send("User does not exist.");
  } catch (error) {
    res.status(500).send(error);
  }
};
