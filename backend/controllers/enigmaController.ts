import { Response } from "express";
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
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "ADMIN") {
      res.status(403).json({
        message: "Access forbidden: Admin access required",
      });
      return;
    }
    const enigmas = await fetchAllEnigmas();
    res.status(200).json(enigmas);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getEnigmaById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      return handleErrorResponse(res, new Error("Unauthorized: No user found"));
    }

    const enigma = await fetchEnigmaById(req.params.id);

    if (req.user.role !== "ADMIN" && enigma.userId !== req.user.userId) {
      return handleErrorResponse(
        res,
        new Error("Unauthorized: You can only access your own enigmas")
      );
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

    const existingEnigma = await fetchEnigmaById(req.params.id);

    if (
      req.user.role !== "ADMIN" &&
      existingEnigma.userId !== req.user.userId
    ) {
      return handleErrorResponse(
        res,
        new Error("Unauthorized: You can only update your own enigmas")
      );
    }

    const enigma = await modifyEnigma(req.params.id, {
      ...req.body,
      userId: existingEnigma.userId,
    });

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

    const existingEnigma = await fetchEnigmaById(req.params.id);

    if (
      req.user.role !== "ADMIN" &&
      existingEnigma.userId !== req.user.userId
    ) {
      return handleErrorResponse(
        res,
        new Error("Unauthorized: You can only delete your own enigmas")
      );
    }

    await removeEnigma(req.params.id);
    res.status(204).json({ message: "Enigma deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
