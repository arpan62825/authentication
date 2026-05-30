import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      throw new Error("All the fields are required");
    }

    const doesUserExists = await User.findOne({ email });
    if (doesUserExists) {
      res.status(400).json({ message: "The user already exists" });
    }
    const hashedPassword = bcrypt.hash(password, 12);
    const verificationToken = Math.floor(Math.random() * 10000000);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookies(res, user._id)
  } catch (error) {
    res
      .status(400)
      .json({ message: `An error occurred while fetching the user: ${error}` });
  }
};

export const login = async (req, res) => {
  res.send("login route should work in postman");
};

export const logout = async (req, res) => {
  res.send("logout route should work in postman");
};
