import { Request, Response } from "express";
import cloudinary from "../config/cloudinaryConfig";
import {
  addUser,
  fetchAllUsers,
  fetchUserById,
  fetchUserEnigmasById,
  modifyUser,
  removeUser,
} from "../services/userService";
import { handleErrorResponse } from "../utils/errorHandler";
import { AuthenticatedRequest } from "../utils/express";

export const getAllUsers = async (
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
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUserById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only access your own data",
      });
      return;
    }
    const user = await fetchUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getEnigmaByUserId = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only access your own enigmas",
      });
      return;
    }
    const enigmas = await fetchUserEnigmasById(req.params.id);
    res.status(200).json(enigmas);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    const user = await addUser({ username, email, password, role });
    res.status(201).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only modify your own data",
      });
      return;
    }

    // Get the current user to check if they have an existing avatar
    const currentUser = await fetchUserById(req.params.id);
    let imageUrl = req.body.avatarUrl;

    if (req.file) {
      // Delete the old image if it exists
      if (currentUser.avatarUrl) {
        try {
          const publicId = `villa-midnight/${
            currentUser.avatarUrl.split("/").pop()?.split(".")[0]
          }`;
          await cloudinary.uploader.destroy(publicId);
          console.log(`Old user image deleted from Cloudinary: ${publicId}`);
        } catch (error) {
          console.error("Error deleting old image from Cloudinary:", error);
        }
      }
      // Set the new image URL
      imageUrl = req.file.path;
    }

    const user = await modifyUser(req.params.id, {
      ...req.body,
      avatarUrl: imageUrl,
    });
    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (req.user.role !== "ADMIN" && req.user.userId !== req.params.id) {
      res.status(403).json({
        message: "Access forbidden: You can only delete your own account",
      });
      return;
    }

    // Fetch the user to get the image URL
    const userToDelete = await fetchUserById(req.params.id);

    // Delete the user
    await removeUser(req.params.id);

    // Delete the user's image from Cloudinary if it exists
    if (userToDelete.avatarUrl) {
      const publicId = `villa-midnight/${
        userToDelete.avatarUrl.split("/").pop()?.split(".")[0]
      }`;
      await cloudinary.uploader.destroy(publicId);
      console.log(`User image deleted from Cloudinary: ${publicId}`);
    }

    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
