import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routes/authRouter.js";

const app = express().use(cors()).use(express.json());

app.use(authRouter);

app.get("/home", (req, res) => {
  db.collection("products")
    .find({})
    .toArray()
    .then((products) => res.send(products));
});

app.get("/product", async (req, res) => {
  const { id } = req.query;

  try {
    const products = db.collection("products");
    const product = await products.findOne({ id: id });
    if (!product) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(product);
  } catch (error) {
    res.sendStatus(500);
  }
});

//Quando clicar em "adicionar ao carrinho"
app.post('/cart', async (req,res) => {
  const {id} = req.query;
  const { user } = req.headers;
  //verificar se o usuário está logado
  // try{
  //   const products = db.collection("products");
  //   const product = await products.findOne({id: id});

  //   const users = db.collection("users");
  //   const userCart = users.updateOne(
  //     {id:id}, {$set: {cart: [...cart, product]}}
  //   );
  // }catch (error){
  //   res.sendStatus(500);
  // }
});

app.get('/cart', (req,res) => {
  const { user } = req.headers;
  //verificar se o usuário está logado
  // try{
  //     const users = db.collection("users");
  //     const client = await users.findOne({name: user});
  //     const {cart} = client;
  //     console.log("VER O CARRINHO", cart)
  //     res.status(200).send(cart);
  // }catch (error){
  //   res.sendStatus(500);
  // }
});

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});

const port = process.env.PORT || 5000;
app.listen(port);
