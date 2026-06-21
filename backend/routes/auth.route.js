import { Router } from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signup);

route.post("/login", login);

route.post("/logout", logout);

route.post("/verify-email", verifyEmail);

route.post("/forgot-password", forgotPassword);

route.post("/reset-password/:token", resetPassword)

export default route;
