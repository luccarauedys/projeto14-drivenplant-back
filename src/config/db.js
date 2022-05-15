import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  await mongoClient.connect();
  db = mongoClient.db("drivenPlant");
} catch (error) {
  console.log(error);
}

export default db;
