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

const products = await db.collection("products").insertMany([
  {name:"Columéia Peixinho", image:"https://http2.mlstatic.com/D_NQ_NP_986427-MLB27617620809_062018-O.webp", price:21.90, category:"suculenta", info:"Facilmente cultivada em ambientes internos pois prefere locais de meia-sombra ou luz difusa"},
  {name:"Jade Chinês", image:"https://i.pinimg.com/originals/b6/4c/69/b64c69c15e01681f056b3969cc306c71.jpg", price:25.00, category:"suculenta", info:"Prefere locais com bastante luminosidade, podendo deixa-la exposta ao sol por algumas horas do dia"},
  {name:"Pata de urso", image:"https://www.orquidario4e.com.br/Content/images/product/00018256_1_m_d_00.jpg", price:14.90, category:"suculenta", info:"Gosta de clima subtropical ou tropical e prefere ser cultivada em locais de meia sombra com bastante luminosidade"},
  {name:"Muda de Ipê Amarelo", image:"https://static3.tcdn.com.br/img/img_prod/350075/muda_de_ipe_amarelo_feita_de_semente_10793_1_20220412114304.jpg", price:49.90, category:"paisagismo", info:"A espécie prefere solos úmidos, com drenagem lenta, ela se desenvolve melhor em locais onde a temperatura média anual varia de 14°C a 23°C"},
  {name:"Abacaxi Roxo", image:"https://cf.shopee.com.br/file/34031a13782e8b929662e2705222a5d4", price:26.00, category:"paisagismo", info:"Suporta vários tipos de exposição a luz, mas prefere sombra parcial; é importante manter o solo úmido, mas nunca encharcado"},
  {name:"Muda de Ipê Rosa", image:"https://http2.mlstatic.com/D_NQ_NP_778128-MLB46016634797_052021-O.jpg", price:48.00, category:"paisagismo", info:"Floresce abundantemente de junho a agosto, e prefere climas mais quentes"},
  {name:"Muda de Eucalipto Arco-Íris", image:"https://static3.tcdn.com.br/img/img_prod/350075/muda_de_eucalipto_arco_iris_feita_de_semente_fc_15033_1_d0fc086e243950a207df24c4d4a3c083_20220412114305.jpg", price:26.00, category:"paisagismo", info:"No seu habitat pode atingir 75 metros de altura, mas em cultivo geralmente permanece entre 20 a 30 metros de altura"}
]);
console.log(products);

app.listen(process.env.PORT, () => {
  console.log("Servidor em pé na porta", process.env.PORT);
});
