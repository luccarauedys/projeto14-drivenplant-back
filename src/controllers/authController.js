import db from "./../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  const { name, email, password } = res.locals.signup;
  try {
    const userAlreadyExists = await db.collection("users").findOne({ email });
    if (userAlreadyExists)
      return res.status(409).send({ message: "User already exists" });

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({
      name,
      email,
      password: passwordHash,
      cart: [],
      wishlist: [],
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = res.locals.signin;
  const chaveSecreta = process.env.JWT_SECRET;

  try {
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const session = { email, userId: user._id };
      const setting = { expiresIn: 60*60*2} 
      const token = jwt.sign(session, chaveSecreta, setting);
      return res.status(200).send({ email, token });
    }

    return user
      ? res.status(401).send("Invalid email or password.")
      : res.status(404).send("User does not exist.");
  } catch (error) {
    res.status(500).send(error);
  }
};

