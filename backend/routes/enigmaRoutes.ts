import express from 'express';
import {
  getAllEnigmas,
  getEnigmaById,
  getEnigmasByDifficulty,
  createEnigma,
  updateEnigma,
  deleteEnigma,
} from '../controllers/enigmaController';

const router = express.Router();

router.get("/", getAllEnigmas);
router.get("/:id", getEnigmaById);
router.get("/difficulty", getEnigmasByDifficulty)
router.post("/", createEnigma);
router.put("/:id", updateEnigma);
router.delete("/:id", deleteEnigma);

export default router;
