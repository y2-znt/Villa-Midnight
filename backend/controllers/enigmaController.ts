import { Response } from "express";
import cloudinary from "../config/cloudinaryConfig";
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

    // Convert string values to numbers (for postman)
    const enigmaData = {
      ...req.body,
      numberOfParticipants: parseInt(req.body.numberOfParticipants, 10),
      numberOfHours: parseInt(req.body.numberOfHours, 10),
      userId: req.user.userId,
    };

    let imageUrl;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
        console.log("Cloudinary upload result:", result);
      } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return handleErrorResponse(
          res,
          new Error(`Failed to upload image: ${error.message}`)
        );
      }
    } else {
      return handleErrorResponse(res, new Error("No image file provided"));
    }

    const enigma = await addEnigma({
      ...enigmaData,
      image: imageUrl,
    });

    res.status(201).json(enigma);
  } catch (error) {
    console.error("Error creating enigma:", error);
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

    // Convert string values to numbers (for postman)
    const enigmaData = {
      ...req.body,
      numberOfParticipants: parseInt(req.body.numberOfParticipants, 10),
      numberOfHours: parseInt(req.body.numberOfHours, 10),
      userId: existingEnigma.userId,
    };

    let imageUrl = existingEnigma.image;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
        console.log("Cloudinary upload result:", result);
      } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return handleErrorResponse(
          res,
          new Error(`Failed to upload image: ${error.message}`)
        );
      }
    }

    const enigma = await modifyEnigma(req.params.id, {
      ...enigmaData,
      image: imageUrl,
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
