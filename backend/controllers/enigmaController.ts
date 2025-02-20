import { Request, Response } from "express";
import {
  addEnigma,
  fetchAllEnigmas,
  fetchEnigmaById,
  modifyEnigma,
  removeEnigma,
} from "../services/enigmaService";
import { handleErrorResponse } from "../utils/errorHandler";
import { AuthenticatedRequest } from "../utils/express";

export const getAllEnigmas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enigmas = await fetchAllEnigmas();
    res.status(200).json(enigmas);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getEnigmaById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const enigma = await fetchEnigmaById(req.params.id);
    if (!enigma) {
      return handleErrorResponse(res, new Error("Enigma not found"));
    }
    res.status(200).json(enigma);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createEnigma = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return handleErrorResponse(res, new Error("Unauthorized: No user found"));
    }

    const enigma = await addEnigma({
      ...req.body,
      userId: req.user.userId,
    });
    res.status(201).json(enigma);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateEnigma = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return handleErrorResponse(res, new Error("Unauthorized: No user found"));
    }

    const enigma = await modifyEnigma(req.params.id, {
      ...req.body,
      userId: req.user.userId,
    });

    if (!enigma) {
      return handleErrorResponse(res, new Error("Enigma not found"));
    }
    res.status(200).json(enigma);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteEnigma = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return handleErrorResponse(res, new Error("Unauthorized: No user found"));
    }
    await removeEnigma(req.params.id);
    res.status(204).json({ message: "Enigma deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
