import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

export const validateSignUpSchema = (req, res, next) => {
  const user = req.body;

  const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
  });

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }

  res.locals.user = user;
  next();
};

export const validateSignInSchema = (req, res, next) => {
  const user = req.body;

  const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.required(),
  });

  const { error } = signInSchema.validate(user, { abortEarly: false });

  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }

  res.locals.user = user;
  next();
};

export const validateIfUserAlreadyExists = async (req, res, next) => {
  const { email } = res.locals.user;

  const userAlreadyExists = await db.collection("users").findOne({ email });

  if (userAlreadyExists) {
    return res.status(409).send({ message: "User already exists" });
  }

  next();
};

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer","").trim();

  if (!token) return res.status(401).send({ message: "Token is missing" });

  try {
    const session = jwt.verify(token, process.env.JWT_SECRET);

    const sessionExists = await db.collection("sessions").findOne({email: session.email});
    if (!sessionExists)
      return res.status(401).send({ message: "Invalid Token" });

    next();
  } catch {
    res.status(401).send({ message: "Invalid Token" });
  }
};
