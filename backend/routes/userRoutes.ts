import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getEnigmaByUserId,
  getUserById,
  updateUser,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/upload";

const router = express.Router();

// Public route
router.post("/", createUser);

// Private routes
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.get("/:id/enigmas", authMiddleware, getEnigmaByUserId);
router.put("/:id", authMiddleware, upload.single("avatarUrl"), updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
