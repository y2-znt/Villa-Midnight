import { Request, Response } from "express";
import {
  addEnigma,
  fetchAllEnigmas,
  fetchEnigmaByDifficulty,
  fetchEnigmaById,
  modifyEnigma,
  removeEnigma,
} from "../services/enigmaService";
import { AuthenticatedRequest } from "../utils/express";

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
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    userId,
    title,
    description,
    image,
    difficulty,
    numberOfParticipants,
    numberOfHours,
  } = req.body;

  try {
    const enigma = await addEnigma({
      userId,
      title,
      description,
      image,
      difficulty,
      numberOfParticipants,
      numberOfHours,
    });
    res.status(201).json(enigma);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateEnigma = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    userId,
    title,
    description,
    image,
    difficulty,
    numberOfParticipants,
    numberOfHours,
  } = req.body;

  try {
    const enigma = await modifyEnigma(req.params.id, {
      userId,
      title,
      description,
      image,
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
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const message = await removeEnigma(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
