import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import db from "./../config/db.js";

const signUpSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.min(6).required(),
  password_confirmation: Joi.ref("password").with(
    "password_confirmation",
    "password"
  ),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.min(6).required(),
});

export const validateSignUpSchema = (req, res, next) => {
  const user = req.body;
  const { error } = signUpSchema.validate(user, { abortEarly: false });
  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }
  res.locals.user = user;
  next();
};

export const validateSignInSchema = (req, res, next) => {
  const user = req.body;
  const { error } = signInSchema.validate(user, { abortEarly: false });
  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }
  res.locals.user = user;
  next();
};

export const validateIfUserAlreadyExists = async (req, res, next) => {
  const users = db.collection("users");
  const { email } = res.locals.user;
  const userAlreadyExists = await users.findOne({ email });
  if (userAlreadyExists) {
    return res.status(409).send({ message: "User already exists" });
  }
  next();
};

export const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.status(401).send({ message: "Token is missing" });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).send({ message: "Invalid Token" });
  }
};
