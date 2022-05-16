import db from "./../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const chaveSecreta = process.env.JWT_SECRET;
    
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) return res.status(401).send({ message: "Token is missing" });
  try {
    const session = await jwt.verify(token, chaveSecreta);

    if (!session) return res.status(401).send({ message: "Invalid Token" });
    const {email} = session;
    res.locals.session = { email };
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};
