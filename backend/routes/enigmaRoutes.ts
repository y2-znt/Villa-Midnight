import express from "express";
import {
  createEnigma,
  deleteEnigma,
  getAllEnigmas,
  getEnigmaById,
  getEnigmasByDifficulty,
  updateEnigma,
} from "../controllers/enigmaController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getAllEnigmas);
router.get("/:id", getEnigmaById);
router.get("/difficulty", getEnigmasByDifficulty);
router.post("/", authMiddleware, createEnigma);
router.put("/:id", authMiddleware, updateEnigma);
router.delete("/:id", authMiddleware, deleteEnigma);

export default router;
