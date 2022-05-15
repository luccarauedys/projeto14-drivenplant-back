import db from "./../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
<<<<<<< HEAD
  const { name, email, password } = res.locals.user;

=======
  const { name, email, password } = res.locals.signup;
>>>>>>> 4cfb496bb9026f0d5e86e797f0b0ebe002e82e14
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
<<<<<<< HEAD
  const { email, password } = res.locals.loginInfos;

=======
  const { email, password } = res.locals.signin;
>>>>>>> 4cfb496bb9026f0d5e86e797f0b0ebe002e82e14
  try {
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const session = { email, userId: user._id };
      await db.collection("sessions").insertOne(session);
<<<<<<< HEAD
      const token = jwt.sign(session, process.env.JWT_SECRET);
      return res.status(200).send({ token });
=======
      return res.status(200).send({ email, token });
>>>>>>> 4cfb496bb9026f0d5e86e797f0b0ebe002e82e14
    }

    return user
      ? res.status(401).send("Invalid email or password.")
      : res.status(404).send("User does not exist.");
  } catch (error) {
    res.status(500).send(error);
  }
};