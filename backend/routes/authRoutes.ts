import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Private routes
router.get("/current-user", authMiddleware, getCurrentUser);
router.post("/logout", authMiddleware, logout);

export default router;
