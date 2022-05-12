import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      wishlist: [],
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = res.locals.user;

  try {
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const session = { email, userId: user._id };
      await db.collection("sessions").insertOne(session);

      const token = jwt.sign(session, process.env.JWT_SECRET);

      return res.status(200).send({ token });
    }

    return user
      ? res.status(401).send("Invalid email or password.")
      : res.status(404).send("User does not exist.");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProducts = async (req,res) => {
  db.collection("products")
  .find({})
  .toArray()
  .then((products) => res.send(products));
}

export const openProduct = async (req,res) => {
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

export const addCart = async (req,res) => {
  const {id} = req.body;

  try{
    const products = db.collection("products");
    const product = await products.findOne({id});

    const users = db.collection("users");
    users.updateOne(
      {_id: session.userId }, {$set: {cart: [...cart, product]}}
    );
  }catch (error){
    res.status(500).send(error);
  }
};

export const openCart = async (req,res) => {
  try{
    const session = db.collection("sessions");
    const user = await session.findOne({token}); //Não consegui testar. Sempre fala q o token é inválido, mesmo copiando do que foi enviado em "res.send()"

    const users = db.collection("users");
    const client = await users.findOne({email:user.email});
    const {cart} = client;

    res.status(200).send(cart);
  }catch (error){
    res.status(500).send(error);
  }
}