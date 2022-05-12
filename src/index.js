import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "./config/db.js";
import authRouter from "./routes/authRouter.js";

const app = express().use(cors()).use(express.json());

app.use(authRouter);

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});

const port = process.env.PORT || 5000;
app.listen(port);
