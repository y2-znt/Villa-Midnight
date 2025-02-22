import express from "express";
import {
  createEnigma,
  deleteEnigma,
  getAllEnigmas,
  getEnigmaById,
  updateEnigma,
} from "../controllers/enigmaController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getAllEnigmas);
router.get("/:id", authMiddleware, getEnigmaById);
router.post("/", authMiddleware, createEnigma);
router.put("/:id", authMiddleware, updateEnigma);
router.delete("/:id", authMiddleware, deleteEnigma);

export default router;
