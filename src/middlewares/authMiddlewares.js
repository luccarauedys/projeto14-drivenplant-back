import db from "./../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.status(401).send({ message: "Token is missing" });

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.status(401).send({ message: "Invalid Token" });
    res.locals.session = { email, token };
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
