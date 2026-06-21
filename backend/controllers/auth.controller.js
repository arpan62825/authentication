import bcrypt from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import { sendVerificationToken } from "../emails/sendVerificationToken.js";
import { sendPasswordResetEmail } from "../emails/sendPasswordResetEmail.js";
// import

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      throw new Error("All the fields are required");
    }

    const doesUserExists = await User.findOne({ email });
    if (doesUserExists) {
      return res.status(400).json({ message: "The user already exists" });
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

    return res.status(200).json({
      message: `successfully created user`,
      user: { name, email, password },
    });
  } catch (error) {
    return res
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
  } catch (error) {
    console.log(`An error occurred while trying to login: ${error}`);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Successfully logged out" });
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

    res.status(200).json({ message: "Account has been verified" });
  } catch (error) {
    console.log(
      `An error occurred while trying to verify the account: ${error}`,
    );
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(400)
        .json({ message: "The provided email does not exist in the database" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    await sendPasswordResetEmail(res, email, resetToken);

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 mins
    user.save();

    res.status(200).json({ message: "Password was successfully reset" });
  } catch (error) {
    console.log(`An error occurred in the forgetPassword function: ${error}`);
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(200).json({
        message: "No user with reset token or the reset token has expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    user.save();

    res.status(200).json({ message: "Successfully reset password" });
  } catch (error) {
    console.log(
      `An error occurred while trying to reset the password: ${error}`,
    );
  }
};
