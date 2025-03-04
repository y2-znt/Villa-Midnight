import express from "express";
import {
  createEnigma,
  deleteEnigma,
  getAllEnigmas,
  getEnigmaById,
  updateEnigma,
} from "../controllers/enigmaController";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/", authMiddleware, getAllEnigmas);
router.get("/:id", getEnigmaById);
router.post("/", authMiddleware, upload.single("image"), createEnigma);
router.put("/:id", authMiddleware, upload.single("image"), updateEnigma);
router.delete("/:id", authMiddleware, deleteEnigma);

export default router;
