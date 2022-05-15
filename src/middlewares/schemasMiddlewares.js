import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

export const validateSignUpSchema = (req, res, next) => {
  const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
  });

  const user = req.body;
  const { error } = signUpSchema.validate(user, { abortEarly: false });
  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }

  res.locals.signup = user;
  next();
};

export const validateSignInSchema = (req, res, next) => {
  const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.required(),
  });

  const user = req.body;
  const { error } = signInSchema.validate(user, { abortEarly: false });
  if (error) {
    return res.status(400).send(error.details.map((err) => err.message));
  }

  res.locals.signin = user;
  next();
};
