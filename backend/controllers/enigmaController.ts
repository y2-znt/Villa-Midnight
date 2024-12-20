import { Request, Response } from "express";
import {
  fetchAllEnigmas,
  fetchEnigmaById,
  fetchEnigmaByDifficulty,
  addEnigma,
  modifyEnigma,
  removeEnigma,
} from "../services/enigmaService";

export const getAllEnigmas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enigmas = await fetchAllEnigmas();
    res.status(200).json(enigmas);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getEnigmaById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enigma = await fetchEnigmaById(req.params.id);
    res.status(200).json(enigma);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getEnigmasByDifficulty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const difficulty = parseInt(req.params.difficulty, 10);
    const enigmas = await fetchEnigmaByDifficulty(difficulty);
    res.status(200).json(enigmas);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createEnigma = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, difficulty, userId, numberOfParticipants, numberOfHours } = req.body;

  try {
    const enigma = await addEnigma({
      title,
      description,
      difficulty,
      userId,
      numberOfParticipants,
      numberOfHours,
    });
    res.status(201).json(enigma);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateEnigma = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, difficulty, numberOfParticipants, numberOfHours } = req.body;

  try {
    const enigma = await modifyEnigma(req.params.id, {
      title,
      description,
      difficulty,
      numberOfParticipants,
      numberOfHours,
    });
    res.status(200).json(enigma);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteEnigma = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const message = await removeEnigma(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
