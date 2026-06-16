import { Router } from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
} from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", signup);

route.post("/login", login);

route.post("/logout", logout);

route.post("/verify-email", verifyEmail);

route.post("/forgot-password", forgotPassword);

export default route;
