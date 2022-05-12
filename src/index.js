import express from "express";
import { MongoClient } from 'mongodb';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express().use(cors()).use(express.json());
let db = null;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  await mongoClient.connect();
  db = mongoClient.db("drivenPlant");
  console.log("Seu DB está funcionando! YAY");
} catch (error) {
  res.status(500).send("Não foi possível conectar ao DB");
}    

app.get('/home', (req, res) => {
  db.collection("products").find({}).toArray().then(products => res.send(products));
});

app.get('/product', async (req,res) => {
  const {id} = req.query;

  try{
    const products = db.collection("products");
    const product = await products.findOne({id: id});
    if(!product){
      res.sendStatus(404)
      return;
    }
    res.sendStatus(200);
  } catch (error){
    res.sendStatus(500);
  }
})

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});
