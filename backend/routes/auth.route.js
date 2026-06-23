import { Router } from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const route = Router();

route.get("/check-auth", verifyToken, checkAuth);

route.post("/signup", signup);

route.post("/login", login);

route.post("/logout", logout);

route.post("/verify-email", verifyEmail);

route.post("/forgot-password", forgotPassword);

route.post("/reset-password/:token", resetPassword);

export default route;
