import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

//Ao clicar em fechar pedido é enviado um objeto com a requisição
export const createOrder = async (req,res) => {
    const {order} = req.body;

    try {
        await db.collection("orders").insertOne(order);
        res.sendStatus(201);
    } catch(error){
        res.status(500).send(error);
    }
};

