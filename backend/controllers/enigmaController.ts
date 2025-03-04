import { Response } from "express";
import cloudinary from "../config/cloudinaryConfig";
import {
  addEnigma,
  fetchAllEnigmas,
  fetchEnigmaById,
  modifyEnigma,
  removeEnigma,
} from "../services/enigmaService";
import { fetchUserById } from "../services/userService";
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
    const enigma = await fetchEnigmaById(req.params.id);

    if (!enigma) {
      return handleErrorResponse(res, new Error("Enigme non trouvée"));
    }

    const user = await fetchUserById(enigma.userId);

    const response = {
      ...enigma,
      createdBy: user
        ? { username: user.username }
        : { username: "Utilisateur inconnu" },
    };

    res.status(200).json(response);
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

    if (!req.file) {
      return handleErrorResponse(res, new Error("No image file provided"));
    }

    // Multer-storage-cloudinary already uploaded the file
    const imageUrl = req.file.path;

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

    // If a new image is provided
    if (req.file) {
      // Delete the old image if it exists
      if (imageUrl) {
        try {
          const publicId = `villa-midnight/${
            imageUrl.split("/").pop()?.split(".")[0]
          }`;
          await cloudinary.uploader.destroy(publicId);
          console.log(`Old image deleted from Cloudinary: ${publicId}`);
        } catch (error) {
          console.error("Error deleting old image from Cloudinary:", error);
        }
      }

      // Use the URL provided by multer-storage-cloudinary directly
      imageUrl = req.file.path;
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

    // Delete the image from Cloudinary
    if (existingEnigma.image) {
      try {
        const publicId = `villa-midnight/${
          existingEnigma.image.split("/").pop()?.split(".")[0]
        }`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Image deleted successfully: ${publicId}`);
      } catch (error: any) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    await removeEnigma(req.params.id);
    res.status(204).json({ message: "Enigma deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
