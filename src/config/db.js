import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
try {
  // const mongoClient = new MongoClient(process.env.MONGO_URI);
  const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
  await mongoClient.connect();
  db = mongoClient.db("drivenplant");
} catch (error) {
  res.status(500).send(error);
}

export default db;
