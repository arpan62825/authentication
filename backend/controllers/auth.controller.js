import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import { sendVerificationToken } from "../utils/sendVerificationToken.js";
// import

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
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = Math.floor(Math.random() * 1000000);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookies(res, user._id);
    await sendVerificationToken(res, user.email, verificationToken);

    res.status(200).json({
      message: `successfully created user`,
      user: { name, email, password },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: `An error occurred while fetching the user: ${error}` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json();
    }
  } catch (error) {}
};

export const logout = async (req, res) => {
  res.send("logout route should work in postman");
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // todo => implement welcome email
    // await sendWelcomeEmail(user.name, user.email)

    return res.status(200).json({ message: "Account has been verified" });
  } catch (error) {
    console.log(
      `An error occurred while trying to verify the account: ${error}`,
    );
  }
};
