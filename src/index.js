import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express().use(cors()).use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});
