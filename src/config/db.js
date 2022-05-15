import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  await mongoClient.connect();
  db = mongoClient.db("drivenplant");
} catch (error) {
  res.status(500).send(error);
}

export default db;
