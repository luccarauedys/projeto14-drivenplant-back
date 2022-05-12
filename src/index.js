import express from "express";
import { MongoClient } from 'mongodb';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express().use(cors()).use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db = null;
const promise = mongoClient.connect();
promise.then(() => {
    db = mongoClient.db("drivenPlant");
    console.log("Seu DB está funcionando! YAY");
});

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});
